import type { Swiper } from '../core';

export default function onClick(this: Swiper, e: MouseEvent): void {
  const swiper = this;
  if (swiper.destroyed) return;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
