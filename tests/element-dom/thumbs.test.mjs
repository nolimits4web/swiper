// Real-DOM regression test for https://github.com/nolimits4web/swiper/issues/8238
//
// Thumbs `autoScrollOffset` scrolled the wrong way when the main swiper used `loop: true`
// but the thumbs swiper did not. For non-loop thumbs, autoScroll() derived the scroll
// direction by comparing the main swiper's realIndex against its previousIndex. With loop
// enabled, previousIndex is a DOM index that loopFix keeps shifting, so after the first
// lap it no longer relates to realIndex: navigating forward was treated as "prev", the
// offset was applied backwards, and the active thumb ended up out of view.
//
// Fix: compare against previousRealIndex instead.
//
// happy-dom does not perform layout, so container width and slide offsets are stubbed to
// give Swiper real geometry (and meaningful visibleSlidesIndexes) to work with.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const CONTAINER_WIDTH = 600;

function mountSwiper({ params = {}, slideCount = 6, slidesPerView = 1 } = {}) {
  const el = doc.createElement('div');
  el.className = 'swiper';
  const wrapper = doc.createElement('div');
  wrapper.className = 'swiper-wrapper';
  const slideWidth = CONTAINER_WIDTH / slidesPerView;
  for (let i = 1; i <= slideCount; i += 1) {
    const slide = doc.createElement('div');
    slide.className = 'swiper-slide';
    slide.textContent = `Slide ${i}`;
    // Offset follows the slide's current DOM position, so loop rearrangement is reflected
    Object.defineProperty(slide, 'offsetLeft', {
      get: () => Array.prototype.indexOf.call(slide.parentNode.children, slide) * slideWidth,
    });
    wrapper.appendChild(slide);
  }
  el.appendChild(wrapper);
  Object.defineProperty(el, 'clientWidth', { get: () => CONTAINER_WIDTH });
  Object.defineProperty(el, 'clientHeight', { get: () => 200 });
  doc.body.appendChild(el);
  const swiper = new Swiper(el, { slidesPerView, ...params });
  return { el, swiper };
}

// Navigates `main` forward `steps` times and records, per step, the thumbs swiper's
// active index keyed by the main swiper's realIndex
function recordForwardNavigation(main, thumbs, steps) {
  const states = [];
  for (let i = 0; i < steps; i += 1) {
    main.slideNext(0);
    states.push({
      realIndex: main.realIndex,
      thumbsActiveIndex: thumbs.activeIndex,
      visible: [...thumbs.visibleSlidesIndexes],
    });
  }
  return states;
}

let failed = 0;
let passed = 0;
async function check(label, fn) {
  const els = [];
  try {
    await fn(els);
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  } finally {
    els.forEach((el) => el.remove());
  }
}

console.log('\nSwiper thumbs regression test (happy-dom, #8238)\n');

await check('autoScrollOffset keeps the active thumb in view on a looped main swiper', (els) => {
  const { el: thumbsEl, swiper: thumbs } = mountSwiper({ slidesPerView: 3 });
  const { el: mainEl, swiper: main } = mountSwiper({
    params: { loop: true, speed: 0, thumbs: { swiper: thumbs, autoScrollOffset: 1 } },
  });
  els.push(thumbsEl, mainEl);

  // Complete a lap so loopFix has rearranged the main swiper's slides, then go to slide 4
  for (let i = 0; i < 6; i += 1) main.slideNext(0);
  assert.equal(main.realIndex, 0, 'main swiper must have wrapped around to the first slide');
  for (let i = 0; i < 3; i += 1) main.slideNext(0);
  assert.equal(main.realIndex, 3);
  assert.ok(
    thumbs.visibleSlidesIndexes.includes(3),
    `active thumb 3 must be in view, visible thumbs: ${JSON.stringify(thumbs.visibleSlidesIndexes)}`,
  );
});

await check('looped main swiper scrolls thumbs the same as a non-looped one', (els) => {
  const { el: loopThumbsEl, swiper: loopThumbs } = mountSwiper({ slidesPerView: 3 });
  const { el: loopMainEl, swiper: loopMain } = mountSwiper({
    params: { loop: true, speed: 0, thumbs: { swiper: loopThumbs, autoScrollOffset: 1 } },
  });
  const { el: thumbsEl, swiper: thumbs } = mountSwiper({ slidesPerView: 3 });
  const { el: mainEl, swiper: main } = mountSwiper({
    params: { speed: 0, thumbs: { swiper: thumbs, autoScrollOffset: 1 } },
  });
  els.push(loopThumbsEl, loopMainEl, thumbsEl, mainEl);

  // Move the looped swiper through a full lap first so its DOM indexes are shifted
  for (let i = 0; i < 6; i += 1) loopMain.slideNext(0);
  assert.equal(loopMain.realIndex, 0);

  assert.deepEqual(
    recordForwardNavigation(loopMain, loopThumbs, 5),
    recordForwardNavigation(main, thumbs, 5),
  );
});

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
