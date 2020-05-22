// Swiper Class
import Swiper from './components/core/core-class';

// Core Modules
import Resize from './modules/resize/resize';
import Observer from './modules/observer/observer';

//IMPORT_COMPONENTS

const components = [
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
