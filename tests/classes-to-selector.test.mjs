import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(__dirname, '..', 'src', 'shared', 'classes-to-selector.ts');
const source = fs
  .readFileSync(sourcePath, 'utf8')
  .replace(/export default function\s+/, 'function ')
  .replace(/: string\s*\{/, ' {');
const classesToSelector = new Function(`${source}; return classesToSelector;`)();

const cases = [
  ['foo\\bar', '.foo\\\\bar'],
  ['foo?bar', '.foo\\?bar'],
  ['foo;bar', '.foo\\;bar'],
  ['foo%bar', '.foo\\%bar'],
  ['foo&bar', '.foo\\&bar'],
  ['foo,bar', '.foo\\,bar'],
  ['foo bar', '.foo.bar'],
  ['foo  bar', '.foo..bar'],
  ['a  b  c', '.a..b..c'],
];

for (const [className, expected] of cases) {
  assert.equal(classesToSelector(className), expected, `selector for ${JSON.stringify(className)}`);
}

console.log(`classes-to-selector test passed for ${cases.length} cases`);
