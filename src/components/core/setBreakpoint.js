import Utils from '../../utils/utils';

let currentBreakpoint;

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
  const breakpoints = swiper.params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return;
  // Set breakpoint for window width and update parameters
  const breakpoint = getBreakpoint(breakpoints);
  if (breakpoint && currentBreakpoint !== breakpoint) {
    const breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
    const needsReLoop = swiper.params.loop && (breakPointsParams.slidesPerView !== swiper.params.slidesPerView);

    Utils.extend(swiper.params, breakPointsParams);

    currentBreakpoint = breakpoint;
    // if (needsReLoop && swiper.destroyLoop) {
    //   swiper.reLoop(true);
    // }
  }
}
