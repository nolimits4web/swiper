import { processLazyPreloader } from '../../shared/process-lazy-preloader';
import type { Swiper } from '../core';

export default function onLoad(this: Swiper, e: Event): void {
  const swiper = this;
  if (swiper.destroyed) return;
  processLazyPreloader(swiper, e.target as HTMLImageElement);
  if (
    swiper.params.cssMode ||
    (swiper.params.slidesPerView !== 'auto' && !swiper.params.autoHeight)
  ) {
    return;
  }
  swiper.update();
}
