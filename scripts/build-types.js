/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const fse = require('./utils/fs-extra.js');

async function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const outputDir = env === 'development' ? 'build' : 'package';

  glob('**/*.*', { cwd: path.resolve(__dirname, '../src') }, (err, files) => {
    files.forEach((file, index) => {
      if (file.indexOf('.d.ts') < 0) return;

      let fileContent = fse.readFileSync(path.resolve(__dirname, '../src', file));
      if (file.indexOf('swiper-react.d.ts') >= 0) {
        const coreEventsContent = fs
          .readFileSync(path.resolve(__dirname, '../src/types/swiper-events.d.ts'), 'utf-8')
          .split('// CORE_EVENTS_START')[1]
          .split('// CORE_EVENTS_END')[0]
          .replace(/ ([a-zA-Z]*): \(/g, (string, name) => {
            return ` on${name[0].toUpperCase()}${name.substr(1)}?: (`;
          })
          .replace(/this: Swiper, /g, '')
          .replace(/this: Swiper/g, '')
          .replace(/swiper: Swiper/g, 'swiper: SwiperClass');
        fileContent = fileContent.replace('// CORE_EVENTS', coreEventsContent);

        let modulesEvents = '';
        glob('src/types/components/*.d.ts', (err, eventsFiles) => {
          eventsFiles.forEach((eventsFile) => {
            let eventsContent = fs
              .readFileSync(eventsFile, 'utf-8')
              .split('Events {')[1]
              .split('}')[0]
              .trim();
            if (eventsContent.length) {
              eventsContent = eventsContent
                .replace(/ ([a-zA-Z]*): \(/g, (string, name) => {
                  return ` on${name[0].toUpperCase()}${name.substr(1)}?: (`;
                })
                .replace(/this: Swiper, /g, '')
                .replace(/this: Swiper/g, '')
                .replace(/swiper: Swiper/g, 'swiper: SwiperClass');
              modulesEvents += eventsContent;
            }
          });
          fileContent = fileContent.replace('// MODULES_EVENTS', modulesEvents);
          fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);
          if (index === files.length - 1) cb();
        });
      } else {
        fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);
        if (index === files.length - 1) cb();
      }
    });
  });
}

module.exports = build;
