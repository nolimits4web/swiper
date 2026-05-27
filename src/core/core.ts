/* eslint no-param-reassign: "off" */
import {
  extend,
  deleteProps,
  createElement,
  elementChildren,
  elementStyle,
  elementIndex,
} from '../shared/utils';
import { getSupport, type SwiperSupport } from '../shared/get-support';
import { getDevice, type SwiperDevice } from '../shared/get-device';
import { getBrowser, type SwiperBrowser } from '../shared/get-browser';

import Resize from './modules/resize/resize';
import Observer from './modules/observer/observer';

import eventsEmitter from './events-emitter';

import update from './update/index';
import translate from './translate/index';
import transition from './transition/index';
import slide from './slide/index';
import loop from './loop/index';
import grabCursor from './grab-cursor/index';
import events from './events/index';
import breakpoints from './breakpoints/index';
import classes from './classes/index';
import checkOverflow from './check-overflow/index';

import defaults from './defaults';
import moduleExtendParams from './moduleExtendParams';
import { processLazyPreloader, preload } from '../shared/process-lazy-preloader';

import type { SwiperOptions as LegacySwiperOptions } from '../types/swiper-options.d.ts';
import type { SwiperEvents as LegacySwiperEvents } from '../types/swiper-events.d.ts';
import type { CSSSelector } from '../types/shared.d.ts';

// Module Methods for modules that haven't been migrated to per-module type
// augmentation yet. Each migrated module removes itself from this list and
// instead `declare module '../../core/core'` to augment `Swiper`,
// `SwiperOptions`, `SwiperParams`, and `SwiperEvents` from its own .ts file.
import type { AutoplayMethods } from '../types/modules/autoplay.d.ts';
import type { ControllerMethods } from '../types/modules/controller.d.ts';
import type { CoverflowEffectMethods } from '../types/modules/effect-coverflow.d.ts';
import type { CubeEffectMethods } from '../types/modules/effect-cube.d.ts';
import type { FadeEffectMethods } from '../types/modules/effect-fade.d.ts';
import type { FlipEffectMethods } from '../types/modules/effect-flip.d.ts';
import type { CreativeEffectMethods } from '../types/modules/effect-creative.d.ts';
import type { CardsEffectMethods } from '../types/modules/effect-cards.d.ts';
import type { ParallaxMethods } from '../types/modules/parallax.d.ts';
import type { ThumbsMethods } from '../types/modules/thumbs.d.ts';
import type { VirtualMethods } from '../types/modules/virtual.d.ts';
import type { ZoomMethods } from '../types/modules/zoom.d.ts';
import type { FreeModeMethods } from '../types/modules/free-mode.d.ts';
import type { ManipulationMethods } from '../types/modules/manipulation.d.ts';

// Canonical SwiperOptions / SwiperEvents — declared in core.ts so individual
// modules can augment them via `declare module '../../core/core'`. The bodies
// re-derive from the legacy d.ts shapes for now; Phase 5 deletes src/types/.
export interface SwiperOptions extends LegacySwiperOptions {
  on?: {
    [event in keyof SwiperEvents]?: SwiperEvents[event];
  };
  onAny?(handler: (eventName: string, ...args: any[]) => void): void;
}
export interface SwiperEvents extends LegacySwiperEvents {}

export type SwiperEventHandler = (...args: any[]) => any;
export type SwiperEventName = keyof SwiperEvents;

// Runtime params extend SwiperOptions with internal-only properties not
// exposed in the public type surface. Declared as `interface` (not `type`)
// so modules can narrow module-option fields from `T | boolean` to `T`.
export interface SwiperParams extends SwiperOptions {
  el?: CSSSelector | HTMLElement;
}
export type SwiperModuleFn = (ctx: {
  params: SwiperOptions;
  swiper: Swiper;
  extendParams: (obj: Record<string, any>) => void;
  on: Swiper['on'];
  once: Swiper['once'];
  off: Swiper['off'];
  emit: Swiper['emit'];
}) => void;

