import type { Swiper } from '../core';

export default function removeClasses(this: Swiper): void {
  const swiper = this;
  const { el, classNames } = swiper;
  if (!el || typeof el === 'string') return;

  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
