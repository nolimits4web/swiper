import { createElement, getSlideTransformEl } from './utils';

export default function createShadow(suffix: string, slideEl: Element, side?: string): Element {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}${
    suffix ? ` swiper-slide-shadow-${suffix}` : ''
  }`;
  const shadowContainer = getSlideTransformEl(slideEl);
  let shadowEl = shadowContainer.querySelector(`.${shadowClass.split(' ').join('.')}`);

  if (!shadowEl) {
    shadowEl = createElement('div', shadowClass.split(' '));
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}
