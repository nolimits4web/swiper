import { spawn } from 'child_process';

import chalk from 'chalk';
import elapsed from 'elapsed-time-logger';

export default async function emitTypes() {
  elapsed.start('emit-types');
  await new Promise((resolve, reject) => {
    const proc = spawn('npx', ['tsc', '-p', './tsconfig.emit.json'], {
      stdio: 'inherit',
      shell: process.platform === 'win32',
    });
    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`tsc exited with code ${code}`));
        return;
      }
      resolve();
    });
    proc.on('error', reject);
  });
  elapsed.end('emit-types', chalk.green('Type declarations emitted!'));
}
