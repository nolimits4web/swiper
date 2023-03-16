export default function slideToLoop(
  index = 0,
  speed = this.params.speed,
  runCallbacks = true,
  internal,
) {
  if (typeof index === 'string') {
    const indexAsNumber = parseInt(index, 10);

    index = indexAsNumber;
  }

  const swiper = this;
  const slidesPerView = swiper.passedParams.slidesPerView;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      // eslint-disable-next-line
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      newIndex = swiper.getSlideIndex(
        swiper.slides.filter(
          (slideEl) => slideEl.getAttribute('data-swiper-slide-index') * 1 === newIndex,
        )[0],
      );
      if (slidesPerView > 1 && swiper.slides.length < newIndex + slidesPerView) {
        setTimeout(() => swiper.loopFix({ direction: 'next' }), speed);
      }
    }
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
