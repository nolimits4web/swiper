// F7 Class
import Swiper from './modules/core/core-class';

// Import Modules
import Device from './modules/device/device';
import Support from './modules/support/support';
import Browser from './modules/browser/browser';

import Keyboard from './modules/keyboard/keyboard';

// Install Modules
Swiper
  .use(Device)
  .use(Support)
  .use(Browser)

  .use(Keyboard);

export default Swiper;
