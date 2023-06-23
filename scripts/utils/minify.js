import { minify } from 'terser';
import fs from 'fs';
import { banner } from './banner.js';

export default async (fileName, filePath, inPlace, bannerName) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileExt = fileName.includes('.mjs') ? '.mjs' : '.js';
  const { code, map } = await minify(content, {
    ...(inPlace
      ? {}
      : {
          sourceMap: {
            filename: `${fileName}.min${fileExt}`,
            url: `${fileName}.min${fileExt}.map`,
          },
        }),

    output: {
      preamble: typeof bannerName !== 'undefined' ? banner(bannerName) : '',
    },
  }).catch((err) => {
    console.error(`Terser failed on file ${fileName}: ${err.toString()}`);
  });
  if (inPlace) {
    fs.writeFileSync(filePath, code);
  } else {
    fs.writeFileSync(filePath.replace(`${fileExt}`, `.min${fileExt}`), code);
    fs.writeFileSync(filePath.replace(`${fileExt}`, `.min${fileExt}.map`), map);
  }
};
