import {
  A11yOptions,
  AutoplayOptions,
  ControllerOptions,
  CoverflowEffectOptions,
  CubeEffectOptions,
  FadeEffectOptions,
  FlipEffectOptions,
  HashNavigationOptions,
  HistoryOptions,
  KeyboardOptions,
  LazyOptions,
  MousewheelOptions,
  NavigationOptions,
  PaginationOptions,
  ParallaxOptions,
  ScrollbarOptions,
  ThumbsOptions,
  VirtualOptions,
  ZoomOptions,
} from './types/public-api';
import { ComponentOptionsMixin, DefineComponent, PropType } from 'vue';
import { SwiperOptions } from './swiper';
import SwiperClass from './types/swiper-class';

declare const Swiper: DefineComponent<
  {
    tag: {
      type: StringConstructor;
      default: string;
    };
    wrapperTag: {
      type: StringConstructor;
      default: string;
    };
    init: {
      type: BooleanConstructor;
      default: undefined;
    };
    direction: {
      type: PropType<SwiperOptions['direction']>;
      default: SwiperOptions['direction'];
    };
    touchEventsTarget: {
      type: PropType<SwiperOptions['touchEventsTarget']>;
      default: undefined;
    };
    initialSlide: {
      type: NumberConstructor;
      default: undefined;
    };
    speed: { type: NumberConstructor; default: undefined };
    cssMode: { type: BooleanConstructor; default: undefined };
    updateOnWindowResize: {
      type: BooleanConstructor;
      default: undefined;
    };
    resizeObserver: {
      type: BooleanConstructor;
      default: undefined;
    };
    nested: { type: BooleanConstructor; default: undefined };
    focusableElements: {
      type: BooleanConstructor;
      default: undefined;
    };
    width: { type: NumberConstructor; default: undefined };
    height: { type: NumberConstructor; default: undefined };
    preventInteractionOnTransition: {
      type: BooleanConstructor;
      default: undefined;
    };
    userAgent: { type: StringConstructor; default: undefined };
    url: { type: StringConstructor; default: undefined };
    edgeSwipeDetection: {
      type: BooleanConstructor | StringConstructor;
      default: undefined;
    };
    edgeSwipeThreshold: {
      type: NumberConstructor;
      default: undefined;
    };
    freeMode: { type: BooleanConstructor; default: undefined };
    freeModeMomentum: {
      type: BooleanConstructor;
      default: undefined;
    };
    freeModeMomentumRatio: {
      type: NumberConstructor;
      default: undefined;
    };
    freeModeMomentumBounce: {
      type: BooleanConstructor;
      default: undefined;
    };
    freeModeMomentumBounceRatio: {
      type: NumberConstructor;
      default: undefined;
    };
    freeModeMomentumVelocityRatio: {
      type: NumberConstructor;
      default: undefined;
    };
    freeModeSticky: {
      type: BooleanConstructor;
      default: undefined;
    };
    freeModeMinimumVelocity: {
      type: NumberConstructor;
      default: undefined;
    };
    autoHeight: {
      type: BooleanConstructor;
      default: undefined;
    };
    setWrapperSize: {
      type: BooleanConstructor;
      default: undefined;
    };
    virtualTranslate: {
      type: BooleanConstructor;
      default: undefined;
    };
    effect: {
      type: PropType<SwiperOptions['effect']>;
      default: undefined;
    };
    breakpoints: {
      type: PropType<SwiperOptions['breakpoints']>;
      default: undefined;
    };
    spaceBetween: {
      type: NumberConstructor;
      default: undefined;
    };
    slidesPerView: {
      type: PropType<SwiperOptions['slidesPerView']>;
      default: undefined;
    };
    slidesPerColumn: {
      type: NumberConstructor;
      default: undefined;
    };
    slidesPerColumnFill: {
      type: PropType<SwiperOptions['slidesPerColumnFill']>;
      default: undefined;
    };
    slidesPerGroup: {
      type: NumberConstructor;
      default: undefined;
    };
    slidesPerGroupSkip: {
      type: NumberConstructor;
      default: undefined;
    };
    centeredSlides: {
      type: BooleanConstructor;
      default: undefined;
    };
    centeredSlidesBounds: {
      type: BooleanConstructor;
      default: undefined;
    };
    slidesOffsetBefore: {
      type: NumberConstructor;
      default: undefined;
    };
    slidesOffsetAfter: {
      type: NumberConstructor;
      default: undefined;
    };
    normalizeSlideIndex: {
      type: BooleanConstructor;
      default: undefined;
    };
    centerInsufficientSlides: {
      type: BooleanConstructor;
      default: undefined;
    };
    watchOverflow: {
      type: BooleanConstructor;
      default: undefined;
    };
    roundLengths: {
      type: BooleanConstructor;
      default: undefined;
    };
    touchRatio: {
      type: NumberConstructor;
      default: undefined;
    };
    touchAngle: {
      type: NumberConstructor;
      default: undefined;
    };
    simulateTouch: {
      type: BooleanConstructor;
      default: undefined;
    };
    shortSwipes: {
      type: BooleanConstructor;
      default: undefined;
    };
    longSwipes: {
      type: BooleanConstructor;
      default: undefined;
    };
    longSwipesRatio: {
      type: NumberConstructor;
      default: undefined;
    };
    longSwipesMs: {
      type: NumberConstructor;
      default: undefined;
    };
    followFinger: {
      type: BooleanConstructor;
      default: undefined;
    };
    allowTouchMove: {
      type: BooleanConstructor;
      default: undefined;
    };
    threshold: { type: NumberConstructor; default: undefined };
    touchMoveStopPropagation: {
      type: BooleanConstructor;
      default: undefined;
    };
    touchStartPreventDefault: {
      type: BooleanConstructor;
      default: undefined;
    };
    touchStartForcePreventDefault: {
      type: BooleanConstructor;
      default: undefined;
    };
    touchReleaseOnEdges: {
      type: BooleanConstructor;
      default: undefined;
    };
    uniqueNavElements: {
      type: BooleanConstructor;
      default: undefined;
    };
    resistance: {
      type: BooleanConstructor;
      default: undefined;
    };
    resistanceRatio: {
      type: NumberConstructor;
      default: undefined;
    };
    watchSlidesProgress: {
      type: BooleanConstructor;
      default: undefined;
    };
    watchSlidesVisibility: {
      type: BooleanConstructor;
      default: undefined;
    };
    grabCursor: {
      type: BooleanConstructor;
      default: undefined;
    };
    preventClicks: {
      type: BooleanConstructor;
      default: undefined;
    };
    preventClicksPropagation: {
      type: BooleanConstructor;
      default: undefined;
    };
    slideToClickedSlide: {
      type: BooleanConstructor;
      default: undefined;
    };
    preloadImages: {
      type: BooleanConstructor;
      default: undefined;
    };
    updateOnImagesReady: {
      type: BooleanConstructor;
      default: undefined;
    };
    loop: { type: BooleanConstructor; default: undefined };
    loopAdditionalSlides: {
      type: NumberConstructor;
      default: undefined;
    };
    loopedSlides: {
      type: NumberConstructor;
      default: undefined;
    };
    loopFillGroupWithBlank: {
      type: BooleanConstructor;
      default: undefined;
    };
    loopPreventsSlide: {
      type: BooleanConstructor;
      default: undefined;
    };
    allowSlidePrev: {
      type: BooleanConstructor;
      default: undefined;
    };
    allowSlideNext: {
      type: BooleanConstructor;
      default: undefined;
    };
    swipeHandler: {
      type: BooleanConstructor;
      default: undefined;
    };
    noSwiping: {
      type: BooleanConstructor;
      default: undefined;
    };
    noSwipingClass: {
      type: StringConstructor;
      default: undefined;
    };
    noSwipingSelector: {
      type: StringConstructor;
      default: undefined;
    };
    passiveListeners: {
      type: BooleanConstructor;
      default: undefined;
    };
    containerModifierClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideBlankClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideActiveClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideDuplicateActiveClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideVisibleClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideDuplicateClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideNextClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideDuplicateNextClass: {
      type: StringConstructor;
      default: undefined;
    };
    slidePrevClass: {
      type: StringConstructor;
      default: undefined;
    };
    slideDuplicatePrevClass: {
      type: StringConstructor;
      default: undefined;
    };
    wrapperClass: {
      type: StringConstructor;
      default: undefined;
    };
    runCallbacksOnInit: {
      type: BooleanConstructor;
      default: undefined;
    };
    observer: { type: BooleanConstructor; default: undefined };
    observeParents: {
      type: BooleanConstructor;
      default: undefined;
    };
    observeSlideChildren: {
      type: BooleanConstructor;
      default: undefined;
    };
    a11y: {
      type: PropType<A11yOptions | boolean>;
      default: undefined;
    };
    autoplay: {
      type: PropType<AutoplayOptions | boolean>;
      default: undefined;
    };
    controller: {
      type: PropType<ControllerOptions>;
      default: undefined;
    };
    coverflowEffect: {
      type: PropType<CoverflowEffectOptions>;
      default: undefined;
    };
    cubeEffect: {
      type: PropType<CubeEffectOptions>;
      default: undefined;
    };
    fadeEffect: {
      type: PropType<FadeEffectOptions>;
      default: undefined;
    };
    flipEffect: {
      type: PropType<FlipEffectOptions>;
      default: undefined;
    };
    hashNavigation: {
      type: PropType<HashNavigationOptions | boolean>;
      default: undefined;
    };
    history: {
      type: PropType<HistoryOptions | boolean>;
      default: undefined;
    };
    keyboard: {
      type: PropType<KeyboardOptions | boolean>;
      default: undefined;
    };
    lazy: {
      type: PropType<LazyOptions | boolean>;
      default: undefined;
    };
    mousewheel: {
      type: PropType<MousewheelOptions | boolean>;
      default: undefined;
    };
    navigation: {
      type: PropType<NavigationOptions | boolean>;
      default: undefined;
    };
    pagination: {
      type: PropType<PaginationOptions | boolean>;
      default: undefined;
    };
    parallax: {
      type: PropType<ParallaxOptions | boolean>;
      default: undefined;
    };
    scrollbar: {
      type: PropType<ScrollbarOptions | boolean>;
      default: undefined;
    };
    thumbs: { type: PropType<ThumbsOptions>; default: undefined };
    virtual: {
      type: PropType<VirtualOptions | boolean>;
      default: undefined;
    };
    zoom: {
      type: PropType<ZoomOptions | boolean>;
      default: undefined;
    };
  },
  () => JSX.Element,
  unknown,
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  {
    swiper: (swiper: SwiperClass) => void;
    // CORE_EVENTS
    // MODULES_EVENTS
  }
>;

declare const SwiperSlide: DefineComponent<{
  tag: {
    type: StringConstructor;
    default: string;
  };
  swiperRef: SwiperClass;
  zoom: { type: BooleanConstructor; default: undefined };
  virtualIndex: {
    type: StringConstructor | NumberConstructor;
    default: undefined;
  };
}>;

export { Swiper, SwiperSlide };
