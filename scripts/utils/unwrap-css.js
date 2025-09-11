import postcss from 'postcss';
import nested from 'postcss-nested';

export default (content) => {
  return new Promise((resolve, reject) => {
    if (content instanceof Promise) {
      content
        .then((c) => {
          postcss([nested()])
            .process(c, { from: undefined, to: undefined })
            .then((result) => resolve(result.css));
        })
        .catch((err) => {
          reject(err);
          throw err;
        });
      return;
    }
    postcss([nested()])
      .process(content, { from: undefined, to: undefined })
      .then((res) => {
        resolve(res.css);
      });
  });
};
