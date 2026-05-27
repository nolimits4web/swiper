import type { Swiper } from '../core';

export default function setTransition(
  this: Swiper,
  duration: number,
  byController?: boolean | Swiper,
): void {
  const swiper = this;

  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : '';
  }

  swiper.emit('setTransition', duration, byController);
}
