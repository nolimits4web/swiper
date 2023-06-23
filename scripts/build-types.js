import path from 'path';
import { globby } from 'globby';
import elapsed from 'elapsed-time-logger';
import chalk from 'chalk';
import fs from 'fs-extra';
import * as url from 'url';
import { outputDir } from './utils/output-dir.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default async function buildTypes() {
  elapsed.start('types');
  let coreEventsReact = '';
  let coreEventsVue = '';
  let coreEventsElement = '';
  let modulesEventsReact = '';
  let modulesEventsVue = '';
  let modulesEventsElement = '';

  const replaceInstances = (content) => {
    return content
      .replace(/this: Swiper, /g, '')
      .replace(/this: Swiper/g, '')
      .replace(/swiper: Swiper/g, 'swiper: SwiperClass');
  };
  const getCoreEventsContent = async () => {
    let coreEventsContent = await fs.readFile(
      path.resolve(__dirname, '../src/types/swiper-events.d.ts'),
      'utf-8',
    );
    coreEventsContent = coreEventsContent
      .split('// CORE_EVENTS_START')[1]
      .split('// CORE_EVENTS_END')[0];
    coreEventsElement = coreEventsContent.replace(
      / ([a-zA-Z_?]*): ([^;]*);/g,
      (string, name, args) => {
        if (
          name.includes('_') ||
          name.toLowerCase() === 'classnames' ||
          name.toLowerCase() === 'index'
        ) {
          return '';
        }
        args = args
          .replace('(', '')
          .replace(')', '')
          .split('=>')[0]
          .replace('SwiperClass', 'Swiper')
          .trim();
        return ` ${name.toLowerCase()}: CustomEvent<[${args}]>;`;
      },
    );
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
  };
  const getModulesEventsContent = async () => {
    const eventsFiles = await globby('src/types/modules/*.d.ts');
    await Promise.all(
      eventsFiles.map(async (eventsFile) => {
        if (eventsFile.indexOf('public-api') > -1 || eventsFile.indexOf('index') > -1) {
          return;
        }
        let eventsContent = await fs.readFile(eventsFile, 'utf-8');
        eventsContent = eventsContent.split('Events {')[1].split('}')[0].trim();
        if (eventsContent.length) {
          modulesEventsElement += eventsContent.replace(
            / ([a-zA-Z]*): ([^;]*);/g,
            (string, name, args) => {
              args = args
                .replace('(', '')
                .replace(')', '')
                .split('=>')[0]
                .replace('SwiperClass', 'Swiper')
                .trim();
              return ` ${name.toLowerCase()}: CustomEvent<[${args}]>;`;
            },
          );
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
        }
      }),
    );
  };

  let files;
  await Promise.all([
    getCoreEventsContent(),
    getModulesEventsContent(),
    (async () => {
      files = await globby('**/*.d.ts', { cwd: path.resolve(__dirname, '../src') });
    })(),
  ]);

  await Promise.all(
    files.map(async (file) => {
      const fileContent = await fs.readFile(path.resolve(__dirname, '../src', file), 'utf-8');
      const destPath = path.resolve(__dirname, `../${outputDir}`, file);
      await fs.ensureDir(path.dirname(destPath));
      const processTypingFile = async (eventsCode, modulesCode) => {
        const content = fileContent
          .replace('// MODULES_EVENTS', eventsCode)
          .replace('// CORE_EVENTS', modulesCode);
        return fs.writeFile(destPath, content);
      };
      if (file.includes('swiper-element.d.ts')) {
        return processTypingFile(coreEventsElement, modulesEventsElement);
      }
      if (file.includes('swiper-react.d.ts')) {
        return processTypingFile(coreEventsReact, modulesEventsReact);
      }
      if (file.includes('swiper-vue.d.ts')) {
        return processTypingFile(coreEventsVue, modulesEventsVue);
      }
      return fs.writeFile(destPath, fileContent);
    }),
  );
  elapsed.end('types', chalk.green('Types build completed!'));
}
