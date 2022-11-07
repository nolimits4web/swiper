export default function updateSlidesClasses() {
  const swiper = this;

  const { slides, params, $wrapperEl, activeIndex, realIndex } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;

  const getFilteredSlides = (selector) => {
    return $wrapperEl.children(`.${params.slideClass}${selector}, swiper-slide${selector}`);
  };

  slides.removeClass(
    `${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`,
  );

  let activeSlide;
  if (isVirtual) {
    activeSlide = getFilteredSlides(`[data-swiper-slide-index="${activeIndex}"]`);
  } else {
    activeSlide = slides.eq(activeIndex);
  }

  // Active classes
  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      getFilteredSlides(
        `:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`,
      ).addClass(params.slideDuplicateActiveClass);
    } else {
      getFilteredSlides(
        `.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`,
      ).addClass(params.slideDuplicateActiveClass);
    }
  }
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
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      getFilteredSlides(
        `:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr(
          'data-swiper-slide-index',
        )}"]`,
      ).addClass(params.slideDuplicateNextClass);
    } else {
      getFilteredSlides(
        `.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr(
          'data-swiper-slide-index',
        )}"]`,
      ).addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      getFilteredSlides(
        `:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr(
          'data-swiper-slide-index',
        )}"]`,
      ).addClass(params.slideDuplicatePrevClass);
    } else {
      getFilteredSlides(
        `.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr(
          'data-swiper-slide-index',
        )}"]`,
      ).addClass(params.slideDuplicatePrevClass);
    }
  }
  swiper.emitSlidesClasses();
}
