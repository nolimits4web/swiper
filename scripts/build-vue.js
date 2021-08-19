/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const { outputDir } = require('./utils/output-dir');
const bannerVue = require('./banner')('Vue');

module.exports = async () => {
  // Babel
  await exec(`npx swc src/vue --out-dir ${outputDir}/vue`);

  // Fix import paths
  let fileContent = await fs.readFile(`./${outputDir}/vue/swiper-vue.js`, 'utf-8');
  fileContent = `${bannerVue}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/vue/swiper-vue.js`, fileContent);
};
