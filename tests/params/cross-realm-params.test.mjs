// Regression test for nested params objects that are not "plain" to Swiper's own realm.
//
// Swiper's deep extend() only merges a nested value into the module defaults when isObject()
// says the value is a plain object; otherwise it assigns by reference, replacing the defaults
// object wholesale. The v14 TypeScript migration tightened isObject() from
//
//   o.constructor && toString(o) === 'Object'          (v13 and earlier)
//   o.constructor === Object && toString(o) === 'Object'   (v14.0.0 - 14.0.7)
//
// `constructor === Object` is realm-bound: an ordinary object literal created in a parent page
// and handed to a Swiper running inside an iframe fails it. The result was that
// swiper.params.navigation became the caller's raw object with none of the module defaults, so
// navigation's `params.disabledClass.split(' ')` threw
// "Cannot read properties of undefined (reading 'split')" during init. Every nested params
// object was affected the same way (pagination, breakpoints entries, ...).
//
// node:vm gives us a genuine second realm in pure Node — vm objects are plain object literals
// whose `constructor` is the other context's Object, exactly like the iframe case.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

import { Window } from 'happy-dom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');
const dist = (p) => path.join(distDir, p);

if (!fs.existsSync(distDir)) {
  console.error('dist/ missing — run `npm run build:prod` first.');
  process.exit(1);
}

const win = new Window({ url: 'http://localhost/' });
const FORCE = new Set(['Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'ShadowRoot']);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !FORCE.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* read-only global (e.g. navigator) — not needed for this test */
  }
}
globalThis.window = win;

const { default: Swiper } = await import(dist('swiper-bundle.mjs'));

const doc = win.document;

// Build the object in a separate vm context, so its prototype chain belongs to that realm.
const inOtherRealm = (source) => vm.runInNewContext(`(${source})`);

function mountSwiper(params, { slideCount = 3 } = {}) {
  const el = doc.createElement('div');
  el.className = 'swiper';
  const wrapper = doc.createElement('div');
  wrapper.className = 'swiper-wrapper';
  for (let i = 1; i <= slideCount; i += 1) {
    const slide = doc.createElement('div');
    slide.className = 'swiper-slide';
    slide.textContent = `Slide ${i}`;
    wrapper.appendChild(slide);
  }
  el.appendChild(wrapper);
  for (const cls of ['swiper-button-prev', 'swiper-button-next', 'swiper-pagination']) {
    const control = doc.createElement('div');
    control.className = cls;
    el.appendChild(control);
  }
  doc.body.appendChild(el);
  const swiper = new Swiper(el, params);
  return { el, swiper };
}

let failed = 0;
let passed = 0;
async function check(label, fn) {
  let el;
  try {
    el = await fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  } finally {
    if (el && el.remove) el.remove();
  }
}

console.log('\nSwiper cross-realm params regression test (happy-dom + node:vm)\n');

// Sanity: the fixture really is a foreign plain object, otherwise the rest proves nothing.
await check('vm objects are plain but fail a realm-bound constructor check', () => {
  const foreign = inOtherRealm('{ enabled: true }');
  assert.equal(Object.prototype.toString.call(foreign).slice(8, -1), 'Object');
  assert.notEqual(foreign.constructor, Object, 'must not share this realm’s Object');
  assert.ok(foreign.constructor, 'must still have a constructor');
});

await check('navigation object from another realm keeps its module defaults', () => {
  const { el, swiper } = mountSwiper({
    navigation: inOtherRealm(
      '{ enabled: true, prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }',
    ),
  });
  const nav = swiper.params.navigation;
  assert.equal(nav.disabledClass, 'swiper-button-disabled', 'disabledClass default must survive');
  assert.equal(nav.hiddenClass, 'swiper-button-hidden', 'hiddenClass default must survive');
  assert.equal(nav.lockClass, 'swiper-button-lock', 'lockClass default must survive');
  assert.equal(
    nav.navigationDisabledClass,
    'swiper-navigation-disabled',
    'navigationDisabledClass default must survive',
  );
  assert.equal(nav.enabled, true, 'caller value must still be applied');
  swiper.destroy(true, false);
  return el;
});

