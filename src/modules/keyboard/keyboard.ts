/* eslint-disable consistent-return */
import type { Swiper, SwiperModuleFn } from '../../core/core';
import { elementOffset, elementParents } from '../../shared/utils';

export interface KeyboardOptions {
  /**
   * Set to `true` to enable keyboard control
   *
   * @default false
   */
  enabled?: boolean;
  /**
   * When enabled it will control sliders that are currently in viewport
   *
   * @default true
   */
  onlyInViewport?: boolean;
  /**
   * When enabled it will enable keyboard navigation by Page Up and Page Down keys
   *
   * @default true
   */
  pageUpDown?: boolean;
  /**
   * Set the speed of keyboard navigation transitions (in ms)
   *
   * @default undefined
   */
  speed?: number;
}

export interface KeyboardMethods {
  /**
   * Whether the keyboard control is enabled
   */
  enabled: boolean;

  /**
   * Enable keyboard control
   */
  enable(): void;

  /**
   * Disable keyboard control
   */
  disable(): void;
}

export interface KeyboardEvents {
  /**
   * Event will be fired on key press
   */
  keyPress: (swiper: Swiper, keyCode: string) => void;
}

// All KeyboardOptions fields are optional in the public type, but extendParams
// fills them in at module init time. Use this view internally to access defaults
// without proliferating `!` non-null assertions through the module.
type KeyboardParamsRuntime = Required<Omit<KeyboardOptions, 'speed'>> &
  Pick<KeyboardOptions, 'speed'>;

declare module '../../core/core' {
  interface Swiper {
    keyboard: KeyboardMethods;
  }
  interface SwiperOptions {
    /**
     * Enables navigation through slides using keyboard. Object with keyboard parameters or boolean `true` to enable with default settings
     *
     * @example
     * ```js
     * const swiper = new Swiper('.swiper', {
     *   keyboard: {
     *     enabled: true,
     *     onlyInViewport: false,
     *   },
     * });
     * ```
     */
    keyboard?: KeyboardOptions | boolean;
  }
  interface SwiperParams {
    keyboard?: KeyboardOptions;
  }
  interface SwiperEvents extends KeyboardEvents {}
}

const Keyboard: SwiperModuleFn = ({ swiper, extendParams, on, emit }) => {
  extendParams({
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true,
      speed: undefined,
    },
  });

  function getParams(): KeyboardParamsRuntime {
    return swiper.params.keyboard as KeyboardParamsRuntime;
  }

  function handle(event: KeyboardEvent | (KeyboardEvent & { originalEvent?: KeyboardEvent })) {
    if (!swiper.enabled) return;

    const { rtlTranslate: rtl } = swiper;
    const e: KeyboardEvent =
      'originalEvent' in event && event.originalEvent ? event.originalEvent : event;
    const kc = e.keyCode || e.charCode;
    const params = getParams();
    const pageUpDown = !!params.pageUpDown;
    const isPageUp = pageUpDown && kc === 33;
    const isPageDown = pageUpDown && kc === 34;
    const isArrowLeft = kc === 37;
    const isArrowRight = kc === 39;
    const isArrowUp = kc === 38;
    const isArrowDown = kc === 40;
    // Directions locks
    if (
      !swiper.allowSlideNext &&
      ((swiper.isHorizontal() && isArrowRight) ||
        (swiper.isVertical() && isArrowDown) ||
        isPageDown)
    ) {
      return false;
    }
    if (
      !swiper.allowSlidePrev &&
      ((swiper.isHorizontal() && isArrowLeft) || (swiper.isVertical() && isArrowUp) || isPageUp)
    ) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    const activeElement = document.activeElement as HTMLElement | null;
    if (
      activeElement &&
      (activeElement.isContentEditable ||
        (activeElement.nodeName &&
          (activeElement.nodeName.toLowerCase() === 'input' ||
            activeElement.nodeName.toLowerCase() === 'textarea')))
    ) {
      return undefined;
    }
    if (
      params.onlyInViewport &&
      (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)
    ) {
      let inView = false;
      // Check that swiper should be inside of visible area of window
      if (
        elementParents(swiper.el, `.${swiper.params.slideClass}, swiper-slide`).length > 0 &&
        elementParents(swiper.el, `.${swiper.params.slideActiveClass}`).length === 0
      ) {
        return undefined;
      }

      const el = swiper.el;
      const swiperWidth = el.clientWidth;
      const swiperHeight = el.clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const swiperOffset = elementOffset(el);
      if (rtl) swiperOffset.left -= el.scrollLeft;
      const swiperCoord: Array<[number, number]> = [
        [swiperOffset.left, swiperOffset.top],
        [swiperOffset.left + swiperWidth, swiperOffset.top],
        [swiperOffset.left, swiperOffset.top + swiperHeight],
        [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight],
      ];
      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i]!;
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    const speed = params.speed;
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.cancelable) e.preventDefault();
      }
      if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl))
        swiper.slideNext(speed);
      if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl))
        swiper.slidePrev(speed);
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.cancelable) e.preventDefault();
      }
      if (isPageDown || isArrowDown) swiper.slideNext(speed);
      if (isPageUp || isArrowUp) swiper.slidePrev(speed);
    }
    emit('keyPress', kc);
    return undefined;
  }
  function enable(): void {
    if (swiper.keyboard.enabled) return;
    document.addEventListener('keydown', handle);
    swiper.keyboard.enabled = true;
  }
  function disable(): void {
    if (!swiper.keyboard.enabled) return;
    document.removeEventListener('keydown', handle);
    swiper.keyboard.enabled = false;
  }

  swiper.keyboard = {
    enabled: false,
    enable,
    disable,
  };

  on('init', () => {
    if (getParams().enabled) {
      enable();
    }
  });
  on('destroy', () => {
    if (swiper.keyboard.enabled) {
      disable();
    }
  });
};

export default Keyboard;
