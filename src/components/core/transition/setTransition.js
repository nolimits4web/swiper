export default function (duration, byController) {
  const swiper = this;

  swiper.$wrapperEl.transition(duration);

  swiper.emit('setTransition', duration, byController);
}
