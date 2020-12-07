/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = require('exec-sh');
const path = require('path');
const fs = require('fs');
const glob = require('glob');

module.exports = async () => {
  await exec.promise(`ng build swiper --prod`);

  glob('*.ts', { cwd: path.resolve(__dirname, '../package/angular') }, (err, files) => {
    files.forEach((file) => {
      const filePath = path.resolve(__dirname, `../package/angular/${file}`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      fs.writeFileSync(filePath, fileContent.replace(/from '\.\.\/\.\.\//g, `from '../`));
    });
  });
};
