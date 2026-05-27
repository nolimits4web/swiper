import { createElement, getSlideTransformEl } from './utils';

export default function createShadow(
  suffix: string,
  slideEl: HTMLElement,
  side?: string,
): HTMLElement {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}${
    suffix ? ` swiper-slide-shadow-${suffix}` : ''
  }`;
  const shadowContainer = getSlideTransformEl(slideEl);
  const selector = `.${shadowClass.split(' ').join('.')}`;
  const existing = shadowContainer.querySelector<HTMLElement>(selector);
  if (existing) return existing;

  const created = createElement('div', shadowClass.split(' '));
  shadowContainer.append(created);
  return created;
}
