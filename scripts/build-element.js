import fs from 'fs';
import path from 'path';

import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
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

const proceedReplacements = (content) => {
  // add :host
  content = content
    .split('\n')
    .map((line) => {
      const lineSplitted = line.replace('{', '').replace(',', '').trim().split(' ');
      if (
        (lineSplitted.length > 1 &&
          lineSplitted.filter((part) => part.includes('.swiper-wrapper')).length > 0) ||
        line.includes(
          `.swiper-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill`,
        )
      ) {
        const newRule = [...lineSplitted];
        return line.replace(newRule[0], `:host(${newRule[0]})`);
        // newRule[0] = `:host(${newRule[0]})`;
        // return `${newRule.join(' ')},\n${line}`;
      }
      return line;
    })
    .join('\n');
  // add/replace .swiper-slide to swiper-slide
  content = content
    .split('\n')
    .map((line) => {
      if (line.includes('> .swiper-wrapper > .swiper-slide')) {
        return line.replace('> .swiper-wrapper > .swiper-slide', '> swiper-slide');
      }
      if (
        line.includes('.swiper-slide ') ||
        line.includes('.swiper-slide,') ||
        line.includes('.swiper-slide:')
      ) {
        return line.replace(/\.swiper-slide/g, 'swiper-slide');
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
  cssStylesBundle = proceedReplacements(cssStylesBundle);
  cssStylesCore = proceedReplacements(cssStylesCore);

  const fontStyles = await cleanCss(cssStylesCore.split('/* FONT_END */')[0]);
  cssStylesBundle = await cleanCss(cssStylesBundle.split('/* FONT_END */')[1]);
  cssStylesCore = await cleanCss(cssStylesCore.split('/* FONT_END */')[1]);

  if (!fs.existsSync(path.resolve(outputDir, 'element'))) {
    fs.mkdirSync(path.resolve(outputDir, 'element'));
  }

  // ESM
  fs.copyFileSync('./src/element/get-params.js', path.resolve(outputDir, 'element/get-params.js'));
  const elementContent = fs.readFileSync('./src/element/swiper-element.js', 'utf-8');

  const esmBundleContent = elementContent
    .replace(
      '//SWIPER_STYLES',
      `const SwiperFontCSS = \`${fontStyles}\`; const SwiperCSS = \`${cssStylesBundle}\`;`,
    )
    .replace('//IMPORT_SWIPER', `import Swiper from 'swiper/bundle';`)
    .replace('//EXPORT', `export { SwiperContainer, SwiperSlide, register };`);

  fs.writeFileSync(path.resolve(outputDir, 'element/swiper-element-bundle.js'), esmBundleContent);

  const esmContent = elementContent
    .replace(
      '//SWIPER_STYLES',
      `const SwiperFontCSS = \`${fontStyles}\`; const SwiperCSS = \`${cssStylesCore}\`;`,
    )
    .replace('//IMPORT_SWIPER', `import Swiper from 'swiper';`)
    .replace('//EXPORT', `export { SwiperContainer, SwiperSlide, register };`);
  fs.writeFileSync(path.resolve(outputDir, 'element/swiper-element.js'), esmContent);

  // Browser
  const bundle = await rollup({
    input: `${outputDir}/element/swiper-element-bundle.js`,
    plugins: [
      replace({
        delimiters: ['', ''],
        '//SWIPER_STYLES': `const SwiperFontCSS = \`${fontStyles}\`; const SwiperCSS = \`${cssStylesBundle}\`;`,
        [`import Swiper from 'swiper/bundle';`]: `import Swiper from '../swiper-bundle.esm.js';`,
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
    file: `./${outputDir}/swiper-element-bundle.js`,
  });

  const result = bundleRes.output[0];
  const { code, map } = await minify(result.code, {
    sourceMap: {
      content: result.map,
      filename: `swiper-element-bundle.min.js`,
      url: `swiper-element-bundle.min.js.map`,
    },
    output: {
      preamble: banner('Custom Element'),
    },
  }).catch((err) => {
    console.error(`Terser failed on file swiper-element-bundle: ${err.toString()}`);
  });
  fs.writeFileSync(`./${outputDir}/swiper-element-bundle.min.js`, code);
  fs.writeFileSync(`./${outputDir}/swiper-element-bundle.min.js.map`, map);

  addBannerToFile(path.resolve(outputDir, 'element/swiper-element-bundle.js'), 'Custom Element');
  addBannerToFile(path.resolve(outputDir, 'element/swiper-element.js'), 'Custom Element');
}
