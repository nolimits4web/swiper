import { elementStyle, getComputedStyle } from '../../shared/utils';
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

// The container's content box along the slider - the only box the ResizeObserver watches - to the
// fraction of a pixel: clientWidth also counts the padding and rounds, and measureSize() drops the
// fractions of the paddings it subtracts.
function contentBoxSize(swiper: Swiper): number {
  const style = getComputedStyle(swiper.el);
  const [size, start, end] = swiper.isHorizontal()
    ? ['width', 'left', 'right']
    : ['height', 'top', 'bottom'];
  let value = parseFloat(style.getPropertyValue(size));
  if (style.getPropertyValue('box-sizing') === 'border-box') {
    for (const side of [start, end]) {
      value -=
        parseFloat(style.getPropertyValue(`padding-${side}`) || '0') +
        parseFloat(style.getPropertyValue(`border-${side}-width`) || '0');
    }
  }
  return Number.isNaN(value) ? 0 : value;
}

// Whether the container changed size along the slider since updateSize(), with the ResizeObserver
// still to hand the change to onResize() on the next animation frame. Only a change of the content
// box is handed on, so that is what is compared: a padding change alone is followed by no onResize().
export function isResizePending(swiper: Swiper): boolean {
  const { params } = swiper;
  return (
    !!params.updateOnWindowResize &&
    !!params.resizeObserver &&
    typeof window.ResizeObserver !== 'undefined' &&
    contentBoxSize(swiper) !== swiper._contentBoxSize
  );
}

export default function updateSize(this: Swiper): void {
  const swiper = this;
  const measured = measureSize(swiper);
  if (!measured) return;
  const { width, height } = measured;

  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height,
    _contentBoxSize: contentBoxSize(swiper),
  });
}
