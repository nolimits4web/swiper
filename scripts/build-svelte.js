/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs-extra');
const { outputDir } = require('./utils/output-dir');
// const svelte = require('svelte/compiler');
const bannerSvelte = require('./banner')('Svelte');

module.exports = async () => {
  // Babel
  await exec.promise(`npx swc src/svelte --out-dir ${outputDir}/svelte`);

  // Fix import paths
  let fileContent = await fs.readFile(`./${outputDir}/svelte/swiper-svelte.js`, 'utf-8');
  fileContent = `${bannerSvelte}\n${fileContent}`;
  fs.writeFileSync(`./${outputDir}/svelte/swiper-svelte.js`, fileContent);

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
};
