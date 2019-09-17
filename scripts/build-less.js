/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const fs = require('fs');
const path = require('path');
const fse = require('./utils/fs-extra.js');
const less = require('./utils/less.js');
const autoprefixer = require('./utils/autoprefixer.js');
const cleanCSS = require('./utils/clean-css.js');
const banner = require('./banner.js');

const config = require('./build-config.js');

async function build(cb) {
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    const lessFilePath = `./src/components/${name}/${name}.less`;

    if (fs.existsSync(lessFilePath)) {
      components.push(name);
    }
  });

  const colors = [];

  Object.keys(config.colors).forEach((key) => {
    colors.push(`${key} ${config.colors[key]}`);
  });

  let lessContent = fs.readFileSync(path.resolve(__dirname, '../src/swiper.less'), 'utf8');
  lessContent = lessContent
    .replace('//IMPORT_COMPONENTS', components.map((component) => `@import url('./components/${component}/${component}.less');`).join('\n'))
    .replace('$themeColor', config.themeColor)
    .replace('$colors', colors.join(', '));

  let cssContent;
  try {
    cssContent = await autoprefixer(
      await less(lessContent, path.resolve(__dirname, '../src'))
    );
  } catch (err) {
    console.log(err);
  }

  // Write file
  fse.writeFileSync(`./${env === 'development' ? 'build' : 'package'}/css/swiper.css`, `${banner}\n${cssContent}`);

  if (env === 'development') {
    if (cb) cb();
    return;
  }

  // Minified
  const minifiedContent = await cleanCSS(cssContent);

  // Write file
  fse.writeFileSync(`./${env === 'development' ? 'build' : 'package'}/css/swiper.min.css`, `${banner}\n${minifiedContent}`);

  if (cb) cb();
}

module.exports = build;
