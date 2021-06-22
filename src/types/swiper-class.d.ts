import { Dom7Array } from 'dom7';
import { SwiperOptions } from './swiper-options';
import { CSSSelector, SwiperComponent } from './shared';
import { SwiperEvents } from './swiper-events';

import { A11yMethods } from './components/a11y';
import { AutoplayMethods } from './components/autoplay';
import { ControllerMethods } from './components/controller';
import { CoverflowEffectMethods } from './components/effect-coverflow';
import { CubeEffectMethods } from './components/effect-cube';
import { FadeEffectMethods } from './components/effect-fade';
import { FlipEffectMethods } from './components/effect-flip';
import { HashNavigationMethods } from './components/hash-navigation';
import { HistoryMethods } from './components/history';
import { KeyboardMethods } from './components/keyboard';
import { LazyMethods } from './components/lazy';
import { MousewheelMethods } from './components/mousewheel';
import { NavigationMethods } from './components/navigation';
import { PaginationMethods } from './components/pagination';
import { ParallaxMethods } from './components/parallax';
import { ScrollbarMethods } from './components/scrollbar';
import { ThumbsMethods } from './components/thumbs';
import { VirtualMethods } from './components/virtual';
import { ZoomMethods } from './components/zoom';

interface SwiperClass<Events> {
  /** Add event handler */
  on<E extends keyof Events>(event: E, handler: Events[E]): void;
  /** Add event handler that will be removed after it was fired */
  once<E extends keyof Events>(event: E, handler: Events[E]): void;
  /** Remove event handler */
  off<E extends keyof Events>(event: E, handler: Events[E]): void;
  /** Remove all handlers for specified event */
  off<E extends keyof Events>(event: E): void;
  /** Fire event on instance */
  emit<E extends keyof Events>(event: E, ...args: any[]): void;
}

interface Swiper extends SwiperClass<SwiperEvents> {
  /**
   * Object with passed initialization parameters
   */
  params: SwiperOptions;

  /**
   * Dom7 element with slider container HTML element. To get vanilla HTMLElement use `swiper.el`
   */
  $el: Dom7Array;

  /**
   * Slider container HTML element
   */
  el: HTMLElement;

  /**
   * Dom7 element with slider wrapper HTML element. To get vanilla HTMLElement use `swiper.wrapperEl`
   */
  $wrapperEl: Dom7Array;

  /**
   * Wrapper HTML element
   */
  wrapperEl: HTMLElement;

  /**
   * Dom7 array-like collection of slides HTML elements. To get specific slide HTMLElement use `swiper.slides[1]`
   */
  slides: Dom7Array;

  /**
   * Width of container
   */
  width: number;

  /**
   * Height of container
   */
  height: number;

  /**
   * Current value of wrapper translate
   */
  translate: number;

  /**
   * Current progress of wrapper translate (from 0 to 1)
   */
  progress: number;

  /**
   * Index number of currently active slide
   *
   * @note Note, that in loop mode active index value will be always shifted on a number of looped/duplicated slides
   */
  activeIndex: number;

  /**
   * Index number of currently active slide considering duplicated slides in loop mode
   */
  realIndex: number;

  /**
   * Index number of previously active slide
   */
  previousIndex: number;

  /**
   * `true` if slider on most "left"/"top" position
   */
  isBeginning: boolean;

  /**
   * `true` if slider on most "right"/"bottom" position
   */
  isEnd: boolean;

  /**
   * `true` if swiper is in transition
   */
  animating: boolean;

  /**
   * Object with the following touch event properties:
   *
   * - `swiper.touches.startX`
   * - `swiper.touches.startY`
   * - `swiper.touches.currentX`
   * - `swiper.touches.currentY`
   * - `swiper.touches.diff`
   */
  touches: {
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    diff: number;
  };

  /**
   * Index number of last clicked slide
   */
  clickedIndex: number;

  /**
   * Link to last clicked slide (HTMLElement)
   */
  clickedSlide: HTMLElement;

  /**
   * Disable / enable ability to slide to the next slides by assigning `false` / `true` to this property
   */
  allowSlideNext: boolean;

  /**
   * Disable / enable ability to slide to the previous slides by assigning `false` / `true` to this property
   */
  allowSlidePrev: boolean;

