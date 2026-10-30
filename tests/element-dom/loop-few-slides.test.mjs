// Real-DOM regression test for https://github.com/nolimits4web/swiper/issues/8008
//
// With loop mode and only a few slides, forward navigation (slideNext(), the next button,
// swiping forward) got stuck while backward navigation kept working. The cards effect hit it
// by default with fewer than 5 slides, but it is not specific to cards: anything that makes
// loopFix's buffer (loopedSlides) large relative to the slide count triggers it, e.g. a
// user-set loopAdditionalSlides with the regular slide effect.
//
// Root cause (src/core/loop/loopFix.ts): loopFix prepends when the active slide is within
// loopedSlides of the start and appends when it is within loopedSlides of the end. When
// slides.length < slidesPerView + 2 * loopedSlides those ranges overlap, the prepend branch
// always wins, and no slide is ever appended in front of the active one.
//
// Fix: when the slides can't hold loopedSlides on each side of the view, loopFix shrinks it
// to what they can hold with one slide to spare (rounded down to whole groups). The spare
// slide matters for dragging in a real browser: without it the forward loopFix in onTouchMove
// fires right at drag start and appends the active slide (happy-dom can't show that, it has
// no layout). Sliders with enough slides are unaffected.

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

// Most configs here are below the slide count the loop warning asks for (it fires on every
// loopFix, not just on init); that warning is covered by loop-warning.test.mjs
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Swiper Loop Warning')) return;
  originalWarn(...args);
};

const { default: Swiper } = await import(dist('swiper-bundle.mjs'));

const doc = win.document;
const WIDTH = 300;

function mountSwiper({ params = {}, slideCount }) {
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
  const prevEl = doc.createElement('div');
  prevEl.className = 'swiper-button-prev';
  const nextEl = doc.createElement('div');
  nextEl.className = 'swiper-button-next';
  el.append(prevEl, nextEl);
  doc.body.appendChild(el);
  const swiper = new Swiper(el, {
    width: WIDTH,
    height: 300,
    loop: true,
    speed: 0,
    threshold: 0,
    navigation: { prevEl, nextEl },
    ...params,
  });
  return { el, swiper, prevEl, nextEl };
}

const pointer = (target, type, x) => {
  const event = new win.PointerEvent(type, {
    bubbles: true,
    composed: true,
    cancelable: true,
    pointerId: 1,
    pointerType: 'touch',
    button: 0,
    buttons: type === 'pointerup' ? 0 : 1,
    clientX: x,
    clientY: 50,
  });
  Object.defineProperties(event, { pageX: { value: x }, pageY: { value: 50 } });
  target.dispatchEvent(event);
};

const swipe = (target, fromX, toX) => {
  pointer(target, 'pointerdown', fromX);
  pointer(target, 'pointermove', Math.round((fromX + toX) / 2));
  pointer(target, 'pointermove', toX);
  pointer(target, 'pointerup', toX);
};

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

// Walks two full cycles forward, then two full cycles back, checking realIndex at each step
function assertCycles(swiper, count, step, goNext, goPrev) {
  const groups = count / step;
  for (let i = 1; i <= groups * 2; i += 1) {
    goNext();
    assert.equal(swiper.realIndex, (i * step) % count, `realIndex after forward step ${i}`);
  }
  for (let i = 1; i <= groups * 2; i += 1) {
    goPrev();
    assert.equal(
      swiper.realIndex,
      ((groups * 2 - i) * step) % count,
      `realIndex after backward step ${i}`,
    );
  }
}

const configs = [
  { name: 'cards', params: { effect: 'cards' }, counts: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
  {
    name: 'cards (rotate: false)',
    params: { effect: 'cards', cardsEffect: { rotate: false } },
    counts: [2, 3, 4, 5, 6, 7, 8],
  },
  {
    name: 'centeredSlides + loopAdditionalSlides: 3',
    params: { centeredSlides: true, loopAdditionalSlides: 3 },
    counts: [2, 3, 4, 5, 6, 8, 10],
  },
  {
    name: 'loopAdditionalSlides: 3',
    params: { loopAdditionalSlides: 3 },
    counts: [2, 3, 4, 5, 6, 8, 10],
  },
  {
    name: 'slidesPerView: 3 + centeredSlides + loopAdditionalSlides: 2',
    params: { slidesPerView: 3, centeredSlides: true, loopAdditionalSlides: 2 },
    counts: [4, 5, 6, 8, 10],
  },
  {
    name: 'slidesPerView: 2 + slidesPerGroup: 2 + loopAdditionalSlides: 2',
    params: { slidesPerView: 2, slidesPerGroup: 2, loopAdditionalSlides: 2 },
    counts: [4, 6, 8, 10],
    step: 2,
  },
];

console.log('\nLoop navigation with few slides regression test (happy-dom, #8008)\n');

for (const { name, params, counts, step = 1 } of configs) {
  for (const count of counts) {
    await check(`${name}, ${count} slides: slideNext() / slidePrev() loop both ways`, () => {
      const { el, swiper } = mountSwiper({ params, slideCount: count });
      assert.equal(swiper.realIndex, 0, 'initial realIndex must be 0');
      assertCycles(
        swiper,
        count,
        step,
        () => assert.equal(swiper.slideNext(0), true, 'slideNext() must succeed'),
        () => assert.equal(swiper.slidePrev(0), true, 'slidePrev() must succeed'),
      );
      return el;
    });

    await check(`${name}, ${count} slides: navigation buttons loop both ways`, () => {
      const { el, swiper, prevEl, nextEl } = mountSwiper({ params, slideCount: count });
      assertCycles(
        swiper,
        count,
        step,
        () => nextEl.click(),
        () => prevEl.click(),
      );
      return el;
    });

    await check(`${name}, ${count} slides: swiping moves forward and back`, () => {
      const { el, swiper } = mountSwiper({ params, slideCount: count });
      // a bit more than half a slide, so it is a long swipe of exactly one slide (group)
      const distance = Math.round((WIDTH / (params.slidesPerView ?? 1)) * 0.6);
      const center = WIDTH / 2;
      swipe(el.querySelector('.swiper-slide-active'), center + distance / 2, center - distance / 2);
      assert.equal(swiper.realIndex, step % count, 'swipe forward must advance');
      swipe(el.querySelector('.swiper-slide-active'), center - distance / 2, center + distance / 2);
      assert.equal(swiper.realIndex, 0, 'swipe backward must go back');
      return el;
    });
  }
}

console.log(`\nTests: ${passed} passed, ${failed} failed\n`);
if (failed > 0) {
  process.exit(1);
}
