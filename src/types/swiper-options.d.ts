import { A11yOptions } from './components/a11y';
import { AutoplayOptions } from './components/autoplay';
import { ControllerOptions } from './components/controller';
import { CoverflowEffectOptions } from './components/effect-coverflow';
import { CubeEffectOptions } from './components/effect-cube';
import { FadeEffectOptions } from './components/effect-fade';
import { FlipEffectOptions } from './components/effect-flip';
import { HashNavigationOptions } from './components/hash-navigation';
import { HistoryOptions } from './components/history';
import { KeyboardOptions } from './components/keyboard';
import { LazyOptions } from './components/lazy';
import { MousewheelOptions } from './components/mousewheel';
import { NavigationOptions } from './components/navigation';
import { PaginationOptions } from './components/pagination';
import { ScrollbarOptions } from './components/scrollbar';
import { ThumbsOptions } from './components/thumbs';
import { VirtualOptions } from './components/virtual';
import { ZoomOptions } from './components/zoom';

import { CSSSelector } from './shared';
import { SwiperEvents } from './swiper-events';

export interface SwiperOptions {
  /**
   * Whether Swiper should be initialised automatically when you create an instance.
   * If disabled, then you need to init it manually by calling mySwiper.init()
   *
   * @default true
   */
  init?: boolean;

  /**
   * Swiper will recalculate slides position on window resize (orientationchange)
   *
   * @default true
   */
  updateOnWindowResize?: boolean;

  /**
   * Index number of initial slide.
   *
   * @default 0
   */
  initialSlide?: number;

  /**
   * Could be 'horizontal' or 'vertical' (for vertical slider).
   *
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';

  /**
   * Duration of transition between slides (in ms)
   *
   * @default 300
   */
  speed?: number;

  /**
   * Enabled this option and plugin will set width/height on swiper wrapper equal to total size of all slides.
   * Mostly should be used as compatibility fallback option for browser that don't support flexbox layout well
   */
  setWrapperSize?: boolean;

  /**
   * Enabled this option and swiper will be operated as usual except it will not move, real translate values on wrapper will not be set.
   * Useful when you may need to create custom slide transition
   */
  virtualTranslate?: boolean;

  /**
   * Swiper width (in px). Parameter allows to force Swiper width.
   * Useful only if you initialize Swiper when it is hidden and in SSR and Test environments for correct Swiper initialization
   *
   * @note Setting this parameter will make Swiper not responsive
   * @default null
   */
  width?: number;

  /**
   * Swiper height (in px). Parameter allows to force Swiper height.
   * Useful only if you initialize Swiper when it is hidden and in SSR and Test environments for correct Swiper initialization
   *
   * @note Setting this parameter will make Swiper not responsive
   * @default null
   */
  height?: number;

  /**
   * Set to true and slider wrapper will adopt its height to the height of the currently active slide
   *
   * @default false
   */
  autoHeight?: boolean;

  /**
   * Set to true to round values of slides width and height to prevent blurry texts on usual
   * resolution screens (if you have such)
   *
   * @default false
   */
  roundLengths?: boolean;

  /**
   * Set to true on  Swiper for correct touch events interception. Use only on
   * swipers that use same direction as the parent one
   *
   * @default false
   */
  nested?: boolean;

  /**
   * If enabled (by default) and navigation elements' parameters passed as a string (like ".pagination")
   * then Swiper will look for such elements through child elements first.
   * Applies for pagination, prev/next buttons and scrollbar elements
   *
   * @default true
   */
  uniqueNavElements?: boolean;

  /**
   * Tranisition effect. Could be "slide", "fade", "cube", "coverflow" or "flip"
   *
   * @default 'slide'
   */
  effect?: 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip';

  /**
   * Fire [Transition/SlideChange][Start/End] events on swiper initialization.
   * Such events will be fired on initialization in case of your initialSlide is not 0, or you use loop mode
   *
   * @default true
   */
  runCallbacksOnInit?: boolean;

