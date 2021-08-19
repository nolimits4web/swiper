import path from 'path';
import vue from '@vitejs/plugin-vue';

export default {
  plugins: [vue()],
  resolve: {
    alias: {
      swiper: path.resolve(__dirname, '../../dist/'),
    },
  },
};
