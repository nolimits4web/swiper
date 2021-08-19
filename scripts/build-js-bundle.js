/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs-extra');
const chalk = require('chalk');
const elapsed = require('elapsed-time-logger');
const { rollup } = require('rollup');
const { default: babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const Terser = require('terser');

const config = require('./build-config');
const { outputDir } = require('./utils/output-dir');
const { banner } = require('./utils/banner');
const isProd = require('./utils/isProd')();

async function buildEntry(modules, format, browser = false) {
  const isUMD = format === 'umd';
  const isESM = format === 'esm';
  if (isUMD) browser = true;
  const needSourceMap = isProd && (isUMD || (isESM && browser));
  const external = isUMD || browser ? [] : () => true;
  let filename = 'swiper-bundle';
  if (isESM) filename += `.esm`;
  if (isESM && browser) filename += '.browser';

  return rollup({
    input: './src/swiper.js',
    external,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        '//IMPORT_MODULES': modules
          .map((mod) => `import ${mod.capitalized} from './modules/${mod.name}/${mod.name}.js';`)
          .join('\n'),
        '//INSTALL_MODULES': modules.map((mod) => `${mod.capitalized}`).join(',\n  '),
        '//EXPORT': isUMD ? 'export default Swiper;' : 'export default Swiper; export { Swiper }',
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      babel({ babelHelpers: 'bundled' }),
    ],
    onwarn() {},
  })
    .then((bundle) =>
      bundle.write({
        format,
        name: 'Swiper',
        strict: true,
        sourcemap: needSourceMap,
        sourcemapFile: `./${outputDir}/${filename}.js.map`,
        banner: banner(),
        file: `./${outputDir}/${filename}.js`,
      }),
    )
    .then(async (bundle) => {
      if (!isProd || !browser) {
        return;
      }
      const result = bundle.output[0];
      const { code, map } = await Terser.minify(result.code, {
        sourceMap: {
          content: needSourceMap ? result.map : undefined,
          filename: needSourceMap ? `${filename}.min.js` : undefined,
          url: `${filename}.min.js.map`,
        },
        output: {
          preamble: banner(),
        },
      }).catch((err) => {
        console.error(`Terser failed on file ${filename}: ${err.toString()}`);
      });

      await fs.writeFile(`./${outputDir}/${filename}.min.js`, code);
      await fs.writeFile(`./${outputDir}/${filename}.min.js.map`, map);
    })
    .then(async () => {
      if (isProd && isESM && browser === false) return buildEntry(modules, format, true);
      return true;
    })
    .catch((err) => {
      console.error('Rollup error:', err.stack);
    });
}

async function buildJsBundle() {
  elapsed.start('bundle');
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
  return Promise.all([buildEntry(modules, 'umd'), buildEntry(modules, 'esm')]).then(() => {
    elapsed.end('bundle', chalk.green('\nBundle build completed!'));
  });
}

module.exports = buildJsBundle;
