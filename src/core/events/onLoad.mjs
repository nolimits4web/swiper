import { processLazyPreloader } from '../../shared/process-lazy-preloader';

export default function onLoad(e) {
  const swiper = this;
  if (swiper.destroyed) return;
  processLazyPreloader(swiper, e.target);
  if (
    swiper.params.cssMode ||
    (swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight)
  ) {
    return;
  }
  swiper.update();
}
