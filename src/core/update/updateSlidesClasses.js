import { elementChildren, elementNextAll, elementPrevAll } from '../../shared/utils.js';

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
  let nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
  if (params.loop && !nextSlide) {
    nextSlide = slides[0];
  }
  if (nextSlide) {
    nextSlide.classList.add(params.slideNextClass);
  }
  // Prev Slide
  let prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides[slides.length - 1];
  }
  if (prevSlide) {
    prevSlide.classList.add(params.slidePrevClass);
  }
  swiper.emitSlidesClasses();
}
