import type { Swiper } from '../../../core/core';

type SlideInput = HTMLElement | string | Array<HTMLElement | string>;

export default function addSlide(this: Swiper, index: number, slides: SlideInput): void {
  const swiper = this;
  const { params, activeIndex, slidesEl } = swiper;
  let activeIndexBuffer = activeIndex;
  if (params.loop) {
    activeIndexBuffer -= swiper.loopedSlides ?? 0;
    swiper.loopDestroy();
    swiper.recalcSlides();
  }
  const baseLength = swiper.slides.length;
  if (index <= 0) {
    swiper.prependSlide(slides);
    return;
  }
  if (index >= baseLength) {
    swiper.appendSlide(slides);
    return;
  }
  let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

  const slidesBuffer: HTMLElement[] = [];
  for (let i = baseLength - 1; i >= index; i -= 1) {
    const currentSlide = swiper.slides[i];
    if (!currentSlide) continue;
    currentSlide.remove();
    slidesBuffer.unshift(currentSlide);
  }

  if (Array.isArray(slides)) {
    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      if (slide) slidesEl.append(slide);
    }
    newActiveIndex =
      activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
  } else {
    slidesEl.append(slides);
  }

  for (let i = 0; i < slidesBuffer.length; i += 1) {
    slidesEl.append(slidesBuffer[i]!);
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
