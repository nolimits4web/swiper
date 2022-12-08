import { elementChildren } from '../../shared/utils.js';

export default function updateSlidesClasses() {
  const swiper = this;

  const { slides, params, slidesEl, activeIndex } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;

  const getFilteredSlide = (selector) => {
    return elementChildren(
      slidesEl,
      `.${params.slideClass}${selector}, swiper-slide${selector}`,
    )[0];
  };
  slides.forEach((slideEl) => {
    slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
  });

  let activeSlide;
  if (isVirtual) {
    if (params.loop) {
      activeSlide = getFilteredSlide(
        `[data-swiper-slide-index="${activeIndex - swiper.virtual.slidesBefore}"]`,
      );
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    activeSlide = slides[activeIndex];
  }

  // Active classes
  activeSlide.classList.add(params.slideActiveClass);

  // Next Slide
  let nextSlide = activeSlide
    .nextAll(`.${params.slideClass}, swiper-slide`)
    .eq(0)
    .addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  // Prev Slide
  let prevSlide = activeSlide
    .prevAll(`.${params.slideClass}, swiper-slide`)
    .eq(0)
    .addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  swiper.emitSlidesClasses();
}
