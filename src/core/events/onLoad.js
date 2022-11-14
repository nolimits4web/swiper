import $ from '../../shared/dom.js';

export default function onLoad(e) {
  const swiper = this;
  const slideSelector = () => (swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`);
  const slideEl = e.target.closest(slideSelector());
  if (slideEl) {
    $(slideEl).find(`.${swiper.params.lazy.preloaderClass}`).remove();
  }
  swiper.update();
}
