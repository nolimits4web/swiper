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
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute('loading');
};

export const preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView =
    swiper.params.slidesPerView === 'auto'
      ? swiper.slidesPerViewDynamic()
      : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = ((i % len) + len) % len;
      if (realIndex !== activeIndex && realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (
      let i = Math.max(slideIndexLastInView - amount, 0);
      i <= Math.min(slideIndexLastInView + amount, len - 1);
      i += 1
    ) {
      if (i !== activeIndex && i > slideIndexLastInView) unlazy(swiper, i);
    }
  }
};
