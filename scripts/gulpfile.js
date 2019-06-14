/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
const fs = require('fs');
const path = require('path');

const buildJs = require('./build-js.js');
const buildLess = require('./build-less.js');

// Tasks
gulp.task('playground', (cb) => {
  const env = process.env.NODE_ENV || 'development';
  let content = fs.readFileSync(path.resolve(__dirname, '../playground/index.html'), 'utf8');
  if (env === 'development') {
    content = content
      .replace('../dist/css/swiper.min.css', '../build/css/swiper.css')
      .replace('../dist/js/swiper.min.js', '../build/js/swiper.js');
  } else {
    content = content
      .replace('../build/css/swiper.css', '../dist/css/swiper.min.css')
      .replace('../build/js/swiper.js', '../dist/js/swiper.min.js');
  }
  fs.writeFileSync(path.resolve(__dirname, '../playground/index.html'), content);
  if (cb) cb();
});
gulp.task('js', (cb) => {
  buildJs(cb);
});

gulp.task('less', (cb) => {
  buildLess(cb);
});

gulp.task('build', gulp.series(['js', 'less']));

gulp.task('watch', () => {
  gulp.watch('./src/**/**/*.js', gulp.series('js'));
  gulp.watch('./src/**/**/*.less', gulp.series('less'));
});

gulp.task('connect', () => {
  connect.server({
    root: ['./'],
    livereload: true,
    port: '3000',
  });
});

gulp.task('open', () => {
  gulp.src('./playground/index.html').pipe(gopen({ uri: 'http://localhost:3000/playground/' }));
});

gulp.task('server', gulp.parallel(['watch', 'connect', 'open']));

gulp.task('default', gulp.series('server'));
