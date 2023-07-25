import { minify } from 'terser';
import fs from 'fs';
import { banner } from './banner.js';

export default async (fileName, filePath, bannerName) => {
  const content = fs
    .readFileSync(filePath, 'utf-8')
    .replace(/from '([A-Za-z0-9./-]*).mjs';/g, 'from "$1.min.mjs";');
  const fileExt = fileName.includes('.mjs') ? '.mjs' : '.js';
  const { code, map } = await minify(content, {
    sourceMap: {
      filename: `${fileName}${fileExt}`,
      url: `${fileName.replace(fileExt, `.min${fileExt}`)}.map`,
    },
    output: {
      preamble: typeof bannerName !== 'undefined' ? banner(bannerName) : '',
    },
  }).catch((err) => {
    console.error(`Terser failed on file ${fileName}: ${err.toString()}`);
  });
  fs.writeFileSync(filePath.replace(fileExt, `.min${fileExt}`), code);
  fs.writeFileSync(filePath.replace(`${fileExt}`, `.min${fileExt}.map`), map);
};
