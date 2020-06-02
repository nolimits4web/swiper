import { SwiperOptions } from './swiper-options';

import { A11yEvents } from './components/a11y';
import { AutoplayEvents } from './components/autoplay';
import { ControllerEvents } from './components/controller';
import { CoverflowEffectEvents } from './components/effect-coverflow';
import { CubeEffectEvents } from './components/effect-cube';
import { FadeEffectEvents } from './components/effect-fade';
import { FlipEffectEvents } from './components/effect-flip';
import { HashNavigationEvents } from './components/hash-navigation';
import { HistoryEvents } from './components/history';
import { KeyboardEvents } from './components/keyboard';
import { LazyEvents } from './components/lazy';
import { MousewheelEvents } from './components/mousewheel';
import { NavigationEvents } from './components/navigation';
import { PaginationEvents } from './components/pagination';
import { ParallaxEvents } from './components/parallax';
import { ScrollbarEvents } from './components/scrollbar';
import { ThumbsEvents } from './components/thumbs';
import { VirtualEvents } from './components/virtual';
import { ZoomEvents } from './components/zoom';

interface SwiperEvents {
  /**
   * Fired right after Swiper initialization.
   * @note Note that with swiper.on('init') syntax it will
   * work only in case you set init: false parameter.
   *
   * @example
   * var swiper = new Swiper('.swiper-container', {
   *   init: false,
   *   // other parameters
   * });
   * swiper.on('init', function() {
   *  // do something
   * });
   * // init Swiper
   * swiper.init();
   *
   * @example
   * // Otherwise use it as the parameter:
   * var swiper = new Swiper('.swiper-container', {
   *   // other parameters
   *   on: {
   *     init: function () {
   *       // do something
   *     },
   *   }
   * });
   */
  init?: () => any;

  /**
   * Event will be fired right before Swiper destroyed
   */
  beforeDestroy: () => void;

  /**
   * Event will be fired when currently active slide is changed
   */
  slideChange: () => void;

  /**
   * Event will be fired in the beginning of animation to other slide (next or previous).
   */
  slideChangeTransitionStart: () => void;

  /**
   * Event will be fired after animation to other slide (next or previous).
   */
  slideChangeTransitionEnd: () => void;

  /**
   * Same as "slideChangeTransitionStart" but for "forward" direction only
   */
  slideNextTransitionStart: () => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "forward" direction only
   */
  slideNextTransitionEnd: () => void;

  /**
   * Same as "slideChangeTransitionStart" but for "backward" direction only
   */
  slidePrevTransitionStart: () => void;

  /**
   * Same as "slideChangeTransitionEnd" but for "backward" direction only
   */
  slidePrevTransitionEnd: () => void;

  /**
   * Event will be fired in the beginning of transition.
   */
  transitionStart: () => void;

  /**
   * Event will be fired after transition.
   */
  transitionEnd: () => void;

  /**
   * Event will be fired when user touch Swiper. Receives 'touchstart' event as an arguments.
   */
  touchStart: (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper. Receives 'touchmove' event as an arguments.
   */
  touchMove(): (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper in direction opposite to direction parameter. Receives 'touchmove' event as an arguments.
   */
  touchMoveOpposite: (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user touch and move finger over Swiper and move it. Receives 'touchmove' event as an arguments.
   */
  sliderMove: (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user release Swiper. Receives 'touchend' event as an arguments.
   */
  touchEnd: (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.
   */
  click: (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user click/tap on Swiper. Receives 'touchend' event as an arguments.
   */
  tap: (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired when user double tap on Swiper's container. Receives 'touchend' event as an arguments
   */
  doubleTap: (event: MouseEvent | TouchEvent | PointerEvent) => void;

  /**
   * Event will be fired right after all inner images are loaded. updateOnImagesReady should be also enabled
   */
  imagesReady: () => void;

  /**
   * Event will be fired when Swiper progress is changed, as an arguments it receives progress that is always from 0 to 1
   */
  progress: (progress: number) => void;

  /**
   * Event will be fired when Swiper reach its beginning (initial position)
   */
  reachBeginning: () => void;

  /**
   * Event will be fired when Swiper reach last slide
   */
  reachEnd: () => void;

  /**
   * Event will be fired when Swiper goes to beginning or end position
   */
  toEdge: () => void;

  /**
   * Event will be fired when Swiper goes from beginning or end position
   */
  fromEdge: () => void;

  /**
   * Event will be fired when swiper's wrapper change its position. Receives current translate value as an arguments
   */
  setTranslate: (translate: number) => void;

  /**
   * Event will be fired everytime when swiper starts animation. Receives current transition duration (in ms) as an arguments
   */
  setTransition: (transition: number) => void;

  /**
   * Event will be fired on window resize right before swiper's onresize manipulation
   */
  resize: () => void;

  /**
   * Event will be fired if observer is enabled and it detects DOM mutations
   */
  observerUpdate: () => void;

  /**
   * Event will be fired right before "loop fix"
   */
  beforeLoopFix: () => void;

  /**
   * Event will be fired after "loop fix"
   */
  loopFix: () => void;

  /**
   * Event will be fired on breakpoint change
   */
  breakpoint: (breakpointParams: SwiperOptions) => void;
}

interface SwiperEvents extends A11yEvents {}
interface SwiperEvents extends AutoplayEvents {}
interface SwiperEvents extends ControllerEvents {}
interface SwiperEvents extends CoverflowEffectEvents {}
interface SwiperEvents extends CubeEffectEvents {}
interface SwiperEvents extends FadeEffectEvents {}
interface SwiperEvents extends FlipEffectEvents {}
interface SwiperEvents extends HashNavigationEvents {}
interface SwiperEvents extends HistoryEvents {}
interface SwiperEvents extends KeyboardEvents {}
interface SwiperEvents extends LazyEvents {}
interface SwiperEvents extends MousewheelEvents {}
interface SwiperEvents extends NavigationEvents {}
interface SwiperEvents extends PaginationEvents {}
interface SwiperEvents extends ParallaxEvents {}
interface SwiperEvents extends ScrollbarEvents {}
interface SwiperEvents extends ThumbsEvents {}
interface SwiperEvents extends VirtualEvents {}
interface SwiperEvents extends ZoomEvents {}
