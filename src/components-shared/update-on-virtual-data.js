export const updateOnVirtualData = (swiper) => {
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
  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
  if (swiper.parallax && swiper.params.parallax && swiper.params.parallax.enabled) {
    swiper.parallax.setTranslate();
  }
};
