/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const fse = require('./utils/fs-extra.js');
const less = require('./utils/less.js');
const autoprefixer = require('./utils/autoprefixer.js');
const cleanCSS = require('./utils/clean-css.js');
const banner = require('./banner.js');

const config = require('./build-config.js');

function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

async function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  const components = [];
  config.components.forEach((name) => {
    const lessFilePath = `./src/components/${name}/${name}.less`;

    if (fs.existsSync(lessFilePath)) {
      components.push(name);
    }
  });

  const colors = [];

  Object.keys(config.colors).forEach((key) => {
    colors.push(`${key} ${config.colors[key]}`);
  });

  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/swiper.less'), 'utf8');
  lessContent = lessContent
    .replace(
      '//IMPORT_COMPONENTS',
      components
        .map((component) => `@import url('./components/${component}/${component}.less');`)
        .join('\n'),
    )
    .replace('$themeColor', config.themeColor)
    .replace('$colors', colors.join(', '));

  let cssContent;
  try {
    cssContent = await autoprefixer(await less(lessContent, path.resolve(__dirname, '../src')));
  } catch (err) {
    console.log(err);
  }

  // Write file
  fse.writeFileSync(`./${outputDir}/swiper-bundle.css`, `${banner}\n${cssContent}`);

  if (env === 'development') {
    if (cb) cb();
    return;
  }

  // Copy less & scss
  const iconsFontBase64 = base64Encode('./src/icons/font/swiper-icons.woff');

  glob('**/*.*', { cwd: path.resolve(__dirname, '../src') }, (err, files) => {
    files.forEach((file, index) => {
      if (file.indexOf('icons/') === 0) return;
      if (file.indexOf('/core/') >= 0) return;
      if (file.indexOf('.js') >= 0) return;
      if (file.indexOf('.ts') >= 0) return;
      if (file.indexOf('mixins.less') >= 0) return;

      let fileContent = fse.readFileSync(path.resolve(__dirname, '../src', file));
      if (file.indexOf('swiper.less') >= 0) {
        const coreContent = fs.readFileSync(
          path.resolve(__dirname, '../src/components/core/core.less'),
          'utf-8',
        );
        fileContent = fileContent
          .replace('swiperIconsFont()', `'${iconsFontBase64}'`)
          .replace('$themeColor', config.themeColor)
          .replace('$colors', colors.join(', '))
          .replace('//IMPORT_COMPONENTS', '')
          .replace(`@import url('./less/mixins.less');`, '')
          .replace(`@import url('./components/core/core.less');`, coreContent);
      }
      if (file.indexOf('swiper-vars.less') >= 0) {
        fileContent = fileContent
          .replace('$themeColor', config.themeColor)
          .replace('$colors', colors.join(', '));
      }
      if (file.indexOf('navigation.less') >= 0 || file.indexOf('pagination.less') >= 0) {
        fileContent = ["@import url('../../swiper-vars.less');", fileContent].join('\n\n');
      }
      if (file.indexOf('swiper.scss') >= 0) {
        const coreContent = fs.readFileSync(
          path.resolve(__dirname, '../src/components/core/core.scss'),
          'utf-8',
        );
        fileContent = fileContent
          .replace(`@import './components/core/core';`, coreContent)
          .replace('//IMPORT_COMPONENTS', '');
      }

      fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);
      if (index === files.length - 1) cb();
    });
  });

  // Minified
  const minifiedContent = await cleanCSS(cssContent);

  // Write file
  fse.writeFileSync(`./${outputDir}/swiper-bundle.min.css`, `${banner}\n${minifiedContent}`);

  if (cb) cb();
}
module.exports = build;
