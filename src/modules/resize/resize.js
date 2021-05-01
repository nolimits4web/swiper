import { getWindow } from 'ssr-window';
import { extend } from '../../utils/utils';

const supportsResizeObserver = () => {
  const window = getWindow();
  return typeof window.ResizeObserver !== 'undefined';
};

export default {
  name: 'resize',
  create() {
    const swiper = this;
    extend(swiper, {
      resize: {
        observer: null,
        createObserver() {
          if (!swiper || swiper.destroyed || !swiper.initialized) return;
          swiper.resize.observer = new ResizeObserver((entries) => {
            const { width, height } = swiper;
            let newWidth = width;
            let newHeight = height;
            entries.forEach(({ contentBoxSize, contentRect, target }) => {
              if (target && target !== swiper.el) return;
              newWidth = contentRect
                ? contentRect.width
                : (contentBoxSize[0] || contentBoxSize).inlineSize;
              newHeight = contentRect
                ? contentRect.height
                : (contentBoxSize[0] || contentBoxSize).blockSize;
            });
            if (newWidth !== width || newHeight !== height) {
              swiper.resize.resizeHandler();
            }
          });
          swiper.resize.observer.observe(swiper.el);
        },
        removeObserver() {
          if (swiper.resize.observer && swiper.resize.observer.unobserve && swiper.el) {
            swiper.resize.observer.unobserve(swiper.el);
            swiper.resize.observer = null;
          }
        },
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
      if (swiper.params.resizeObserver && supportsResizeObserver()) {
        swiper.resize.createObserver();
        return;
      }
      // Emit resize
      window.addEventListener('resize', swiper.resize.resizeHandler);

      // Emit orientationchange
      window.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy(swiper) {
      const window = getWindow();
      swiper.resize.removeObserver();
      window.removeEventListener('resize', swiper.resize.resizeHandler);
      window.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
  },
};
