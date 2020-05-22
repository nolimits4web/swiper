/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const CleanCSS = require('clean-css');

module.exports = (content, options = {}) => {
  // eslint-disable-next-line
  options = Object.assign(
    {
      compatibility: '*,-properties.zeroUnits',
    },
    options,
  );

  return new Promise((resolve, reject) => {
    if (content instanceof Promise) {
      content
        .then((c) => {
          const minified = new CleanCSS(options).minify(c);
          resolve(minified.styles);
        })
        .catch((err) => {
          reject(err);
          throw err;
        });
      return;
    }
    const minified = new CleanCSS(options).minify(content);
    resolve(minified.styles);
  });
};
