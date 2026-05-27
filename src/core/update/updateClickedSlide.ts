import type { Swiper } from '../core';

export default function updateClickedSlide(
  this: Swiper,
  el: HTMLElement,
  path?: EventTarget[],
): void {
  const swiper = this;
  const params = swiper.params;
  let slide: HTMLElement | null = el.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) {
    [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
      if (
        !slide &&
        (pathEl as Element).matches &&
        (pathEl as Element).matches(`.${params.slideClass}, swiper-slide`)
      ) {
        slide = pathEl as HTMLElement;
      }
    });
  }
  let slideFound = false;
  let slideIndex: number | undefined;

  if (slide) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }

  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual?.enabled) {
      swiper.clickedIndex = parseInt(
        (slide as HTMLElement).getAttribute('data-swiper-slide-index')!,
        10,
      );
    } else {
      swiper.clickedIndex = slideIndex!;
    }
  } else {
    swiper.clickedSlide = undefined as any;
    swiper.clickedIndex = undefined as any;
    return;
  }
  if (
    params.slideToClickedSlide &&
    swiper.clickedIndex !== undefined &&
    swiper.clickedIndex !== swiper.activeIndex
  ) {
    swiper.slideToClickedSlide();
  }
}
