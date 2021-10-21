const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildTypes = require('./build-types');
const buildStyles = require('./build-styles');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildSvelte = require('./build-svelte');

console.log(chalk.cyan('Watching file changes ...'));

const watchFunction = async (fileName) => {
  if (fileName.includes('.less') || fileName.includes('.css') || fileName.includes('.scss')) {
    console.log('Building styles');
    await buildStyles();
    console.log('Building styles DONE');
    return;
  }
  if (fileName.includes('.d.ts')) {
    console.log('Building Types');
    await buildTypes();
    return;
  }

  if (fileName.includes('react')) {
    console.log('Building React');
    buildReact('build');
    return;
  }
  if (fileName.includes('vue')) {
    console.log('Building Vue');
    buildVue('build');
    return;
  }
  if (fileName.includes('svelte')) {
    console.log('Building Svelte');
    buildSvelte('build');
    return;
  }
  if (fileName.includes('.js')) {
    console.log('Building JS');
    buildJsCore();
    buildJsBundle();
    return;
  }
  console.log('something wrong...');
};

let watchTimeout;
fs.watch(path.resolve(__dirname, '../src'), { recursive: true }, (eventType, fileName) => {
  clearTimeout(watchTimeout);
  watchTimeout = setTimeout(() => {
    watchFunction(fileName);
  }, 100);
});
