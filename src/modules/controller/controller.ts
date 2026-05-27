/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
import type { Swiper, SwiperModuleFn } from '../../core/core';
import { elementTransitionEnd, nextTick } from '../../shared/utils';

export interface ControllerOptions {
  /**
   * Pass here another Swiper instance or array with Swiper instances that should be controlled
   * by this Swiper. Also accepts string with CSS selector of Swiper element, or HTMLElement of Swiper element
   */
  control?: Swiper | Swiper[] | string | HTMLElement | null;

  /**
   * Set to `true` and controlling will be in inverse direction
   *
   * @default false
   */
  inverse?: boolean;

  /**
   * Defines a way how to control another slider: slide by slide
   * (with respect to other slider's grid) or depending on all slides/container
   * (depending on total slider percentage).
   *
   * @default 'slide'
   */
  by?: 'slide' | 'container';
}

export interface ControllerMethods {
  /**
   * Pass here another Swiper instance or array with Swiper instances that should be controlled
   * by this Swiper
   */
  control?: Swiper | Swiper[];
}

export interface ControllerEvents {}

class LinearSpline {
  x: number[];
  y: number[];
  lastIndex: number;
  private binarySearch: (array: number[], val: number) => number;

  constructor(x: number[], y: number[]) {
    let maxIndex: number;
    let minIndex: number;
    let guess: number;
    this.binarySearch = (array, val) => {
      minIndex = -1;
      maxIndex = array.length;
      while (maxIndex - minIndex > 1) {
        guess = (maxIndex + minIndex) >> 1;
        if (array[guess]! <= val) {
          minIndex = guess;
        } else {
          maxIndex = guess;
        }
      }
      return maxIndex;
    };
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
  }

  interpolate(x2: number): number {
    if (!x2) return 0;
    const i3 = this.binarySearch(this.x, x2);
    const i1 = i3 - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
    return (
      ((x2 - this.x[i1]!) * (this.y[i3]! - this.y[i1]!)) / (this.x[i3]! - this.x[i1]!) + this.y[i1]!
    );
  }
}

// Runtime-only members attached to swiper.controller beyond the published API.
// byController is whatever was passed through the setTranslate / setTransition
// event — boolean from core, Swiper from another controller — both forms are
// only used for an identity check, never read for their value.
interface ControllerInternals extends ControllerMethods {
  spline?: LinearSpline;
  setTranslate(translate: number, byController?: boolean | Swiper): void;
  setTransition(duration: number, byController?: boolean | Swiper): void;
}

type ControllerParamsRuntime = Required<Omit<ControllerOptions, 'control'>> &
  Pick<ControllerOptions, 'control'>;

declare module '../../core/core' {
  interface Swiper {
    controller: ControllerInternals;
  }
  interface SwiperOptions {
    /**
     * Object with controller parameters or boolean `true` to enable with default settings
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   controller: {
     *     inverse: true,
     *   },
     * });
     * ```
     */
    controller?: ControllerOptions | boolean;
  }
  interface SwiperParams {
    controller?: ControllerOptions;
  }
  interface SwiperEvents extends ControllerEvents {}
}

// Custom-element <swiper-container> attaches the Swiper instance back onto the
// host element. controller can target the element via CSS selector or direct
// reference, so we narrow that path through this minimal interface.
interface SwiperHostElement extends HTMLElement {
  swiper?: Swiper;
}

