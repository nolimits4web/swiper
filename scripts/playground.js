const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

function buildPlayground() {
  const filePath = path.resolve(__dirname, '../playground/core/index.html');
  const packageFolder = env === 'development' ? '/build/' : '/package/';
  const html = fs
    .readFileSync(filePath, 'utf-8')
    .replace(/\/build\//g, packageFolder)
    .replace(/\/package\//g, packageFolder);
  fs.writeFileSync(filePath, html);
}

buildPlayground();
