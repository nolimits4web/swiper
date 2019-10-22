/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const connect = require('gulp-connect');
const gopen = require('gulp-open');
const fs = require('fs');
const path = require('path');

const buildJs = require('./build-js.js');
const buildStyles = require('./build-styles.js');

// Tasks
gulp.task('playground', (cb) => {
  const env = process.env.NODE_ENV || 'development';
  let content = fs.readFileSync(path.resolve(__dirname, '../playground/index.html'), 'utf8');
  if (env === 'development') {
    content = content
      .replace('../package/css/swiper.min.css', '../build/css/swiper.css')
      .replace('../package/js/swiper.min.js', '../build/js/swiper.js');
  } else {
    content = content
      .replace('../build/css/swiper.css', '../package/css/swiper.min.css')
      .replace('../build/js/swiper.js', '../package/js/swiper.min.js');
  }
  fs.writeFileSync(path.resolve(__dirname, '../playground/index.html'), content);
  if (cb) cb();
});
gulp.task('js', (cb) => {
  buildJs(cb);
});

gulp.task('styles', (cb) => {
  buildStyles(cb);
});


// in prod builds, copy /src folder into /package
gulp.task('prod-source-copy', (cb) => {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    gulp.src(['./src/**/*']).pipe(gulp.dest('./package/src/'));
  }
  if (cb) cb();
});

// in prod builds, adjust sourcemap paths to actual src location
gulp.task('prod-source-sourcemap-fix-paths', (cb) => {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    const jsDir = path.resolve(__dirname, '../package/js/');
    const mapFiles = fs
      .readdirSync(jsDir)
      .filter((file) => file.toLowerCase().endsWith('.map'));
    mapFiles.forEach((mapFile) => {
      const mapFilePath = path.resolve(jsDir, mapFile);
      let content = fs.readFileSync(mapFilePath, 'utf8');
      content = content
        .replace(/"\.\.\/\.\.\//g, '"../')
        .replace(/"\.\.\/node_modules\//g, '"~/');
      fs.writeFileSync(mapFilePath, content);
    });
  }
  if (cb) cb();
});

gulp.task('build', gulp.series(['js', 'styles', 'prod-source-copy', 'prod-source-sourcemap-fix-paths']));

gulp.task('watch', () => {
  gulp.watch('./src/**/**/*.js', gulp.series('js'));
  gulp.watch('./src/**/**/*.less', gulp.series('styles'));
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
