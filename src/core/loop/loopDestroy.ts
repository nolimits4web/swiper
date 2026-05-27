import type { Swiper } from '../core';

// Loop module re-orders slides and stashes their original index in this
// runtime property so we can rebuild the source order on destroy.
interface LoopSlideEl extends HTMLElement {
  swiperSlideIndex?: number;
}

export default function loopDestroy(this: Swiper): void {
  const swiper = this;
  const { params, slidesEl } = swiper;
  if (!params.loop || !slidesEl || (swiper.virtual && swiper.params.virtual?.enabled)) return;
  swiper.recalcSlides();

  const newSlidesOrder: HTMLElement[] = [];
  swiper.slides.forEach((slideEl) => {
    const loopSlideEl = slideEl as LoopSlideEl;
    const index =
      typeof loopSlideEl.swiperSlideIndex === 'undefined'
        ? Number(slideEl.getAttribute('data-swiper-slide-index'))
        : loopSlideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute('data-swiper-slide-index');
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
