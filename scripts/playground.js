const fs = require('fs-extra');
const path = require('path');
const setEnv = require('./utils/env');

(async () => {
  const filePath = path.resolve(__dirname, '../playground/core/index.html');
  const { outputDir } = setEnv();
  const packageFolder = `/${outputDir}/`;
  const html = await fs.readFile(filePath, 'utf-8');

  await fs.writeFile(
    filePath,
    html.replace(/\/build\//g, packageFolder).replace(/\/package\//g, packageFolder),
  );
})();
