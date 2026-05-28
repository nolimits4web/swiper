import type { Swiper, SwiperModuleFn } from '../../core';

const Resize: SwiperModuleFn = ({ swiper, on, emit }) => {
  let observer: ResizeObserver | null = null;
  let animationFrame: number | null = null;

  const resizeHandler = (): void => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };

  const createObserver = (): void => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window.requestAnimationFrame(() => {
        const { width, height } = swiper as Swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({ contentBoxSize, contentRect, target }) => {
          if (target && target !== swiper.el) return;
          // Older Safari (≤15) exposed `contentBoxSize` as a single object instead of an array.
          const box = Array.isArray(contentBoxSize)
            ? contentBoxSize[0]
            : (contentBoxSize as unknown as ResizeObserverSize);
          newWidth = contentRect ? contentRect.width : box.inlineSize;
          newHeight = contentRect ? contentRect.height : box.blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };

  const removeObserver = (): void => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };

  const orientationChangeHandler = (): void => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('orientationchange');
  };

  on('init', () => {
    if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
      createObserver();
      return;
    }
    window.addEventListener('resize', resizeHandler);
    window.addEventListener('orientationchange', orientationChangeHandler);
  });

  on('destroy', () => {
    removeObserver();
    window.removeEventListener('resize', resizeHandler);
    window.removeEventListener('orientationchange', orientationChangeHandler);
  });
};

export default Resize;
