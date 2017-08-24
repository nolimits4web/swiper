export default function (runCallbacks = true) {
  const swiper = this;
  const { activeIndex, params, previousIndex } = swiper;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  if (!runCallbacks) return;

  swiper.emit('transitionStart');
  if (activeIndex !== previousIndex) {
    swiper.emit('slideChangeStart');
    if (activeIndex > previousIndex) {
      swiper.emit('slideNextStart');
    } else {
      swiper.emit('slidePrevStart');
    }
  }
}
