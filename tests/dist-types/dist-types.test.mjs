// Type-checks the *.test-d.ts files here against the built dist/ types (tsconfig.dist-types.json).
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const tsc = path.join(root, 'node_modules', 'typescript', 'bin', 'tsc');
const { status } = spawnSync(
  process.execPath,
  [tsc, '--noEmit', '-p', 'tsconfig.dist-types.json'],
  {
    cwd: root,
    stdio: 'inherit',
  },
);
console.log(status === 0 ? 'dist types: ok' : 'dist types: FAIL');
process.exit(status ?? 1);
