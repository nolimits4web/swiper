const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size');

module.exports = () => {
  return [
    'swiper-bundle.min.js',
    //  'swiper-bundle.esm.js'
  ]
    .map((name) => {
      const filePath = path.join(__dirname, '../package/', name);
      if (fs.existsSync(filePath)) {
        const gzippedSize = gzipSize.fileSync(filePath);
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
};
