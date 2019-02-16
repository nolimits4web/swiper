export default function () {
  const swiper = this;

  const { params, el } = swiper;

  if (el && el.offsetWidth === 0) return;

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Change Direction
  if (swiper.isHorizontal()) {
    if (swiper.saveVertical) {
      swiper.$el
        .removeClass(swiper.params.containerModifierClass + swiper.saveVertical)
        .addClass(swiper.params.containerModifierClass + swiper.originalParams.direction);
      swiper.saveVertical = undefined;
    }

    if (swiper.params.direction === 'horizontal') {
      swiper.$el
        .removeClass(swiper.params.containerModifierClass + swiper.originalParams.direction)
        .addClass(swiper.params.containerModifierClass + swiper.params.direction);

      swiper.saveHorizontal = swiper.params.direction;
    }
  } else if (swiper.originalParams.direction === swiper.params.direction) {
    if (swiper.saveHorizontal) {
      swiper.$el
        .removeClass(swiper.params.containerModifierClass + swiper.saveHorizontal)
        .addClass(swiper.params.containerModifierClass + swiper.params.direction);
      swiper.saveHorizontal = undefined;
    }
  } else if (swiper.originalParams.direction !== swiper.params.direction) {
    swiper.$el
      .removeClass(swiper.params.containerModifierClass + swiper.originalParams.direction)
      .addClass(swiper.params.containerModifierClass + swiper.params.direction);
    swiper.saveVertical = swiper.params.direction;
  }

  // Save locks
  const { allowSlideNext, allowSlidePrev, snapGrid } = swiper;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;

  swiper.updateSize();
  swiper.updateSlides();

  if (params.freeMode) {
    const newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
    swiper.setTranslate(newTranslate);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
  } else {
    swiper.updateSlidesClasses();
    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;

  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
