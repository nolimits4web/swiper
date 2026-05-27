import { elementChildren, elementNextAll, elementPrevAll } from '../../shared/utils';
import type { Swiper } from '../core';

// Grid module tags slide elements with their column index at layout time
// (see src/modules/grid/grid.ts → updateSlide).
interface GridSlideEl extends HTMLElement {
  column?: number;
}

const toggleSlideClasses = (slideEl: HTMLElement, condition: boolean, className: string): void => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};

export default function updateSlidesClasses(this: Swiper): void {
  const swiper = this;

  const { slides, params, slidesEl, activeIndex } = swiper;
  const isVirtual = !!(swiper.virtual && params.virtual?.enabled);
  const gridEnabled = swiper.grid && params.grid && params.grid.rows! > 1;

  const getFilteredSlide = (selector: string): HTMLElement | undefined => {
    return elementChildren(
      slidesEl,
      `.${params.slideClass}${selector}, swiper-slide${selector}`,
    )[0] as HTMLElement | undefined;
  };

  let activeSlide: HTMLElement | undefined;
  let prevSlide: HTMLElement | undefined;
  let nextSlide: HTMLElement | undefined;
  if (isVirtual) {
    if (params.loop) {
      const virtualSlides = swiper.virtual.slides;
      let slideIndex = activeIndex - (swiper.virtual.slidesBefore ?? 0);
      if (slideIndex < 0) slideIndex = virtualSlides.length + slideIndex;
      if (slideIndex >= virtualSlides.length) slideIndex -= virtualSlides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else if (gridEnabled) {
    activeSlide = slides.find((slideEl) => (slideEl as GridSlideEl).column === activeIndex);
    nextSlide = slides.find((slideEl) => (slideEl as GridSlideEl).column === activeIndex + 1);
    prevSlide = slides.find((slideEl) => (slideEl as GridSlideEl).column === activeIndex - 1);
  } else {
    activeSlide = slides[activeIndex];
  }

  if (activeSlide) {
    if (!gridEnabled) {
      // Next Slide
      nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0] as
        | HTMLElement
        | undefined;
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }

      // Prev Slide
      prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0] as
        | HTMLElement
        | undefined;
      // eslint-disable-next-line
      if (params.loop && (!prevSlide as any) === 0) {
        prevSlide = slides[slides.length - 1];
      }
    }
  }

  slides.forEach((slideEl) => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass!);
    toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass!);
    toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass!);
  });

  swiper.emitSlidesClasses();
}
