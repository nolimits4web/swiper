export default function loopFix(slideRealIndex, slideTo = true) {
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit('beforeLoopFix');

  const { slides, allowSlidePrev, allowSlideNext, $slidesEl } = swiper;

  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;

  if (swiper.virtual && swiper.params.virtual.enabled) {
    if (slideTo) {
      if (swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(0, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit('loopFix');
    return;
  }

  const slidesPerView =
    swiper.params.slidesPerView === 'auto'
      ? swiper.slidesPerViewDynamic()
      : Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
  let loopedSlides = slidesPerView;
  if (loopedSlides % swiper.params.slidesPerGroup !== 0) {
    loopedSlides += swiper.params.slidesPerGroup - (loopedSlides % swiper.params.slidesPerGroup);
  }
  swiper.loopedSlides = loopedSlides;

  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];

  const activeSlideIndex = swiper.slides
    .filter((el) => el.classList.contains('swiper-slide-active'))
    .index();

  let slidesPrepended = 0;
  let slidesAppended = 0;
  // prepend last slides before start
  if (activeSlideIndex < loopedSlides) {
    slidesPrepended = loopedSlides - activeSlideIndex;
    for (let i = 0; i < loopedSlides - activeSlideIndex; i += 1) {
      const index = i - Math.floor(i / slides.length) * slides.length;
      prependSlidesIndexes.push(slides.length - index - 1);
    }
  } else if (activeSlideIndex /* + slidesPerView */ > swiper.slides.length - loopedSlides * 2) {
    slidesAppended = activeSlideIndex - (swiper.slides.length - loopedSlides * 2);
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / slides.length) * slides.length;
      appendSlidesIndexes.push(index);
    }
  }

  prependSlidesIndexes.forEach((index) => {
    $slidesEl.prepend(swiper.slides.eq(index));
  });
  appendSlidesIndexes.forEach((index) => {
    $slidesEl.append(swiper.slides.eq(index));
  });
  swiper.recalcSlides();

  if (slideTo) {
    if (prependSlidesIndexes.length > 0) {
      if (typeof slideRealIndex === 'undefined') {
        swiper.slideTo(swiper.activeIndex + slidesPrepended, 0, false, true);
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
      }
    } else if (appendSlidesIndexes.length > 0) {
      if (typeof slideRealIndex === 'undefined') {
        swiper.slideTo(swiper.activeIndex - slidesAppended, 0, false, true);
      } else {
        swiper.slideToLoop(slideRealIndex, 0, false, true);
      }
    }
  }

  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;

  swiper.emit('loopFix');
}
