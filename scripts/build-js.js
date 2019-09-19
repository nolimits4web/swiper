/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const Terser = require('terser');

const config = require('./build-config.js');
const banner = require('./banner.js');

function es(components, cb) {
  const env = process.env.NODE_ENV || 'development';

  // Bundle
  rollup.rollup({
    input: './src/swiper.js',
    external: ['dom7/dist/dom7.modular', 'ssr-window'],
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        '//IMPORT_COMPONENTS': components.map((component) => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map((component) => `${component.capitalized}`).join(',\n  '),
        '//EXPORT': 'export default Swiper',
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
    ],
  }).then((bundle) => bundle.write({
    format: 'es',
    name: 'Swiper',
    strict: true,
    sourcemap: env === 'development',
    sourcemapFile: `./${env === 'development' ? 'build' : 'package'}/js/swiper.esm.bundle.js.map`,
    banner,
    file: `./${env === 'development' ? 'build' : 'package'}/js/swiper.esm.bundle.js`,
  })).then(() => {
    if (cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.error(err.toString());
  });

  // Browser Bundle
  rollup.rollup({
    input: './src/swiper.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        '//IMPORT_COMPONENTS': components.map((component) => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map((component) => `${component.capitalized}`).join(',\n  '),
        '//EXPORT': 'export default Swiper',
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
    ],
  }).then((bundle) => bundle.write({
    format: 'es',
    name: 'Swiper',
    strict: true,
    sourcemap: env === 'development',
    sourcemapFile: `./${env === 'development' ? 'build' : 'package'}/js/swiper.esm.browser.bundle.js.map`,
    banner,
    file: `./${env === 'development' ? 'build' : 'package'}/js/swiper.esm.browser.bundle.js`,
  })).then(() => {
    if (cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.error(err.toString());
  });

  // Modular
  rollup.rollup({
    input: './src/swiper.js',
    external: ['dom7/dist/dom7.modular', 'ssr-window'],
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        '//IMPORT_COMPONENTS': components.map((component) => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': '',
        '//EXPORT': `export { Swiper, ${components.map((component) => component.capitalized).join(', ')} }`,
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
    ],
  }).then((bundle) => bundle.write({
    format: 'es',
    name: 'Swiper',
    strict: true,
    banner,
    sourcemap: env === 'development',
    sourcemapFile: `./${env === 'development' ? 'build' : 'package'}/js/swiper.esm.js.map`,
    file: `./${env === 'development' ? 'build' : 'package'}/js/swiper.esm.js`,
  })).then(() => {
    if (cb) cb();
  }).catch((err) => {
    if (cb) cb();
    console.error(err.toString());
  });
}
function umd(components, cb) {
  const env = process.env.NODE_ENV || 'development';

  rollup.rollup({
    input: './src/swiper.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        '//IMPORT_COMPONENTS': components.map((component) => `import ${component.capitalized} from './components/${component.name}/${component.name}';`).join('\n'),
        '//INSTALL_COMPONENTS': components.map((component) => `${component.capitalized}`).join(',\n  '),
        '//EXPORT': 'export default Swiper;',
      }),
      resolve({ mainFields: ['module', 'main', 'jsnext'] }),
      buble(),
    ],
  }).then((bundle) => bundle.write({
    format: 'umd',
    name: 'Swiper',
    strict: true,
    sourcemap: env === 'development',
    sourcemapFile: `./${env === 'development' ? 'build' : 'package'}/js/swiper.js.map`,
    banner,
    file: `./${env === 'development' ? 'build' : 'package'}/js/swiper.js`,
  })).then((bundle) => {
    if (env === 'development') {
      if (cb) cb();
      return;
    }
    const result = bundle.output[0];
    const minified = Terser.minify(result.code, {
      sourceMap: {
        content: env === 'development' ? result.map : undefined,
        filename: env === 'development' ? undefined : 'swiper.min.js',
        url: 'swiper.min.js.map',
      },
      output: {
        preamble: banner,
      },
    });

    fs.writeFileSync('./package/js/swiper.min.js', minified.code);
    fs.writeFileSync('./package/js/swiper.min.js.map', minified.map);

    cb();
  }).catch((err) => {
    if (cb) cb();
    console.error(err.toString());
  });
}
function build(cb) {
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    // eslint-disable-next-line
    const capitalized = name.split('-').map((word) => {
      return word.split('').map((char, index) => {
        if (index === 0) return char.toUpperCase();
        return char;
      }).join('');
    }).join('');
    const jsFilePath = `./src/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      components.push({ name, capitalized });
    }
  });

  const expectCbs = env === 'development' ? 1 : 2;
  let cbs = 0;

  umd(components, () => {
    cbs += 1;
    if (cbs === expectCbs) cb();
  });
  if (env !== 'development') {
    es(components, () => {
      cbs += 1;
      if (cbs === expectCbs) cb();
    });
  }
}

module.exports = build;
