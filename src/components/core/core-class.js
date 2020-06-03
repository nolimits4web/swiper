/* eslint no-param-reassign: "off" */
import $ from '../../utils/dom';
import { extend, now, deleteProps } from '../../utils/utils';
import { getSupport } from '../../utils/get-support';
import { getDevice } from '../../utils/get-device';
import { getBrowser } from '../../utils/get-browser';

import modular from './modular';
import eventsEmitter from './events-emitter';

import update from './update/index';
import translate from './translate/index';
import transition from './transition/index';
import slide from './slide/index';
import loop from './loop/index';
import grabCursor from './grab-cursor/index';
import manipulation from './manipulation/index';
import events from './events/index';
import breakpoints from './breakpoints/index';
import classes from './classes/index';
import images from './images/index';
import checkOverflow from './check-overflow/index';

import defaults from './defaults';

const prototypes = {
  modular,
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  manipulation,
  events,
  breakpoints,
  checkOverflow,
  classes,
  images,
};

const extendedDefaults = {};

class Swiper {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};

    params = extend({}, params);
    if (el && !params.el) params.el = el;

    // Swiper Instance
    const swiper = this;
    swiper.support = getSupport();
    swiper.device = getDevice({ userAgent: params.userAgent });
    swiper.browser = getBrowser();

    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];

    Object.keys(prototypes).forEach((prototypeGroup) => {
      Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
        if (!Swiper.prototype[protoMethod]) {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }
      });
    });

    if (typeof swiper.modules === 'undefined') {
      swiper.modules = {};
    }
    Object.keys(swiper.modules).forEach((moduleName) => {
      const module = swiper.modules[moduleName];
      if (module.params) {
        const moduleParamName = Object.keys(module.params)[0];
        const moduleParams = module.params[moduleParamName];
        if (typeof moduleParams !== 'object' || moduleParams === null) return;
        if (!(moduleParamName in params && 'enabled' in moduleParams)) return;
        if (params[moduleParamName] === true) {
          params[moduleParamName] = { enabled: true };
        }
        if (
          typeof params[moduleParamName] === 'object' &&
          !('enabled' in params[moduleParamName])
        ) {
          params[moduleParamName].enabled = true;
        }
        if (!params[moduleParamName]) params[moduleParamName] = { enabled: false };
      }
    });

    // Extend defaults with modules params
    const swiperParams = extend({}, defaults);
    swiper.useParams(swiperParams);

    // Extend defaults with passed params
    swiper.params = extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend({}, swiper.params);
    swiper.passedParams = extend({}, params);

    // add event listeners
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }

    // Save Dom lib
    swiper.$ = $;

    // Find el
    const $el = $(swiper.params.el);
    el = $el[0];

    if (!el) {
      return undefined;
    }

    if ($el.length > 1) {
      const swipers = [];
      $el.each((containerEl) => {
        const newParams = extend({}, params, { el: containerEl });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }

    el.swiper = swiper;

    // Find Wrapper
    let $wrapperEl;
    if (el && el.shadowRoot && el.shadowRoot.querySelector) {
      $wrapperEl = $(el.shadowRoot.querySelector(`.${swiper.params.wrapperClass}`));
      // Children needs to return slot items
      $wrapperEl.children = (options) => $el.children(options);
    } else {
      $wrapperEl = $el.children(`.${swiper.params.wrapperClass}`);
    }
    // Extend Swiper
    extend(swiper, {
      $el,
      el,
      $wrapperEl,
      wrapperEl: $wrapperEl[0],

      // Classes
      classNames: [],

      // Slides
      slides: $(),
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
      // RTL
      rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
      rtlTranslate:
        swiper.params.direction === 'horizontal' &&
        (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

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

      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
        let desktop = ['mousedown', 'mousemove', 'mouseup'];
        if (swiper.support.pointerEvents) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        }
        swiper.touchEventsTouch = {
          start: touch[0],
          move: touch[1],
          end: touch[2],
          cancel: touch[3],
        };
        swiper.touchEventsDesktop = {
          start: desktop[0],
          move: desktop[1],
          end: desktop[2],
        };
        return swiper.support.touch || !swiper.params.simulateTouch
          ? swiper.touchEventsTouch
          : swiper.touchEventsDesktop;
      })(),
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
        formElements: 'input, select, option, textarea, button, video, label',
        // Last click time
        lastClickTime: now(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined,
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

    // Install Modules
    swiper.useModules();

    swiper.emit('_swiper');

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    return swiper;
  }

  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const classes = swiper.el.className.split(' ').filter((className) => {
      return (
        className.indexOf('swiper-container') === 0 ||
        className.indexOf(swiper.params.containerModifierClass) === 0
      );
    });
    swiper.emit('_containerClasses', classes.join(' '));
  }

  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    swiper.slides.each((slideEl) => {
      const classes = slideEl.className.split(' ').filter((className) => {
        return (
          className.indexOf('swiper-slide') === 0 ||
          className.indexOf(swiper.params.slideClass) === 0
        );
      });
      swiper.emit('_slideClass', slideEl, classes.join(' '));
    });
  }

  slidesPerViewDynamic() {
    const swiper = this;
    const { params, slides, slidesGrid, size: swiperSize, activeIndex } = swiper;
    let spv = 1;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex].swiperSlideSize;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slidesGrid[i] - slidesGrid[activeIndex] < swiperSize) {
          spv += 1;
        }
      }
    }
    return spv;
  }

  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const { snapGrid, params } = swiper;
    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
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
    if (swiper.params.freeMode) {
      setTranslate();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if (
        (swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) &&
        swiper.isEnd &&
        !swiper.params.centeredSlides
      ) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
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

  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      // eslint-disable-next-line
      newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
    }
    if (
      newDirection === currentDirection ||
      (newDirection !== 'horizontal' && newDirection !== 'vertical')
    ) {
      return swiper;
    }

    swiper.$el
      .removeClass(`${swiper.params.containerModifierClass}${currentDirection}`)
      .addClass(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();

    swiper.params.direction = newDirection;

    swiper.slides.each((slideEl) => {
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

  init() {
    const swiper = this;
    if (swiper.initialized) return;

    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate();
    }

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();

    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }

    // Set Grab Cursor
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }

    if (swiper.params.preloadImages) {
      swiper.preloadImages();
    }

    // Slide To Initial Slide
    if (swiper.params.loop) {
      swiper.slideTo(
        swiper.params.initialSlide + swiper.loopedSlides,
        0,
        swiper.params.runCallbacksOnInit,
      );
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
    }

    // Attach events
    swiper.attachEvents();

    // Init Flag
    swiper.initialized = true;

    // Emit
    swiper.emit('init');
  }

  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const { params, $el, $wrapperEl, slides } = swiper;

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
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');
      if (slides && slides.length) {
        slides
          .removeClass(
            [
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass,
            ].join(' '),
          )
          .removeAttr('style')
          .removeAttr('data-swiper-slide-index');
      }
    }

    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });

    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      deleteProps(swiper);
    }
    swiper.destroyed = true;

    return null;
  }

  static extendDefaults(newDefaults) {
    extend(extendedDefaults, newDefaults);
  }

  static get extendedDefaults() {
    return extendedDefaults;
  }

  static get defaults() {
    return defaults;
  }

  static installModule(module) {
    if (!Swiper.prototype.modules) Swiper.prototype.modules = {};
    const name = module.name || `${Object.keys(Swiper.prototype.modules).length}_${now()}`;
    Swiper.prototype.modules[name] = module;
  }

  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m) => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}

export default Swiper;
