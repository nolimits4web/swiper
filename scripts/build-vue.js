/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const bannerVue = require('./banner')('Vue');

module.exports = async (format, outputDir) => {
  // Babel
  await exec(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.vue.js src/vue --out-dir ${outputDir}/${format}/vue`,
  );
  await exec(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.vue.js src/swiper-vue.js --out-file ${outputDir}/swiper-vue.${format}.js`,
  );

  // Fix import paths
  let fileContent = await fs.readFile(`./${outputDir}/swiper-vue.${format}.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\(".\/vue\//g, `require("./${format}/vue/`)
    .replace(/from '.\/vue\//g, `from './${format}/vue/`);
  fileContent = `${bannerVue}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/swiper-vue.${format}.js`, fileContent);
};
