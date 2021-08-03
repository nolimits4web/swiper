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
  coreContent += `export { default as Swiper, default } from './core/core-class';\n`;
  coreContent += components
    .map(
      (component) =>
        `export { default as ${component.capitalized} } from './modules/${component.name}/${component.name}';`,
    )
    .join('\n');

  coreContent = `${banner}\n${coreContent}`;

  fs.writeFileSync(`./${outputDir}/${filename}.js`, coreContent);

  // Babel
  const ignore = [
    '"src/react/**/*.js"',
    '"src/*-react.js"',
    '"src/swiper-react.js"',
    '"src/vue/**/*.js"',
    '"src/*-vue.js"',
    '"src/swiper-vue.js"',
    '"src/svelte/**/*.js"',
    '"src/*-svelte.js"',
    '"src/swiper-svelte.js"',
  ];
  await exec.promise(
    `npx cross-env npx babel src --out-dir ${outputDir}/esm --ignore ${ignore.join(',')}`,
  );

  // Remove unused dirs
  const dirsToRemove = ['less'];
  const filesToRemove = ['swiper.js'];
  dirsToRemove.forEach((dir) => {
    fs.rmdirSync(`./${outputDir}/esm/${dir}`, { recursive: true });
  });
  filesToRemove.forEach((file) => {
    fs.unlinkSync(`./${outputDir}/esm/${file}`);
  });

  // Fix import paths
  let fileContent = fs.readFileSync(`./${outputDir}/${filename}.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\('\.\//g, `require('./esm/`)
    .replace(/from '\.\//g, `from './esm/`);
  fs.writeFileSync(`./${outputDir}/${filename}.js`, fileContent);
}

async function build() {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';
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

  // build components
  components.forEach(({ name }) => {
    fs.mkdirSync(`./${outputDir}/modules/${name}`, { recursive: true });
    const pkg = JSON.stringify(
      {
        name: `swiper/${name}`,
        private: true,
        sideEffects: false,
        main: `../../cjs/modules/${name}/${name}.js`,
        module: `../../esm/modules/${name}/${name}.js`,
      },
      '',
      2,
    );
    fs.writeFileSync(`./${outputDir}/modules/${name}/package.json`, pkg);
  });
}

module.exports = build;
