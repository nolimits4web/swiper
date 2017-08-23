export default function () {
  const swiper = this;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.params.grabCursor) {
    swiper.setGrabCursor();
  }
}
