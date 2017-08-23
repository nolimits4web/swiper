export default function () {
  const swiper = this;
  swiper.allowSlidePrev = false;
  if (swiper.allowSlideNext === false && swiper.params.grabCursor) {
    swiper.unsetGrabCursor();
  }
}
