// eslint-disable-next-line
import Swiper from '../../core';
import { isObject, extend } from './utils';
import { calcLoopedSlides } from './loop';

const allowedParams = [
  'init',
  'direction',
  'touchEventsTarget',
  'initialSlide',
  'speed',
  'cssMode',
  'updateOnWindowResize',
  'preventInteractionOnTransition',
  'userAgent',
  'url',
  'edgeSwipeDetection',
  'edgeSwipeThreshold',
  'freeMode',
  'freeModeMomentum',
  'freeModeMomentumRatio',
  'freeModeMomentumBounce',
  'freeModeMomentumBounceRatio',
  'freeModeMomentumVelocityRatio',
  'freeModeSticky',
  'freeModeMinimumVelocity',
  'autoHeight',
  'setWrapperSize',
  'virtualTranslate',
  'effect',
  'breakpoints',
  'spaceBetween',
  'slidesPerView',
  'slidesPerColumn',
  'slidesPerColumnFill',
  'slidesPerGroup',
  'slidesPerGroupSkip',
  'centeredSlides',
  'centeredSlidesBounds',
  'slidesOffsetBefore',
  'slidesOffsetAfter',
  'normalizeSlideIndex',
  'centerInsufficientSlides',
  'watchOverflow',
  'roundLengths',
  'touchRatio',
  'touchAngle',
  'simulateTouch',
  'shortSwipes',
  'longSwipes',
  'longSwipesRatio',
  'longSwipesMs',
  'followFinger',
  'allowTouchMove',
  'threshold',
  'touchMoveStopPropagation',
  'touchStartPreventDefault',
  'touchStartForcePreventDefault',
  'touchReleaseOnEdges',
  'uniqueNavElements',
  'resistance',
  'resistanceRatio',
  'watchSlidesProgress',
  'watchSlidesVisibility',
  'grabCursor',
  'preventClicks',
  'preventClicksPropagation',
  'slideToClickedSlide',
  'preloadImages',
  'updateOnImagesReady',
  'loop',
  'loopAdditionalSlides',
  'loopedSlides',
  'loopFillGroupWithBlank',
  'allowSlidePrev',
  'allowSlideNext',
  'swipeHandler',
  'noSwiping',
  'noSwipingClass',
  'noSwipingSelector',
  'passiveListeners',
  'containerModifierClass',
  'slideClass',
  'slideBlankClass',
  'slideActiveClass',
  'slideDuplicateActiveClass',
  'slideVisibleClass',
  'slideDuplicateClass',
  'slideNextClass',
  'slideDuplicateNextClass',
  'slidePrevClass',
  'slideDuplicatePrevClass',
  'wrapperClass',
  'runCallbacksOnInit',

  // modules
  'a11y',
  'auoplay',
  'controller',
  'coverflowEffect',
  'cubeEffect',
  'fadeEffect',
  'flipEffect',
  'hashNavigation',
  'history',
  'keyboard',
  'lazy',
  'mousewheel',
  'navigation',
  'pagination',
  'parallax',
  'scrollbar',
  'thumbs',
  'virtual',
  'zoom',
];

function getParams(obj = {}) {
  const params = {
    _emitClasses: true,
    on: {},
  };
  extend(params, Swiper.defaults);
  extend(params, Swiper.extendedDefaults);

  const rest = {};
  Object.keys(obj).forEach((key) => {
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(obj[key])) {
        params[key] = {};
        extend(params[key], obj[key]);
      } else {
        params[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
      params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });

  return { params, rest };
}

export { getParams };
