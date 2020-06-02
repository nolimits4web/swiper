const fs = require('fs');
const path = require('path');
const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildTypes = require('./build-types');
const buildStyles = require('./build-styles');
const buildReact = require('./build-react');

console.log('Watching file changes ...');

let watchTimeout;
fs.watch(path.resolve(__dirname, '../src'), { recursive: true }, (eventType, fileName) => {
  clearTimeout(watchTimeout);
  watchTimeout = setTimeout(() => {
    if (fileName.includes('.less') || fileName.includes('.css') || fileName.includes('.scss')) {
      console.log('Building styles');
      buildStyles(() => {
        console.log('Building styles DONE');
      });
    } else if (fileName.includes('.d.ts')) {
      console.log('Building Types');
      buildTypes();
    } else if (fileName.includes('react')) {
      console.log('Building React');
      buildReact();
    } else if (fileName.includes('.js')) {
      console.log('Building JS');
      buildJsCore();
      buildJsBundle();
    }
  }, 100);
});
