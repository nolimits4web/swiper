/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const path = require('path');
const glob = require('glob');
const fse = require('./utils/fs-extra.js');

async function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  glob('**/*.*', { cwd: path.resolve(__dirname, '../src') }, (err, files) => {
    files.forEach((file, index) => {
      if (file.indexOf('.d.ts') < 0) return;

      const fileContent = fse.readFileSync(path.resolve(__dirname, '../src', file));

      fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);

      if (index === files.length - 1) cb();
    });
  });
}

module.exports = build;
