// Swiper Class
import Swiper from './components/core/core-class';

// Core Modules
import Defaults from './modules/defaults/defaults';
import Device from './modules/device/device';
import Support from './modules/support/support';
import Browser from './modules/browser/browser';
import Resize from './modules/resize/resize';
import Observer from './modules/observer/observer';

//IMPORT_COMPONENTS

Swiper
  .use(Defaults)
  .use(Device)
  .use(Support)
  .use(Browser)
  .use(Resize)
  .use(Observer)
  //INSTALL_COMPONENTS

//EXPORT
