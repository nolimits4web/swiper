/* eslint-disable no-await-in-loop */
const exec = require('exec-sh');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const childPkg = require('../src/copy/package.json');

async function release() {
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

  // Copy dependencies
  childPkg.dependencies = pkg.dependencies;

  fs.writeFileSync(path.resolve(__dirname, '../package.json'), `${JSON.stringify(pkg, null, 2)}\n`);
  fs.writeFileSync(
    path.resolve(__dirname, '../src/copy/package.json'),
    `${JSON.stringify(childPkg, null, 2)}\n`,
  );

  const cleanPackage = [
    "find *.js -type f -not -name 'postinstall.js' -print0 | xargs -0  -I {} rm -v {}",
    'rm -rf angular',
    'rm -rf components',
    'rm -rf core',
    'rm -rf modules',
    'rm -rf react',
    'rm -rf shared',
    'rm -rf svelte',
    'rm -rf types',
    'rm -rf vue',
    'rm -rf **/*.ts',
    'rm -rf *.ts',
    'rm -rf **/*.css',
    'rm -rf *.css',
    'rm -rf **/*.map',
    'rm -rf *.map',
    'rm -rf **/*.less',
    'rm -rf *.less',
    'rm -rf **/*.scss',
    'rm -rf *.scss',
    'rm -rf **/*.svelte',
    'rm -rf *.svelte',
  ];
  await exec.promise(`cd ./dist && ${cleanPackage.join(' && ')}`);

  await exec.promise('git pull');
  await exec.promise('npm i');
  await exec.promise(`cd ./dist && ${cleanPackage.join(' && ')}`);
  await exec.promise(`npm run build:prod`);
  await exec.promise('git add .');
  await exec.promise(`git commit -m "${pkg.version} release"`);
  await exec.promise('git push');
  await exec.promise(`git tag v${pkg.version}`);
  await exec.promise('git push origin --tags');

  // eslint-disable-next-line
  if (options.beta) {
    await exec.promise('cd ./dist && npm publish --tag beta');
  } else if (options.alpha || options.next) {
    await exec.promise('cd ./dist && npm publish --tag next');
  } else {
    await exec.promise('cd ./dist && npm publish');
  }
}

release();
