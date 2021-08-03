const exec = require('exec-sh');

const buildClean = async () => {
  const cleanPackage = [
    "find **/*.js -type f -not -name 'postinstall.js' -print0 | xargs -0  -I {} rm -v {}",
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
  await exec.promise(`cd ./package && ${cleanPackage.join(' && ')}`);
};

buildClean();
