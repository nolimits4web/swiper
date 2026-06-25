import chalk from 'chalk';
import elapsed from 'elapsed-time-logger';
import fs from 'fs-extra';

import buildModules from './build-modules.js';
import buildStyles from './build-styles.js';
import buildTypes from './build-types.js';
import emitTypes from './emit-types.js';
import fixDtsExtensions from './fix-dts-extensions.js';
import isProd from './utils/isProd.js';
import { outputDir } from './utils/output-dir.js';

class Build {
  constructor() {
    this.tasks = [];
    return this;
  }

  add(flag, buildFn) {
    this.tasks.push(() => buildFn());
    return this;
  }

  async run() {
    if (isProd) {
      await fs.remove(`./${outputDir}`);
      await fs.ensureDir(`./${outputDir}`);
    }
    await fs.copy('./src/copy/', `./${outputDir}`);

    try {
      for (const buildFn of this.tasks) {
        await buildFn();
      }
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
    return true;
  }
}
(async () => {
  elapsed.start('build');
  const build = new Build();
  await build
    .add('emit-types', emitTypes)
    .add('modules', buildModules)
    .add('types', buildTypes)
    .add('styles', buildStyles)
    // Must come last: rewrites relative specifiers in every emitted/copied
    // `.d.ts` so node16/nodenext consumers resolve them (see script header).
    .add('fix-dts-extensions', fixDtsExtensions)
    .run();
  elapsed.end('build', chalk.bold.green('Build completed'));
})();
