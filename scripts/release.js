import exec from 'exec-sh';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { rimraf } from 'rimraf';
import * as url from 'url';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url)));
const childPkg = JSON.parse(fs.readFileSync(new URL('../src/copy/package.json', import.meta.url)));
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

async function release() {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    year: 'numeric',
    month: 'long',
  });
  const releaseDate = formatter.format(date);

  const options = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: pkg.version,
    },
    {
      type: 'list',
      name: 'alpha',
      message: 'Alpha?',
      when: (opts) => opts.version.indexOf('alpha') >= 0,
      choices: [
        {
          name: 'YES',
          value: true,
        },
        {
          name: 'NO',
          value: false,
        },
      ],
    },
    {
      type: 'list',
      name: 'beta',
      message: 'Beta?',
      when: (opts) => opts.version.indexOf('beta') >= 0,
      choices: [
        {
          name: 'YES',
          value: true,
        },
        {
          name: 'NO',
          value: false,
        },
      ],
    },
    {
      type: 'list',
      name: 'next',
      message: 'Next?',
      when: (opts) => opts.version.indexOf('next') >= 0,
      choices: [
        {
          name: 'YES',
          value: true,
        },
        {
          name: 'NO',
          value: false,
        },
      ],
    },
  ]);
  // Set version
  pkg.version = options.version;
  childPkg.version = options.version;
  childPkg.releaseDate = releaseDate;
  // Copy dependencies
  childPkg.dependencies = pkg.dependencies;
  fs.writeFileSync(path.resolve(__dirname, '../package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
  fs.writeFileSync(
    path.resolve(__dirname, '../src/copy/package.json'),
    `${JSON.stringify(childPkg, null, 2)}\n`,
  );

  await exec.promise('git pull');
  await exec.promise('npm i');
  rimraf.sync(path.resolve(__dirname, 'dir'));
  fs.mkdirSync(path.resolve(__dirname, 'dir'));
  await exec.promise(`npm run build:prod`);
  await exec.promise('git add .');
  await exec.promise(`git commit -m ${pkg.version} --no-verify`);
  await exec.promise('git push');
  await exec.promise(`git tag v${pkg.version}`);
  await exec.promise('git push origin --tags');
  if (options.beta) {
    await exec.promise('cd ./dist && npm publish --tag beta');
  } else if (options.alpha || options.next) {
    await exec.promise('cd ./dist && npm publish --tag next');
  } else {
    await exec.promise('cd ./dist && npm publish');
  }
}
release();
