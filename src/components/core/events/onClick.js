export default function onClick(e) {
  const swiper = this;
  const { lastClickTime, touchStartTime } = swiper.touchEventsData;
  const dTime = lastClickTime - touchStartTime;

  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
  }

  if (swiper.params.preventClicksPropagation && (swiper.animating || dTime < 0 || dTime >= 150)) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
