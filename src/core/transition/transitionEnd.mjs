import transitionEmit from './transitionEmit.mjs';

export default function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const { params } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);

  transitionEmit({ swiper, runCallbacks, direction, step: 'End' });
}
