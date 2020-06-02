const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildTypes = require('./build-types');
const buildReact = require('./build-react');
const buildStyles = require('./build-styles');

const build = () => {
  buildJsBundle();
  buildJsCore();
  buildTypes();
  buildReact();
  buildStyles();
};

build();
