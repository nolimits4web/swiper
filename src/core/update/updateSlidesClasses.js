export default function updateSlidesClasses() {
  const swiper = this;

  const { slides, params, $wrapperEl, activeIndex } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;

  const getFilteredSlides = (selector) => {
    return $wrapperEl.children(`.${params.slideClass}${selector}, swiper-slide${selector}`);
  };

  slides.removeClass(
    `${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass}`,
  );

  let activeSlide;
  if (isVirtual) {
    activeSlide = getFilteredSlides(`[data-swiper-slide-index="${activeIndex}"]`);
  } else {
    activeSlide = slides.eq(activeIndex);
  }

  // Active classes
  activeSlide.addClass(params.slideActiveClass);

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
