import $ from 'dom7';
import Utils from '../../utils/utils';


const Keyboard = {
  bound: false,
  handle(event) {
    const swiper = this;
    let e = event;
    if (e.originalEvent) e = e.originalEvent; // jquery fix
    const kc = e.keyCode || e.charCode;
    // Directions locks
    if (!swiper.params.allowSwipeToNext && (swiper.isHorizontal() && kc === 39 || !swiper.isHorizontal() && kc === 40)) {
      return false;
    }
    if (!swiper.params.allowSwipeToPrev && (swiper.isHorizontal() && kc === 37 || !swiper.isHorizontal() && kc === 38)) {
      return false;
    }
    if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
      return undefined;
    }
    if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
      return undefined;
    }
    if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
      let inView = false;
      // Check that swiper should be inside of visible area of window
      if (swiper.container.parents(`.${swiper.params.slideClass}`).length > 0 && swiper.container.parents(`.${swiper.params.slideActiveClass}`).length === 0) {
        return undefined;
      }
      const windowScroll = {
        left: window.pageXOffset,
        top: window.pageYOffset,
      };
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const swiperOffset = swiper.container.offset();
      if (swiper.rtl) swiperOffset.left -= swiper.container[0].scrollLeft;
      const swiperCoord = [
        [swiperOffset.left, swiperOffset.top],
        [swiperOffset.left + swiper.width, swiperOffset.top],
        [swiperOffset.left, swiperOffset.top + swiper.height],
        [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height],
      ];
      for (let i = 0; i < swiperCoord.length; i += 1) {
        const point = swiperCoord[i];
        if (
          point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
            point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
        ) {
          inView = true;
        }
      }
      if (!inView) return undefined;
    }
    if (swiper.isHorizontal()) {
      if (kc === 37 || kc === 39) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if ((kc === 39 && !swiper.rtl) || (kc === 37 && swiper.rtl)) swiper.slideNext();
      if ((kc === 37 && !swiper.rtl) || (kc === 39 && swiper.rtl)) swiper.slidePrev();
    } else {
      if (kc === 38 || kc === 40) {
        if (e.preventDefault) e.preventDefault();
        else e.returnValue = false;
      }
      if (kc === 40) swiper.slideNext();
      if (kc === 38) swiper.slidePrev();
    }
    swiper.emit('keyPress', kc);
    return undefined;
  },
  enable() {
    const swiper = this;
    if (!Keyboard.bound) {
      Keyboard.bound = true;
      Keyboard.handle = Keyboard.handle.bind(swiper);
    }
    $(document).on('keydown', Keyboard.handle);
  },
  disable() {
    $(document).off('keydown', Keyboard.handle);
  },
};

export default {
  name: 'keyboard',
  params: {
    keyboard: false,
  },
  create() {
    const swiper = this;
    Utils.extend(swiper, {
      keyboard: {
        enable: Keyboard.enable.bind(swiper),
        disable: Keyboard.disable.bind(swiper),
      },
    });
  },
};
