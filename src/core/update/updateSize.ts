import { elementStyle } from '../../shared/utils';
import type { Swiper } from '../core';

function measureSize(swiper: Swiper): { width: number; height: number } | null {
  let width: number;
  let height: number;
  const el = swiper.el;
  if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
    return null;
  }

  // Subtract paddings
  width =
    width -
    parseInt(elementStyle(el, 'padding-left') || '0', 10) -
    parseInt(elementStyle(el, 'padding-right') || '0', 10);
  height =
    height -
    parseInt(elementStyle(el, 'padding-top') || '0', 10) -
    parseInt(elementStyle(el, 'padding-bottom') || '0', 10);

  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;

  return { width, height };
}

// Whether the container changed size along the slider since updateSize(), with the ResizeObserver
// still to hand the change to onResize() on the next animation frame.
export function isResizePending(swiper: Swiper): boolean {
  const { params, el } = swiper;
  if (
    !params.updateOnWindowResize ||
    !params.resizeObserver ||
    typeof window.ResizeObserver === 'undefined'
  ) {
    return false;
  }
  const isH = swiper.isHorizontal();
  const clientSize = isH ? el.clientWidth : el.clientHeight;
  if (clientSize === swiper._clientSize) return false;
  // clientWidth includes the padding, the ResizeObserver only sees the content box: a padding
  // change alone leaves the slide grid as it was, and no onResize() follows to measure it.
  const measured = measureSize(swiper);
  if (!measured || (isH ? measured.width : measured.height) !== swiper.size) return true;
  swiper._clientSize = clientSize;
  return false;
}

export default function updateSize(this: Swiper): void {
  const swiper = this;
  const el = swiper.el;
  const measured = measureSize(swiper);
  if (!measured) return;
  const { width, height } = measured;

  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height,
    _clientSize: swiper.isHorizontal() ? el.clientWidth : el.clientHeight,
  });
}
