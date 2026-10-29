// Regression test for https://github.com/nolimits4web/swiper/issues/8238
//
// When the main Swiper uses `loop: true` and the thumbnail Swiper uses `loop: false`,
// autoScroll() incorrectly compared `newThumbsIndex` (realIndex) against `swiper.previousIndex`
// (which is in activeIndex coordinates, shifted by prepended loop clones).
// As a result:
//   1. Forward navigation evaluated `direction` as 'prev' instead of 'next', subtracting
//      `autoScrollOffset` and leaving the active thumbnail out of view.
//   2. Wrapping around from the last slide back to the first slide produced an out-of-bounds
//      index that failed to restore the thumbnail swiper to the starting position.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

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
  } catch {}
}
globalThis.window = win;

const { default: Swiper } = await import(pathToFileURL(dist('swiper-bundle.mjs')).href);

const doc = win.document;

function createSliderWithThumbs({
  slideCount = 6,
  slidesPerView = 3,
  autoScrollOffset = 1,
  mainLoop = true,
} = {}) {
  const thumbsEl = doc.createElement('div');
  thumbsEl.className = 'swiper thumbs-swiper';
  Object.defineProperty(thumbsEl, 'clientWidth', { value: 300, configurable: true });
  Object.defineProperty(thumbsEl, 'clientHeight', { value: 100, configurable: true });
  const thumbsWrapper = doc.createElement('div');
  thumbsWrapper.className = 'swiper-wrapper';
  for (let i = 0; i < slideCount; i += 1) {
    const slide = doc.createElement('div');
    slide.className = 'swiper-slide';
    slide.textContent = `Thumb ${i + 1}`;
    Object.defineProperty(slide, 'offsetWidth', { value: 100, configurable: true });
    Object.defineProperty(slide, 'offsetHeight', { value: 100, configurable: true });
    Object.defineProperty(slide, 'offsetLeft', {
      get() {
        return Array.from(this.parentElement?.children || []).indexOf(this) * 100;
      },
      configurable: true,
    });
    Object.defineProperty(slide, 'offsetTop', { value: 0, configurable: true });
    thumbsWrapper.appendChild(slide);
  }
  thumbsEl.appendChild(thumbsWrapper);
  doc.body.appendChild(thumbsEl);

  const thumbsSwiper = new Swiper(thumbsEl, {
    slidesPerView,
    speed: 0,
    watchSlidesProgress: true,
  });

  const mainEl = doc.createElement('div');
  mainEl.className = 'swiper main-swiper';
  Object.defineProperty(mainEl, 'clientWidth', { value: 600, configurable: true });
  Object.defineProperty(mainEl, 'clientHeight', { value: 400, configurable: true });
  const mainWrapper = doc.createElement('div');
  mainWrapper.className = 'swiper-wrapper';
  for (let i = 0; i < slideCount; i += 1) {
    const slide = doc.createElement('div');
    slide.className = 'swiper-slide';
    slide.textContent = `Main ${i + 1}`;
    Object.defineProperty(slide, 'offsetWidth', { value: 600, configurable: true });
    Object.defineProperty(slide, 'offsetHeight', { value: 400, configurable: true });
    Object.defineProperty(slide, 'offsetLeft', {
      get() {
        return Array.from(this.parentElement?.children || []).indexOf(this) * 600;
      },
      configurable: true,
    });
    Object.defineProperty(slide, 'offsetTop', { value: 0, configurable: true });
    mainWrapper.appendChild(slide);
  }
  mainEl.appendChild(mainWrapper);
  doc.body.appendChild(mainEl);

  const mainSwiper = new Swiper(mainEl, {
    loop: mainLoop,
    speed: 0,
    thumbs: {
      swiper: thumbsSwiper,
      autoScrollOffset,
    },
  });

  return { mainSwiper, thumbsSwiper, mainEl, thumbsEl };
}

let failed = 0;
let passed = 0;
async function check(label, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  }
}

console.log('\nSwiper thumbs autoScrollOffset regression test (#8238)\n');

await check('forward navigation keeps active thumbnail visible throughout all slides', () => {
  const { mainSwiper, thumbsSwiper, mainEl, thumbsEl } = createSliderWithThumbs({
    slideCount: 6,
    slidesPerView: 3,
    autoScrollOffset: 1,
    mainLoop: true,
  });

  try {
    for (let step = 1; step <= 5; step += 1) {
      mainSwiper.slideNext(0);
      const activeSlide = mainSwiper.realIndex;
      const visible = thumbsSwiper.visibleSlidesIndexes || [];
      assert.ok(
        visible.includes(activeSlide),
        `Step ${step}: active slide ${activeSlide} must be in visible thumbnails [${visible}]`,
      );
    }
  } finally {
    mainSwiper.destroy(true, false);
    thumbsSwiper.destroy(true, false);
    mainEl.remove();
    thumbsEl.remove();
  }
});

await check(
  'loop transition from last slide to first slide returns thumbnail swiper to start',
  () => {
    const { mainSwiper, thumbsSwiper, mainEl, thumbsEl } = createSliderWithThumbs({
      slideCount: 6,
      slidesPerView: 3,
      autoScrollOffset: 1,
      mainLoop: true,
    });

    try {
      // Navigate to the last slide
      for (let step = 1; step <= 5; step += 1) {
        mainSwiper.slideNext(0);
      }
      assert.equal(mainSwiper.realIndex, 5, 'must be on the last slide before loop wrap');

      // Loop wrap to the first slide
      mainSwiper.slideNext(0);
      assert.equal(mainSwiper.realIndex, 0, 'must have wrapped to slide 0');

      const visible = thumbsSwiper.visibleSlidesIndexes || [];
      assert.ok(
        visible.includes(0),
        `after loop wrap, active slide 0 must be in visible thumbnails [${visible}]`,
      );
      assert.equal(thumbsSwiper.activeIndex, 0, 'thumbnail swiper must reach position 0');
    } finally {
      mainSwiper.destroy(true, false);
      thumbsSwiper.destroy(true, false);
      mainEl.remove();
      thumbsEl.remove();
    }
  },
);

await check('backward navigation and loop wrap maintain active thumbnail visibility', () => {
  const { mainSwiper, thumbsSwiper, mainEl, thumbsEl } = createSliderWithThumbs({
    slideCount: 6,
    slidesPerView: 3,
    autoScrollOffset: 1,
    mainLoop: true,
  });

  try {
    // Loop backward from slide 0 to slide 5
    mainSwiper.slidePrev(0);
    assert.equal(mainSwiper.realIndex, 5, 'must have wrapped backward to slide 5');
    let visible = thumbsSwiper.visibleSlidesIndexes || [];
    assert.ok(visible.includes(5), `active slide 5 must be in visible thumbnails [${visible}]`);

    // Continue backward through remaining slides
    for (let step = 1; step <= 5; step += 1) {
      mainSwiper.slidePrev(0);
      const activeSlide = mainSwiper.realIndex;
      visible = thumbsSwiper.visibleSlidesIndexes || [];
      assert.ok(
        visible.includes(activeSlide),
        `backward step ${step}: active slide ${activeSlide} must be in visible thumbnails [${visible}]`,
      );
    }
    assert.equal(mainSwiper.realIndex, 0, 'must be back on slide 0');
    assert.equal(thumbsSwiper.activeIndex, 0, 'thumbnail swiper must be back at position 0');
  } finally {
    mainSwiper.destroy(true, false);
    thumbsSwiper.destroy(true, false);
    mainEl.remove();
    thumbsEl.remove();
  }
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
