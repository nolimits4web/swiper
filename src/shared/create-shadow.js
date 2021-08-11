import $ from './dom.js';

export default function createShadow(params, $slideEl, side) {
  const $shadowEl = $(`<div class="swiper-slide-shadow${side ? `-${side}` : ''}"></div>`);
  if (params.transformEl) {
    $slideEl.find(params.transformEl).append($shadowEl);
  } else {
    $slideEl.append($shadowEl);
  }
  return $shadowEl;
}
