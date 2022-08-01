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
  let coreEventsSolid = '';
  let coreEventsVue = '';
  let coreEventsSvelte = '';
  let modulesEventsReact = '';
  let modulesEventsSolid = '';
  let modulesEventsVue = '';
  let modulesEventsSvelte = '';

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
    coreEventsReact = replaceInstances(
      coreEventsContent.replace(/ ([a-zA-Z]*): \(/g, (string, name) => {
        return ` on${name[0].toUpperCase()}${name.substr(1)}?: (`;
      }),
    );
    coreEventsSolid = replaceInstances(
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
    await Promise.all(
      eventsFiles.map(async (eventsFile) => {
        if (eventsFile.indexOf('public-api') > -1) {
          return;
        }
        let eventsContent = await fs.readFile(eventsFile, 'utf-8');
        eventsContent = eventsContent.split('Events {')[1].split('}')[0].trim();
        if (eventsContent.length) {
          modulesEventsReact += replaceInstances(
            eventsContent.replace(/ ([a-zA-Z]*): \(/g, (string, name) => {
              return ` on${name[0].toUpperCase()}${name.substr(1)}?: (`;
            }),
          );
          modulesEventsSolid += replaceInstances(
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
      if (file.includes('swiper-react.d.ts')) {
        return processTypingFile(coreEventsReact, modulesEventsReact);
      }
      if (file.includes('swiper-solid.d.ts')) {
        return processTypingFile(coreEventsSolid, modulesEventsSolid);
      }
      if (file.includes('swiper-vue.d.ts')) {
        return processTypingFile(coreEventsVue, modulesEventsVue);
      }
      if (file.includes('swiper-svelte.d.ts')) {
        return processTypingFile(coreEventsSvelte, modulesEventsSvelte);
      }
      return fs.writeFile(destPath, fileContent);
    }),
  );
  elapsed.end('types', chalk.green('Types build completed!'));
}
