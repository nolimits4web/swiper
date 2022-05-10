/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh').promise;
const { outputDir } = require('./utils/output-dir');
const { addBannerToFile } = require('./utils/banner');

async function buildSolid() {
  await exec(
    `npx babel --config-file ./scripts/babel/babel.config.solid.js src/solid --out-dir ${outputDir}/solid`,
  );
  await addBannerToFile(`./${outputDir}/solid/swiper-solid.js`, 'SolidJS');
}

module.exports = buildSolid;
