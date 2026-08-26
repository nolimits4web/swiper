// Verifies the `swiperDevMode` compile-time flag (see src/shared/utils.ts and the
// showWarning() call sites in src/core/loop/loopCreate.ts and loopFix.ts) is actually
// dead-code-eliminable: bundling dist/swiper-bundle.mjs through esbuild with
// `define: { swiperDevMode: 'false' }` + minification must strip the loop-warning
// string literals from the output entirely, while a build without the define keeps them.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import * as esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');
const entry = path.join(distDir, 'swiper-bundle.mjs');

if (!fs.existsSync(entry)) {
  console.error('dist/swiper-bundle.mjs missing — run `npm run build:prod` first.');
  process.exit(1);
}

// One fragment per showWarning() call site, so a regression in any single guard is caught.
const WARNING_FRAGMENTS = [
  'is not even to slidesPerGroup',
  'is not even to grid.rows',
  'is not enough for loop mode',
  'is not compatible with grid.fill',
];

async function bundle({ define } = {}) {
  const result = await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    minify: true,
    write: false,
    format: 'esm',
    define,
  });
  return result.outputFiles[0].text;
}

let failed = 0;
let passed = 0;
async function check(label, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  }
}

console.log('\nswiperDevMode esbuild dead-code-elimination test\n');

const withoutDefine = await bundle();
const withDefineFalse = await bundle({ define: { swiperDevMode: 'false' } });

await check('sanity: bundle without define is non-trivial and defines Swiper', () => {
  assert.ok(withoutDefine.length > 1000, 'bundle output looks too small to be real');
  assert.match(withoutDefine, /Swiper/, 'bundle should still reference Swiper');
});

for (const fragment of WARNING_FRAGMENTS) {
  await check(`without define: bundle keeps "${fragment}"`, () => {
    assert.ok(
      withoutDefine.includes(fragment),
      `expected default build to retain warning fragment ${JSON.stringify(fragment)}`,
    );
  });

  await check(`swiperDevMode: false: bundle strips "${fragment}"`, () => {
    assert.ok(
      !withDefineFalse.includes(fragment),
      `expected swiperDevMode: false build to eliminate warning fragment ${JSON.stringify(fragment)}, but it was still present`,
    );
  });
}

await check('swiperDevMode: false: bundle is smaller than the default build', () => {
  assert.ok(
    withDefineFalse.length < withoutDefine.length,
    `expected DCE build (${withDefineFalse.length} bytes) to be smaller than default build (${withoutDefine.length} bytes)`,
  );
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
