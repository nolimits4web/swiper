export default function (runCallbacks = true) {
  const swiper = this;
  const { activeIndex, params, previousIndex } = swiper;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  swiper.emit('transitionStart');

  if (!runCallbacks) return;
  if (activeIndex !== previousIndex) {
    swiper.emit('slideChangeStart');
    if (activeIndex > previousIndex) {
      swiper.emit('slideNextStart');
    } else {
      swiper.emit('slidePrevStart');
    }
  }
}
