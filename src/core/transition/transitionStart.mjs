import transitionEmit from './transitionEmit.mjs';

export default function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const { params } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }

  transitionEmit({ swiper, runCallbacks, direction, step: 'Start' });
}
