// Regression for https://github.com/nolimits4web/swiper/issues/8262.
import assert from 'node:assert/strict';

import { Window } from 'happy-dom';

const win = new Window({ url: 'http://localhost/' });
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window') continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* read-only global */
  }
}
globalThis.window = win;
const { default: Swiper } = await import('../../dist/swiper.mjs');
const { default: Virtual } = await import('../../dist/modules/virtual.mjs');

const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
const selections = [
  [],
  1,
  3,
  5,
  [1],
  [3],
  [5],
  [1, 3],
  [3, 1],
  [1, 3, 5],
  [1, 5, 3],
  [3, 1, 5],
  [3, 5, 1],
  [5, 1, 3],
  [5, 3, 1],
  [4, 0, 2],
  [5, 0],
  [5, 3, 1, 4, 0, 2],
  // a repeated index removes its slide once, as the core removeSlide() does
  [1, 1],
  [3, 1, 3],
];
function runCase(Swiper, Virtual, cache, indices, initialSlide) {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML = '<div class="swiper-wrapper"></div>';
  document.body.appendChild(el);
  const swiper = new Swiper(el, {
    modules: [Virtual],
    width: 300,
    height: 100,
    speed: 0,
    virtual: { enabled: true, slides: labels.slice(), cache },
  });
  for (let i = 0; i < labels.length; i += 1) swiper.slideTo(i, 0);
  swiper.slideTo(initialSlide, 0);
  const nodes = Object.fromEntries(
    Object.values(swiper.virtual.cache).map((node) => [node.textContent, node]),
  );
  const selected = Array.isArray(indices) ? indices : [indices];
  const input = Array.isArray(indices) ? indices.slice() : indices;
  swiper.virtual.removeSlide(input);
  const expected = labels.filter((_, i) => !selected.includes(i));
  const errors = [];
  const check = (ok, message) => {
    if (!ok) errors.push(message);
  };
  check(
    JSON.stringify(swiper.virtual.slides) === JSON.stringify(expected),
    'remaining slide identities',
  );
  check(JSON.stringify(input) === JSON.stringify(indices), 'caller array unchanged');
  for (const slide of swiper.slides) {
    check(
      slide.textContent === expected[Number(slide.getAttribute('data-swiper-slide-index'))],
      'rendered index/content',
    );
  }
  if (!selected.includes(initialSlide)) {
    check(swiper.activeIndex === expected.indexOf(labels[initialSlide]), 'active unremoved index');
    check(
      el.querySelector('.swiper-slide-active')?.textContent === labels[initialSlide],
      'active unremoved content',
    );
  }
  if (cache) {
    check(Object.keys(swiper.virtual.cache).length === expected.length, 'cache size');
    expected.forEach((label, i) => {
      const node = swiper.virtual.cache[i];
      check(node === nodes[label], 'cache element identity');
      check(node?.getAttribute('data-swiper-slide-index') === String(i), 'cache index attribute');
    });
  }
  const actual = swiper.virtual.slides.slice();
  swiper.destroy(true, true);
  el.remove();
  return { cache, indices, initialSlide, expected, actual, errors };
}

let passed = 0;
for (const cache of [false, true]) {
  for (const indices of selections) {
    for (let active = 0; active < labels.length; active += 1) {
      const row = runCase(Swiper, Virtual, cache, indices, active);
      assert.deepEqual(row.errors, [], JSON.stringify(row));
      passed += 1;
    }
  }
}
console.log(`${passed} virtual removal cases passed`);
win.happyDOM.abort();
