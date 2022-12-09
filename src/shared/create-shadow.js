import { createElement } from './utils.js';

export default function createShadow(params, slideEl, side) {
  const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;
  const shadowContainer = params.transformEl ? slideEl.querySelector(params.transformEl) : slideEl;
  let shadowEl = shadowContainer.querySelector(`.${shadowClass}`);

  if (!shadowEl) {
    shadowEl = createElement('div', `swiper-slide-shadow${side ? `-${side}` : ''}`);
    shadowContainer.append(shadowEl);
  }
  return shadowEl;
}
