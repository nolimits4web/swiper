import type { Swiper } from '../core';
import transitionEmit from './transitionEmit';

export default function transitionEnd(
  this: Swiper,
  runCallbacks = true,
  direction?: 'reset' | 'prev' | 'next',
): void {
  const swiper = this;
  const { params } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);

  transitionEmit({ swiper, runCallbacks, direction, step: 'End' });
}
