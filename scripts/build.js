const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildTypes = require('./build-types');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildSvelte = require('./build-svelte');
const buildStyles = require('./build-styles');
const buildAngular = require('./build-angular');

const formats = ['esm', 'cjs'];
(async () => {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';
  return Promise.all([
    buildJsBundle(),
    buildJsCore(),
    buildTypes(),
    Promise.all(formats.map((format) => buildReact(format, outputDir))),
    Promise.all(formats.map((format) => buildVue(format, outputDir))),
    Promise.all(formats.map((format) => buildSvelte(format, outputDir))),
    buildStyles(outputDir),
    buildAngular(),
  ]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
})();
