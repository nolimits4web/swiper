import Utils from '../../utils/utils';
import SwiperClass from '../../utils/class';

class Swiper extends SwiperClass {
  constructor(params) {
    super(params);

    // App Instance
    const swiper = this;

    // Default
    const defaults = {
      root: 'body',
      theme: 'auto',
      init: true,
      routes: [],
    };

    // Extend defaults with modules params
    swiper.useModulesParams(defaults);

    // Extend defaults with passed params
    swiper.params = Utils.extend(defaults, params);


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
  static Class(...args) {
    return new SwiperClass(...args);
  }
}

Swiper.Class = SwiperClass;

export default Swiper;
