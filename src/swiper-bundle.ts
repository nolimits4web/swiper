import Swiper, { type SwiperModuleFn } from './core/core';
//IMPORT_MODULES

// eslint-disable-next-line
export { default as Swiper, default } from './core/core';

// Swiper Class
const modules: SwiperModuleFn[] = [
  //INSTALL_MODULES
];
Swiper.use(modules);
