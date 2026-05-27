/* eslint-disable consistent-return */
import type { SwiperModuleFn } from '../../core/core';
import type {
  KeyboardEvents,
  KeyboardMethods,
  KeyboardOptions,
} from '../../types/modules/keyboard.d.ts';
import { elementOffset, elementParents } from '../../shared/utils';

export type { KeyboardEvents, KeyboardMethods, KeyboardOptions };

declare module '../../core/core' {
  interface Swiper {
    keyboard: KeyboardMethods;
  }
  interface SwiperOptions {
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

  function handle(event: KeyboardEvent | (KeyboardEvent & { originalEvent?: KeyboardEvent })) {
    if (!swiper.enabled) return;

    const { rtlTranslate: rtl } = swiper;
    let e: KeyboardEvent = event as KeyboardEvent;
    if ((event as any).originalEvent) e = (event as any).originalEvent;
    const kc = e.keyCode || e.charCode;
    const keyboardParams = swiper.params.keyboard!;
    const pageUpDown = !!keyboardParams.pageUpDown;
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
      keyboardParams.onlyInViewport &&
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
    const speed = keyboardParams.speed;
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();
        else (e as any).returnValue = false;
      }
      if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl))
        swiper.slideNext(speed);
      if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl))
        swiper.slidePrev(speed);
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();
        else (e as any).returnValue = false;
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
    if (swiper.params.keyboard!.enabled) {
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
