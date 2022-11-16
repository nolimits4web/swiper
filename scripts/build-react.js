import execSh from 'exec-sh';
import { outputDir } from './utils/output-dir.js';
import { addBannerToFile } from './utils/banner.js';
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
const exec = execSh.promise;

export default async function buildReact() {
  await exec(
    `npx babel --config-file ./scripts/babel/babel.config.react.json src/react --out-dir ${outputDir}/react`,
  );
  await addBannerToFile(`./${outputDir}/react/swiper-react.js`, 'React');
}
