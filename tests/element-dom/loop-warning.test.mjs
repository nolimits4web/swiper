// Real-DOM regression test for https://github.com/nolimits4web/swiper/issues/7586
//
// Swiper warned "The number of slides is not enough for loop mode" even when there were
// clearly enough slides, whenever `slidesPerView: 'auto'` was combined with
// `centeredSlides: true`. Root cause, traced through src/core/core.ts (slidesPerViewDynamic)
// and src/core/update/updateSize.ts (updateSize):
//
//   - updateSize() bails out and leaves `swiper.size` unset when the container's
//     clientWidth/clientHeight is 0 (hidden container, not yet laid out, or a DOM
//     environment - like this one - that doesn't run real layout).
//   - slidesPerViewDynamic()'s centered-slides branch sums slide sizes going outward from
//     the active slide until the running total exceeds `swiperSize`. With `swiperSize`
//     unset (undefined), `slideSize > undefined` is always false, so the loop never
//     breaks and walks every slide in the array, returning spv ~= slides.length.
//   - loopFix() then compares `slides.length < slidesPerView + loopedSlides`. With
//     slidesPerView inflated to roughly the full slide count, that comparison trips even
//     with plenty of slides, and the warning fires.
//
// Fix: slidesPerViewDynamic() now returns the safe default of 1 whenever swiperSize is
// falsy, matching what the two non-centered branches already do implicitly in that case.
//
// happy-dom is used deliberately here (not a browser) because it never performs real
// layout, so it reproduces the "unmeasured container" condition that triggers the bug on
// every run, without needing to fake a zero-width container.

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

function mountSwiper({ params = {}, slideCount = 8 } = {}) {
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
  doc.body.appendChild(el);
  const swiper = new Swiper(el, params);
  return { el, swiper };
}

