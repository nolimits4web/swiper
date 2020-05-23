const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildStyles = require('./build-styles');

const build = () => {
  buildJsBundle();
  buildJsCore();
  buildStyles();
};

build();
