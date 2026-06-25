import path from 'path';

import chalk from 'chalk';
import elapsed from 'elapsed-time-logger';
import fs from 'fs-extra';
import { globby } from 'globby';

import { outputDir } from './utils/output-dir.js';

// tsc emits declaration files with the same (extensionless) relative module
// specifiers used in the `.ts` sources — e.g. `export * from '../core/core'`.
// `bundler` and classic `node` resolution tolerate that, but `node16` /
// `nodenext` (modern Node ESM, and the default for many consumers) require an
// explicit extension on every relative specifier. Without it, those consumers
// silently fail to follow the package's internal re-exports and module
// augmentations: option/event types collapse to `any`, `swiper/types` loses its
// named exports, and `declare module` augmentation blocks land on a phantom
// module so `navigation`, `autoplay`, etc. never attach.
//
// v12 shipped hand-written `.d.ts` that already carried `.d.ts` extensions, so
// it worked everywhere. To keep that behavior with tsc-emitted declarations, we
// post-process the emitted files and append `.js` (which node16 resolves to the
// sibling `.d.ts`) to every extensionless relative specifier in `import` /
// `export ... from`, inline `import('...')`, and `declare module '...'`.
//
// Must run AFTER every step that writes `.d.ts` into the output dir (tsc emit,
// build-modules' `modules/index.d.ts`, and build-types' framework wrappers).

const KNOWN_EXTENSIONS = ['.js', '.mjs', '.cjs', '.json', '.css', '.d.ts'];

// Matches the module specifier in:
//   ... from '<spec>'        (import/export ... from)
//   import('<spec>')         (inline type import)
//   declare module '<spec>'  (augmentation target)
// Only relative specifiers (starting with ./ or ../) are considered.
const SPECIFIER_RE =
  /(\bfrom\s*|\bimport\s*\(\s*|\bdeclare\s+module\s*)(['"])(\.{1,2}\/[^'"]+)(['"])/g;

const resolveExtension = (fromFile, spec) => {
  if (KNOWN_EXTENSIONS.some((ext) => spec.endsWith(ext))) return null;
  const target = path.resolve(path.dirname(fromFile), spec);
  if (fs.existsSync(`${target}.d.ts`)) return `${spec}.js`;
  if (fs.existsSync(path.join(target, 'index.d.ts'))) return `${spec.replace(/\/$/, '')}/index.js`;
  return null; // unknown target — leave untouched rather than guess
};

export default async function fixDtsExtensions() {
  elapsed.start('fix-dts');
  const files = await globby(`${outputDir}/**/*.d.ts`);
  let changedFiles = 0;
  let changedSpecifiers = 0;

  await Promise.all(
    files.map(async (file) => {
      const content = await fs.readFile(file, 'utf-8');
      let fileTouched = false;
      const next = content.replace(SPECIFIER_RE, (match, pre, quote, spec, quoteEnd) => {
        const rewritten = resolveExtension(file, spec);
        if (!rewritten) return match;
        changedSpecifiers += 1;
        fileTouched = true;
        return `${pre}${quote}${rewritten}${quoteEnd}`;
      });
      if (fileTouched) {
        changedFiles += 1;
        await fs.writeFile(file, next);
      }
    }),
  );

  elapsed.end(
    'fix-dts',
    chalk.green(
      `Declaration extensions fixed (${changedSpecifiers} specifiers in ${changedFiles} files)!`,
    ),
  );
}