function withCapturedWarnings(fn) {
  const warnings = [];
  const original = console.warn;
  console.warn = (...args) => warnings.push(args.join(' '));
  try {
    fn();
  } finally {
    console.warn = original;
  }
  return warnings;
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

console.log('\nSwiper loop-mode warning regression test (happy-dom, #7586)\n');

await check('slidesPerView: auto + centeredSlides does not warn with 8 slides', () => {
  let swiper;
  const warnings = withCapturedWarnings(() => {
    ({ swiper } = mountSwiper({
      params: { loop: true, slidesPerView: 'auto', centeredSlides: true },
      slideCount: 8,
    }));
  });
  assert.equal(swiper.slides.length, 8, 'all 8 slides must be present');
  assert.equal(
    warnings.some((w) => w.includes('not enough for loop mode')),
    false,
    `expected no "not enough" warning, got: ${JSON.stringify(warnings)}`,
  );
  return swiper.el;
});

await check('centeredSlides alone (fixed slidesPerView) does not warn with 8 slides', () => {
  let swiper;
  const warnings = withCapturedWarnings(() => {
    ({ swiper } = mountSwiper({
      params: { loop: true, slidesPerView: 1, centeredSlides: true },
      slideCount: 8,
    }));
  });
  assert.equal(
    warnings.some((w) => w.includes('not enough for loop mode')),
    false,
    `expected no "not enough" warning, got: ${JSON.stringify(warnings)}`,
  );
  return swiper.el;
});

await check('slidesPerView: auto alone (no centeredSlides) does not warn with 8 slides', () => {
  let swiper;
  const warnings = withCapturedWarnings(() => {
    ({ swiper } = mountSwiper({
      params: { loop: true, slidesPerView: 'auto' },
      slideCount: 8,
    }));
  });
  assert.equal(
    warnings.some((w) => w.includes('not enough for loop mode')),
    false,
    `expected no "not enough" warning, got: ${JSON.stringify(warnings)}`,
  );
  return swiper.el;
});

await check('breakpoints switching into auto + centeredSlides does not warn with 8 slides', () => {
  let swiper;
  const warnings = withCapturedWarnings(() => {
    ({ swiper } = mountSwiper({
      params: {
        loop: true,
        slidesPerView: 1,
        breakpoints: {
          0: { slidesPerView: 'auto', centeredSlides: true },
        },
      },
      slideCount: 8,
    }));
  });
  assert.equal(
    warnings.some((w) => w.includes('not enough for loop mode')),
    false,
    `expected no "not enough" warning, got: ${JSON.stringify(warnings)}`,
  );
  return swiper.el;
});

await check('genuinely too few slides still warns (no false negative introduced)', () => {
  let swiper;
  const warnings = withCapturedWarnings(() => {
    ({ swiper } = mountSwiper({
      // watchOverflow off: with it on, 2 slides that fit in view lock the slider and loop is
      // skipped without a warning (#8228)
      params: { loop: true, slidesPerView: 3, slidesPerGroup: 3, watchOverflow: false },
      slideCount: 2,
    }));
  });
  assert.equal(
    warnings.some((w) => w.includes('not enough for loop mode')),
    true,
    'expected the genuine-shortage warning to still fire',
  );
  return swiper.el;
});

await check(
  'slideToLoop with auto + centeredSlides resolves a real index (not stuck at 0)',
  async () => {
    let swiper;
    withCapturedWarnings(() => {
      ({ swiper } = mountSwiper({
        params: { loop: true, slidesPerView: 'auto', centeredSlides: true, speed: 0 },
        slideCount: 8,
      }));
    });
    swiper.slideToLoop(4, 0);
    // slideToLoop() defers the actual slideTo() call to a requestAnimationFrame callback;
    // let happy-dom's task queue drain so it actually runs before we assert.
    await win.happyDOM.waitUntilComplete();
    assert.equal(
      swiper.realIndex,
      4,
      `expected realIndex 4 after slideToLoop(4), got ${swiper.realIndex}`,
    );
    return swiper.el;
  },
);

// Regression: https://github.com/nolimits4web/swiper/issues/8228 — a breakpoint switching
// slidesPerView to the total slide count warned "not enough for loop mode" although the slider
// is simply locked by watchOverflow (all slides fit, nothing to loop). loopCreate() ran before
// the layout reflected the new slidesPerView, and loopFix() warned and reordered slides anyway.
// Locked sliders now skip loopFix(), so there is no warning and the source order is kept.
// breakpointsBase 'window' because happy-dom has no layout for the container.
await check('breakpoint that fits all slides locks without loop warning or reorder', () => {
  const order = (swiper) =>
    [...swiper.slidesEl.children].map((el) => el.textContent.replace('Slide ', '')).join(',');
  win.happyDOM.setWindowSize({ width: 1200, height: 800 });
  let swiper;
  try {
    let warnings = withCapturedWarnings(() => {
      ({ swiper } = mountSwiper({
        params: {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 50,
          width: 900,
          speed: 0,
          breakpoints: { 700: { slidesPerView: 3 } },
          breakpointsBase: 'window',
        },
        slideCount: 3,
      }));
    });
    assert.equal(warnings.length, 0, `no warning on locked init, got [${warnings}]`);
    assert.equal(swiper.isLocked, true, 'all 3 slides fit, slider must be locked');
    assert.equal(order(swiper), '1,2,3', 'locked slider keeps the source order');

    // below the breakpoint: slidesPerView 1 unlocks, loop works
    warnings = withCapturedWarnings(() => {
      win.happyDOM.setWindowSize({ width: 600, height: 800 });
      swiper.setBreakpoint();
      swiper.slideNext(0);
      swiper.slideNext(0);
      swiper.slideNext(0);
    });
    assert.equal(warnings.length, 0, `no warning below the breakpoint, got [${warnings}]`);
    assert.equal(swiper.isLocked, false, 'slidesPerView 1 must unlock');
    assert.equal(swiper.realIndex, 0, 'three slideNext() must loop back to the first slide');

    // back above the breakpoint: locked again, no warning, source order restored
    warnings = withCapturedWarnings(() => {
      win.happyDOM.setWindowSize({ width: 1200, height: 800 });
      swiper.setBreakpoint();
    });
    assert.equal(warnings.length, 0, `no warning when re-locking, got [${warnings}]`);
    assert.equal(swiper.isLocked, true, 'slider must lock again');
    assert.equal(order(swiper), '1,2,3', 'source order must be restored');
  } finally {
    win.happyDOM.setWindowSize({ width: 1024, height: 768 });
  }
  return swiper.el;
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
