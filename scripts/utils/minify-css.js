import postcss from 'postcss';
import cssnano from 'cssnano';

export default (content) => {
  return new Promise((resolve, reject) => {
    if (content instanceof Promise) {
      content
        .then((c) => {
          postcss([cssnano()])
            .process(c, { from: undefined, to: undefined })
            .then((result) => resolve(result.css));
        })
        .catch((err) => {
          reject(err);
          throw err;
        });
      return;
    }
    postcss([cssnano()])
      .process(content, { from: undefined, to: undefined })
      .then((res) => {
        resolve(res.css);
      });
  });
};
