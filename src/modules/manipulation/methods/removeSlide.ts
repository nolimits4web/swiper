import type { Swiper } from '../../../core/core';

export default function removeSlide(this: Swiper, slidesIndexes: number | number[]): void {
  const swiper = this;
  const { params, activeIndex } = swiper;

  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides ?? 0;
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndexBuffer;

  if (Array.isArray(slidesIndexes)) {
    for (let i = 0; i < slidesIndexes.length; i += 1) {
      const indexToRemove = slidesIndexes[i]!;
      if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove]!.remove();
      if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    const indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) swiper.slides[indexToRemove]!.remove();
    if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }

  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + (swiper.loopedSlides ?? 0), 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
}
