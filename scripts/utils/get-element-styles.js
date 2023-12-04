import fs from 'fs';
import path from 'path';
import * as url from 'url';
import autoprefixer from './autoprefixer.js';
import less from './less.js';
import cleanCss from './clean-css.js';
import config from '../build-config.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const getSplittedCSS = (content) => {
  const cssStylesSlideCore = (content.split(`/* Slide styles start */`)[1] || '').split(
    `/* Slide styles end */`,
  )[0];
  const cssStylesSlideCube = (content.split(`/* Cube slide shadows start */`)[1] || '').split(
    `/* Cube slide shadows end */`,
  )[0];
  const cssStylesSlideFlip = (content.split(`/* Flip slide shadows start */`)[1] || '').split(
    `/* Flip slide shadows end */`,
  )[0];
  const cssStylesSlideZoom = (content.split(`/* Zoom container styles start */`)[1] || '').split(
    `/* Zoom container styles end */`,
  )[0];
  const navigationFontStyles = (content.split('/* Navigation font start */')[1] || '').split(
    '/* Navigation font end */',
  )[0];
  content = content
    .replace(cssStylesSlideCore, '')
    .replace(cssStylesSlideCube, '')
    .replace(cssStylesSlideFlip, '')
    .replace(navigationFontStyles, '')
    .replace(cssStylesSlideZoom, '');
  if (content.includes(`/* FONT_END */`)) {
    content = content.split('/* FONT_END */')[1];
  }

  return {
    slides: [
      cssStylesSlideCore || '',
      cssStylesSlideCube || '',
      cssStylesSlideFlip || '',
      cssStylesSlideZoom || '',
    ].join('\n'),
    container: content,
  };
};
export const proceedReplacements = (content = '') => {
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
          '.swiper-lazy-preloader {animation: swiper-preloader-spin 1s infinite linear;',
        );
      }
      if (line.includes('animation: swiper-preloader-spin 1s infinite linear;')) {
        return '';
      }
      if (line.includes('.swiper-zoom-container')) {
        return line.replace('.swiper-zoom-container', '::slotted(.swiper-zoom-container)');
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

export default async function getElementStyles() {
  // eslint-disable-next-line
  const modules = config.modules.filter((name) => {
    const lessFilePath = `./src/modules/${name}/${name}.less`;
    return fs.existsSync(lessFilePath);
  });

  let lessContentBundle = await fs.readFileSync(
    path.resolve(__dirname, '../../src/swiper.less'),
    'utf8',
  );
  lessContentBundle = lessContentBundle.replace(
    '//IMPORT_MODULES',
    modules.map((mod) => `@import url('./modules/${mod}/${mod}.less');`).join('\n'),
  );

  let lessContentCore = await fs.readFileSync(
    path.resolve(__dirname, '../../src/swiper.less'),
    'utf8',
  );
  lessContentCore = lessContentCore.replace('//IMPORT_MODULES', '');

  let cssStylesBundle = await autoprefixer(
    await less(lessContentBundle, path.resolve(__dirname, '../../src')),
  );
  let cssStylesCore = await autoprefixer(
    await less(lessContentCore, path.resolve(__dirname, '../../src')),
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
  return {
    core: cssStylesCore,
    bundle: cssStylesBundle,
    slide: cssStylesSlide,
  };
}
