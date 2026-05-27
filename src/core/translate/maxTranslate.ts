import type { Swiper } from '../core';

export default function maxTranslate(this: Swiper): number {
  return -this.snapGrid[this.snapGrid.length - 1]!;
}
