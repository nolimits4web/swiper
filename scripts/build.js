const chalk = require('chalk');
const fs = require('fs-extra');
const elapsed = require('elapsed-time-logger');

const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildTypes = require('./build-types');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildSvelte = require('./build-svelte');
const buildStyles = require('./build-styles');
const buildAngular = require('./build-angular');
const outputCheckSize = require('./check-size');
const { outputDir } = require('./utils/output-dir');

class Build {
  constructor() {
    this.argv = process.argv.slice(2).map((v) => v.toLowerCase());
    this.size = this.argv.includes('--size');
    this.tasks = [];
    return this;
  }

  add(flag, buildFn) {
    if (!this.argv.includes('--only') || this.argv.includes(flag)) {
      this.tasks.push(() => buildFn());
    }
    return this;
  }

  async run() {
    if (!this.argv.includes('--only')) {
      await fs.remove(`./${outputDir}`);
      await fs.ensureDir(`./${outputDir}`);
    }
    await fs.copy('./src/copy/', `./${outputDir}`);
    let start;
    let end;
    if (this.size) {
      start = outputCheckSize();
    }

    const res = await Promise.all(this.tasks.map((buildFn) => buildFn())).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    if (this.size) {
      const sizeMessage = (value, label = '') =>
        `difference ${label}: ${value > 0 ? chalk.red(`+${value}`) : chalk.green(value)} bytes`;

      end = outputCheckSize();

      console.log(sizeMessage(end.size - start.size));
      console.log(sizeMessage(end.gzippedSize - start.gzippedSize, 'gzipped'));
    }
    return res;
  }
}

(async () => {
  elapsed.start('build');
  const build = new Build();
  await build
    .add('types', buildTypes)
    .add('styles', buildStyles)
    .add('core', buildJsCore)
    .add('bundle', buildJsBundle)
    .add('react', buildReact)
    .add('vue', buildVue)
    .add('svelte', buildSvelte)
    .add('angular', buildAngular)
    .run();
  elapsed.end('build', chalk.bold.green('Build completed'));
})();
