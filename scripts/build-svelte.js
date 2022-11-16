import exec from 'exec-sh';
import fs from 'fs-extra';
import { outputDir } from './utils/output-dir.js';
import { addBannerToFile } from './utils/banner.js';

export default async function buildSvelte() {
  await exec.promise(`npx babel src/svelte --out-dir ${outputDir}/svelte`);
  await addBannerToFile(`./${outputDir}/svelte/swiper-svelte.js`, 'Svelte');
  await fs.copyFile('./src/svelte/swiper.svelte', `./${outputDir}/svelte/swiper.svelte`);
  await fs.copyFile(
    './src/svelte/swiper-slide.svelte',
    `./${outputDir}/svelte/swiper-slide.svelte`,
  );
}
