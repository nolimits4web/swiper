import type { Swiper } from '../core/core';

export const updateOnVirtualData = (swiper: Swiper | null | undefined): void => {
  if (
    !swiper ||
    swiper.destroyed ||
    !swiper.params.virtual ||
    (swiper.params.virtual && !swiper.params.virtual.enabled)
  )
    return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  swiper.emit('_virtualUpdated');
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate?.();
  }
};