const Controller: SwiperModuleFn = ({ swiper, extendParams, on }) => {
  extendParams({
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide', // or 'container'
    },
  });

  swiper.controller = {
    control: undefined,
  } as ControllerInternals;

  function getParams(): ControllerParamsRuntime {
    return swiper.params.controller as ControllerParamsRuntime;
  }

  function getInterpolateFunction(c: Swiper): void {
    swiper.controller.spline = swiper.params.loop
      ? new LinearSpline(swiper.slidesGrid, c.slidesGrid)
      : new LinearSpline(swiper.snapGrid, c.snapGrid);
  }
  function setTranslate(_t: number, byController?: boolean | Swiper): void {
    const controlled = swiper.controller.control;
    let multiplier: number;
    let controlledTranslate: number;
    const SwiperCtor = swiper.constructor as typeof Swiper;
    function setControlledTranslate(c: Swiper): void {
      if (c.destroyed) return;

      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
      const controllerParams = getParams();
      if (controllerParams.by === 'slide') {
        getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline!.interpolate(-translate);
      } else {
        controlledTranslate = 0;
      }

      if (!controlledTranslate || controllerParams.by === 'container') {
        multiplier =
          (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        if (Number.isNaN(multiplier) || !Number.isFinite(multiplier)) {
          multiplier = 1;
        }
        controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
      }

      if (controllerParams.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        const target = controlled[i];
        if (target && target !== byController && target instanceof SwiperCtor) {
          setControlledTranslate(target);
        }
      }
    } else if (controlled instanceof SwiperCtor && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  }
  function setTransition(duration: number, byController?: boolean | Swiper): void {
    const SwiperCtor = swiper.constructor as typeof Swiper;
    const controlled = swiper.controller.control;
    function setControlledTransition(c: Swiper): void {
      if (c.destroyed) return;

      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        if (c.params.autoHeight) {
          nextTick(() => {
            c.updateAutoHeight();
          });
        }
        elementTransitionEnd(c.wrapperEl, () => {
          if (!controlled) return;
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (let i = 0; i < controlled.length; i += 1) {
        const target = controlled[i];
        if (target && target !== byController && target instanceof SwiperCtor) {
          setControlledTransition(target);
        }
      }
    } else if (controlled instanceof SwiperCtor && byController !== controlled) {
      setControlledTransition(controlled);
    }
  }

  function removeSpline(): void {
    if (!swiper.controller.control) return;
    if (swiper.controller.spline) {
      swiper.controller.spline = undefined;
      delete swiper.controller.spline;
    }
  }
  on('beforeInit', () => {
    const controllerParam = getParams().control;
    if (
      typeof window !== 'undefined' &&
      (typeof controllerParam === 'string' || controllerParam instanceof HTMLElement)
    ) {
      const controlElements: SwiperHostElement[] =
        typeof controllerParam === 'string'
          ? [...document.querySelectorAll<SwiperHostElement>(controllerParam)]
          : [controllerParam as SwiperHostElement];

      controlElements.forEach((controlElement) => {
        if (!swiper.controller.control) swiper.controller.control = [];
        const list = swiper.controller.control as Swiper[];
        if (controlElement && controlElement.swiper) {
          list.push(controlElement.swiper);
        } else if (controlElement) {
          const eventName = `${swiper.params.eventsPrefix}init`;
          const onControllerSwiper = (e: Event): void => {
            const detail = (e as CustomEvent<Swiper[]>).detail;
            if (detail && detail[0]) list.push(detail[0]);
            swiper.update();
            controlElement.removeEventListener(eventName, onControllerSwiper);
          };
          controlElement.addEventListener(eventName, onControllerSwiper);
        }
      });

      return;
    }
    // After this point control is either Swiper or Swiper[] (or null/undefined),
    // never the string/HTMLElement forms that the public option accepts.
    swiper.controller.control = controllerParam as Swiper | Swiper[] | undefined;
  });
  on('update', () => {
    removeSpline();
  });
  on('resize', () => {
    removeSpline();
  });
  on('observerUpdate', () => {
    removeSpline();
  });
  // Event payloads come typed against the legacy public Swiper class
  // (src/types/swiper-class.d.ts) until Phase 5 deletes src/types/; cast the
  // forwarded byController back to the core Swiper so it lines up with the
  // controller-internal signatures.
  on('setTranslate', (_s, translate, byController) => {
    if (!swiper.controller.control) return;
    if (!Array.isArray(swiper.controller.control) && swiper.controller.control.destroyed) return;
    swiper.controller.setTranslate(translate, byController as boolean | Swiper | undefined);
  });
  on('setTransition', (_s, duration, byController) => {
    if (!swiper.controller.control) return;
    if (!Array.isArray(swiper.controller.control) && swiper.controller.control.destroyed) return;
    swiper.controller.setTransition(duration, byController as boolean | Swiper | undefined);
  });

  Object.assign(swiper.controller, {
    setTranslate,
    setTransition,
  });
};

export default Controller;
