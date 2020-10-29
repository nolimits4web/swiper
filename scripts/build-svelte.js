/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs');
const svelte = require('svelte/compiler');
const bannerSvelte = require('./banner-svelte.js');

async function buildSvelte(format, cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';
  // Babel
  await exec.promise(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.svelte.js src/svelte --out-dir ${outputDir}/${format}/svelte`,
  );
  await exec.promise(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.svelte.js src/swiper-svelte.js --out-file ${outputDir}/swiper-svelte.${format}.js`,
  );

  // Fix import paths
  let fileContent = fs.readFileSync(`./${outputDir}/swiper-svelte.${format}.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\(".\/svelte\//g, `require("./${format}/svelte/`)
    .replace(/from '.\/svelte\//g, `from './${format}/svelte/`);
  fileContent = `${bannerSvelte}\n${fileContent}`;
  fs.writeFileSync(`./${outputDir}/swiper-svelte.${format}.js`, fileContent);

  // Transform svelte files
  let swiper = fs.readFileSync('./src/svelte/swiper.svelte', 'utf8');
  const swiperResult = svelte.compile(swiper, {
    format,
    filename: 'swiper.svelte',
  });
  swiper = swiperResult.js.code;
  fs.writeFileSync(`./${outputDir}/${format}/svelte/swiper.js`, swiper);

  let swiperSlide = fs.readFileSync('./src/svelte/swiper-slide.svelte', 'utf8');
  const swiperSlideResult = svelte.compile(swiperSlide, {
    format,
    filename: 'swiper.svelte',
  });
  swiperSlide = swiperSlideResult.js.code;
  fs.writeFileSync(`./${outputDir}/${format}/svelte/swiper-slide.js`, swiperSlide);

  try {
    fs.unlinkSync(`./${outputDir}/svelte/swiper-slide.svelte`);
    fs.unlinkSync(`./${outputDir}/svelte/swiper.svelte`);
  } catch (err) {
    // no files
  }

  if (cb) cb();
}

function build() {
  buildSvelte('esm', () => {});
  buildSvelte('cjs', () => {});
}
module.exports = build;
