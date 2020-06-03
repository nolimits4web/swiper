import { getWindow } from 'ssr-window';
import { extend } from '../../utils/utils';

export default {
  name: 'resize',
  create() {
    const swiper = this;
    extend(swiper, {
      resize: {
        resizeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('beforeResize');
          swiper.emit('resize');
        },
        orientationChangeHandler() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.emit('orientationchange');
        },
      },
    });
  },
  on: {
    init(swiper) {
      const window = getWindow();
      // Emit resize
      window.addEventListener('resize', swiper.resize.resizeHandler);

      // Emit orientationchange
      window.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy(swiper) {
      const window = getWindow();
      window.removeEventListener('resize', swiper.resize.resizeHandler);
      window.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
  },
};