await check('navigation.enable()/disable() do not throw with foreign params', () => {
  const { el, swiper } = mountSwiper({
    navigation: inOtherRealm(
      '{ enabled: true, prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" }',
    ),
  });
  // Both read params.navigationDisabledClass.split(' ') — the original crash site.
  swiper.navigation.disable();
  assert.ok(
    swiper.el.classList.contains('swiper-navigation-disabled'),
    'disable() must add the disabled class',
  );
  swiper.navigation.enable();
  assert.equal(
    swiper.el.classList.contains('swiper-navigation-disabled'),
    false,
    'enable() must remove the disabled class',
  );
  swiper.destroy(true, false);
  return el;
});

await check('pagination object from another realm keeps its module defaults', () => {
  const { el, swiper } = mountSwiper({
    pagination: inOtherRealm('{ el: ".swiper-pagination", clickable: true }'),
  });
  const pagination = swiper.params.pagination;
  assert.equal(pagination.bulletClass, 'swiper-pagination-bullet', 'bulletClass must survive');
  assert.equal(
    pagination.bulletActiveClass,
    'swiper-pagination-bullet-active',
    'bulletActiveClass must survive',
  );
  assert.equal(pagination.clickable, true, 'caller value must still be applied');
  swiper.destroy(true, false);
  return el;
});

await check('breakpoint params from another realm do not wipe defaults', () => {
  const { el, swiper } = mountSwiper({
    navigation: { enabled: true, prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' },
    breakpoints: inOtherRealm(
      '{ 0: { navigation: { enabled: true, prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" } } }',
    ),
  });
  assert.equal(
    swiper.params.navigation.disabledClass,
    'swiper-button-disabled',
    'defaults must survive the breakpoint merge',
  );
  swiper.destroy(true, false);
  return el;
});

await check('the whole params object may come from another realm', () => {
  const el = doc.createElement('div');
  el.className = 'swiper';
  const wrapper = doc.createElement('div');
  wrapper.className = 'swiper-wrapper';
  for (let i = 1; i <= 3; i += 1) {
    const slide = doc.createElement('div');
    slide.className = 'swiper-slide';
    wrapper.appendChild(slide);
  }
  el.appendChild(wrapper);
  for (const cls of ['swiper-button-prev', 'swiper-button-next']) {
    const control = doc.createElement('div');
    control.className = cls;
    el.appendChild(control);
  }
  doc.body.appendChild(el);
  const swiper = new Swiper(
    el,
    inOtherRealm(
      '{ slidesPerView: 2, navigation: { enabled: true, prevEl: ".swiper-button-prev", nextEl: ".swiper-button-next" } }',
    ),
  );
  assert.equal(swiper.params.slidesPerView, 2, 'top-level params must be applied');
  assert.equal(
    swiper.params.navigation.disabledClass,
    'swiper-button-disabled',
    'nested defaults must survive',
  );
  swiper.destroy(true, false);
  return el;
});

// Guard the other half of isObject(): values that must never be deep-merged as plain objects.
await check('arrays and elements are still assigned by reference, not merged', () => {
  const nextEl = doc.createElement('div');
  nextEl.className = 'swiper-button-next';
  const slides = ['<div>a</div>', '<div>b</div>'];
  const { el, swiper } = mountSwiper({
    navigation: { enabled: true, prevEl: '.swiper-button-prev', nextEl },
    virtual: { enabled: false, slides },
  });
  assert.equal(swiper.params.navigation.nextEl, nextEl, 'an element must stay the same element');
  assert.equal(swiper.params.virtual.slides, slides, 'an array must stay the same array');
  swiper.destroy(true, false);
  return el;
});

await check('a Swiper instance passed as a param is not deep-merged', () => {
  const { el: thumbsEl, swiper: thumbsSwiper } = mountSwiper({});
  const { el, swiper } = mountSwiper({ thumbs: { swiper: thumbsSwiper } });
  assert.equal(
    swiper.params.thumbs.swiper,
    thumbsSwiper,
    'the instance must be kept by reference, not cloned',
  );
  swiper.destroy(true, false);
  thumbsSwiper.destroy(true, false);
  thumbsEl.remove();
  return el;
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