  /**
   * When enabled Swiper will be disabled and hide navigation buttons on
   * case there are not enough slides for sliding.
   *
   * @default false
   */
  watchOverflow?: boolean;

  /**
   * Register event handlers.
   */
  on?: {
    [event in keyof SwiperEvents]?: SwiperEvents[event];
  };

  // CSS Scroll Snap

  /**
   * When enabled it will use modern CSS Scroll Snap API.
   * It doesn't support all of Swiper's features, but potentially should bring a much better performance in simple configurations.
   *
   * @default false
   */
  cssMode?: boolean;

  // Slides grid

  /**
   * Distance between slides in px.
   */
  spaceBetween?: number;

  /**
   * Number of slides per view (slides visible at the same time on slider's container).
   * If you use it with "auto" value and along with loop: true then you need to specify loopedSlides parameter with amount of slides to loop (duplicate)
   * slidesPerView: 'auto' is currently not compatible with multirow mode, when slidesPerColumn > 1
   */
  slidesPerView?: number | 'auto';

  /**
   * Number of slides per column, for multirow layout
   * slidesPerColumn > 1 is currently not compatible with loop mode (loop: true)
   */
  slidesPerColumn?: number;

  /**
   * Could be 'column' or 'row'. Defines how slides should fill rows, by column or by row
   */
  slidesPerColumnFill?: 'row' | 'column';

  /**
   * Set numbers of slides to define and enable group sliding. Useful to use with slidesPerView > 1
   */
  slidesPerGroup?: number;

  /**
   * The parameter works in the following way: If slidesPerGroupSkip equals 0 (default), no slides are excluded from grouping, and the resulting behaviour is the same as without this change.
   * If slidesPerGroupSkip is equal or greater than 1 the first X slides are treated as single groups, whereas all following slides are grouped by the slidesPerGroup value.
   *
   * @default 0
   */
  slidesPerGroupSkip?: number;

  /**
   * If true, then active slide will be centered, not always on the left side.
   */
  centeredSlides?: boolean;

  /**
   * If true, then active slide will be centered without adding gaps at the beginning and end of slider.
   * Required centeredSlides: true. Not intended to be used with loop or pagination
   *
   * @default false
   */
  centeredSlidesBounds?: boolean;

  /**
   * Add (in px) additional slide offset in the beginning of the container (before all slides)
   */
  slidesOffsetBefore?: number;

  /**
   * Add (in px) additional slide offset in the end of the container (after all slides)
   */
  slidesOffsetAfter?: number;

  /**
   * Normalize slide index.
   */
  normalizeSlideIndex?: boolean;

  /**
   * When enabled it center slides if the amount of slides less than `slidesPerView`. Not intended to be used loop mode and slidesPerColumn
   */
  centerInsufficientSlides?: boolean;

  // Grab Cursor
  grabCursor?: boolean;

  // Touches

  /**
   * Target element to listen touch events on. Can be 'container' (to listen for touch events on swiper-container) or 'wrapper'
   * (to listen for touch events on swiper-wrapper)
   */
  touchEventsTarget?: 'container' | 'wrapper';

  /**
   * Touch ratio
   */
  touchRatio?: number;

  /**
   * Allowable angle (in degrees) to trigger touch move
   */
  touchAngle?: number;

  /**
   * If true, Swiper will accept mouse events like touch events (click and drag to change slides)
   */
  simulateTouch?: boolean;

  /**
   * Set to false if you want to disable short swipes
   */
  shortSwipes?: boolean;

  /**
   * Set to false if you want to disable long swipes
   */
  longSwipes?: boolean;

  /**
   * Ratio to trigger swipe to next/previous slide during long swipes
   */
  longSwipesRatio?: number;

  /**
   * Minimal duration (in ms) to trigger swipe to next/previous slide during long swipes
   */
  longSwipesMs?: number;

  /**
   * If disabled, then slider will be animated only when you release it, it will not move while you hold your finger on it
   */
  followFinger?: boolean;

