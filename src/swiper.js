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

Swiper.use(components);

//EXPORT
