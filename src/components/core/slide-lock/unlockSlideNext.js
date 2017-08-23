export default function () {
  const swiper = this;
  swiper.allowSlideNext = true;
  if (swiper.allowSlidePrev === true && swiper.params.grabCursor) {
    swiper.setGrabCursor();
  }
}
