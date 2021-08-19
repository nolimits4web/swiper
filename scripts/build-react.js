/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh').promise;
const { outputDir } = require('./utils/output-dir');
const { addBannerToFile } = require('./utils/banner');

async function buildReact() {
  await exec(
    `npx babel --config-file ./scripts/babel/babel.config.react.js src/react --out-dir ${outputDir}/react`,
  );
  await addBannerToFile(`./${outputDir}/react/swiper-react.js`, 'React');
}

module.exports = buildReact;