export interface SwiperTouchEventsData {
  isTouched?: boolean;
  isMoved?: boolean;
  allowTouchCallbacks?: boolean;
  touchStartTime?: number;
  isScrolling?: boolean;
  currentTranslate?: number;
  startTranslate?: number;
  allowThresholdMove?: boolean;
  focusableElements: string;
  lastClickTime: number;
  clickTimeout?: ReturnType<typeof setTimeout>;
  velocities: Array<{ position: number; time: number }>;
  allowMomentumBounce?: boolean;
  startMoving?: boolean;
  pointerId: number | null;
  touchId: number | null;
  evCache?: PointerEvent[];
  preventTouchMoveFromPointerMove?: boolean;
}

export interface SwiperTouches {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  diff: number;
}

export interface Swiper {
  // Initialization params
  params: SwiperParams;
  originalParams: SwiperParams;
  passedParams: SwiperParams;

  // Capabilities
  support: SwiperSupport;
  device: SwiperDevice;
  browser: SwiperBrowser;

  // Internal flags / state
  __swiper__: true;
  __modules__?: SwiperModuleFn[];
  __preventObserver__?: boolean;
  destroyed?: boolean;
  initialized?: boolean;
  mounted?: boolean;
  isElement?: boolean;
  documentTouchHandlerProceeded?: boolean;
  enabled: boolean;

  // Elements
  el: HTMLElement;
  wrapperEl: HTMLElement;
  slidesEl: HTMLElement;
  hostEl: HTMLElement;
  classNames: string[];

  // Slides
  slides: HTMLElement[];
  slidesGrid: number[];
  snapGrid: number[];
  slidesSizesGrid: number[];
  visibleSlides: HTMLElement[];
  visibleSlidesIndexes: number[];
  loopedSlides: number | null;

  // Sizes
  size: number;
  width: number;
  height: number;
  virtualSize: number;

  // Indexes
  activeIndex: number;
  realIndex: number;
  previousIndex: number;
  snapIndex: number;
  previousSnapIndex?: number;
  previousRealIndex?: number;
  clickedIndex: number;
  clickedSlide: HTMLElement;

  // Direction / RTL
  rtl: boolean;
  rtlTranslate: boolean;
  wrongRTL: boolean;
  swipeDirection: 'prev' | 'next';
  touchesDirection?: 'prev' | 'next' | '';

  // Translate / progress
  translate: number;
  previousTranslate: number;
  progress: number;
  progressLoop?: number;
  velocity: number;
  animating: boolean;

  // Edges
  isBeginning: boolean;
  isEnd: boolean;
  isLocked: boolean;

  // Touch / interaction
  allowClick: boolean;
  allowTouchMove: boolean;
  allowSlideNext: boolean;
  allowSlidePrev: boolean;
  touches: SwiperTouches;
  touchEventsData: SwiperTouchEventsData;

  // Images
  imagesToLoad: HTMLImageElement[];
  imagesLoaded: number;

  // Breakpoints
  currentBreakpoint?: string | null;

  // Modules + events
  modules: SwiperModuleFn[];
  eventsListeners: Record<string, SwiperEventHandler[]>;
  eventsAnyListeners: SwiperEventHandler[];

  // Internal one-shot helpers attached at runtime
  onSlideToWrapperTransitionEnd?: ((e: TransitionEvent) => void) | null;
  onTranslateToWrapperTransitionEnd?: ((e: TransitionEvent) => void) | null;
  _clientLeft?: number;
  _cssModeVirtualInitialSet?: boolean;
  _immediateVirtual?: boolean;

  // Event-emitter (prototype mixin: src/core/events-emitter)
  on<E extends keyof SwiperEvents>(event: E, handler: SwiperEvents[E], priority?: boolean): Swiper;
  on(events: string, handler: SwiperEventHandler, priority?: boolean): Swiper;
  once<E extends keyof SwiperEvents>(
    event: E,
    handler: SwiperEvents[E],
    priority?: boolean,
  ): Swiper;
  once(events: string, handler: SwiperEventHandler, priority?: boolean): Swiper;
  onAny(handler: SwiperEventHandler, priority?: boolean): Swiper;
  offAny(handler: SwiperEventHandler): Swiper;
  off<E extends keyof SwiperEvents>(event: E, handler?: SwiperEvents[E]): Swiper;
  off(events: string, handler?: SwiperEventHandler): Swiper;
  emit(events: string | string[], ...data: any[]): Swiper;
  emit(opts: { events: string | string[]; data?: any[]; context?: any }): Swiper;

