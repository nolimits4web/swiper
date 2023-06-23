import { processLazyPreloader } from '../../shared/process-lazy-preloader.mjs';

export default function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (
    swiper.params.cssMode ||
    (swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight)
  ) {
    return;
  }
  swiper.update();
}
