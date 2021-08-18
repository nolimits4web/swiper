/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh').promise;
const fs = require('fs-extra');
const { outputDir } = require('./utils/output-dir');
const bannerReact = require('./banner')('React');

module.exports = async () => {
  // Babel
  await exec(
    `npx babel --config-file ./scripts/babel/babel.config.react.js src/react --out-dir ${outputDir}/react`,
  );

  // Fix import paths
  let fileContent = await fs.readFile(`./${outputDir}/react/swiper-react.js`, 'utf-8');
  fileContent = `${bannerReact}\n${fileContent}`;
  await fs.writeFile(`./${outputDir}/react/swiper-react.js`, fileContent);
};
