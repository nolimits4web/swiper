/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const less = require('less');
const path = require('path');

module.exports = (content, resolvePath = path.resolve(__dirname, '../../src/core')) => new Promise((resolve, reject) => {
  less.render(content, { paths: [resolvePath] })
    .then((result) => {
      resolve(result.css);
    })
    .catch((err) => {
      reject(err);
      throw err;
    });
});
