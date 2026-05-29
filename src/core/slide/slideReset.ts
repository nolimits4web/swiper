import type { Swiper } from '../core';

export default function slideReset(
  this: Swiper,
  speed?: number,
  runCallbacks = true,
  internal?: boolean,
): boolean | undefined {
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === 'undefined') {
    speed = swiper.params.speed;
  }
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
