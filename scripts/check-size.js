import fs from 'fs';
import path from 'path';
import { gzipSizeFromFileSync } from 'gzip-size';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function checkSize() {
  return [
    'swiper-bundle.min.js',
    //  'swiper-bundle.esm.js'
  ]
    .map((name) => {
      const filePath = path.join(__dirname, '../dist/', name);
      if (fs.existsSync(filePath)) {
        const gzippedSize = gzipSizeFromFileSync(filePath);
        const { size } = fs.statSync(filePath);
        console.log(`${name}: ${size} (${gzippedSize} gziped) bytes`);
        return { gzippedSize, size };
      }
      console.log(`${filePath} not exists`);
      return 0;
    })
    .reduce((total, num) => ({
      gzippedSize: total.gzippedSize + num.gzippedSize,
      size: total.size + num.size,
    }));
}
