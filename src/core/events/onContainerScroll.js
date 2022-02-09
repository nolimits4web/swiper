export default function onContainerScroll(event) {
  event.preventDefault();
  const swiper = this;
  const { deltaX, deltaY } = event;
  const { enabled } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  const pxDiff = swiper.isHorizontal() ? deltaX : deltaY;
  swiper.translate -= pxDiff / 2.5;
  console.log(pxDiff);
  // eslint-disable-next-line
  if (swiper.translate === -0) swiper.translate = 0;
  const prev = swiper.realIndex;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  // swiper.slideTo(swiper.activeIndex);
  if (prev !== swiper.realIndex) {
    swiper.slideTo(swiper.realIndex);
  }
}
