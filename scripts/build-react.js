/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs');
const bannerReact = require('./banner-react.js');

async function buildReact(format, cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  // Babel
  await exec.promise(
    `MODULES=${format} npx babel --config-file ./babel.config.react.js src/react --out-dir ${outputDir}/${format}/react`,
  );
  await exec.promise(
    `MODULES=${format} npx babel --config-file ./babel.config.react.js src/swiper-react.js --out-file ${outputDir}/swiper-react.${format}.js`,
  );

  // Fix import paths
  let fileContent = fs.readFileSync(`./${outputDir}/swiper-react.${format}.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\(".\/react\//g, `require("./${format}/react/`)
    .replace(/from '.\/react\//g, `from './${format}/react/`);
  fileContent = `${bannerReact}\n${fileContent}`;
  fs.writeFileSync(`./${outputDir}/swiper-react.${format}.js`, fileContent);

  if (cb) cb();
}

function build() {
  buildReact('esm', () => {});
  buildReact('cjs', () => {});
}
module.exports = build;
