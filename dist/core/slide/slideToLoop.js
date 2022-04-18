export default function slideToLoop(index, speed, runCallbacks, internal) {
  if (index === void 0) {
    index = 0;
  }

  if (speed === void 0) {
    speed = this.params.speed;
  }

  if (runCallbacks === void 0) {
    runCallbacks = true;
  }

  const swiper = this;
  let newIndex = index;

  if (swiper.params.loop) {
    newIndex += swiper.loopedSlides;
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}