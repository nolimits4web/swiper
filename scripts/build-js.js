/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */

const gulp = require('gulp');
const fs = require('fs');
const rollup = require('rollup-stream');
const buble = require('rollup-plugin-buble');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const config = require('./config.js');
const banner = require('./banner.js');

function es(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  rollup({
    entry: './src/swiper.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target), // or 'production'
      }),
      buble(),
    ],
    format: 'es',
    moduleName: 'Swiper',
    useStrict: true,
    sourceMap: false,
    banner,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.error(err.toString());
    })
    .pipe(source('swiper.js', './src'))
    .pipe(buffer())
    .pipe(header(banner))
    .pipe(rename('swiper.module.js'))
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/js/`))
    .on('end', () => {
      if (cb) cb();
    });
}
function umd(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  rollup({
    entry: './src/swiper.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.TARGET': JSON.stringify(target), // or 'production'
      }),
      resolve({ jsnext: true }),
      buble(),
    ],
    format: 'umd',
    moduleName: 'Swiper',
    useStrict: true,
    sourceMap: env === 'development',
    banner,
  })
    .on('error', (err) => {
      if (cb) cb();
      console.error(err.toString());
    })
    .pipe(source('swiper.js', './src'))
    .pipe(buffer())
    .pipe(gulp.dest(`./${env === 'development' ? 'build' : 'dist'}/js/`))
    .on('end', () => {
      if (env === 'development') {
        if (cb) cb();
        return;
      }
      // Minified version
      gulp.src('./dist/js/swiper.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(rename((filePath) => {
          /* eslint no-param-reassign: ["error", { "props": false }] */
          filePath.basename += '.min';
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'))
        .on('end', () => {
          cb();
        });
    });
}
function build(cb) {
  const env = process.env.NODE_ENV || 'development';

  const expectCbs = env === 'development' ? 1 : 2;
  let cbs = 0;

  umd(() => {
    cbs += 1;
    if (cbs === expectCbs) cb();
  });

  if (env === 'production') {
    es(() => {
      cbs += 1;
      if (cbs === expectCbs) cb();
    });
  }
}

module.exports = build;