  /**
   * Disable / enable ability move slider by grabbing it with mouse or by touching it with finger (on touch screens) by assigning `false` / `true` to this property
   */
  allowTouchMove: boolean;

  rtlTranslate: boolean;

  /**
   * Disable Swiper (if it was enabled). When Swiper is disabled, it will hide all navigation elements and won't respond to any events and interactions
   *
   */
  disable(): void;

  /**
   * Enable Swiper (if it was disabled)
   *
   */
  enable(): void;

  /**
   * Set Swiper translate progress (from 0 to 1). Where 0 - its initial position (offset) on first slide, and 1 - its maximum position (offset) on last slide
   *
   * @param progress Swiper translate progress (from 0 to 1).
   * @param speed Transition duration (in ms).
   */
  setProgress(progress: number, speed?: number): void;

  /**
   * Run transition to next slide.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideNext(speed?: number, runCallbacks?: boolean): void;

  /**
   * Run transition to previous slide.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slidePrev(speed?: number, runCallbacks?: boolean): void;

  /**
   * Run transition to the slide with index number equal to 'index' parameter for the
   *  duration equal to 'speed' parameter.
   *
   * @param index Index number of slide.
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideTo(index: number, speed?: number, runCallbacks?: boolean): void;

  /**
   * Does the same as .slideTo but for the case when used with enabled loop. So this
   * method will slide to slides with realIndex matching to passed index
   *
   * @param index Index number of slide.
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideToLoop(index: number, speed?: number, runCallbacks?: boolean): void;

  /**
   * Reset swiper position to currently active slide for the duration equal to 'speed'
   * parameter.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideReset(speed?: number, runCallbacks?: boolean): void;

  /**
   * Reset swiper position to closest slide/snap point for the duration equal to 'speed' parameter.
   *
   * @param speed Transition duration (in ms).
   * @param runCallbacks Set it to false (by default it is true) and transition will
   *  not produce transition events.
   */
  slideToClosest(speed?: number, runCallbacks?: boolean): void;

  /**
   * Force swiper to update its height (when autoHeight enabled) for the duration equal to
   * 'speed' parameter
   *
   * @param speed Transition duration (in ms).
   */
  updateAutoHeight(speed?: number): void;

  /**
   * You should call it after you add/remove slides
   * manually, or after you hide/show it, or do any
   * custom DOM modifications with Swiper
   * This method also includes subcall of the following
   * methods which you can use separately:
   */
  update(): void;

  /**
   * recalculate size of swiper container
   */
  updateSize(): void;

  /**
   * recalculate number of slides and their offsets. Useful after you add/remove slides with JavaScript
   */
  updateSlides(): void;

  /**
   * recalculate swiper progress
   */
  updateProgress(): void;

  /**
   * update active/prev/next classes on slides and bullets
   */
  updateSlidesClasses(): void;

  /**
   * Changes slider direction from horizontal to vertical and back.
   *
   * @param direction New direction. If not specified, then will automatically changed to opposite direction
   * @param needUpdate Will call swiper.update(). Default true
   */
  changeDirection(direction?: 'horizontal' | 'vertical', needUpdate?: boolean): void;

  /**
   * Detach all events listeners
   */
  detachEvents(): void;

  /**
   * Attach all events listeners again
   */
  attachEvents(): void;

  /**
   * Initialize slider
   */
  init(): void;

  /**
   * Destroy slider instance and detach all events listeners
   *
   * @param deleteInstance Set it to false (by default it is true) to not to delete Swiper instance
   * @param cleanStyles Set it to true (by default it is true) and all custom styles will be removed from slides, wrapper and container.
   * Useful if you need to destroy Swiper and to init again with new options or in different direction
   */
  destroy(deleteInstance?: boolean, cleanStyles?: boolean): void;

  /**
   * Add new slides to the end. slides could be
   * HTMLElement or HTML string with new slide or
   * array with such slides, for example:
   *
   * @example
   * ```js
   * appendSlide('<div class="swiper-slide">Slide 10"</div>')
   *
   * appendSlide([
   *  '<div class="swiper-slide">Slide 10"</div>',
   *  '<div class="swiper-slide">Slide 11"</div>'
   * ]);
   * ```
   */
  appendSlide(slides: HTMLElement | string | string[] | HTMLElement[]): void;

