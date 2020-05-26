const fs = require('fs');
const path = require('path');
const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildStyles = require('./build-styles');

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
    } else if (fileName.includes('.js')) {
      console.log('Building JS');
      buildJsCore();
      buildJsBundle();
    }
  }, 100);
});
