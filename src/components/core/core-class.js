import $ from '../../utils/dom';
import Utils from '../../utils/utils';
import Support from '../../utils/support';

import SwiperClass from '../../utils/class';

import defaults from './defaults';

import update from './update/';
import translate from './translate/';
import transition from './transition/';
import slide from './slide/';
import slideLock from './slide-lock/';
import loop from './loop/';
import grabCursor from './grab-cursor/';
import manipulation from './manipulation/';
import events from './events/';
import breakpoints from './breakpoints/';
import classes from './classes/';

class Swiper extends SwiperClass {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};

    params = Utils.extend({}, params);
    if (el && !params.el) params.el = el;


    super(params);

    // Swiper Instance
    const swiper = this;


    // Extend defaults with modules params
    swiper.useModulesParams(defaults);

    // Extend defaults with passed params
    swiper.params = Utils.extend(defaults, params);
    swiper.originalParams = Utils.extend({}, swiper.params);

    // Find el
    const $el = $(swiper.params.el);
    el = $el[0];

    if (!el) {
      return undefined;
    }

    el.swiper = swiper;
    $el.data('swiper', swiper);

    // Find Wrapper
    const $wrapperEl = $el.children(`.${swiper.params.wrapperClass}`);

    // Extend Swiper
    Utils.extend(swiper, {
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
      rtl: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

      // Indexes
      activeIndex: 0,
      realIndex: 0,

      //
      isBeginning: true,
      isEnd: false,

      // Props
      translate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        const touch = ['touchstart', 'touchmove', 'touchend'];
        let desktop = ['mousedown', 'mousemove', 'mouseup'];
        if (window.navigator.pointerEnabled) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        } else if (window.navigator.msPointerEnabled) {
          desktop = ['MSPointerDown', 'MsPointerMove', 'MsPointerUp'];
        }

        return {
          start: Support.touch || !swiper.params.simulateTouch ? touch[0] : desktop[0],
          move: Support.touch || !swiper.params.simulateTouch ? touch[1] : desktop[1],
          end: Support.touch || !swiper.params.simulateTouch ? touch[2] : desktop[2],
        };
      }()),

      // Clicks
      allowClick: true,

      // Touches
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
      },
    });


    // Install Modules
    swiper.useModules();

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    return swiper;
  }
  slidesPerView() {
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
  init() {
    const swiper = this;
    if (swiper.initialized) return;

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

    // Update size .updateSize
    swiper.updateSize();

    // Update slides .updateSlides
    swiper.updateSlides();

    // Set Grab Cursor
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }

    // Slide To Initial Slide .slideTo
    if (swiper.params.loop) {
      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
    }

    // Attach events
    swiper.attachEvents();

    swiper.initialized = true;
    swiper.emit('init');
  }
  cleanStyles() {
    const swiper = this;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    let swiper = this;
    swiper.emit('destroy beforeDestroy');
    if (cleanStyles) {
      swiper.cleanStyles();
    }
    swiper.emit('destroyed');
    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      swiper.$el.data('swiper', null);
      Utils.deleteProps(swiper);
      swiper = null;
    }
  }
}

const prototypes = Utils.extend({}, update, translate, transition, slide, slideLock, loop, grabCursor, manipulation, events, breakpoints, classes);

Object.keys(prototypes).forEach((protoMethod) => {
  Swiper.prototype[protoMethod] = prototypes[protoMethod];
});

Swiper.Class = SwiperClass;

export default Swiper;
