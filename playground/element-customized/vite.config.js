import path from 'path';

export default {
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      'swiper/element/bundle': path.resolve(
        __dirname,
        '../../dist/swiper-element-customized-bundle.mjs',
      ),
      'swiper/element': path.resolve(__dirname, '../../dist/swiper-element-customized.mjs'),
      'swiper/bundle': path.resolve(__dirname, '../../dist/swiper-bundle.mjs'),
      swiper: path.resolve(__dirname, '../../dist/'),
    },
  },
};
