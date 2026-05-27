import type { Swiper } from '../core';

export default function loopDestroy(this: Swiper): void {
  const swiper = this;
  const { params, slidesEl } = swiper;
  if (!params.loop || !slidesEl || (swiper.virtual && (swiper.params.virtual as any).enabled))
    return;
  swiper.recalcSlides();

  const newSlidesOrder: HTMLElement[] = [];
  swiper.slides.forEach((slideEl) => {
    const index =
      typeof (slideEl as any).swiperSlideIndex === 'undefined'
        ? Number(slideEl.getAttribute('data-swiper-slide-index'))
        : (slideEl as any).swiperSlideIndex;
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
