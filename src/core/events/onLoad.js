export default function onLoad(e) {
  const swiper = this;
  const slideSelector = () => (swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`);
  const slideEl = e.target.closest(slideSelector());
  if (slideEl) {
    const lazyEl = slideEl.querySelectorAll(`.${swiper.params.lazy.preloaderClass}`);
    if (lazyEl) lazyEl.remove();
  }
  swiper.update();
}
