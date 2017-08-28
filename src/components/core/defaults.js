export default {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'container',
  initialSlide: 0,
  speed: 300,
  // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
  iOSEdgeSwipeDetection: false,
  iOSEdgeSwipeThreshold: 20,
  // Free mode
  freeMode: false,
  freeModeMomentum: true,
  freeModeMomentumRatio: 1,
  freeModeMomentumBounce: true,
  freeModeMomentumBounceRatio: 1,
  freeModeMomentumVelocityRatio: 1,
  freeModeSticky: false,
  freeModeMinimumVelocity: 0.02,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  coverflow: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  flip: {
    slideShadows: true,
    limitRotation: true,
  },
  cube: {
    slideShadows: true,
    shadow: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  fade: {
    crossFade: false,
  },
  // Breakpoints
  breakpoints: undefined,
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerColumnFill: 'column',
  slidesPerGroup: 1,
  centeredSlides: false,
  slidesOffsetBefore: 0, // in px
  slidesOffsetAfter: 0, // in px
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  onlyExternal: false,
  threshold: 0,
  touchMoveStopPropagation: true,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  watchSlidesVisibility: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // Lazy Loading
  lazyLoading: false,
  lazyLoadingInPrevNext: false,
  lazyLoadingInPrevNextAmount: 1,
  lazyLoadingOnTransitionStart: false,
  // Images
  preloadImages: true,
  updateOnImagesReady: true,
  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,
  // Control
  control: undefined,
  controlInverse: false,
  controlBy: 'slide', // or 'container'
  normalizeSlideIndex: true,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null, // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',
  // Passive Listeners
  passiveListeners: true,
  // NS
  containerModifierClass: 'swiper-container-', // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',

  lazyLoadingClass: 'swiper-lazy',
  lazyStatusLoadingClass: 'swiper-lazy-loading',
  lazyStatusLoadedClass: 'swiper-lazy-loaded',
  lazyPreloaderClass: 'swiper-lazy-preloader',
  notificationClass: 'swiper-notification',
  preloaderClass: 'preloader',

  // Observer
  observer: false,
  observeParents: false,

  // Accessibility
  a11y: false,
  prevSlideMessage: 'Previous slide',
  nextSlideMessage: 'Next slide',
  firstSlideMessage: 'This is the first slide',
  lastSlideMessage: 'This is the last slide',
  paginationBulletMessage: 'Go to slide {{index}}',
  // Callbacks
  runCallbacksOnInit: true,
};
