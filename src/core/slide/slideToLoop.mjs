export default function slideToLoop(
  index = 0,
  speed = this.params.speed,
  runCallbacks = true,
  internal,
) {
  if (typeof index === 'string') {
    const indexAsNumber = parseInt(index, 10);

    index = indexAsNumber;
  }

  const swiper = this;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      // eslint-disable-next-line
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      const targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      const slides = swiper.slides.length;
      const { centeredSlides } = swiper.params;
      let slidesPerView = swiper.params.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (centeredSlides && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = slides - targetSlideIndex < slidesPerView;
      if (centeredSlides) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (needLoopFix) {
        const direction = centeredSlides
          ? targetSlideIndex < swiper.activeIndex
            ? 'prev'
            : 'next'
          : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView
          ? 'next'
          : 'prev';

        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex:
            direction === 'next' ? targetSlideIndex + 1 : targetSlideIndex - slides + 1,
          slideRealIndex: direction === 'next' ? swiper.realIndex : undefined,
        });
      }

      newIndex = swiper.getSlideIndexByData(newIndex);
    }
  }

  return swiper.slideTo(newIndex, speed, runCallbacks, internal);
}
