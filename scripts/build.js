const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildTypes = require('./build-types');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildSvelte = require('./build-svelte');
const buildStyles = require('./build-styles');
const buildAngular = require('./build-angular');

const build = () => {
  buildJsBundle();
  buildJsCore();
  buildTypes();
  buildReact();
  buildVue();
  buildSvelte();
  buildStyles();
  buildAngular();
};

build();
