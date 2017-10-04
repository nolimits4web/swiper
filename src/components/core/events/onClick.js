export default function (e) {
  const swiper = this;
  if (process.env.TARGET === 'desktop') {
    swiper.emit('tap click', e);
  } else if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
