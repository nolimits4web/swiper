/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh').promise;

module.exports = async () => {
  return exec(`ng build swiper --configuration production`);
};
