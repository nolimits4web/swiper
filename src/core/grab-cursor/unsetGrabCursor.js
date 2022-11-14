export default function unsetGrabCursor() {
  const swiper = this;
  if ((swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) {
    return;
  }
  swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
}
