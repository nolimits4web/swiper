import Utils from '../../../utils/utils';

export default function () {
  const swiper = this;
  const {
    activeIndex, initialized, loopedSlides = 0, params,
  } = swiper;
  const breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return;
  // Set breakpoint for window width and update parameters
  const breakpoint = swiper.getBreakpoint(breakpoints);
  var DEBUG = false; //Set this to true if you want to debug.
  if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
    if (DEBUG) {
      // Before fixing the integer/string issue, see how it is messed up.
      var breakPointsParamsDebug = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
      console.log(typeof breakPointsParamsDebug.slidesPerView + ' = type of breakPointsParamsDebug.slidesPerView')
      console.log(typeof breakPointsParamsDebug.slidesPerGroup + ' = type of breakPointsParamsDebug.slidesPerGroup')
      console.log(breakPointsParamsDebug.slidesPerGroup + ' breakPointsParamsDebug slidesPerGroup breakpoints val');
      console.log(params.slidesPerView + ' slidesPerView params val');
      console.log(params.slidesPerGroup + ' slidesPerGroup params val');
    }
    // Unless 'auto', these values must be integers, we must do math operations, not string concatenations.
    if (breakpoint in breakpoints && typeof breakpoints[breakpoint].slidesPerView !== 'undefined') {
      // If it's 'auto' cannot make it an integer but we can make it lowercase.
      if (breakpoints[breakpoint].slidesPerView == 'auto' || breakpoints[breakpoint].slidesPerView == 'AUTO') {
        breakpoints[breakpoint].slidesPerView = breakpoints[breakpoint].slidesPerView.toLowerCase();
      } else {
        // Force slidesPerView to an integer using parseInt(x, 10) (base 10).
        breakpoints[breakpoint].slidesPerView = parseInt(breakpoints[breakpoint].slidesPerView, 10);
      }
    }
    if (breakpoint in breakpoints && typeof breakpoints[breakpoint].spaceBetween !== 'undefined') {
      // Force spaceBetween to an integer using parseInt(x, 10) (base 10).
      breakpoints[breakpoint].spaceBetween = parseInt(breakpoints[breakpoint].spaceBetween, 10);
    }
    if (breakpoint in breakpoints && typeof breakpoints[breakpoint].slidesPerGroup !== 'undefined') {
      // Force slidesPerGroup to an integer using parseInt(x, 10) (base 10).
      breakpoints[breakpoint].slidesPerGroup = parseInt(breakpoints[breakpoint].slidesPerGroup, 10);
    }
    const breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
    const needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

    Utils.extend(swiper.params, breakPointsParams);

    Utils.extend(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });

    swiper.currentBreakpoint = breakpoint;

    if (DEBUG) {
      console.log(typeof swiper.params.slidesPerView + ' = type of swiper.params.slidesPerView')
      console.log(typeof swiper.params.slidesPerGroup + ' = type of swiper.params.slidesPerGroup')
      console.log(params.slidesPerView + ' slidesPerView params val after Utils.extend');
      console.log(params.slidesPerGroup + ' slidesPerGroup params val after Utils.extend');
    }
    if (typeof breakPointsParams.slidesPerGroup !== 'undefined') {
      // Use the breakpoint slidesPerGroup, otherwise we'd get the default desktop setting.
      swiper.params.slidesPerGroup = breakPointsParams.slidesPerGroup;
    }
    if (typeof breakPointsParams.slidesPerView !== 'undefined') {
      // Use the breakpoint slidesPerView, otherwise we'd get the default desktop setting.
      swiper.params.slidesPerView = breakPointsParams.slidesPerView;
    }
    if (typeof breakPointsParams.spaceBetween !== 'undefined') {
      // Use the breakpoint spaceBetween, otherwise we'd get the default desktop setting.
      swiper.params.spaceBetween = breakPointsParams.spaceBetween;
    }
    if (needsReLoop && initialized) {
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
    }
    swiper.emit('breakpoint', breakPointsParams);
  }
}
