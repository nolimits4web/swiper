/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
// const path = require('path');
// const fs = require('fs');
// const glob = require('glob');

module.exports = async () => {
  // const env = process.env.NODE_ENV || 'development';
  // const outputDir = env === 'development' ? 'build' : 'package';
  // console.log(outputDir);
  await exec.promise(`ng build swiper --prod`).catch((err) => console.error(err));
};
