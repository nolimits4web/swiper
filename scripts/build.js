const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildReact = require('./build-react');
const buildStyles = require('./build-styles');

const build = () => {
  buildJsBundle();
  buildJsCore();
  buildReact();
  buildStyles();
};

build();
