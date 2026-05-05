import { now } from '../../shared/utils.mjs';

export default function onClick(e) {
  const swiper = this;
  const data = swiper.touchEventsData;

  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
    return;
  }

  const clickTime = now();
  const pathTree = e.path || e.composedPath?.();

  swiper.updateClickedSlide((pathTree && pathTree[0]) || e.target, pathTree);
  swiper.emit('tap click', e);

  if (clickTime - data.lastClickTime < 300) {
    swiper.emit('doubleTap doubleClick', e);
  }

  data.lastClickTime = now();
}
