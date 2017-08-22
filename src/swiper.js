// F7 Class
import Swiper from './components/core/core-class';

// Import Modules
import Device from './modules/device/device';
import Support from './modules/support/support';
import Browser from './modules/browser/browser';
import Resize from './modules/resize/resize';

import Observer from './components/observer/observer';
import Keyboard from './components/keyboard/keyboard';
import Mousewheel from './components/mousewheel/mousewheel';
import Navigation from './components/navigation/navigation';
import Pagination from './components/pagination/pagination';
// import Parallax from './components/parallax/parallax';
// import Scrollbar from './components/scrollbar/scrollbar';
// import Zoom from './components/zoom/zoom';
// import Lazy from './components/lazy/lazy';
// import Controller from './components/controller/controller';
// import A11y from './components/a11y/a11y';
// import History from './components/history/history';
// import HashNavigation from './components/hash-navigation/hash-navigation';

// Install Modules
Swiper
  .use(Device)
  .use(Support)
  .use(Browser)
  .use(Resize)

  // Install Components
  .use(Keyboard)
  .use(Mousewheel)
  .use(Navigation)
  .use(Pagination)
  .use(Observer);
  // .use(Parallax)
  // .use(Scrollbar)
  // .use(Zoom)
  // .use(Lazy)
  // .use(Controller)
  // .use(A11y)
  // .use(History)
  // .use(HashNavigation)

export default Swiper;
