/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const bannerVue = require('./banner')('Vue');

module.exports = async (outputDir) => {
  // Babel
  await exec(
    `npx babel --config-file ./scripts/babel/babel.config.vue.js src/vue --out-dir ${outputDir}/vue`,
  );

  // Fix import paths
  let fileContent = await fs.readFile(`./${outputDir}/vue/swiper-vue.js`, 'utf-8');
  fileContent = `${bannerVue}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/vue/swiper-vue.js`, fileContent);
};
