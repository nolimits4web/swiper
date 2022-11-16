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
  await fs.copyFile('./src/solid/swiper.jsx', `./${outputDir}/solid/swiper.jsx`);
  await fs.copyFile('./src/solid/swiper-slide.jsx', `./${outputDir}/solid/swiper-slide.jsx`);
}
export default buildSolid;