  // Translate methods (prototype mixin: src/core/translate)
  getTranslate(axis?: 'x' | 'y'): number;
  setTranslate(translate: number, byController?: boolean): void;
  minTranslate(): number;
  maxTranslate(): number;
  translateTo(
    translate?: number,
    speed?: number,
    runCallbacks?: boolean,
    translateBounds?: boolean,
    internal?: boolean,
  ): boolean;

  // Transition methods (prototype mixin: src/core/transition)
  setTransition(duration: number, byController?: boolean): void;
  transitionStart(runCallbacks?: boolean, direction?: 'reset' | 'prev' | 'next'): void;
  transitionEnd(runCallbacks?: boolean, direction?: 'reset' | 'prev' | 'next'): void;

  // Slide methods (prototype mixin: src/core/slide)
  slideTo(
    index?: number,
    speed?: number,
    runCallbacks?: boolean,
    internal?: boolean,
    initial?: boolean,
  ): boolean;
  slideToLoop(
    index?: number,
    speed?: number,
    runCallbacks?: boolean,
    internal?: boolean,
  ): boolean | Swiper;
  slideNext(speed?: number, runCallbacks?: boolean, internal?: boolean): boolean;
  slidePrev(speed?: number, runCallbacks?: boolean, internal?: boolean): boolean;
  slideReset(speed?: number, runCallbacks?: boolean, internal?: boolean): boolean;
  slideToClosest(
    speed?: number,
    runCallbacks?: boolean,
    internal?: boolean,
    threshold?: number,
  ): boolean;
  slideToClickedSlide(): void;

  // Loop methods (prototype mixin: src/core/loop)
  loopCreate(slideRealIndex?: number, initial?: boolean): void;
  loopFix(options?: {
    slideRealIndex?: number;
    slideTo?: boolean;
    direction?: 'next' | 'prev';
    setTranslate?: boolean;
    activeSlideIndex?: number;
    byController?: boolean;
    byMousewheel?: boolean;
  }): void;
  loopDestroy(): void;

  // Slide-index helpers (defined on the class in src/core/core.ts)
  cssOverflowAdjustment(): number;
  getSlideIndex(slideEl: Element): number;
  getSlideIndexByData(index: number): number;
  getSlideIndexWhenGrid(index: number): number;
  getSlideClasses(slideEl: Element): string;

  // Update methods (prototype mixin: src/core/update)
  updateSize(): void;
  updateSlides(): void;
  updateAutoHeight(speed?: number): void;
  updateSlidesOffset(): void;
  updateSlidesProgress(translate?: number): void;
  updateProgress(translate?: number): void;
  updateSlidesClasses(): void;
  updateActiveIndex(newActiveIndex?: number): void;
  updateClickedSlide(el: HTMLElement, path?: EventTarget[]): void;

  // Breakpoints methods (prototype mixin: src/core/breakpoints)
  setBreakpoint(): void;
  getBreakpoint(
    breakpoints: SwiperOptions['breakpoints'],
    base?: string,
    containerEl?: HTMLElement,
  ): string;

  // Classes methods (prototype mixin: src/core/classes)
  addClasses(): void;
  removeClasses(): void;

  // Check-overflow (prototype mixin: src/core/check-overflow)
  checkOverflow(): void;

  // Grab cursor (prototype mixin: src/core/grab-cursor)
  setGrabCursor(moving?: boolean): void;
  unsetGrabCursor(): void;

  // Events handlers (prototype mixin: src/core/events)
  attachEvents(): void;
  detachEvents(): void;
  onTouchStart: (event: TouchEvent | PointerEvent | MouseEvent) => void;
  onTouchMove: (event: TouchEvent | PointerEvent | MouseEvent) => void;
  onTouchEnd: (event: TouchEvent | PointerEvent | MouseEvent) => void;
  onDocumentTouchStart: (event: TouchEvent | PointerEvent) => void;
  onClick: (event: MouseEvent) => void;
  onScroll: () => void;
  onLoad: (event: Event) => void;

