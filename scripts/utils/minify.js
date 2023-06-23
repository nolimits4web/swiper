import { minify } from 'terser';
import fs from 'fs';
import { banner } from './banner.js';

export default async (fileName, filePath, bannerName, sourceMap) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileExt = fileName.includes('.mjs') ? '.mjs' : '.js';
  const { code, map } = await minify(content, {
    ...(!sourceMap
      ? {}
      : {
          sourceMap: {
            filename: `${fileName}.mjs`,
            url: `${fileName}.mjs.map`,
          },
        }),

    output: {
      preamble: typeof bannerName !== 'undefined' ? banner(bannerName) : '',
    },
  }).catch((err) => {
    console.error(`Terser failed on file ${fileName}: ${err.toString()}`);
  });
  fs.writeFileSync(filePath, code);
  if (sourceMap) {
    fs.writeFileSync(filePath.replace(`${fileExt}`, `.mjs.map`), map);
  }
};
