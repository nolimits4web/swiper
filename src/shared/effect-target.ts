import { getSlideTransformEl } from './utils';

export default function effectTarget(_effectParams: unknown, slideEl: Element): Element {
  const transformEl = getSlideTransformEl(slideEl) as HTMLElement;
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = 'hidden';
    transformEl.style.setProperty('-webkit-backface-visibility', 'hidden');
  }
  return transformEl;
}
