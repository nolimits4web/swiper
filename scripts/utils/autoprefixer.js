import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

export default async (content, { from = undefined, to = undefined } = {}) =>
  new Promise((resolve, reject) => {
    postcss([autoprefixer])
      .process(content, { from, to })
      .then((result) => {
        result.warnings().forEach((warn) => {
          console.warn(warn.toString());
        });
        resolve(result.css);
      })
      .catch((err) => {
        reject(err);
        throw err;
      });
  });
