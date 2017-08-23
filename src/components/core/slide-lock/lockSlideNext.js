export default function () {
  const swiper = this;
  swiper.allowSlideNext = false;
  if (swiper.allowSlidePrev === false && swiper.params.grabCursor) {
    swiper.unsetGrabCursor();
  }
}
