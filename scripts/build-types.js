/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const path = require('path');
const glob = require('glob');
const globby = require('globby');
const elapsed = require('elapsed-time-logger');
const chalk = require('chalk');

const fs = require('fs');
const fse = require('./utils/fs-extra');
const { outputDir } = require('./utils/output-dir');

async function build(cb) {
  elapsed.start('types');
  let coreEventsReact = '';
  let coreEventsVue = '';
  let coreEventsSvelte = '';
  let modulesEventsReact = '';
  let modulesEventsVue = '';
  let modulesEventsSvelte = '';

  const replaceInstances = (content) => {
    return content
      .replace(/this: Swiper, /g, '')
      .replace(/this: Swiper/g, '')
      .replace(/swiper: Swiper/g, 'swiper: SwiperClass');
  };

  const getCoreEventsContent = () => {
    const coreEventsContent = fs
      .readFileSync(path.resolve(__dirname, '../src/types/swiper-events.d.ts'), 'utf-8')
      .split('// CORE_EVENTS_START')[1]
      .split('// CORE_EVENTS_END')[0];
    coreEventsReact = replaceInstances(
      coreEventsContent.replace(/ ([a-zA-Z]*): \(/g, (string, name) => {
        return ` on${name[0].toUpperCase()}${name.substr(1)}?: (`;
      }),
    );
    coreEventsVue = replaceInstances(
      coreEventsContent.replace(/ ([a-zA-Z_?]*): \(/g, (string, name) => {
        return ` ${name.replace('?', '')}: (`;
      }),
    );
    coreEventsSvelte = replaceInstances(
      coreEventsContent
        .replace(/ ([a-zA-Z_?]*): \(/g, (string, name) => {
          return ` ${name.replace('?', '')}: CustomEvent<[`;
        })
        .replace(/\) => void;/g, ']>;')
        .replace(/\) => any;/g, ']>;'),
    );
  };

  const getModulesEventsContent = async () => {
    const eventsFiles = await globby('src/types/modules/*.d.ts');
    eventsFiles.forEach((eventsFile) => {
      if (eventsFile.indexOf('public-api') > -1) {
        return;
      }
      const eventsContent = fs
        .readFileSync(eventsFile, 'utf-8')
        .split('Events {')[1]
        .split('}')[0]
        .trim();
      if (eventsContent.length) {
        modulesEventsReact += replaceInstances(
          eventsContent.replace(/ ([a-zA-Z]*): \(/g, (string, name) => {
            return ` on${name[0].toUpperCase()}${name.substr(1)}?: (`;
          }),
        );
        modulesEventsVue += replaceInstances(
          eventsContent.replace(/ ([a-zA-Z_?]*): \(/g, (string, name) => {
            return ` ${name.replace('?', '')}: (`;
          }),
        );
        modulesEventsSvelte += replaceInstances(
          eventsContent
            .replace(/ ([a-zA-Z_?]*): \(/g, (string, name) => {
              return ` ${name.replace('?', '')}: CustomEvent<[`;
            })
            .replace(/\) => void;/g, ']>;')
            .replace(/\) => any;/g, ']>;'),
        );
      }
    });
  };

  getCoreEventsContent();
  await getModulesEventsContent();

  glob('**/*.*', { cwd: path.resolve(__dirname, '../src') }, (err, files) => {
    files.forEach((file, index) => {
      if (file.indexOf('.d.ts') < 0) return;

      let fileContent = fse.readFileSync(path.resolve(__dirname, '../src', file));
      if (file.indexOf('swiper-react.d.ts') >= 0) {
        fileContent = fileContent.replace('// CORE_EVENTS', coreEventsReact);
        fileContent = fileContent.replace('// MODULES_EVENTS', modulesEventsReact);
        fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);
      } else if (file.indexOf('swiper-vue.d.ts') >= 0) {
        fileContent = fileContent.replace('// CORE_EVENTS', coreEventsVue);
        fileContent = fileContent.replace('// MODULES_EVENTS', modulesEventsVue);
        fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);
      } else if (file.indexOf('swiper-svelte.d.ts') >= 0) {
        fileContent = fileContent.replace('// CORE_EVENTS', coreEventsSvelte);
        fileContent = fileContent.replace('// MODULES_EVENTS', modulesEventsSvelte);
        fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);
      } else {
        fse.writeFileSync(path.resolve(__dirname, `../${outputDir}`, file), fileContent);
      }
      if (index === files.length - 1) cb();
    });
    elapsed.end('types', chalk.green('Types build completed!'));
  });
}

module.exports = build;