  /**
   * If false, then the only way to switch the slide is use of external API functions like slidePrev or slideNext
   */
  allowTouchMove?: boolean;

  /**
   * Threshold value in px. If "touch distance" will be lower than this value then swiper will not move
   */
  threshold?: number;

  /**
   * If disabled, `touchstart` (`mousedown`) event won't be prevented
   */
  touchStartPreventDefault?: boolean;

  /**
   * Force to always prevent default for `touchstart` (`mousedown`) event
   */
  touchStartForcePreventDefault?: boolean;

  /**
   * If enabled, then propagation of "touchmove" will be stopped
   */
  touchMoveStopPropagation?: boolean;

  /**
   * Enable to release Swiper events for swipe-to-go-back work in iOS UIWebView
   */
  iOSEdgeSwipeDetection?: boolean;

  /**
   * Area (in px) from left edge of the screen to release touch events for swipe-to-go-back in iOS UIWebView
   */
  iOSEdgeSwipeThreshold?: number;

  /**
   * Enable to release touch events on slider edge position (beginning, end) to allow for further page scrolling
   */
  touchReleaseOnEdges?: boolean;

  /**
   * Passive event listeners will be used by default where possible to improve scrolling performance on mobile devices.
   * But if you need to use `e.preventDefault` and you have conflict with it, then you should disable this parameter
   */
  passiveListeners?: boolean;

  // Touch Resistance

  /**
   * Set to false if you want to disable resistant bounds
   */
  resistance?: boolean;

  /**
   * This option allows you to control resistance ratio
   */
  resistanceRatio?: number;

  // Swiping / No swiping
  /**
   * When enabled it won't allow to change slides by swiping or navigation/pagination buttons during transition
   *
   * @default false
   */
  preventInteractionOnTransition?: boolean;

  /**
   * Set to false to disable swiping to previous slide direction (to left or top)
   *
   * @default true
   */
  allowSlidePrev?: boolean;

  /**
   * Set to false to disable swiping to next slide direction (to right or bottom)
   *
   * @default true
   */
  allowSlideNext?: boolean;

  /**
   * Enable/disable swiping on elements matched to class specified in noSwipingClass
   *
   * @default true
   */
  noSwiping?: boolean;

  /**
   * Specify noSwiping's' element css class
   *
   * @default 'swiper-no-swiping'
   */
  noSwipingClass?: string;

  /**
   * Can be used instead of noSwipingClass to specify elements to disable swiping on.
   * For example 'input' will disable swiping on all inputs
   *
   * @default
   */
  noSwipingSelector?: string;

  /**
   * String with CSS selector or HTML element of the container with pagination that will work as only available handler for swiping
   *
   * @default null
   */
  swipeHandler?: CSSSelector | HTMLElement;

  // Clicks
  /**
   * Set to true to prevent accidental unwanted clicks on links during swiping
   *
   * @default true
   */
  preventClicks?: boolean;

  /**
   * Set to true to stop clicks event propagation on links during swiping
   *
   * @default true
   */
  preventClicksPropagation?: boolean;

  /**
   * Set to true and click on any slide will produce transition to this slide
   *
   * @default false
   */
  slideToClickedSlide?: boolean;

  // Freemode

  /**
   * If enabled then slides will not have fixed positions
   *
   * @default false
   */
  freeMode?: boolean;

  /**
   * If enabled, then slide will keep moving for a while after you release it
   *
   * @default true
   */
  freeModeMomentum?: boolean;

  /**
   * Higher value produces larger momentum distance after you release slider
   *
   * @default 1
   */
  freeModeMomentumRatio?: number;

  /**
   * Higher value produces larger momentum velocity after you release slider
   *
   * @default 1
   */
  freeModeMomentumVelocityRatio?: number;

  /**
   * Set to false if you want to disable momentum bounce in free mode
   *
   * @default true
   */
  freeModeMomentumBounce?: boolean;

  /**
   * Higher value produces larger momentum bounce effect
   *
   * @default 1
   */
  freeModeMomentumBounceRatio?: number;

