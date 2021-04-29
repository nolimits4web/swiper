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
        // const size = gzipSize.fileSync(filePath);
        console.log(`${name}: ${gzippedSize} bytes (gziped)`);
        return gzippedSize;
      }
      console.log(`${filePath} not exists`);
      return 0;
    })
    .reduce((total, num) => total + num);
};
