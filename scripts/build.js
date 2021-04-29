const buildJsCore = require('./build-js-core');
const buildJsBundle = require('./build-js-bundle');
const buildTypes = require('./build-types');
const buildReact = require('./build-react');
const buildVue = require('./build-vue');
const buildSvelte = require('./build-svelte');
const buildStyles = require('./build-styles');
const buildAngular = require('./build-angular');
const outputCheckSize = require('./check-size');

const env = process.env.NODE_ENV || 'development';
const outputDir = env === 'development' ? 'build' : 'package';
class Build {
  constructor() {
    this.argv = process.argv.slice(2).map((v) => v.toLowerCase());
    this.size = this.argv.includes('--size');
    this.tasks = [];
    return this;
  }

  add(flag, buildFn) {
    if (!this.argv.includes('--only') || this.argv.includes(flag)) {
      this.tasks.push(buildFn);
    }
    return this;
  }

  addMultipleFormats(flag, buildFn) {
    return this.add(flag, async () =>
      Promise.all(['esm', 'cjs'].map((format) => buildFn(format, outputDir))),
    );
  }

  async run() {
    let start;
    let end;
    if (this.size) {
      start = outputCheckSize();
    }

    const res = await Promise.all(this.tasks.map((v) => v())).catch((err) => {
      console.error(err);
      process.exit(1);
    });
    if (this.size) {
      const sizeMessage = (value, label = '') =>
        `difference ${label}: ${value > 0 ? `+${value}` : value} bytes`;

      end = outputCheckSize();

      console.log(sizeMessage(start.size - start.size));
      console.log(sizeMessage(end.gzippedSize - end.gzippedSize, 'gzipped'));
    }
    return res;
  }
}

(async () => {
  await new Build()
    .add('core', buildJsCore)
    .add('bundle', buildJsBundle)
    .add('types', buildTypes)
    .addMultipleFormats('react', buildReact)
    .addMultipleFormats('vue', buildVue)
    .addMultipleFormats('svelte', buildSvelte)
    .add('angular', buildAngular)
    .add('styles', () => buildStyles(outputDir))
    .run();
})();
