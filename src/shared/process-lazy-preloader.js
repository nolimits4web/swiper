export const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => (swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`);
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    const lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (lazyEl) lazyEl.remove();
  }
};

const unlazy = (swiper, index) => {
  const imageEl = swiper.slides[index].querySelector('loading="lazy"');
  if (imageEl) imageEl.removeAttribute('loading');
};

export const preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const active = swiper.activeSlide;
  if (swiper.params.rewind) {
    for (let i = active - amount; i <= active + amount; i += 1) {
      const reali = ((i % len) + len) % len;
      if (reali !== active) unlazy(swiper, reali);
    }
  } else {
    for (let i = Math.max(active - amount, 0); i <= Math.min(active + amount, len - 1); i += 1) {
      if (i !== active) unlazy(swiper, i);
    }
  }
};
