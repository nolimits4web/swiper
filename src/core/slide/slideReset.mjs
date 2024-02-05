/* eslint no-unused-vars: "off" */
export default function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  if (swiper.destroyed) return;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
