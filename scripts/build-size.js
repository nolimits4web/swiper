const buildJsBundle = require('./build-js-bundle');
const outputCheckSize = require('./check-size');

(async () => {
  process.env.NODE_ENV = 'production';
  const first = outputCheckSize();
  await buildJsBundle();
  const second = outputCheckSize();

  const difference = second - first;
  console.log(`difference: ${difference > 0 ? `+${difference}` : difference} bytes`);
})();
