import type { Swiper, SwiperModule } from '../../core';

const Resize: SwiperModule = ({ swiper, on, emit }) => {
  let observer: ResizeObserver | null = null;
  let animationFrame: number | null = null;

  const resizeHandler = (): void => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit('beforeResize');
    emit('resize');
  };

  const createObserver = (): void => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    // Entry sizes come from the layout before the rAF, while onResize() stores the live size in
    // swiper.width/height. Comparing entries against swiper.width therefore skipped every other
    // frame of a continuous resize, painting those frames with a stale translate (#8230), so
    // compare against the last handled entry size instead.
    let observedWidth = (swiper as Swiper).width;
    let observedHeight = (swiper as Swiper).height;
    observer = new ResizeObserver((entries) => {
      animationFrame = window.requestAnimationFrame(() => {
        let newWidth = observedWidth;
        let newHeight = observedHeight;
        entries.forEach(({ contentBoxSize, contentRect, target }) => {
          if (target && target !== swiper.el) return;
          // Older Safari (≤15) exposed `contentBoxSize` as a single object instead of an array.
          const box = Array.isArray(contentBoxSize)
            ? contentBoxSize[0]
            : (contentBoxSize as unknown as ResizeObserverSize);
          newWidth = contentRect ? contentRect.width : box.inlineSize;
          newHeight = contentRect ? contentRect.height : box.blockSize;
        });
        if (newWidth !== observedWidth || newHeight !== observedHeight) {
          observedWidth = newWidth;
          observedHeight = newHeight;
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
