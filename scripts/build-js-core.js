/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const fs = require('fs');
const { rollup } = require('rollup');
const { default: babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const { default: resolve } = require('@rollup/plugin-node-resolve');

const config = require('./build-config.js');
const banner = require('./banner.js');

async function buildCore(components, format, cb) {
  const env = process.env.NODE_ENV || 'development';
  const filename = `swiper.${format}`;
  const outputDir = env === 'development' ? 'build' : 'package';

  const bundle = await rollup({
    input: './src/swiper.js',
    external() {
      return true;
    },
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        '//IMPORT_COMPONENTS': components
          .map(
            (component) =>
              `import ${component.capitalized} from './components/${component.name}/${component.name}';`,
          )
          .join('\n'),
        '//INSTALL_COMPONENTS': '',
        '//EXPORT': `export default Swiper; export { Swiper, ${components
          .map((component) => component.capitalized)
          .join(', ')} }`,
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      babel({ babelHelpers: 'bundled' }),
    ],
    onwarn() {},
  });

  await bundle.write({
    format,
    name: 'Swiper',
    strict: true,
    sourcemap: env === 'production' && format === 'umd',
    sourcemapFile: `./${outputDir}/${filename}.js.map`,
    banner,
    file: `./${outputDir}/${filename}.js`,
  });

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
    `cross-env MODULES=${format} npx babel src --out-dir ${outputDir}/${format} --ignore ${ignore.join(
      ',',
    )}`,
  );

  // Remove unused dirs
  const dirsToRemove = ['less'];
  const filesToRemove = ['swiper.js'];
  dirsToRemove.forEach((dir) => {
    fs.rmdirSync(`./${outputDir}/${format}/${dir}`, { recursive: true });
  });
  filesToRemove.forEach((file) => {
    fs.unlinkSync(`./${outputDir}/${format}/${file}`);
  });

  // Fix import paths
  let fileContent = fs.readFileSync(`./${outputDir}/${filename}.js`, 'utf-8');
  fileContent = fileContent
    .replace(/require\('\.\//g, `require('./${format}/`)
    .replace(/from '\.\//g, `from './${format}/`);
  fs.writeFileSync(`./${outputDir}/${filename}.js`, fileContent);

  if (cb) cb();
}

function build() {
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
    const jsFilePath = `./src/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      components.push({ name, capitalized });
    }
  });

  buildCore(components, 'esm', () => {});
  buildCore(components, 'cjs', () => {});

  // build components
  components.forEach(({ name }) => {
    fs.mkdirSync(`./${outputDir}/components/${name}`, { recursive: true });
    const pkg = JSON.stringify(
      {
        name: `swiper/${name}`,
        private: true,
        sideEffects: false,
        main: `../../cjs/components/${name}/${name}.js`,
        module: `../../esm/components/${name}/${name}.js`,
      },
      '',
      2,
    );
    fs.writeFileSync(`./${outputDir}/components/${name}/package.json`, pkg);
  });
}

module.exports = build;
