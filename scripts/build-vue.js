/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh').promise;
const { outputDir } = require('./utils/output-dir');
const { addBannerToFile } = require('./utils/banner');

async function buildVue() {
  await exec(`npx babel src/vue --out-dir ${outputDir}/vue`);
  await addBannerToFile(`./${outputDir}/vue/swiper-vue.js`, 'Vue');
}

module.exports = buildVue;
