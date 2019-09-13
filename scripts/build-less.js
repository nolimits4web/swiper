/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const gulp = require('gulp');
const fs = require('fs');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const header = require('gulp-header');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const path = require('path');

const config = require('./build-config.js');
const banner = require('./banner.js');


function build(cb) {
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
  fs.writeFileSync(path.resolve(__dirname, '../src/swiper-temp.less'), lessContent);

  gulp.src('./src/swiper-temp.less')
    .pipe(less({
      javascriptEnabled: true,
    }))
    .on('error', (err) => {
      if (cb) cb();
      console.error(err.toString());
    })
    .pipe(autoprefixer({
      cascade: false,
    }))
    .on('error', (err) => {
      if (cb) cb();
      console.error(err.toString());
    })
    .pipe(header(banner))
    .pipe(rename((filePath) => {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      filePath.basename = 'swiper';
    }))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/css/`))
    .on('end', () => {
      fs.unlinkSync(path.resolve(__dirname, '../src/swiper-temp.less'));
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      gulp.src('./dist/css/swiper.css')
        .pipe(cleanCSS({
          advanced: false,
          aggressiveMerging: false,
        }))
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(gulp.dest('./dist/css/'))
        .on('end', () => {
          if (cb) cb();
        });
    });
}

module.exports = build;
