import path from 'path';
import * as url from 'url';

import chalk from 'chalk';
import elapsed from 'elapsed-time-logger';
import fs from 'fs-extra';
import { globby } from 'globby';

import { outputDir } from './utils/output-dir.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Phase 6: tsc emits `.d.ts` for runtime modules + core + types/.
// This step only handles the three framework wrappers (whose hand-maintained
// `.d.ts` carry build-time substitution markers) and the CSS typing shims.
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
    // Core events live in src/types/events.ts (Phase 6 relocated this file
    // from src/swiper-events.d.ts).
    let coreEventsContent = await fs.readFile(
      path.resolve(__dirname, '../src/types/events.ts'),
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
    // Each module's `*Events` interface is now declared in the runtime
    // src/modules/<name>/<name>.ts. Read directly from source — emitted
    // dist files may not exist yet when this runs in watch mode.
    const eventsFiles = await globby('src/modules/*/*.ts');
    await Promise.all(
      eventsFiles.map(async (eventsFile) => {
        let eventsContent = await fs.readFile(eventsFile, 'utf-8');
        const split = eventsContent.split('Events {');
        if (split.length < 2) return;
        eventsContent = split[1].split('}')[0].trim();
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

  await Promise.all([getCoreEventsContent(), getModulesEventsContent()]);

  // Framework wrappers ship with substitution markers in their hand-maintained
  // src/.d.ts; everything else is emitted by tsc (see scripts/emit-types.js).
  const wrappers = [
    {
      src: 'swiper-element.d.ts',
      coreEvents: coreEventsElement,
      moduleEvents: modulesEventsElement,
    },
    { src: 'swiper-react.d.ts', coreEvents: coreEventsReact, moduleEvents: modulesEventsReact },
    { src: 'swiper-vue.d.ts', coreEvents: coreEventsVue, moduleEvents: modulesEventsVue },
  ];

  await Promise.all(
    wrappers.map(async ({ src, coreEvents, moduleEvents }) => {
      const content = await fs.readFile(path.resolve(__dirname, '../src', src), 'utf-8');
      const destPath = path.resolve(__dirname, `../${outputDir}`, src);
      await fs.ensureDir(path.dirname(destPath));
      await fs.writeFile(
        destPath,
        content.replace('// MODULES_EVENTS', coreEvents).replace('// CORE_EVENTS', moduleEvents),
      );
    }),
  );

  // CSS typing shims: package.json's exports map references `.css.d.ts` files
  // that don't have a corresponding `.ts` source — emit a one-line `export {};`
  // shim for each so user imports resolve.
  const packageJson = await fs.readJson(path.resolve(__dirname, `../${outputDir}/package.json`));
  const cssTypingFiles = new Set();
  Object.values(packageJson.exports).forEach((entry) => {
    if (
      entry &&
      typeof entry === 'object' &&
      typeof entry.default === 'string' &&
      entry.default.endsWith('.css') &&
      typeof entry.types === 'string'
    ) {
      cssTypingFiles.add(entry.types);
    }
  });
  await Promise.all(
    Array.from(cssTypingFiles).map(async (file) => {
      const destPath = path.resolve(__dirname, `../${outputDir}`, file);
      if (await fs.pathExists(destPath)) return;
      await fs.ensureDir(path.dirname(destPath));
      await fs.writeFile(destPath, 'export {};\n');
    }),
  );
  elapsed.end('types', chalk.green('Types build completed!'));
}
