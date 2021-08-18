/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs');
const { rollup } = require('rollup');
const { default: babel } = require('@rollup/plugin-babel');
const replace = require('@rollup/plugin-replace');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const Terser = require('terser');

const config = require('./build-config');
const { outputDir } = require('./utils/output-dir');
const banner = require('./banner')();
const isProd = require('./utils/isProd')();

async function buildBundle(modules, format, browser, cb) {
  const needSourceMap = isProd && (format === 'umd' || (format === 'esm' && browser));
  const external = format === 'umd' || browser ? [] : () => true;
  let filename = 'swiper-bundle';
  if (format !== 'umd') filename += `.${format}`;
  if (format === 'esm' && browser) filename += '.browser';

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
        '//EXPORT':
          format === 'umd' ? 'export default Swiper;' : 'export default Swiper; export { Swiper }',
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
        banner,
        file: `./${outputDir}/${filename}.js`,
      }),
    )
    .then(async (bundle) => {
      if (!isProd || !browser) {
        if (cb) cb();
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
          preamble: banner,
        },
      }).catch((err) => {
        console.error(`Terser failed on file ${filename}: ${err.toString()}`);
      });

      fs.writeFileSync(`./${outputDir}/${filename}.min.js`, code);
      fs.writeFileSync(`./${outputDir}/${filename}.min.js.map`, map);
      if (cb) cb();
    })
    .catch((err) => {
      if (cb) cb();
      console.error(err.toString());
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
  if (!isProd) {
    return Promise.all([
      buildBundle(modules, 'umd', true, () => {}),
      buildBundle(modules, 'esm', false, () => {}),
    ]);
  }
  return Promise.all([
    buildBundle(modules, 'umd', true, () => {}),
    buildBundle(modules, 'esm', false, () => {}),
    buildBundle(modules, 'esm', true, () => {}),
  ]);
}

module.exports = build;
