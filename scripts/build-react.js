/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const { promise: exec } = require('exec-sh');
const fs = require('fs-extra');
const bannerReact = require('./banner')('React');

module.exports = async (outputDir) => {
  // Babel
  await exec(
    `cross-env npx babel --config-file ./babel.config.react.js src/react --out-dir ${outputDir}/esm/react`,
  );
  await exec(
    `cross-env npx babel --config-file ./babel.config.react.js src/swiper-react.js --out-file ${outputDir}/swiper-react.esm.js`,
  );

  // Fix import paths
  let fileContent = await fs.readFile(`./${outputDir}/swiper-react.esm.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\(".\/react\//g, `require("./esm/react/`)
    .replace(/from '.\/react\//g, `from './esm/react/`);
  fileContent = `${bannerReact}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/swiper-react.esm.js`, fileContent);
};
