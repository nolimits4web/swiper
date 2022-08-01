import less from 'less';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default (content, resolvePath = path.resolve(__dirname, '../../src/core')) =>
  new Promise((resolve, reject) => {
    less
      .render(content, { paths: [resolvePath] })
      .then((result) => {
        resolve(result.css);
      })
      .catch((err) => {
        reject(err);
        throw err;
      });
  });
