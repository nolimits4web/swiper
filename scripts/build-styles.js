import fs from 'fs-extra';
import path from 'path';
import { globby } from 'globby';
import * as url from 'url';
import chalk from 'chalk';
import elapsed from 'elapsed-time-logger';
import autoprefixer from './utils/autoprefixer.js';
import minifyCSS from './utils/minify-css.js';
import { banner } from './utils/banner.js';
import config from './build-config.js';
import { outputDir } from './utils/output-dir.js';
import isProd from './utils/isProd.js';
import { getSplittedCSS, proceedReplacements } from './utils/get-element-styles.js';
import unwrapCss from './utils/unwrap-css.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const buildCSS = async ({ isBundle, modules, minified }) => {
  const coreContent = await fs.readFile(path.resolve(__dirname, '../src/swiper.css'), 'utf8');
  const modulesContent = [];
  for (const mod of modules) {
    modulesContent.push(
      // eslint-disable-next-line no-await-in-loop
      await fs.readFile(path.resolve(__dirname, `../src/modules/${mod}/${mod}.css`), 'utf8'),
    );
  }

  const swiperCSS = await autoprefixer(coreContent);
  const swiperBundleCSS = await autoprefixer([coreContent, ...modulesContent].join('\n'));

  const fileName = isBundle ? 'swiper-bundle' : 'swiper';
  // Write file
  await fs.ensureDir(`./${outputDir}`);

  await fs.writeFile(
    `./${outputDir}/${fileName}.css`,
    `${banner()}\n${isBundle ? swiperBundleCSS : swiperCSS}`,
  );

  if (minified) {
    const minifiedContent = await minifyCSS(isBundle ? swiperBundleCSS : swiperCSS);
    await fs.writeFile(`./${outputDir}/${fileName}.min.css`, `${banner()}\n${minifiedContent}`);
  }
};
export default async function buildStyles() {
  elapsed.start('styles');
  // eslint-disable-next-line import/no-named-as-default-member
  const modules = config.modules.filter((name) => {
    const cssFilePath = `./src/modules/${name}/${name}.css`;
    return fs.existsSync(cssFilePath);
  });
  buildCSS({ isBundle: true, modules, minified: isProd });
  buildCSS({ isBundle: false, modules, minified: isProd });
  if (isProd) {
    // Copy css
    const files = await globby(['**/**.css'], {
      cwd: path.resolve(__dirname, '../src'),
    });
    await Promise.all(
      files.map(async (file) => {
        let distFilePath = path.resolve(__dirname, `../${outputDir}`, file);
        const srcFilePath = path.resolve(__dirname, '../src', file);
        let distFileContent = fs.readFileSync(srcFilePath, 'utf-8');
        if (file === 'swiper.css') {
          distFileContent = `${banner()}\n${distFileContent}`;
        }
        if (distFilePath.includes('/modules/') || distFilePath.includes('\\modules\\')) {
          distFilePath = distFilePath
            .replace(/modules\/([a-zA-Z0-9-]*)/, 'modules')
            .replace(/modules\\([a-zA-Z0-9-]*)/, 'modules');
        }
        await fs.ensureDir(path.dirname(distFilePath));
        await fs.writeFile(distFilePath, distFileContent);
      }),
    );
    const modulesCSSFiles = await globby(['**/**.css'], {
      cwd: path.resolve(__dirname, '../dist/modules'),
      absolute: true,
    });
    await Promise.all(
      modulesCSSFiles.map(async (filePath) => {
        const cssContent = await fs.readFile(filePath, 'utf-8');
        const resultCSS = await autoprefixer(cssContent);
        const unwrappedCSS = await unwrapCss(resultCSS);
        const resultCSSElement = proceedReplacements(getSplittedCSS(unwrappedCSS).container);
        const resultFilePath = filePath.replace(/\.css$/, '');
        const minifiedCSS = await minifyCSS(resultCSS);
        const minifiedCSSElement = await minifyCSS(resultCSSElement);
        await fs.writeFile(`${resultFilePath}.css`, resultCSS);
        await fs.writeFile(`${resultFilePath}-element.css`, resultCSSElement);
        await fs.writeFile(`${resultFilePath}.min.css`, minifiedCSS);
        await fs.writeFile(`${resultFilePath}-element.min.css`, minifiedCSSElement);
      }),
    );
  }
  elapsed.end('styles', chalk.green('Styles build completed!'));
}
