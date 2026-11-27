// Runs every tests/**/*.test.mjs against the built dist/, each in its own Node process, so a new
// test is just a new file. Arguments filter by path: `node scripts/test.js controller virtual`.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const filters = process.argv.slice(2);

const findTests = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === 'node_modules' ? [] : findTests(file);
    return entry.name.endsWith('.test.mjs') ? [path.relative(root, file)] : [];
  });

const tests = findTests(path.join(root, 'tests'))
  .sort()
  .filter((file) => !filters.length || filters.some((filter) => file.includes(filter)));

if (!fs.existsSync(path.join(root, 'dist', 'package.json'))) {
  console.error('dist/ is not built: run `npm run build` (or `npm test`) first.');
  process.exit(1);
}
if (!tests.length) {
  console.error(`No test matches ${filters.join(', ')}.`);
  process.exit(1);
}

const results = tests.map((file) => {
  console.log(`\n▶ ${file}`);
  const start = Date.now();
  const { status } = spawnSync(process.execPath, [file], { cwd: root, stdio: 'inherit' });
  return { file, passed: status === 0, time: Date.now() - start };
});

console.log('\n');
for (const { file, passed, time } of results) {
  console.log(`${passed ? '✓' : '✗'} ${file} (${(time / 1000).toFixed(1)}s)`);
}
const failed = results.filter(({ passed }) => !passed).length;
console.log(`\n${results.length - failed} of ${results.length} test files passed\n`);
process.exit(failed ? 1 : 0);
