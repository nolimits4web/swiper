export default function (runCallbacks = true) {
  const swiper = this;
  const { activeIndex, previousIndex } = swiper;
  swiper.animating = false;
  swiper.setTransition(0);

  // if (s.lazy) s.lazy.onTransitionEnd();

  if (runCallbacks) {
    swiper.emit('transitionEnd');
    if (activeIndex !== previousIndex) {
      swiper.emit('slideChangeEnd');
      if (activeIndex > previousIndex) {
        swiper.emit('slideNextEnd');
      } else {
        swiper.emit('slidePrevEnd');
      }
    }
  }
  // if (s.params.history && s.history) {
  //     s.history.setHistory(s.params.history, s.activeIndex);
  // }
  // if (s.params.hashnav && s.hashnav) {
  //     s.hashnav.setHash();
  // }
}
