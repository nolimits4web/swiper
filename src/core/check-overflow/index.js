function checkOverflow() {
  const swiper = this;
  const params = swiper.params;
  const wasLocked = swiper.isLocked;
  const { slidesOffsetBefore } = params;

  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge =
      swiper.slidesGrid[lastSlideIndex] +
      swiper.slidesSizesGrid[lastSlideIndex] +
      slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }

  swiper.allowSlideNext = !swiper.isLocked;
  swiper.allowSlidePrev = !swiper.isLocked;

  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
  }
}

export default { checkOverflow };
