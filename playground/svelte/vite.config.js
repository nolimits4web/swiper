import path from 'path';
import svelte from 'rollup-plugin-svelte';

export default {
  plugins: [svelte()],
  resolve: {
    alias: {
      swiper: path.resolve(__dirname, '../../dist/'),
    },
  },
};
