import type { Swiper } from '../core';

export default function minTranslate(this: Swiper): number {
  return -this.snapGrid[0]!;
}
