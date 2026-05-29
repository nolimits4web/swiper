import type { Swiper } from '../core';

export default function updateSlidesOffset(this: Swiper): void {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement
    ? swiper.isHorizontal()
      ? swiper.wrapperEl.offsetLeft
      : swiper.wrapperEl.offsetTop
    : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i]!.swiperSlideOffset =
      (swiper.isHorizontal() ? slides[i]!.offsetLeft : slides[i]!.offsetTop) -
      minusOffset -
      swiper.cssOverflowAdjustment();
  }
}
