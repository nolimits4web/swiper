import { getSlideTransformEl } from './utils';

export default function effectTarget(_effectParams: unknown, slideEl: HTMLElement): HTMLElement {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = 'hidden';
    transformEl.style.setProperty('-webkit-backface-visibility', 'hidden');
  }
  return transformEl;
}
