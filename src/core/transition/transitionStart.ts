import type { Swiper } from '../core';
import transitionEmit from './transitionEmit';

export default function transitionStart(
  this: Swiper,
  runCallbacks = true,
  direction?: 'reset' | 'prev' | 'next',
): void {
  const swiper = this;
  const { params } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  transitionEmit({ swiper, runCallbacks, direction, step: 'Start' });
}
