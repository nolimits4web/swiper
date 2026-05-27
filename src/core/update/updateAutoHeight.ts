import type { Swiper } from '../core';

export default function updateAutoHeight(this: Swiper, speed?: number | boolean): void {
  const swiper = this;
  const activeSlides: HTMLElement[] = [];
  const isVirtual = swiper.virtual && swiper.params.virtual?.enabled;
  let newHeight = 0;
  let i: number;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed!);
  }

  const getSlideByIndex = (index: number): HTMLElement | undefined => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && (swiper.params.slidesPerView as number) > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach((slide) => {
        activeSlides.push(slide);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView as number); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        const slide = getSlideByIndex(index);
        if (slide) activeSlides.push(slide);
      }
    }
  } else {
    const slide = getSlideByIndex(swiper.activeIndex);
    if (slide) activeSlides.push(slide);
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i]!.offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}
