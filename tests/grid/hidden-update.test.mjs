// Regression for #8240: update() on a Grid swiper initialized in a hidden (never measured)
// container threw from updateActiveIndex(). happy-dom has no layout, so clientWidth is 0 until
// we define it, which models the container becoming visible.

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Window } from 'happy-dom';

const win = new Window({ url: 'http://localhost/' });
const FORCE = new Set(['Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'ShadowRoot']);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !FORCE.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* read-only global */
  }
}
globalThis.window = win;

const { default: Swiper } = await import('../../dist/swiper-bundle.mjs');

test('update() on hidden Grid swiper does not throw and recovers once measurable', () => {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML = `<div class="swiper-wrapper">${'<div class="swiper-slide"></div>'.repeat(6)}</div>`;
  document.body.append(el);

  const swiper = new Swiper(el, {
    slidesPerView: 2,
    grid: { rows: 2 },
    resizeObserver: false,
  });
  assert.equal(swiper.size, undefined);
  assert.doesNotThrow(() => swiper.update());

  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => 600 });
  swiper.update();
  assert.equal(swiper.size, 600);
  swiper.slideNext(0);
  assert.equal(swiper.activeIndex, 1);

  swiper.destroy();
  el.remove();
});
