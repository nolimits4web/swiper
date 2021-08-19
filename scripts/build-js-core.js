/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh').promise;
const fs = require('fs');

const config = require('./build-config');
const { outputDir } = require('./utils/output-dir');
const banner = require('./banner')();

async function buildCore(modules) {
  const filename = `swiper.esm`;
  let coreContent = '';
  coreContent += `export { default as Swiper, default } from './core/core.js';\n`;
  coreContent += modules
    .map(
      (mod) =>
        `export { default as ${mod.capitalized} } from './modules/${mod.name}/${mod.name}.js';`,
    )
    .join('\n');

  coreContent = `${banner}\n${coreContent}`;

  fs.writeFileSync(`./${outputDir}/${filename}.js`, coreContent);

  // Babel
  const ignore = [
    '"src/angular/**/*.js"',
    '"src/react/**/*.js"',
    '"src/*-react.js"',
    '"src/vue/**/*.js"',
    '"src/*-vue.js"',
    '"src/svelte/**/*.js"',
    '"src/*-svelte.js"',
  ];
  await exec(`npx swc src --out-dir ${outputDir} --ignore ${ignore.join(',')}`);

  // Remove unused dirs
  const dirsToRemove = ['less'];
  const filesToRemove = ['swiper.js'];
  dirsToRemove.forEach((dir) => {
    fs.rmdirSync(`./${outputDir}/${dir}`, { recursive: true });
  });
  filesToRemove.forEach((file) => {
    fs.unlinkSync(`./${outputDir}/${file}`);
  });
}

async function build() {
  const modules = [];
  config.modules.forEach((name) => {
    // eslint-disable-next-line
    const capitalized = name
      .split('-')
      .map((word) => {
        return word
          .split('')
          .map((char, index) => {
            if (index === 0) return char.toUpperCase();
            return char;
          })
          .join('');
      })
      .join('');
    const jsFilePath = `./src/modules/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      modules.push({ name, capitalized });
    }
  });

  await buildCore(modules, 'esm');
}

module.exports = build;
