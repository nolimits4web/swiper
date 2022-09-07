import execSh from 'exec-sh';
import fs from 'fs-extra';
import { outputDir } from './utils/output-dir.js';
import { addBannerToFile } from './utils/banner.js';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = execSh.promise;
async function buildSolid() {
  await exec(
    `npx babel --config-file ./scripts/babel/babel.config.solid.json src/solid --out-dir ${outputDir}/solid`,
  );
  await addBannerToFile(`./${outputDir}/solid/swiper-solid.js`, 'SolidJS');
  await fs.copyFile('./src/solid/swiper.js', `./${outputDir}/solid/swiper.js`);
  await fs.copyFile('./src/solid/swiper-slide.js', `./${outputDir}/solid/swiper-slide.js`);
}
export default buildSolid;
