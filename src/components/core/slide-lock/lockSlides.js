export default function () {
  const swiper = this;
  swiper.allowSlidePrev = false;
  swiper.allowSlideNext = false;
  if (swiper.params.grabCursor) {
    swiper.unsetGrabCursor();
  }
}
