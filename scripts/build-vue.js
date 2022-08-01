import execSh from 'exec-sh';
import { outputDir } from './utils/output-dir.js';
import { addBannerToFile } from './utils/banner.js';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = execSh.promise;
export default async function buildVue() {
  await exec(`npx babel src/vue --out-dir ${outputDir}/vue`);
  await addBannerToFile(`./${outputDir}/vue/swiper-vue.js`, 'Vue');
}
