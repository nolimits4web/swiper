import type { Swiper } from '../core';

export default function onDocumentTouchStart(this: Swiper): void {
  const swiper = this;
  if (swiper.destroyed) return;
  if (swiper.documentTouchHandlerProceeded) return;
  swiper.documentTouchHandlerProceeded = true;
  if (swiper.params.touchReleaseOnEdges) {
    swiper.el.style.touchAction = 'auto';
  }
}
