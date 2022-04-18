/* eslint no-unused-vars: "off" */
export default function slideReset(speed, runCallbacks, internal) {
  if (speed === void 0) {
    speed = this.params.speed;
  }

  if (runCallbacks === void 0) {
    runCallbacks = true;
  }

  const swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}