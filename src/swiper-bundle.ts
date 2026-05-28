import Swiper, { type SwiperModule } from './core/core';
//IMPORT_MODULES

// eslint-disable-next-line
export { default as Swiper, default } from './core/core';

// Swiper Class
const modules: SwiperModule[] = [
  //INSTALL_MODULES
];
Swiper.use(modules);
