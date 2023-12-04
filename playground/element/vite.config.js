import path from 'path';

export default {
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      'swiper/element/bundle': path.resolve(__dirname, '../../dist/swiper-element-bundle.mjs'),
      'swiper/element': path.resolve(__dirname, '../../dist/swiper-element.mjs'),
      'swiper/bundle': path.resolve(__dirname, '../../dist/swiper-bundle.mjs'),
      swiper: path.resolve(__dirname, '../../dist/'),
    },
  },
};