  /**
   * Minimum touchmove-velocity required to trigger free mode momentum
   *
   * @default 0.02
   */
  freeModeMinimumVelocity?: number;

  /**
   * Set to enabled to enable snap to slides positions in free mode
   *
   * @default false
   */
  freeModeSticky?: boolean;

  // Progress
  /**
   * Enable this feature to calculate each slides progress
   *
   * @default false
   */
  watchSlidesProgress?: boolean;

  /**
   * watchSlidesProgress should be enabled. Enable this option and slides that are in viewport will have additional visible class
   *
   * @default false
   */
  watchSlidesVisibility?: boolean;

  // Images
  /**
   * When enabled Swiper will force to load all images
   *
   * @default true
   */
  preloadImages?: boolean;

  /**
   * When enabled Swiper will be reinitialized after all inner images (<img> tags) are loaded. Required preloadImages: true
   *
   * @default true
   */
  updateOnImagesReady?: boolean;

  // Loop
  /**
   * Enables continuous loop mode
   *
   * @default false
   */
  loop?: boolean;

  /**
   * Addition number of slides that will be cloned after creating of loop
   *
   * @default 0
   */
  loopAdditionalSlides?: number;

  /**
   * If you use slidesPerView:'auto' with loop mode you should tell to Swiper how many slides it should loop (duplicate) using this parameter
   *
   * @default null
   */
  loopedSlides?: number;

  /**
   * Enable and loop mode will fill groups with insufficient number of slides with blank slides. Good to be used with slidesPerGroup parameter
   *
   * @default false
   */
  loopFillGroupWithBlank?: boolean;

  // Breakpoints
  breakpoints?: {
    [width: number]: SwiperOptions;
    [ratio: string]: SwiperOptions;
  };

  // Observer
  /**
   * Set to true to enable Mutation Observer on Swiper and its elements. In this case Swiper will be updated (reinitialized) each time if you change its style (like hide/show) or modify its child elements (like adding/removing slides)
   *
   * @default false
   */
  observer?: boolean;
  /**
   * Set to true if you also need to watch Mutations for Swiper slide children elements
   *
   * @default false
   */
  observeSlideChildren?: boolean;
  /**
   * Set to true if you also need to watch Mutations for Swiper parent elements
   *
   * @default false
   */
  observeParents?: boolean;

  // Namespace
  containerModifierClass?: string;
  slideClass?: string;
  slideBlankClass?: string;
  slideActiveClass?: string;
  slideDuplicateActiveClass?: string;
  slideVisibleClass?: string;
  slideDuplicateClass?: string;
  slideNextClass?: string;
  slideDuplicateNextClass?: string;
  slidePrevClass?: string;
  slideDuplicatePrevClass?: string;
  wrapperClass?: string;

  // ssr
  /**
   * userAgent string. Required for browser/device detection when rendered on server-side
   *
   * @default null
   */
  userAgent?: string;
  /**
   * Required for active slide detection when rendered on server-side and enabled history
   *
   * @default null
   */
  url?: string;

  a11y?: A11yOptions;
  autoplay?: AutoplayOptions | boolean;
  controller?: ControllerOptions;
  coverflowEffect?: CoverflowEffectOptions;
  cubeEffect?: CubeEffectOptions;
  fadeEffect?: FadeEffectOptions;
  flipEffect?: FlipEffectOptions;
  hashNavigation?: HashNavigationOptions | boolean;
  history?: HistoryOptions | boolean;
  keyboard?: KeyboardOptions | boolean;
  lazy?: LazyOptions | boolean;
  mousewheel?: MousewheelOptions | boolean;
  navigation?: NavigationOptions;
  pagination?: PaginationOptions;
  parallax?: boolean;
  scrollbar?: ScrollbarOptions;
  thumbs?: ThumbsOptions;
  virtual?: VirtualOptions | boolean;
  zoom?: ZoomOptions | boolean;
}
