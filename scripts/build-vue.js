/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs');
const bannerVue = require('./banner-vue.js');

async function buildVue(format, cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';
  // Babel
  await exec.promise(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.vue.js src/vue --out-dir ${outputDir}/${format}/vue`,
  );
  await exec.promise(
    `cross-env MODULES=${format} npx babel --config-file ./babel.config.vue.js src/swiper-vue.js --out-file ${outputDir}/swiper-vue.${format}.js`,
  );

  // Fix import paths
  let fileContent = fs.readFileSync(`./${outputDir}/swiper-vue.${format}.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\(".\/vue\//g, `require("./${format}/vue/`)
    .replace(/from '.\/vue\//g, `from './${format}/vue/`);
  fileContent = `${bannerVue}\n${fileContent}`;
  fs.writeFileSync(`./${outputDir}/swiper-vue.${format}.js`, fileContent);

  if (cb) cb();
}

function build() {
  buildVue('esm', () => {});
  buildVue('cjs', () => {});
}
module.exports = build;
