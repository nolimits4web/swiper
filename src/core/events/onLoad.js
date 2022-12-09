export default function onLoad(e) {
  const swiper = this;
  const slideSelector = () => (swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`);
  const slideEl = e.target.closest(slideSelector());
  if (slideEl) {
    const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (lazyEl) lazyEl.remove();
  }
  swiper.update();
}
