/* eslint-disable consistent-return */
import { getWindow, getDocument } from 'ssr-window';
import $ from '../../utils/dom';
import { bindModuleMethods } from '../../utils/utils';

const Keyboard = {
  handle(event) {
    const swiper = this;
    if (!swiper.enabled) return;
    const window = getWindow();
    const document = getDocument();
    const { rtlTranslate: rtl } = swiper;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    const kc = e.keyCode || e.charCode;
    const pageUpDown = swiper.params.keyboard.pageUpDown;
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
    if (
      document.activeElement &&
      document.activeElement.nodeName &&
      (document.activeElement.nodeName.toLowerCase() === 'input' ||
        document.activeElement.nodeName.toLowerCase() === 'textarea')
    ) {
      return undefined;
    }
    if (
      swiper.params.keyboard.onlyInViewport &&
      (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)
    ) {
      let inView = false;
      // Check that swiper should be inside of visible area of window
      if (
        swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 &&
        swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0
      ) {
        return undefined;
      }

      const $el = swiper.$el;
      const swiperWidth = $el[0].clientWidth;
      const swiperHeight = $el[0].clientHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const swiperOffset = swiper.$el.offset();
      if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
      const swiperCoord = [
        [swiperOffset.left, swiperOffset.top],
        [swiperOffset.left + swiperWidth, swiperOffset.top],
        [swiperOffset.left, swiperOffset.top + swiperHeight],
        [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight],
      ];
      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];
        if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
          if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (swiper.isHorizontal()) {
      if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl))
        swiper.slideNext();
      if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl))
        swiper.slidePrev();
    } else {
      if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (isPageDown || isArrowDown) swiper.slideNext();
      if (isPageUp || isArrowUp) swiper.slidePrev();
    }
    swiper.emit('keyPress', kc);
    return undefined;
  },
  enable() {
    const swiper = this;
    const document = getDocument();
    if (swiper.keyboard.enabled) return;
    $(document).on('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = true;
  },
  disable() {
    const swiper = this;
    const document = getDocument();
    if (!swiper.keyboard.enabled) return;
    $(document).off('keydown', swiper.keyboard.handle);
    swiper.keyboard.enabled = false;
  },
};

export default {
  name: 'keyboard',
  params: {
    keyboard: {
      enabled: false,
      onlyInViewport: true,
      pageUpDown: true,
    },
  },
  create() {
    const swiper = this;
    bindModuleMethods(swiper, {
      keyboard: {
        enabled: false,
        ...Keyboard,
      },
    });
  },
  on: {
    init(swiper) {
      if (swiper.params.keyboard.enabled) {
        swiper.keyboard.enable();
      }
    },
    destroy(swiper) {
      if (swiper.keyboard.enabled) {
        swiper.keyboard.disable();
      }
    },
  },
};
