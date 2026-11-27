/**
 * Consumer type-resolution test.
 *
 * Simulates a real downstream project importing the PUBLISHED package by its
 * public subpath names (`swiper`, `swiper/modules`, `swiper/react`,
 * `swiper/vue`, `swiper/element`, `swiper/types`, ...) and type-checks the
 * fixtures under every `moduleResolution` mode that real users run:
 *
 *   - classic `node` (node10)  — legacy; reads `typings` + `typesVersions`
 *   - `node16` / `nodenext`    — modern Node ESM; reads the `exports` map
 *   - `bundler`                — Vite / webpack / esbuild; reads `exports`
 *
 * Faithfulness comes from resolving `swiper` to the actual build output: a
 * local `node_modules/swiper` symlink points at `dist/` (which IS the published
 * package root — `npm publish` runs from `dist/`). React / Vue / @types/react
 * resolve by walking up to the repo's own `node_modules`. This exercises the
 * real TypeScript resolver against the real `exports` / `typesVersions` tables,
 * unlike importing `../../dist/...` paths directly.
 *
 * Requires `dist/` to be built first (the `test` script runs `build:prod`).
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const here = path.dirname(url.fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..', '..');
const distDir = path.join(repoRoot, 'dist');
const tscBin = path.join(repoRoot, 'node_modules', '.bin', 'tsc');

const MODES = [
  { name: 'classic node', config: 'tsconfig.classic-node.json' },
  { name: 'node16', config: 'tsconfig.node16.json' },
  { name: 'bundler', config: 'tsconfig.bundler.json' },
];

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

// 1. The build output must exist — it is the package under test.
if (!fs.existsSync(path.join(distDir, 'package.json'))) {
  fail('dist/ is not built. Run `npm run build` (or `npm test`) first.');
}

// 2. Link `node_modules/swiper` -> dist so subpath imports resolve exactly as
//    they would in a consumer project. Relative target keeps it portable.
const localModules = path.join(here, 'node_modules');
const link = path.join(localModules, 'swiper');
const relTarget = path.relative(localModules, distDir); // ../../../dist
fs.mkdirSync(localModules, { recursive: true });
try {
  if (fs.lstatSync(link).isSymbolicLink()) {
    if (fs.readlinkSync(link) !== relTarget) {
      fs.unlinkSync(link);
      fs.symlinkSync(relTarget, link, 'dir');
    }
  } else {
    fs.rmSync(link, { recursive: true, force: true });
    fs.symlinkSync(relTarget, link, 'dir');
  }
} catch {
  fs.symlinkSync(relTarget, link, 'dir');
}

// 3. Type-check the fixtures under each resolution mode.
console.log('\nConsumer type-resolution test — checking `swiper/*` imports under');
console.log('each moduleResolution mode against the built dist/.\n');

const results = [];
for (const mode of MODES) {
  const configPath = path.join(here, mode.config);
  const proc = spawnSync(tscBin, ['--noEmit', '-p', configPath], {
    cwd: here,
    encoding: 'utf8',
  });
  const output = `${proc.stdout || ''}${proc.stderr || ''}`.trim();
  const passed = proc.status === 0 && output === '';
  results.push({ mode: mode.name, passed, output });
  console.log(`  ${passed ? '✓ PASS' : '✗ FAIL'}  ${mode.name.padEnd(12)} (${mode.config})`);
  if (!passed && output) {
    console.log(
      output
        .split('\n')
        .map((l) => `         ${l}`)
        .join('\n'),
    );
  }
}

const failed = results.filter((r) => !r.passed);
if (failed.length) {
  fail(
    `${failed.length}/${results.length} resolution mode(s) failed: ` +
      failed.map((r) => r.mode).join(', '),
  );
}
console.log(`\n✓ All ${results.length} resolution modes type-check cleanly.\n`);
