// Swiper Class
import Swiper from './components/core/core-class';

// Core Modules
import Device from './modules/device/device';
import Support from './modules/support/support';
import Browser from './modules/browser/browser';
import Resize from './modules/resize/resize';
import Observer from './modules/observer/observer';

//IMPORT_COMPONENTS

const components = [
  Device,
  Support,
  Browser,
  Resize,
  Observer,
  //INSTALL_COMPONENTS
];

if (typeof Swiper.use === 'undefined') {
  Swiper.use = Swiper.Class.use;
  Swiper.installModule = Swiper.Class.installModule;
}

Swiper.use(components);

//EXPORT
