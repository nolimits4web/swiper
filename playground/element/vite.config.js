import path from 'path';

export default {
  resolve: {
    alias: {
      'swiper/element/bundle': path.resolve(
        __dirname,
        '../../dist/element/swiper-element-bundle.js',
      ),
      'swiper/element': path.resolve(__dirname, '../../dist/element/swiper-element.js'),
      'swiper/bundle': path.resolve(__dirname, '../../dist/swiper-bundle.esm.js'),
      swiper: path.resolve(__dirname, '../../dist/'),
    },
  },
};
