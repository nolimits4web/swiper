import type { Swiper } from '../../../core/core';

export default function removeAllSlides(this: Swiper): void {
  const swiper = this;

  const slidesIndexes: number[] = [];
  for (let i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
}
