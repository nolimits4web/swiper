/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const chalk = require('chalk');
const less = require('./utils/less');
const autoprefixer = require('./utils/autoprefixer');
const minifyCSS = require('./utils/clean-css');
const banner = require('./banner')();
const config = require('./build-config');

const base64Encode = async (file) => {
  // read binary data
  const bitmap = await fs.readFile(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
};

const readSwiperFile = async (filePath, iconsFontBase64, colors) => {
  const fileContent = await fs.readFile(filePath, 'utf-8');
  if (filePath.includes('swiper.less')) {
    const coreContent = fs.readFileSync(
      path.resolve(__dirname, '../src/components/core/core.less'),
      'utf-8',
    );
    return fileContent
      .replace('swiperIconsFont()', `'${iconsFontBase64}'`)
      .replace('$themeColor', config.themeColor)
      .replace('$colors', colors.join(', '))
      .replace('//IMPORT_COMPONENTS', '')
      .replace(`@import url('./less/mixins.less');`, '')
      .replace(`@import url('./components/core/core.less');`, coreContent);
  }
  if (filePath.includes('swiper-vars.less')) {
    return fileContent
      .replace('$themeColor', config.themeColor)
      .replace('$colors', colors.join(', '));
  }
  if (filePath.includes('navigation.less') || filePath.includes('pagination.less')) {
    return ["@import url('../../swiper-vars.less');", fileContent].join('\n\n');
  }
  if (filePath.includes('swiper.scss')) {
    const coreContent = await fs.readFile(
      path.resolve(__dirname, '../src/components/core/core.scss'),
      'utf-8',
    );
    return fileContent
      .replace(`@import './components/core/core';`, coreContent)
      .replace('//IMPORT_COMPONENTS', '');
  }
  return fileContent;
};

const buildCSS = async ({ isBundle, colors, components, minified, outputDir }) => {
  let lessContent = await fs.readFile(path.resolve(__dirname, '../src/swiper.less'), 'utf8');
  lessContent = lessContent
    .replace(
      '//IMPORT_COMPONENTS',
      !isBundle
        ? ''
        : components
            .map((component) => `@import url('./components/${component}/${component}.less');`)
            .join('\n'),
    )
    .replace('$themeColor', config.themeColor)
    .replace('$colors', colors.join(', '));

  const cssContent = await autoprefixer(
    await less(lessContent, path.resolve(__dirname, '../src')),
  ).catch((err) => {
    throw err;
  });

  const fileName = isBundle ? 'swiper-bundle' : 'swiper';

  // Write file
  await fs.ensureDir(`./${outputDir}`);
  if (isBundle) {
    await fs.writeFile(`./${outputDir}/${fileName}.css`, `${banner}\n${cssContent}`);
  }

  if (minified || !isBundle) {
    const minifiedContent = await minifyCSS(cssContent);
    await fs.writeFile(`./${outputDir}/${fileName}.min.css`, `${banner}\n${minifiedContent}`);
  }
};

module.exports = async (outputDir) => {
  const env = process.env.NODE_ENV || 'development';

  const components = config.components.filter((name) => {
    const lessFilePath = `./src/components/${name}/${name}.less`;
    return fs.existsSync(lessFilePath);
  });
  const colors = Object.keys(config.colors).map((key) => `${key} ${config.colors[key]}`);

  buildCSS({ isBundle: true, colors, components, minified: env !== 'development', outputDir });
  buildCSS({ isBundle: false, colors, components, minified: env !== 'development', outputDir });

  if (env === 'development') {
    return;
  }

  // Copy less & scss
  const iconsFontBase64 = await base64Encode('./src/icons/font/swiper-icons.woff');

  const files = await globby(
    [
      '**/**.scss',
      '**/**.less',
      '!**/mixins.less',
      '!**/icons/**',
      '!**/angular/**',
      '!**/core/**',
    ],
    {
      cwd: path.resolve(__dirname, '../src'),
    },
  );
  await Promise.all(
    files.map(async (file) => {
      const distFilePath = path.resolve(__dirname, `../${outputDir}`, file);
      const srcFilePath = path.resolve(__dirname, '../src', file);
      const distFileContent = await readSwiperFile(srcFilePath, iconsFontBase64, colors);
      await fs.ensureDir(path.dirname(distFilePath));
      await fs.writeFile(distFilePath, distFileContent);
    }),
  );

  const componentsLessFiles = await globby(['**/**.less'], {
    cwd: path.resolve(__dirname, '../package/components'),
    absolute: true,
  });
  await Promise.all(
    componentsLessFiles.map(async (filePath) => {
      const fileContent = await fs.readFile(filePath, 'utf-8');

      const content = fileContent.replace('@themeColor', config.themeColor);
      const lessContent = await less(content, path.dirname(filePath)).catch((err) => {
        throw new Error(`${filePath}: ${err}`);
      });
      const resultCSS = await autoprefixer(lessContent);
      const resultFilePath = filePath.replace(/\.less$/, '');
      const minifiedCSS = await minifyCSS(resultCSS);

      // not sure if needed. Possibly can produce a bug cause of the same naming
      // await fs.writeFile(`${resultFilePath}.css`, resultCSS);
      await fs.writeFile(`${resultFilePath}.min.css`, minifiedCSS);
    }),
  );
  console.log(chalk.green('Styles build completed!'));
};
