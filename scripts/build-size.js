const buildJsBundle = require('./build-js-bundle');
const outputCheckSize = require('./check-size');

function output(value, label = '') {
  return `difference ${label}: ${value > 0 ? `+${value}` : value} bytes`;
}

(async () => {
  process.env.NODE_ENV = 'production';
  const first = outputCheckSize();
  await buildJsBundle();
  const second = outputCheckSize();

  console.log(output(second.size - first.size));
  console.log(output(second.gzippedSize - first.gzippedSize), 'gzipped');
})();
