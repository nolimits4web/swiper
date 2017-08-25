export default function (runCallbacks = true) {
  const swiper = this;
  const { activeIndex, previousIndex } = swiper;
  swiper.animating = false;
  swiper.setTransition(0);

  swiper.emit('transitionEnd');
  if (runCallbacks) {
    if (activeIndex !== previousIndex) {
      swiper.emit('slideChangeEnd');
      if (activeIndex > previousIndex) {
        swiper.emit('slideNextEnd');
      } else {
        swiper.emit('slidePrevEnd');
      }
    }
  }
}
