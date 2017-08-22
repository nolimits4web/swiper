/* eslint no-unused-vars: "off" */
export default function (speed = this.params.speed, runCallbacks = true, internal) {
  const swiper = this;
  const { params, animating, activeIndex } = swiper;

  if (params.loop) {
    if (animating) return false;
    swiper.loop.fix();
    const clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(activeIndex - 1, speed, runCallbacks, internal);
  }
  return swiper.slideTo(activeIndex - 1, speed, runCallbacks, internal);
}
