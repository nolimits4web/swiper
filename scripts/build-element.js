import fs from 'fs';
import path from 'path';

import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import { globby } from 'globby';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { minify } from 'terser';
import * as url from 'url';

import autoprefixer from './utils/autoprefixer.js';
import less from './utils/less.js';
import { outputDir } from './utils/output-dir.js';
import { addBannerToFile, banner } from './utils/banner.js';
import cleanCss from './utils/clean-css.js';
import config from './build-config.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const getSplittedCSS = (content) => {
  const cssStylesSlideCore = content
    .split(`/* Slide styles start */`)[1]
    .split(`/* Slide styles end */`)[0];
  const cssStylesSlideCube = (content.split(`/* Cube slide shadows start */`)[1] || '').split(
    `/* Cube slide shadows end */`,
  )[0];
  const cssStylesSlideFlip = (content.split(`/* Flip slide shadows start */`)[1] || '').split(
    `/* Flip slide shadows end */`,
  )[0];
  const navigationFontStyles = (content.split('/* Navigation font start */')[1] || '').split(
    '/* Navigation font end */',
  )[0];
  content = content
    .replace(cssStylesSlideCore, '')
    .replace(cssStylesSlideCube, '')
    .replace(cssStylesSlideFlip, '')
    .replace(navigationFontStyles, '')
    .split('/* FONT_END */')[1];

  return {
    slides: [cssStylesSlideCore || '', cssStylesSlideCube || '', cssStylesSlideFlip || ''].join(
      '\n',
    ),
    container: content,
  };
};
const proceedReplacements = (content) => {
  // eslint-disable-next-line
  const replace = ['invisible-blank', 'visible', 'zoomed', 'active', 'next', 'prev'];

  content = content
    .replace(/:root/g, ':host')
    .split('\n')
    .map((line) => {
      if (line.includes('.swiper {')) {
        return line.replace('.swiper {', '.swiper {width: 100%; height: 100%;');
      }
      if (line.includes('> .swiper-wrapper > .swiper-slide')) {
        return line.replace('> .swiper-wrapper > .swiper-slide', '::slotted(swiper-slide)');
      }
      let replaced = '';
      if (line.includes('.swiper-slide ')) {
        replaced = line.replaceAll(/\.swiper-slide /g, '::slotted(swiper-slide) ');
      }
      if (line.includes('.swiper-slide,')) {
        replaced = line.replaceAll(/\.swiper-slide,/g, '::slotted(swiper-slide),');
      }
      if (line.includes('.swiper-slide:')) {
        replaced = line.replaceAll(/\.swiper-slide:/g, '::slotted(swiper-slide):');
      }
      replace.forEach((key) => {
        const l = replaced || line;
        if (l.includes(`.swiper-slide-${key}`)) {
          replaced = l.replaceAll(`.swiper-slide-${key}`, `::slotted(.swiper-slide-${key})`);
        }
      });
      if (replaced) {
        return replaced;
      }

      return line;
    })
    .join('\n');
  return content;
};
const proceedSlideReplacements = (content) => {
  content = content
    .split('\n')
    .map((line) => {
      if (line === '.swiper-lazy-preloader {') {
        return line.replace(
          '.swiper-lazy-preloader {',
          '::slotted(.swiper-lazy-preloader) {animation: swiper-preloader-spin 1s infinite linear;',
        );
      }
      if (line.includes('animation: swiper-preloader-spin 1s infinite linear;')) {
        return '';
      }
      if (line.includes('--swiper-preloader-color:')) return '';
      if (line.includes('.swiper-3d .swiper-slide-shadow')) {
        return line.replace('.swiper-3d ', '::slotted(').replace(',', '),').replace(' {', ') {');
      }
      if (line.includes('.swiper-cube .swiper-slide-shadow')) {
        return line.replace('.swiper-cube ', '::slotted(').replace(',', '),').replace(' {', ') {');
      }
      if (line.includes('.swiper-flip .swiper-slide-shadow')) {
        return line.replace('.swiper-flip ', '::slotted(').replace(',', '),').replace(' {', ') {');
      }
      return line;
    })
    .join('\n');
  return content;
};
export default async function buildElement() {
  // eslint-disable-next-line
  const modules = config.modules.filter((name) => {
    const lessFilePath = `./src/modules/${name}/${name}.less`;
    return fs.existsSync(lessFilePath);
  });

  let lessContentBundle = await fs.readFileSync(
    path.resolve(__dirname, '../src/swiper.less'),
    'utf8',
  );
  lessContentBundle = lessContentBundle.replace(
    '//IMPORT_MODULES',
    modules.map((mod) => `@import url('./modules/${mod}/${mod}.less');`).join('\n'),
  );

  let lessContentCore = await fs.readFileSync(
    path.resolve(__dirname, '../src/swiper.less'),
    'utf8',
  );
  lessContentCore = lessContentCore.replace('//IMPORT_MODULES', '');

  let cssStylesBundle = await autoprefixer(
    await less(lessContentBundle, path.resolve(__dirname, '../src')),
  );
  let cssStylesCore = await autoprefixer(
    await less(lessContentCore, path.resolve(__dirname, '../src')),
  );
  // eslint-disable-next-line
  let cssStylesSlide = getSplittedCSS(cssStylesBundle).slides;
  cssStylesBundle = getSplittedCSS(cssStylesBundle).container;
  cssStylesCore = getSplittedCSS(cssStylesCore).container;

  cssStylesBundle = proceedReplacements(cssStylesBundle);
  cssStylesCore = proceedReplacements(cssStylesCore);
  cssStylesSlide = proceedSlideReplacements(cssStylesSlide);

  cssStylesBundle = await cleanCss(cssStylesBundle);
  cssStylesCore = await cleanCss(cssStylesCore);
  cssStylesSlide = await cleanCss(cssStylesSlide);

  if (!fs.existsSync(path.resolve(outputDir, 'element'))) {
    fs.mkdirSync(path.resolve(outputDir, 'element'));
  }

  // modules styles
  const modulesLessFiles = await globby(['**/**.less'], {
    cwd: path.resolve(__dirname, '../dist/modules'),
    absolute: true,
  });
  await Promise.all(
    modulesLessFiles.map(async (filePath) => {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const content = fileContent.replace('@themeColor', config.themeColor);
      const lessContent = await less(content, path.dirname(filePath)).catch((err) => {
        throw new Error(`${filePath}: ${err}`);
      });
      const resultCSS = proceedReplacements(await autoprefixer(lessContent));
      const resultFilePath = filePath.replace(/\.less$/, '');
      const minifiedCSS = await cleanCss(resultCSS);
      // not sure if needed. Possibly can produce a bug cause of the same naming
      // await fs.writeFile(`${resultFilePath}.css`, resultCSS);
      fs.writeFileSync(`${resultFilePath}-element.min.css`, minifiedCSS);
    }),
  );

  // ESM
  fs.copyFileSync('./src/element/get-params.js', path.resolve(outputDir, 'element/get-params.js'));
  const elementContent = fs.readFileSync('./src/element/swiper-element.js', 'utf-8');

  const esmBundleContent = elementContent
    .replace('//SWIPER_STYLES', `const SwiperCSS = \`${cssStylesBundle}\`;`)
    .replace('//SWIPER_SLIDE_STYLES', `const SwiperSlideCSS = \`${cssStylesSlide}\`;`)
    .replace('//IMPORT_SWIPER', `import Swiper from 'swiper/bundle';`)
    .replace('//EXPORT', `export { SwiperContainer, SwiperSlide, register };`);

  fs.writeFileSync(path.resolve(outputDir, 'element/swiper-element-bundle.js'), esmBundleContent);

  const esmContent = elementContent
    .replace('//SWIPER_STYLES', `const SwiperCSS = \`${cssStylesCore}\`;`)
    .replace('//SWIPER_SLIDE_STYLES', `const SwiperSlideCSS = \`${cssStylesSlide}\`;`)
    .replace('//IMPORT_SWIPER', `import Swiper from 'swiper';`)
    .replace('//EXPORT', `export { SwiperContainer, SwiperSlide, register };`);
  fs.writeFileSync(path.resolve(outputDir, 'element/swiper-element.js'), esmContent);

  // Browser
  const browser = async (isBundle) => {
    const suffix = isBundle ? '-bundle' : '';
    const bundle = await rollup({
      input: `${outputDir}/element/swiper-element${suffix}.js`,
      plugins: [
        replace({
          delimiters: ['', ''],
          '//SWIPER_STYLES': `const SwiperCSS = \`${cssStylesBundle}\`;`,
          '//SWIPER_SLIDE_STYLES': `const SwiperSlideCSS = \`${cssStylesSlide}\`;`,
          [`import Swiper from 'swiper/bundle';`]: `import Swiper from '../swiper-bundle.esm.js';`,
          [`import Swiper from 'swiper';`]: `import Swiper from '../swiper.esm.js';`,
          '//BROWSER_REGISTER': `register()`,
          'export { SwiperContainer, SwiperSlide, register };': ``,
        }),
        nodeResolve({ mainFields: ['module', 'main', 'jsnext'], rootDir: './src' }),
        babel({ babelHelpers: 'bundled' }),
      ],
      onwarn() {},
    });
    const bundleRes = await bundle.write({
      format: 'iife',
      name: 'Swiper',
      strict: true,
      banner: banner('Custom Element'),
      file: `./${outputDir}/swiper-element${suffix}.js`,
    });

    const result = bundleRes.output[0];
    const { code, map } = await minify(result.code, {
      sourceMap: {
        content: result.map,
        filename: `swiper-element${suffix}.min.js`,
        url: `swiper-element${suffix}.min.js.map`,
      },
      output: {
        preamble: banner('Custom Element'),
      },
    }).catch((err) => {
      console.error(`Terser failed on file swiper-element${suffix}: ${err.toString()}`);
    });
    fs.writeFileSync(`./${outputDir}/swiper-element${suffix}.min.js`, code);
    fs.writeFileSync(`./${outputDir}/swiper-element${suffix}.min.js.map`, map);
  };

  await browser();
  await browser(true);

  addBannerToFile(path.resolve(outputDir, 'element/swiper-element-bundle.js'), 'Custom Element');
  addBannerToFile(path.resolve(outputDir, 'element/swiper-element.js'), 'Custom Element');
}
