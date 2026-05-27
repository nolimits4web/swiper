type AnySwiper = any;

export const processLazyPreloader = (swiper: AnySwiper, imageEl: HTMLElement): void => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => (swiper.isElement ? 'swiper-slide' : `.${swiper.params.slideClass}`);
  const slideEl = imageEl.closest(slideSelector()) as HTMLElement | null;
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`) as
      | (HTMLElement & { lazyPreloaderManaged?: boolean })
      | null;
    if (!lazyEl && swiper.isElement) {
      if (slideEl.shadowRoot) {
        lazyEl = slideEl.shadowRoot.querySelector(
          `.${swiper.params.lazyPreloaderClass}`,
        ) as typeof lazyEl;
      } else {
        requestAnimationFrame(() => {
          if (slideEl.shadowRoot) {
            const innerLazy = slideEl.shadowRoot.querySelector(
              `.${swiper.params.lazyPreloaderClass}`,
            ) as typeof lazyEl;
            if (innerLazy && !innerLazy.lazyPreloaderManaged) innerLazy.remove();
          }
        });
      }
    }
    if (lazyEl && !lazyEl.lazyPreloaderManaged) lazyEl.remove();
  }
};

const unlazy = (swiper: AnySwiper, index: number): void => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]') as HTMLElement | null;
  if (imageEl) imageEl.removeAttribute('loading');
};

export const preload = (swiper: AnySwiper): void => {
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
  if (swiper.params.grid && (swiper.params.grid.rows ?? 1) > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(
      ...Array.from({ length: amount }).map((_, i) => activeColumn + slidesPerView + i),
    );
    swiper.slides.forEach((slideEl: HTMLElement & { column?: number }, i: number) => {
      if (slideEl.column !== undefined && preloadColumns.includes(slideEl.column))
        unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = ((i % len) + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (
      let i = Math.max(activeIndex - amount, 0);
      i <= Math.min(slideIndexLastInView + amount, len - 1);
      i += 1
    ) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};
