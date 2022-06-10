import solidPlugin from 'vite-plugin-solid';
import path from 'path';

export default {
  resolve: {
    alias: {
      swiper: path.resolve(__dirname, '../../dist/'),
    },
  },
  plugins: [solidPlugin()],
};
