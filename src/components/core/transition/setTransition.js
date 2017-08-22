export default function (duration, byController) {
  const swiper = this;

  swiper.$wrapperEl.transition(duration);
  // if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
  //     s.effects[s.params.effect].setTransition(duration);
  // }
  // if (s.params.parallax && s.parallax) {
  //     s.parallax.setTransition(duration);
  // }
  // if (s.params.scrollbar && s.scrollbar) {
  //     s.scrollbar.setTransition(duration);
  // }
  // if (s.params.control && s.controller) {
  //     s.controller.setTransition(duration, byController);
  // }
  swiper.emit('setTransition', duration, byController);
}
