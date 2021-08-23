/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs-extra');
const { outputDir } = require('./utils/output-dir');
// const svelte = require('svelte/compiler');
const { addBannerToFile } = require('./utils/banner');

async function buildSvelte() {
  await exec.promise(`npx babel src/svelte --out-dir ${outputDir}/svelte`);
  await addBannerToFile(`./${outputDir}/svelte/swiper-svelte.js`, 'Svelte');

  /* DON'T TRANSFORM SVELTE FILES
  // Transform svelte files
  let swiper = await fs.readFile('./src/svelte/swiper.svelte', 'utf8');
  const swiperResult = svelte.compile(swiper, {
    format: 'esm',
    filename: 'swiper.svelte',
  });
  swiper = swiperResult.js.code;
  await fs.writeFile(`./${outputDir}/svelte/swiper.js`, swiper);

  let swiperSlide = await fs.readFile('./src/svelte/swiper-slide.svelte', 'utf8');
  const swiperSlideResult = svelte.compile(swiperSlide, {
    format: 'esm',
    filename: 'swiper.svelte',
  });
  swiperSlide = swiperSlideResult.js.code;
  await fs.writeFile(`./${outputDir}/svelte/swiper-slide.js`, swiperSlide);
  */
  await fs.copyFile('./src/svelte/swiper.svelte', `./${outputDir}/svelte/swiper.svelte`);
  await fs.copyFile(
    './src/svelte/swiper-slide.svelte',
    `./${outputDir}/svelte/swiper-slide.svelte`,
  );
  // try {
  //   await fs.remove(`./${outputDir}/svelte/swiper-slide.svelte`);
  //   await fs.remove(`./${outputDir}/svelte/swiper.svelte`);
  // } catch (err) {
  //   // no files
  // }
}

module.exports = buildSvelte;
