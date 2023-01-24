import { processLazyPreloader } from '../../shared/process-lazy-preloader.js';

export default function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  swiper.update();
}
