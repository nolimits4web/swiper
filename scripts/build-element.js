import fs from 'fs';
import path from 'path';

import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { minify } from 'terser';

import { outputDir } from './utils/output-dir.js';
import { addBannerToFile, banner } from './utils/banner.js';
import cleanCss from './utils/clean-css.js';

export default async function buildElement() {
  let cssStyles = fs.readFileSync(path.resolve(outputDir, 'swiper.css'), 'utf-8');
  const fontStyles = await cleanCss(cssStyles.split('/* FONT_END */')[0]);
  cssStyles = await cleanCss(cssStyles.split('/* FONT_END */')[1]);

  let cssBundleStyles = fs.readFileSync(path.resolve(outputDir, 'swiper-bundle.css'), 'utf-8');
  cssBundleStyles = await cleanCss(cssBundleStyles.split('/* FONT_END */')[1]);

  if (!fs.existsSync(path.resolve(outputDir, 'element'))) {
    fs.mkdirSync(path.resolve(outputDir, 'element'));
  }

  // ESM
  fs.copyFileSync('./src/element/get-params.js', path.resolve(outputDir, 'element/get-params.js'));
  const elementContent = fs.readFileSync('./src/element/swiper-element.js', 'utf-8');

  const esmBundleContent = elementContent
    .replace(
      '//SWIPER_STYLES',
      `const SwiperFontCSS = \`${fontStyles}\`; const SwiperCSS = \`${cssBundleStyles}\`;`,
    )
    .replace('//IMPORT_SWIPER', `import Swiper from 'swiper/bundle';`)
    .replace('//EXPORT', `export { SwiperContainer, SwiperSlide, register };`);

  fs.writeFileSync(path.resolve(outputDir, 'element/swiper-element-bundle.js'), esmBundleContent);

  const esmContent = elementContent
    .replace(
      '//SWIPER_STYLES',
      `const SwiperFontCSS = \`${fontStyles}\`; const SwiperCSS = \`${cssStyles}\`;`,
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
        '//SWIPER_STYLES': `const SwiperFontCSS = \`${fontStyles}\`; const SwiperCSS = \`${cssBundleStyles}\`;`,
        [`import Swiper from 'swiper/bundle';`]: `import Swiper from '${path.resolve(
          outputDir,
          'swiper-bundle.esm.js',
        )}';`,
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
