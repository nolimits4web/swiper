export default function () {
  const swiper = this;
  swiper.allowSlidePrev = true;
  if (swiper.allowSlideNext === true && swiper.params.grabCursor) {
    swiper.setGrabCursor();
  }
}
