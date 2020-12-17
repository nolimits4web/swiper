const fs = require('fs-extra');
const path = require('path');

const fsExtra = {
  unlinkSync(p) {
    return fs.unlinkSync(p);
  },
  existsSync(p) {
    return fs.existsSync(p);
  },
  readdirSync(dir) {
    return fs.readdirSync(dir);
  },
  mkdirSync(dir) {
    return fs.mkdirSync(dir);
  },
  readFileSync(file) {
    return fs.readFileSync(file, 'utf8');
  },
  writeFileSync(file, content) {
    fs.ensureDirSync(path.dirname(file));
    return fs.writeFileSync(file, content);
  },
  async writeFile(file, content) {
    await fs.ensureDir(path.dirname(file));
    return fs.writeFile(file, content);
  },
};

module.exports = fsExtra;