  // Module-injected methods. Typed modules augment these via
  // `declare module '../../core/core'` from their own .ts file; untyped
  // modules still appear here until they migrate. Removed entries (one
  // per migrated module): a11y, hashNavigation, history, keyboard,
  // mousewheel, navigation, pagination, scrollbar.
  autoplay: AutoplayMethods;
  controller: ControllerMethods;
  coverflowEffect: CoverflowEffectMethods;
  cubeEffect: CubeEffectMethods;
  fadeEffect: FadeEffectMethods;
  flipEffect: FlipEffectMethods;
  creativeEffect: CreativeEffectMethods;
  cardsEffect: CardsEffectMethods;
  parallax: ParallaxMethods;
  thumbs: ThumbsMethods;
  virtual: VirtualMethods;
  zoom: ZoomMethods;
  freeMode: FreeModeMethods;
  grid: any;
}

export interface Swiper extends ManipulationMethods {}

const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events,
  breakpoints,
  checkOverflow,
  classes,
} as const;

const extendedDefaults: SwiperOptions = {};

export class Swiper {
  static extendedDefaults: SwiperOptions;
  static defaults: SwiperOptions;

  constructor(container: CSSSelector | HTMLElement | SwiperOptions, options?: SwiperOptions);
  constructor(...args: [SwiperParams] | [CSSSelector | HTMLElement, SwiperParams?]) {
    let el: CSSSelector | HTMLElement | undefined;
    let params: SwiperParams | undefined;
    if (
      args.length === 1 &&
      (args[0] as any).constructor &&
      Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object'
    ) {
      params = args[0] as SwiperParams;
    } else {
      [el, params] = args as [CSSSelector | HTMLElement | undefined, SwiperParams | undefined];
    }
    if (!params) params = {};

    params = extend({}, params);
    if (el && !params.el) params.el = el;

    if (
      params.el &&
      typeof params.el === 'string' &&
      document.querySelectorAll(params.el as string).length > 1
    ) {
      const swipers: Swiper[] = [];
      document.querySelectorAll(params.el as string).forEach((containerEl) => {
        const newParams = extend({}, params, { el: containerEl });
        swipers.push(new Swiper(newParams));
      });
      // eslint-disable-next-line no-constructor-return
      return swipers as unknown as Swiper;
    }

    // Swiper Instance
    const swiper = this as unknown as Swiper;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({ userAgent: params.userAgent ?? undefined });
    swiper.browser = getBrowser();

    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...(swiper.__modules__ || [])];
    if (params.modules && Array.isArray(params.modules)) {
      params.modules.forEach((mod) => {
        if (typeof mod === 'function' && swiper.modules.indexOf(mod as any) < 0) {
          swiper.modules.push(mod as any);
        }
      });
    }

    const allModulesParams: Record<string, any> = {};
    swiper.modules.forEach((mod) => {
      (mod as SwiperModuleFn)({
        params: params!,
        swiper,
        extendParams: moduleExtendParams(params!, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper),
      });
    });

    // Extend defaults with modules params
    const swiperParams = extend({}, defaults, allModulesParams);

    // Extend defaults with passed params
    swiper.params = extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend({}, swiper.params);
    swiper.passedParams = extend({}, params);

