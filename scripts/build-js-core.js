import execSh from 'exec-sh';
import fs from 'fs-extra';
import chalk from 'chalk';
import elapsed from 'elapsed-time-logger';
import { modules as configModules } from './build-config.js';
import { outputDir } from './utils/output-dir.js';
import { banner } from './utils/banner.js';
import { capitalizeString } from './utils/helper.js';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = execSh.promise;

async function buildCore(modules) {
  const filename = `swiper.esm`;
  const coreContent = [
    banner(),
    `export { default as Swiper, default } from './core/core.js';`,
    ...modules.map(
      ({ name, capitalized }) =>
        `export { default as ${capitalized} } from './modules/${name}/${name}.js';`,
    ),
  ].join('\n');
  await Promise.all([
    fs.writeFile(`./${outputDir}/${filename}.js`, coreContent),
    exec(
      `npx babel src --out-dir ${outputDir} --config-file ./scripts/babel/babel.config.core.json`,
    ),
  ]);
  await fs.unlink(`./${outputDir}/swiper.js`);
}
export default async function build() {
  elapsed.start('core');
  const modules = [];
  configModules.forEach((name) => {
    const capitalized = capitalizeString(name);
    const jsFilePath = `./src/modules/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      modules.push({ name, capitalized });
    }
  });
  await buildCore(modules, 'esm');
  elapsed.end('core', chalk.green('Core build completed!'));
}
