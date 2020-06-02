function updateSwiper(swiper, slides, passedParams, changedParams) {
  const updateParams = changedParams.filter((key) => key !== 'children' && key !== 'direction');
  updateParams.forEach((key) => {
    swiper.params[key] = passedParams[key];
  });

  if (changedParams.includes('children') && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.virtual.slides = slides;
    swiper.virtual.update(true);
  }

  if (changedParams.includes('allowSlideNext')) {
    swiper.allowSlideNext = passedParams.allowSlideNext;
  }
  if (changedParams.includes('allowSlidePrev')) {
    swiper.allowSlidePrev = passedParams.allowSlidePrev;
  }
  if (changedParams.includes('direction')) {
    swiper.changeDirection(passedParams.direction, false);
  }
  swiper.update();
}
export { updateSwiper };
