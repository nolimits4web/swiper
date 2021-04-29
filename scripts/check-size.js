const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size');

function init() {
  ['swiper-bundle.min.js', 'swiper-bundle.esm.js'].forEach((name) => {
    const filePath = path.join(__dirname, '../package/', name);
    if (fs.existsSync(filePath)) {
      const gzippedSize = gzipSize.fileSync(filePath);
      // const size = gzipSize.fileSync(filePath);
      console.log(`${name}: ${gzippedSize} bytes (gziped)`);
      return;
    }
    console.log(`${filePath} not exists`);
  });
}

init();
