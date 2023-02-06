export const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => (swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`);
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (lazyEl) lazyEl.remove();
  }
};
