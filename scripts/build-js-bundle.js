import fs from 'fs-extra';
import chalk from 'chalk';
import elapsed from 'elapsed-time-logger';
import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { minify } from 'terser';
import { modules as configModules } from './build-config.js';
import { outputDir } from './utils/output-dir.js';
import { banner } from './utils/banner.js';
import isProd from './utils/isProd.js';
import { capitalizeString } from './utils/helper.js';

async function buildEntry(modules, format, browser = false) {
  const isUMD = format === 'umd';
  const isESM = format === 'esm';
  if (isUMD) browser = true;
  const needSourceMap = isProd && (isUMD || (isESM && browser));
  const external = isUMD || browser ? [] : () => true;
  let filename = 'swiper-bundle';
  if (isESM) filename += `.esm`;
  if (isESM && browser) filename += '.browser';

  return rollup({
    input: './src/swiper.js',
    external,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        '//IMPORT_MODULES': modules
          .map((mod) => `import ${mod.capitalized} from './modules/${mod.name}/${mod.name}.js';`)
          .join('\n'),
        '//INSTALL_MODULES': modules.map((mod) => `${mod.capitalized}`).join(',\n  '),
        '//EXPORT': isUMD ? 'export default Swiper;' : 'export default Swiper; export { Swiper }',
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'], rootDir: './src' }),
      babel({ babelHelpers: 'bundled' }),
    ],
    onwarn() {},
  })
    .then((bundle) =>
      bundle.write({
        format,
        name: 'Swiper',
        strict: true,
        sourcemap: needSourceMap,
        sourcemapFile: `./${outputDir}/${filename}.js.map`,
        banner: banner(),
        file: `./${outputDir}/${filename}.js`,
      }),
    )
    .then(async (bundle) => {
      if (!isProd || !browser) {
        return;
      }
      const result = bundle.output[0];
      const { code, map } = await minify(result.code, {
        sourceMap: {
          content: needSourceMap ? result.map : undefined,
          filename: needSourceMap ? `${filename}.min.js` : undefined,
          url: `${filename}.min.js.map`,
        },
        output: {
          preamble: banner(),
        },
      }).catch((err) => {
        console.error(`Terser failed on file ${filename}: ${err.toString()}`);
      });
      await fs.writeFile(`./${outputDir}/${filename}.min.js`, code);
      await fs.writeFile(`./${outputDir}/${filename}.min.js.map`, map);
    })
    .then(async () => {
      if (isProd && isESM && browser === false) return buildEntry(modules, format, true);
      return true;
    })
    .catch((err) => {
      console.error('Rollup error:', err.stack);
    });
}

export default async function buildJsBundle() {
  elapsed.start('bundle');
  const modules = [];
  configModules.forEach((name) => {
    const capitalized = capitalizeString(name);
    const jsFilePath = `./src/modules/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      modules.push({ name, capitalized });
    }
  });
  return Promise.all([buildEntry(modules, 'umd'), buildEntry(modules, 'esm')]).then(() => {
    elapsed.end('bundle', chalk.green('\nBundle build completed!'));
  });
}