  /**
   * Add new slides to the beginning. slides could be
   * HTMLElement or HTML string with new slide or array with such slides, for example:
   *
   * @example
   * ```js
   * prependSlide('<div class="swiper-slide">Slide 0"</div>')
   *
   * prependSlide([
   *  '<div class="swiper-slide">Slide 1"</div>',
   *  '<div class="swiper-slide">Slide 2"</div>'
   * ]);
   * ```
   */
  prependSlide(slides: HTMLElement | string | string[] | HTMLElement[]): void;

  /**
   * Add new slides to the required index. slides could be HTMLElement or HTML string with new slide or array with such slides, for example:
   *
   * @example
   * ```js
   * addSlide(1, '<div class="swiper-slide">Slide 10"</div>')
   *
   * addSlide(1, [
   *  '<div class="swiper-slide">Slide 10"</div>',
   *  '<div class="swiper-slide">Slide 11"</div>'
   * ]);
   * ```
   */
  addSlide(index: number, slides: HTMLElement | string | string[] | HTMLElement[]): void;

  /**
   * Remove selected slides. slideIndex could be a number with slide index to remove or array with indexes.
   *
   * @example
   * ```js
   * removeSlide(0); // remove first slide
   * removeSlide([0, 1]); // remove first and second slides
   * removeAllSlides();    // Remove all slides
   * ```
   */
  removeSlide(slideIndex: number | number[]): void;

  /**
   * Remove all slides
   */
  removeAllSlides(): void;

  /**
   * Set custom css3 transform's translate value for swiper wrapper
   */
  setTranslate(translate: any): void;

  /**
   * Get current value of swiper wrapper css3 transform translate
   */
  getTranslate(): any;

  /**
   * Animate custom css3 transform's translate value for swiper wrapper
   *
   * @param translate Translate value (in px)
   * @param speed Transition duration (in ms)
   * @param runCallbacks Set it to false (by default it is true) and transition will not produce  transition events
   * @param translateBounds Set it to false (by default it is true) and transition value can extend beyond min and max translate
   *
   */
  translateTo(
    translate: number,
    speed: number,
    runCallbacks?: boolean,
    translateBounds?: boolean,
  ): any;

  /**
   * Unset grab cursor
   */
  unsetGrabCursor(): void;

  /**
   * Set grab cursor
   */
  setGrabCursor(): void;

  /**
   * Add event listener that will be fired on all events
   */
  onAny(handler: (eventName: string, ...args: any[]) => void): void;

  /**
   * Remove event listener that will be fired on all events
   */
  offAny(handler: (eventName: string, ...args: any[]) => void): void;

  isHorizontal(): boolean;

  getBreakpoint(breakpoints: SwiperOptions['breakpoints']): string;

  setBreakpoint(): void;

  currentBreakpoint: any;

  destroyed: boolean;
  modules: Array<any>; //TODO: add typing
  a11y: A11yMethods;
  autoplay: AutoplayMethods;
  controller: ControllerMethods;
  coverflowEffect: CoverflowEffectMethods;
  cubeEffect: CubeEffectMethods;
  fadeEffect: FadeEffectMethods;
  flipEffect: FlipEffectMethods;
  hashNavigation: HashNavigationMethods;
  history: HistoryMethods;
  keyboard: KeyboardMethods;
  lazy: LazyMethods;
  mousewheel: MousewheelMethods;
  navigation: NavigationMethods;
  pagination: PaginationMethods;
  parallax: ParallaxMethods;
  scrollbar: ScrollbarMethods;
  thumbs: ThumbsMethods;
  virtual: VirtualMethods;
  zoom: ZoomMethods;
}

declare class Swiper implements Swiper {
  /**
   * Constructs a new Swiper instance.
   *
   * @param container Where Swiper applies to.
   * @param options   Instance options.
   */
  constructor(container: CSSSelector | HTMLElement, options?: SwiperOptions);
  /**
   * Installs modules on Swiper in runtime.
   */
  static use(modules: SwiperComponent[]): void;

  /**
   * Swiper default options
   */
  static defaults: SwiperOptions;

  /**
   * Extend global Swiper defaults
   */
  static extendDefaults(options: SwiperOptions): void;

  /**
   * Object with global Swiper extended options
   */
  static extendedDefaults: SwiperOptions;
}

export default Swiper;
