/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs-extra');
const svelte = require('svelte/compiler');
const bannerSvelte = require('./banner')('Svelte');

module.exports = async (outputDir) => {
  // Babel
  await exec.promise(
    `cross-env npx babel --config-file ./babel.config.svelte.js src/svelte --out-dir ${outputDir}/esm/svelte`,
  );
  await exec.promise(
    `cross-env npx babel --config-file ./babel.config.svelte.js src/swiper-svelte.js --out-file ${outputDir}/swiper-svelte.esm.js`,
  );

  // Fix import paths
  let fileContent = await fs.readFile(`./${outputDir}/swiper-svelte.esm.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\(".\/svelte\//g, `require("./esm/svelte/`)
    .replace(/from '.\/svelte\//g, `from './esm/svelte/`);
  fileContent = `${bannerSvelte}\n${fileContent}`;
  fs.writeFileSync(`./${outputDir}/swiper-svelte.esm.js`, fileContent);

  // Transform svelte files
  let swiper = await fs.readFile('./src/svelte/swiper.svelte', 'utf8');
  const swiperResult = svelte.compile(swiper, {
    format: 'esm',
    filename: 'swiper.svelte',
  });
  swiper = swiperResult.js.code;
  await fs.writeFile(`./${outputDir}/esm/svelte/swiper.js`, swiper);

  let swiperSlide = await fs.readFile('./src/svelte/swiper-slide.svelte', 'utf8');
  const swiperSlideResult = svelte.compile(swiperSlide, {
    format: 'esm',
    filename: 'swiper.svelte',
  });
  swiperSlide = swiperSlideResult.js.code;
  await fs.writeFile(`./${outputDir}/esm/svelte/swiper-slide.js`, swiperSlide);
  await fs.copyFile('./src/svelte/swiper.svelte', `./${outputDir}/esm/svelte/swiper.svelte`);
  await fs.copyFile(
    './src/svelte/swiper-slide.svelte',
    `./${outputDir}/esm/svelte/swiper-slide.svelte`,
  );
  try {
    await fs.remove(`./${outputDir}/svelte/swiper-slide.svelte`);
    await fs.remove(`./${outputDir}/svelte/swiper.svelte`);
  } catch (err) {
    // no files
  }
};
