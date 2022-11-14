import path from 'path';

export default {
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      swiper: path.resolve(__dirname, '../dist/'),
    },
  },
};
