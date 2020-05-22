export default function () {
  const swiper = this;
  if (
    swiper.support.touch ||
    (swiper.params.watchOverflow && swiper.isLocked) ||
    swiper.params.cssMode
  ) {
    return;
  }
  swiper.el.style.cursor = '';
}
