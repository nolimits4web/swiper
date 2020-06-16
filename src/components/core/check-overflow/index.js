function checkOverflow() {
  const swiper = this;
  const params = swiper.params;
  const wasLocked = swiper.isLocked;
  const lastSlidePosition =
    swiper.slides.length > 0 &&
    params.slidesOffsetBefore +
      params.spaceBetween * (swiper.slides.length - 1) +
      swiper.slides[0].offsetWidth * swiper.slides.length;

  if (params.slidesOffsetBefore && params.slidesOffsetAfter && lastSlidePosition) {
    swiper.isLocked = lastSlidePosition <= swiper.size;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }

  swiper.allowSlideNext = !swiper.isLocked;
  swiper.allowSlidePrev = !swiper.isLocked;

  // events
  if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? 'lock' : 'unlock');

  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
    if (swiper.navigation) swiper.navigation.update();
  }
}

export default { checkOverflow };
