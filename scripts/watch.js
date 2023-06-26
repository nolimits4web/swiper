import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import * as url from 'url';
import buildTypes from './build-types.js';
import buildStyles from './build-styles.js';
import buildModules from './build-modules.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
console.log(chalk.cyan('Watching file changes ...'));
const watchFunction = async (fileName) => {
  if (fileName.includes('swiper-element-bundle.mjs')) return;
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
  if (fileName.includes('.mjs') || fileName.includes('.js')) {
    console.log('Building JS');
    await buildModules();
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
