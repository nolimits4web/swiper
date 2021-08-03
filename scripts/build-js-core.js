/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs');

const config = require('./build-config');
const banner = require('./banner')();

async function buildCore(components) {
  const env = process.env.NODE_ENV || 'development';
  const filename = `swiper.esm`;
  const outputDir = env === 'development' ? 'build' : 'package';
  let coreContent = '';
  coreContent += `export { default as Swiper, default } from './core/core-class.js';\n`;
  coreContent += components
    .map(
      (component) =>
        `export { default as ${component.capitalized} } from './modules/${component.name}/${component.name}.js';`,
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
  await exec.promise(
    `npx cross-env npx babel src --out-dir ${outputDir} --ignore ${ignore.join(',')}`,
  );

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
  const components = [];
  config.components.forEach((name) => {
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
      components.push({ name, capitalized });
    }
  });

  await buildCore(components, 'esm');
}

module.exports = build;
