// Real-DOM regression test for https://github.com/nolimits4web/swiper/issues/8008
//
// When using effect='cards', loop=true, slidesPerView=1, and slide count < 5 (2, 3, or 4 slides),
// next navigation button and swiping forward failed because loopedSlides (defaulting to 4 for cards)
// exceeded cols / 2, causing activeColIndexWithShift < loopedSlides to always evaluate to true.
// As a result, the append logic in loopFix was never reached during forward navigation.
//
// Fix: loopFix caps loopedSlides for the cards effect based on the available slide count so that
// looped slides do not consume all slides, allowing forward append and navigation to proceed normally.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { Window } from 'happy-dom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');
const dist = (p) => pathToFileURL(path.join(distDir, p)).href;

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
    /* read-only global */
  }
}
globalThis.window = win;
global.requestAnimationFrame = (fn) => setTimeout(fn, 0);
win.requestAnimationFrame = global.requestAnimationFrame;

const { default: Swiper } = await import(dist('swiper-bundle.mjs'));
const doc = win.document;

function mountSwiper({ slideCount = 3, params = {} } = {}) {
  const container = doc.createElement('div');
  container.className = 'swiper';

  const wrapper = doc.createElement('div');
  wrapper.className = 'swiper-wrapper';

  for (let i = 1; i <= slideCount; i += 1) {
    const slide = doc.createElement('div');
    slide.className = 'swiper-slide';
    slide.textContent = `Slide ${i}`;
    wrapper.appendChild(slide);
  }
  container.appendChild(wrapper);

  const prevBtn = doc.createElement('div');
  prevBtn.className = 'swiper-button-prev';
  const nextBtn = doc.createElement('div');
  nextBtn.className = 'swiper-button-next';
  container.appendChild(prevBtn);
  container.appendChild(nextBtn);

  doc.body.appendChild(container);

  const swiper = new Swiper(container, {
    width: 300,
    height: 300,
    effect: 'cards',
    loop: true,
    slidesPerView: 1,
    speed: 0,
    navigation: {
      prevEl: prevBtn,
      nextEl: nextBtn,
    },
    ...params,
  });

  return { container, wrapper, prevBtn, nextBtn, swiper };
}

const pointer = (target, type, x, y = 50) => {
  const event = new win.PointerEvent(type, {
    bubbles: true,
    composed: true,
    cancelable: true,
    pointerId: 1,
    pointerType: 'touch',
    button: 0,
    buttons: type === 'pointerup' ? 0 : 1,
    clientX: x,
    clientY: y,
  });
  Object.defineProperties(event, { pageX: { value: x }, pageY: { value: y } });
  target.dispatchEvent(event);
};

let failed = 0;
let passed = 0;
async function check(label, fn) {
  let swiperInstance;
  let containerEl;
  try {
    const res = await fn();
    if (res?.swiper) {
      swiperInstance = res.swiper;
      containerEl = res.container;
    }
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  } finally {
    if (swiperInstance && !swiperInstance.destroyed) swiperInstance.destroy(true, false);
    if (containerEl && containerEl.remove) containerEl.remove();
  }
}

console.log('\nCards effect + loop mode navigation test (issue #8008)\n');

for (const count of [2, 3, 4, 5]) {
  await check(
    `slideNext() and slidePrev() loop forward and backward with ${count} slides`,
    async () => {
      const { swiper, container } = mountSwiper({ slideCount: count });
      assert.equal(swiper.realIndex, 0, 'initial realIndex must be 0');

      // Loop forward through two full cycles
      for (let step = 1; step <= count * 2; step += 1) {
        const moved = swiper.slideNext(0);
        assert.equal(moved, true, `slideNext() at step ${step} must succeed`);
        assert.equal(swiper.realIndex, step % count, `realIndex after forward step ${step}`);
      }

      // Loop backward through two full cycles
      for (let step = 1; step <= count * 2; step += 1) {
        const moved = swiper.slidePrev(0);
        assert.equal(moved, true, `slidePrev() at step ${step} must succeed`);
        const expected = (count * 2 - step) % count;
        assert.equal(swiper.realIndex, expected, `realIndex after backward step ${step}`);
      }

      return { swiper, container };
    },
  );

  await check(`navigation next button advances forward with ${count} slides`, async () => {
    const { swiper, container, nextBtn, prevBtn } = mountSwiper({ slideCount: count });
    assert.equal(swiper.realIndex, 0, 'initial realIndex must be 0');

    // Click next button through full cycle
    for (let step = 1; step <= count; step += 1) {
      nextBtn.click();
      assert.equal(swiper.realIndex, step % count, `realIndex after next click ${step}`);
    }

    // Click prev button back
    for (let step = 1; step <= count; step += 1) {
      prevBtn.click();
      const expected = (count - step) % count;
      assert.equal(swiper.realIndex, expected, `realIndex after prev click ${step}`);
    }

    return { swiper, container };
  });

  await check(`touch / swipe forward and backward with ${count} slides`, async () => {
    const { swiper, container } = mountSwiper({
      slideCount: count,
      params: {
        width: 300,
        height: 300,
        threshold: 0,
      },
    });
    assert.equal(swiper.realIndex, 0, 'initial realIndex must be 0');

    // Swipe left (forward navigation): drag from x=250 to x=50
    const slide = container.querySelector('.swiper-slide-active');
    pointer(slide, 'pointerdown', 250);
    pointer(slide, 'pointermove', 150);
    pointer(slide, 'pointermove', 50);
    pointer(slide, 'pointerup', 50);

    assert.equal(swiper.realIndex, 1, `swipe forward must advance to realIndex 1`);

    // Swipe right (backward navigation): drag from x=50 to x=250
    const currentSlide = container.querySelector('.swiper-slide-active');
    pointer(currentSlide, 'pointerdown', 50);
    pointer(currentSlide, 'pointermove', 150);
    pointer(currentSlide, 'pointermove', 250);
    pointer(currentSlide, 'pointerup', 250);

    assert.equal(swiper.realIndex, 0, `swipe backward must return to realIndex 0`);

    return { swiper, container };
  });
}

console.log(`\nTests: ${passed} passed, ${failed} failed\n`);
if (failed > 0) {
  process.exit(1);
}
