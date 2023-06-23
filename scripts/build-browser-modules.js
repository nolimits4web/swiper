import fs from 'fs';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { minify } from 'terser';
import config from './build-config.js';
import { outputDir } from './utils/output-dir.js';

export default async function buildBrowserModules() {
  // eslint-disable-next-line
  const modulesPaths = config.modules.map((name) => {
    return `./src/modules/${name}/${name}.js`;
  });

  const bundle = await rollup({
    input: ['./src/swiper.js', ...modulesPaths],
    plugins: [
      replace({
        delimiters: ['', ''],
        '//IMPORT_MODULES': '',
        '//INSTALL_MODULES': '',
        '//EXPORT': 'export default Swiper;',
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'], rootDir: './src' }),
    ],
    onwarn() {},
  });

  await bundle.write({
    dir: `./${outputDir}/browser-modules`,
    format: 'esm',
  });

  const folders = fs.readdirSync(`./${outputDir}/modules`);
  const files = fs.readdirSync(`./${outputDir}/browser-modules`);

  if (!fs.existsSync(`./${outputDir}/modules/_chunks`)) {
    fs.mkdirSync(`./${outputDir}/modules/_chunks`);
  }
  for (const file of files) {
    const folder = file.split('.js')[0];
    const content = fs.readFileSync(`./${outputDir}/browser-modules/${file}`, 'utf-8');
    // eslint-disable-next-line
    let { code } = await minify(content).catch((err) => {
      console.error(`Terser failed on file ${file}: ${err.toString()}`);
    });
    if (file === 'swiper.js') {
      code = code
        .replace(/from"\.\//g, 'from"./modules/_chunks/')
        .replace(/import"\.\//g, 'import"./modules/_chunks/');
      fs.writeFileSync(`./${outputDir}/swiper.esm.browser.js`, code);
    } else if (folders.includes(folder)) {
      code = code
        .replace(/from"\.\//g, 'from"../_chunks/')
        .replace(/import"\.\//g, 'import"../_chunks/');

      fs.writeFileSync(`./${outputDir}/modules/${folder}/${folder}.esm.browser.js`, code);
    } else {
      fs.writeFileSync(`./${outputDir}/modules/_chunks/${file}`, code);
    }
    fs.unlinkSync(`./${outputDir}/browser-modules/${file}`);
  }
  fs.rmdirSync(`./${outputDir}/browser-modules/`);
}
buildBrowserModules();
