import $ from '../../utils/dom';
import Utils from '../../utils/utils';
import SwiperClass from '../../utils/class';

import defaults from './defaults';

import * as update from './update/';
import * as translate from './translate/';
import * as transition from './transition/';
import * as slide from './slide/';

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

    // Find Wrapper
    const $wrapperEl = $el.children(`.${swiper.params.wrapperClass}`);

    // Extend Swiper
    Utils.extend(swiper, {
      $el,
      el,
      $wrapperEl,
      wrapperEl: $wrapperEl[0],

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
      // RTL
      rtl: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

      // Props
      translate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

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
  init() {
    const swiper = this;
    if (swiper.initialized) return;

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

const prototypes = Utils.extend({}, update, translate, transition, slide);

Object.keys(prototypes).forEach((protoMethod) => {
  Swiper.prototype[protoMethod] = prototypes[protoMethod];
});

Swiper.Class = SwiperClass;

export default Swiper;
