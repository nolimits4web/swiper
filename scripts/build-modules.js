/* eslint-disable no-shadow */
import fs from 'fs';
import { rollup } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';
import getElementStyles from './utils/get-element-styles.js';
import { modules as configModules } from './build-config.js';
import { capitalizeString } from './utils/helper.js';
import minify from './utils/minify.js';
import { banner } from './utils/banner.js';

export default async function buildModules() {
  const modules = [];
  configModules.forEach((name) => {
    const capitalized = capitalizeString(name);
    const jsFilePath = `./src/modules/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      modules.push({ name, capitalized });
    }
  });

  // eslint-disable-next-line
  const modulesPaths = configModules.map((name) => {
    return `./src/modules/${name}/${name}.js`;
  });

  const output = await rollup({
    external: ['react', 'vue'],
    input: [
      './src/swiper.js',
      './src/swiper-bundle.js',
      './src/swiper-element.js',
      './src/swiper-element-bundle.js',
      './src/swiper-vue.js',
      './src/swiper-react.js',
      ...modulesPaths,
    ],
    plugins: [
      replace({
        delimiters: ['', ''],
        '//IMPORT_MODULES': modules
          .map((mod) => `import ${mod.capitalized} from './modules/${mod.name}/${mod.name}.js';`)
          .join('\n'),
        '//INSTALL_MODULES': modules.map((mod) => `${mod.capitalized}`).join(',\n  '),
        '//EXPORT': 'export default Swiper; export { Swiper }',
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'], rootDir: './src' }),
      babel({ babelHelpers: 'bundled' }),
    ],
    onwarn() {},
  });

  await output.write({
    dir: `./dist/tmp`,
    format: 'esm',
    hoistTransitiveImports: false,
    chunkFileNames: (i) => {
      if (i.name === 'swiper') return `swiper-core.js`;
      return `[name].js`;
    },
  });

  // REARRANGE FILES
  const files = fs.readdirSync(`./dist/tmp`);
  if (!fs.existsSync(`./dist/modules`)) {
    fs.mkdirSync(`./dist/modules`);
  }
  files.forEach((fileName) => {
    const folderName = fileName.split('.js')[0];
    if (fs.existsSync(`./src/modules/${folderName}`)) {
      if (!fs.existsSync(`./dist/modules/${folderName}`)) {
        fs.mkdirSync(`./dist/modules/${folderName}`);
      }
      fs.copyFileSync(`./dist/tmp/${fileName}`, `./dist/modules/${folderName}/${fileName}`);
      fs.unlinkSync(`./dist/tmp/${fileName}`);
    } else if (
      (fileName.indexOf('swiper-') !== 0 && fileName !== 'swiper.js') ||
      fileName === 'swiper-core.js'
    ) {
      if (!fs.existsSync('./dist/shared')) {
        fs.mkdirSync('./dist/shared');
      }
      fs.copyFileSync(`./dist/tmp/${fileName}`, `./dist/shared/${fileName}`);
      fs.unlinkSync(`./dist/tmp/${fileName}`);
    } else {
      fs.copyFileSync(`./dist/tmp/${fileName}`, `./dist/${fileName.replace('.js', '.mjs')}`);
      fs.unlinkSync(`./dist/tmp/${fileName}`);
    }
  });
  if (fs.existsSync('./dist/tmp')) {
    fs.rmdirSync('./dist/tmp');
  }

  // FIX IMPORTS
  fs.readdirSync('./dist/modules').forEach((modName) => {
    const content = fs
      .readFileSync(`./dist/modules/${modName}/${modName}.js`, 'utf-8')
      .replace(/from '\.\//g, `from '../../shared/`);
    fs.writeFileSync(`./dist/modules/${modName}/${modName}.js`, content);
  });

  const { core, bundle, slide } = await getElementStyles();

  fs.readdirSync('./dist/')
    .filter((f) => f.includes('.mjs'))
    .forEach((f) => {
      let content = fs.readFileSync(`./dist/${f}`, 'utf-8');
      if (f === 'swiper-bundle.mjs') {
        content = content
          .replace(/from '\.\/swiper-core/g, `from './shared/swiper-core`)
          .replace(
            /import ([0-9A-Za-z]*) from '\.\/([0-9a-z-]*).js'/g,
            `import $1 from './modules/$2/$2.js'`,
          );
      } else {
        content = content.replace(/from '\.\//g, `from './shared/`);
      }
      // ADD ELEMENT STYLES
      if (f === 'swiper-element.mjs') {
        content = content
          .replace('//SWIPER_STYLES', `const SwiperCSS = \`${core}\``)
          .replace('//SWIPER_SLIDE_STYLES', `const SwiperSlideCSS = \`${slide}\``);
      }
      if (f === 'swiper-element-bundle.mjs') {
        content = content
          .replace('/swiper-bundle.js', `/swiper-bundle.mjs`)
          .replace('//SWIPER_STYLES', `const SwiperCSS = \`${bundle}\``)
          .replace('//SWIPER_SLIDE_STYLES', `const SwiperSlideCSS = \`${slide}\``);
      }
      // ADD BANNER
      const bannerName = f.includes('react')
        ? 'React'
        : f.includes('vue')
        ? 'Vue'
        : f.includes('element')
        ? 'Custom Element'
        : '';

      fs.writeFileSync(`./dist/${f}`, `${banner(bannerName)}\n${content}`);
    });

  // MINIFY
  await Promise.all([
    // MINIFY SHARED
    ...fs
      .readdirSync('./dist/shared')
      .filter((f) => f.endsWith('.js') && !f.includes('.min'))
      .map((f) => minify(f, `./dist/shared/${f}`, true)),
    // MINIFY MODULES
    ...fs
      .readdirSync('./dist/modules')
      .filter((f) => f.endsWith('.js') && !f.includes('.min'))
      .map((f) => minify(f, `./dist/modules/${f}/${f}.js`, true)),
    // MINIFY ROOT
    ...fs
      .readdirSync('./dist/')
      .filter(
        (f) =>
          f.endsWith('.mjs') && !f.includes('.min') && !f.includes('react') && !f.includes('vue'),
      )
      .map((f) => {
        const bannerName = f.includes('react')
          ? 'React'
          : f.includes('vue')
          ? 'Vue'
          : f.includes('element')
          ? 'Custom Element'
          : '';
        return minify(f, `./dist/${f}`, false, bannerName);
      }),
  ]);

  // IIFE
  const replaceExports = {};
  ['swiper-bundle.mjs', 'swiper.mjs'].forEach((f) => {
    const content = fs.readFileSync(`./dist/${f}`, 'utf-8');
    const line = content
      .split('\n')
      .filter((l) => l.includes('export {'))[0]
      .trim();
    replaceExports[f] = {
      before: line,
      after: line.replace(/export { ([^,]*), ([^}]*) }/, `export { $2 }`),
    };
    fs.writeFileSync(
      `./dist/${f}`,
      content.replace(replaceExports[f].before, replaceExports[f].after),
    );
  });

  await Promise.all(
    ['swiper-bundle.mjs', 'swiper.mjs', 'swiper-element.mjs', 'swiper-element-bundle.mjs'].map(
      async (f) => {
        const output = await rollup({
          input: `./dist/${f}`,
          plugins: [
            replace({
              preventAssignment: true,
              delimiters: ['', ''],
              'export { SwiperContainer, SwiperSlide, register };': 'register()',
            }),
          ],
        });
        await output.write({
          file: `./dist/${f.replace('.mjs', '.js')}`,
          format: 'iife',
          name: f === 'swiper-bundle.mjs' || f === 'swiper.mjs' ? 'Swiper' : '',
          banner: banner(f.includes('element') ? 'Custom Element' : ''),
        });
      },
    ),
  );

  ['swiper-bundle.mjs', 'swiper.mjs'].forEach((f) => {
    const content = fs.readFileSync(`./dist/${f}`, 'utf-8');
    fs.writeFileSync(
      `./dist/${f}`,
      content.replace(replaceExports[f].after, replaceExports[f].before),
    );
  });

  // MINIFY IIFE
  await Promise.all(
    ['swiper-bundle.js', 'swiper.js', 'swiper-element.js', 'swiper-element-bundle.js'].map((f) => {
      const bannerName = f.includes('element') ? 'Custom Element' : '';
      return minify(f, `./dist/${f}`, false, bannerName);
    }),
  );
}