    // add event listeners
    if (swiper.params && swiper.params.on) {
      (Object.keys(swiper.params.on) as Array<keyof SwiperEvents>).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on![eventName] as any);
      });
    }
    if (swiper.params && (swiper.params as any).onAny) {
      swiper.onAny((swiper.params as any).onAny);
    }

    // Extend Swiper
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,

      // Classes
      classNames: [],

      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      // isDirection
      isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical() {
        return swiper.params.direction === 'vertical';
      },

      // Indexes
      activeIndex: 0,
      realIndex: 0,

      //
      isBeginning: true,
      isEnd: false,

      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      cssOverflowAdjustment(this: Swiper): number {
        // Returns 0 unless `translate` is > 2**23
        // Should be subtracted from css values to prevent overflow
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },

      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      // Touch Events
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        startMoving: undefined,
        pointerId: null,
        touchId: null,
      },

      // Clicks
      allowClick: true,

      // Touches
      allowTouchMove: swiper.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
      },

      // Images
      imagesToLoad: [],
      imagesLoaded: 0,
    });

    swiper.emit('_swiper');

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    // eslint-disable-next-line no-constructor-return
    return swiper;
  }

  getDirectionLabel(this: Swiper, property: string): string {
    if (this.isHorizontal()) {
      return property;
    }
    // prettier-ignore
    return ({
      'width': 'height',
      'margin-top': 'margin-left',
      'margin-bottom ': 'margin-right',
      'margin-left': 'margin-top',
      'margin-right': 'margin-bottom',
      'padding-left': 'padding-top',
      'padding-right': 'padding-bottom',
      'marginRight': 'marginBottom',
    } as Record<string, string>)[property]!;
  }

  isHorizontal(this: Swiper): boolean {
    return this.params.direction === 'horizontal';
  }

  isVertical(this: Swiper): boolean {
    return this.params.direction === 'vertical';
  }

  cssOverflowAdjustment(this: Swiper): number {
    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
  }

  getSlideIndex(this: Swiper, slideEl: Element): number {
    const { slidesEl, params } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]!);
    return elementIndex(slideEl)! - (firstSlideIndex ?? 0);
  }

  getSlideIndexByData(this: Swiper, index: number): number {
    return this.getSlideIndex(
      this.slides.find(
        (slideEl) => Number(slideEl.getAttribute('data-swiper-slide-index')) === index,
      )!,
    );
  }

  getSlideIndexWhenGrid(this: Swiper, index: number): number {
    if (this.grid && this.params.grid && this.params.grid.rows! > 1) {
      if (this.params.grid.fill === 'column') {
        index = Math.floor(index / this.params.grid.rows!);
      } else if (this.params.grid.fill === 'row') {
        index = index % Math.ceil(this.slides.length / this.params.grid.rows!);
      }
    }
    return index;
  }

  recalcSlides(this: Swiper): void {
    const { slidesEl, params } = this;
    this.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`) as HTMLElement[];
  }

  enable(this: Swiper): void {
    if (this.enabled) return;
    this.enabled = true;
    if (this.params.grabCursor) {
      this.setGrabCursor();
    }
    this.emit('enable');
  }

  disable(this: Swiper): void {
    if (!this.enabled) return;
    this.enabled = false;
    if (this.params.grabCursor) {
      this.unsetGrabCursor();
    }
    this.emit('disable');
  }

  setProgress(this: Swiper, progress: number, speed?: number): void {
    progress = Math.min(Math.max(progress, 0), 1);
    const min = this.minTranslate();
    const max = this.maxTranslate();
    const current = (max - min) * progress + min;
    this.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
    this.updateActiveIndex();
    this.updateSlidesClasses();
  }

  emitContainerClasses(this: Swiper): void {
    if (!this.params._emitClasses || !this.el) return;
    const cls = this.el.className.split(' ').filter((className) => {
      return (
        className.indexOf('swiper') === 0 ||
        className.indexOf(this.params.containerModifierClass!) === 0
      );
    });
    this.emit('_containerClasses', cls.join(' '));
  }

  getSlideClasses(this: Swiper, slideEl: Element): string {
    if (this.destroyed) return '';

    return slideEl.className
      .split(' ')
      .filter((className) => {
        return (
          className.indexOf('swiper-slide') === 0 ||
          className.indexOf(this.params.slideClass!) === 0
        );
      })
      .join(' ');
  }

  emitSlidesClasses(this: Swiper): void {
    if (!this.params._emitClasses || !this.el) return;
    const updates: Array<{ slideEl: HTMLElement; classNames: string }> = [];
    this.slides.forEach((slideEl) => {
      const classNames = this.getSlideClasses(slideEl);
      updates.push({ slideEl, classNames });
      this.emit('_slideClass', slideEl, classNames);
    });
    this.emit('_slideClasses', updates);
  }

  slidesPerViewDynamic(
    this: Swiper,
    view: 'current' | 'previous' = 'current',
    exact = false,
  ): number {
    const { params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex } = this;
    let spv = 1;
    if (typeof params.slidesPerView === 'number') return params.slidesPerView;

    if (params.centeredSlides) {
      let slideSize = slides[activeIndex]
        ? Math.ceil((slides[activeIndex] as any).swiperSlideSize)
        : 0;
      let breakLoop = false;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil((slides[i] as any).swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += (slides[i] as any).swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else if (view === 'current') {
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        const slideInView = exact
          ? slidesGrid[i]! + slidesSizesGrid[i]! - slidesGrid[activeIndex]! < swiperSize
          : slidesGrid[i]! - slidesGrid[activeIndex]! < swiperSize;
        if (slideInView) {
          spv += 1;
        }
      }
    } else {
      // previous
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        const slideInView = slidesGrid[activeIndex]! - slidesGrid[i]! < swiperSize;
        if (slideInView) {
          spv += 1;
        }
      }
    }
    return spv;
  }

  update(this: Swiper): void {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const { snapGrid, params } = swiper;
    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if ((imageEl as HTMLImageElement).complete) {
        processLazyPreloader(swiper, imageEl as HTMLImageElement);
      }
    });

    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();

    function setTranslate() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(
        Math.max(translateValue, swiper.maxTranslate()),
        swiper.minTranslate(),
      );
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && (params.freeMode as any).enabled && !params.cssMode) {
      setTranslate();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if (
        (params.slidesPerView === 'auto' || (params.slidesPerView as number) > 1) &&
        swiper.isEnd &&
        !params.centeredSlides
      ) {
        const slides =
          swiper.virtual && params.virtual && (params.virtual as any).enabled
            ? (swiper.virtual as any).slides
            : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit('update');
  }

  changeDirection(
    this: Swiper,
    newDirection?: 'horizontal' | 'vertical',
    needUpdate = true,
  ): Swiper {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }
    if (
      newDirection === currentDirection ||
      (newDirection !== 'horizontal' && newDirection !== 'vertical')
    ) {
      return swiper;
    }

    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();

    swiper.params.direction = newDirection;

    swiper.slides.forEach((slideEl) => {
      if (newDirection === 'vertical') {
        slideEl.style.width = '';
      } else {
        slideEl.style.height = '';
      }
    });

    swiper.emit('changeDirection');
    if (needUpdate) swiper.update();

    return swiper;
  }

  changeLanguageDirection(this: Swiper, direction: 'rtl' | 'ltr'): void {
    const swiper = this;
    if ((swiper.rtl && direction === 'rtl') || (!swiper.rtl && direction === 'ltr')) return;
    swiper.rtl = direction === 'rtl';
    swiper.rtlTranslate = swiper.params.direction === 'horizontal' && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'rtl';
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = 'ltr';
    }
    swiper.update();
  }

  mount(this: Swiper, element?: HTMLElement | string): boolean {
    const swiper = this;
    if (swiper.mounted) return true;

    // Find el
    let el: HTMLElement | string | null | undefined = element || (swiper.params.el as any);
    if (typeof el === 'string') {
      el = document.querySelector(el) as HTMLElement | null;
    }
    if (!el) {
      return false;
    }

    (el as any).swiper = swiper;
    if (
      el.parentNode &&
      (el.parentNode as any).host &&
      (el.parentNode as any).host.nodeName === swiper.params.swiperElementNodeName!.toUpperCase()
    ) {
      swiper.isElement = true;
    }

    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
    };

    const getWrapper = () => {
      if (el && (el as HTMLElement).shadowRoot) {
        const res = (el as HTMLElement).shadowRoot!.querySelector(getWrapperSelector());
        // Children needs to return slot items
        return res as HTMLElement | null;
      }
      return elementChildren(el as HTMLElement, getWrapperSelector())[0] as HTMLElement | undefined;
    };
    // Find Wrapper
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement('div', swiper.params.wrapperClass) as HTMLElement;
      (el as HTMLElement).append(wrapperEl);
      elementChildren(el as HTMLElement, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl!.append(slideEl);
      });
    }

    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl:
        swiper.isElement && !((el as HTMLElement).parentNode as any).host.slideSlots
          ? (el as HTMLElement).parentNode!
          : wrapperEl,
      hostEl: swiper.isElement ? ((el as HTMLElement).parentNode as any).host : el,
      mounted: true,

      // RTL
      rtl:
        (el as HTMLElement).dir.toLowerCase() === 'rtl' ||
        elementStyle(el as HTMLElement, 'direction') === 'rtl',
      rtlTranslate:
        swiper.params.direction === 'horizontal' &&
        ((el as HTMLElement).dir.toLowerCase() === 'rtl' ||
          elementStyle(el as HTMLElement, 'direction') === 'rtl'),
      wrongRTL: elementStyle(wrapperEl!, 'display') === '-webkit-box',
    });

    return true;
  }

  init(this: Swiper, el?: HTMLElement | string): Swiper {
    const swiper = this;
    if (swiper.initialized) return swiper;

    const mounted = swiper.mount(el);
    if (mounted === false) return swiper;

    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();

    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }

    // Set Grab Cursor
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }

    // Slide To Initial Slide
    if (swiper.params.loop && swiper.virtual && (swiper.params.virtual as any)?.enabled) {
      swiper.slideTo(
        (swiper.params.initialSlide ?? 0) + (swiper.virtual as any).slidesBefore,
        0,
        swiper.params.runCallbacksOnInit,
        false,
        true,
      );
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate(undefined, true);
    }

    // Attach events
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')] as HTMLImageElement[];
    if (swiper.isElement) {
      lazyElements.push(
        ...(swiper.hostEl.querySelectorAll('[loading="lazy"]') as NodeListOf<HTMLImageElement>),
      );
    }
    lazyElements.forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener('load', (e) => {
          processLazyPreloader(swiper, e.target as HTMLImageElement);
        });
      }
    });
    preload(swiper);

    // Init Flag
    swiper.initialized = true;

    preload(swiper);

    // Emit
    swiper.emit('init');
    swiper.emit('afterInit');

    return swiper;
  }

  destroy(this: Swiper, deleteInstance = true, cleanStyles = true): null {
    const swiper = this;
    const { params, el, wrapperEl, slides } = swiper;

    if (typeof swiper.params === 'undefined' || swiper.destroyed) {
      return null;
    }

    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      if (el && typeof el !== 'string') {
        (el as HTMLElement).removeAttribute('style');
      }
      if (wrapperEl) {
        wrapperEl.removeAttribute('style');
      }
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(
            params.slideVisibleClass!,
            params.slideFullyVisibleClass!,
            params.slideActiveClass!,
            params.slideNextClass!,
            params.slidePrevClass!,
          );
          slideEl.removeAttribute('style');
          slideEl.removeAttribute('data-swiper-slide-index');
        });
      }
    }

    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });

    if (deleteInstance !== false) {
      if (swiper.el && typeof swiper.el !== 'string') {
        (swiper.el as any).swiper = null;
      }
      deleteProps(swiper as unknown as Record<string, unknown>);
    }
    swiper.destroyed = true;

    return null;
  }

  static extendDefaults(newDefaults: SwiperOptions): void {
    extend(extendedDefaults, newDefaults);
  }

  static installModule(mod: SwiperModuleFn): void {
    if (!Swiper.prototype.__modules__) (Swiper.prototype as any).__modules__ = [];
    const modules = Swiper.prototype.__modules__!;

    if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }

  static use(module: SwiperModuleFn | SwiperModuleFn[]): typeof Swiper {
    if (Array.isArray(module)) {
      module.forEach((m) => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}

Object.defineProperty(Swiper, 'extendedDefaults', {
  get() {
    return extendedDefaults;
  },
});

Object.defineProperty(Swiper, 'defaults', {
  get() {
    return defaults;
  },
});

Object.keys(prototypes).forEach((prototypeGroup) => {
  const group = (prototypes as Record<string, Record<string, any>>)[prototypeGroup]!;
  Object.keys(group).forEach((protoMethod) => {
    (Swiper.prototype as any)[protoMethod] = group[protoMethod];
  });
});

Swiper.use([Resize, Observer]);

export default Swiper;
