import type { SwiperOptions } from '../core';

export default function getBreakpoint(
  breakpoints: SwiperOptions['breakpoints'],
  base: string = 'window',
  containerEl?: HTMLElement,
): string | undefined {
  if (!breakpoints || (base === 'container' && !containerEl)) return undefined;
  let breakpoint: string | false = false;

  const currentHeight = base === 'window' ? window.innerHeight : containerEl!.clientHeight;

  const points = Object.keys(breakpoints).map((point) => {
    if (typeof point === 'string' && point.indexOf('@') === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return { value, point };
    }
    return { value: point, point };
  });

  points.sort((a, b) => parseInt(String(a.value), 10) - parseInt(String(b.value), 10));
  for (let i = 0; i < points.length; i += 1) {
    const { point, value } = points[i]!;
    if (base === 'window') {
      if (window.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if ((value as number) <= containerEl!.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
}
