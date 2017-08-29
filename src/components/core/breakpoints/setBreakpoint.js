import window from '../../../utils/window';
import Utils from '../../../utils/utils';

function getBreakpoint(breakpoints) {
  // Get breakpoint for window width
  if (!breakpoints) return undefined;
  let breakpoint = false;
  const points = [];
  Object.keys(breakpoints).forEach((point) => {
    points.push(point);
  });
  points.sort((a, b) => parseInt(a, 10) > parseInt(b, 10));
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    if (point >= window.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}

export default function () {
  const swiper = this;
  const { activeIndex, loopedSlides, params } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return;
  // Set breakpoint for window width and update parameters
  const breakpoint = getBreakpoint(breakpoints);
  if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
    const breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
    const needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

    Utils.extend(swiper.params, breakPointsParams);

    Utils.extend(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });

    swiper.currentBreakpoint = breakpoint;

    if (needsReLoop) {
      const oldIndex = activeIndex - loopedSlides;
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo(oldIndex + loopedSlides, 0, false);
    }
  }
}
