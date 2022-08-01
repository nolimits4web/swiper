import execSh from 'exec-sh';
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
}
export default buildSolid;
