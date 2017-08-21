/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const gulp = require('gulp');
const fs = require('fs');
const modifyFile = require('gulp-modify-file');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const header = require('gulp-header');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');

const config = require('./config.js');
const banner = require('./banner.js');

function build(cb, buildTheme) {
  const env = process.env.NODE_ENV || 'development';

  gulp.src('./src/swiper.less')
    .pipe(less())
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(autoprefixer({
      cascade: false,
    }))
    .on('error', (err) => {
      if (cb) cb();
      console.log(err.toString());
    })
    .pipe(header(banner))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/css/`))
    .on('end', () => {
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
          return;
        });
    });
}

module.exports = build;
