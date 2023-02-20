export default function LoadPrevNext({ swiper, extendParams, on }) {
  extendParams({
    loadPrevNext: {
      enabled: false,
      amount: 1,
      prev: true,
      next: true,
    },
  });

  const unlazy = (index) => {
    const imageEl = swiper.slides[i].querySelector('loading="lazy"');
    if(imageEl) imageEl.removeAttribute('loading');
  };

  const preload = () => {
    const max = swiper.slides.length - 1;
    const active = swiper.activeSlide;
    const amount = swiper.params.loadPrevNext.amount;
    if(swiper.params.loadPrevNext.next && active < max) {
      for(var i = active + 1; i <= max && i <= active + amount; i++) {
        unlazy(i);
      }
    }
    if(swiper.params.loadPrevNext.prev && active > 0) {
      for(var i = active - 1; i >= 0 && i >= active - amount; i--) {
        unlazy(i);
      }
    }
  };

  if(swiper.params.loadPrevNext.enabled &&
     ((!swiper.params.loadPrevNext.next && !swiper.params.loadPrevNext.prev) ||
      swiper.params.loadPrevNext.amount <= 0)) {
    swiper.params.loadPrevNext.enabled = false;
  }

  on('init', () => {
    if(swiper.params.loadPrevNext.enabled) {
      preload();
    }
  });
  on('slideChange', () => {
    if(swiper.params.loadPrevNext.enabled) {
      preload();
    }
  });
}
