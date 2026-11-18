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
    /* read-only */
  }
}
globalThis.window = win;

const { default: Swiper } = await import(dist('swiper.mjs'));

let passed = 0;
let failed = 0;
async function test(name, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ok  ${name}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${name}`);
    console.log(`        ${err.stack || err.message}`);
  }
}

function createSwiperDom(slideCount = 10) {
  const el = win.document.createElement('div');
  el.className = 'swiper';
  const wrapper = win.document.createElement('div');
  wrapper.className = 'swiper-wrapper';
  for (let i = 0; i < slideCount; i += 1) {
    const slide = win.document.createElement('div');
    slide.className = 'swiper-slide';
    slide.textContent = `Slide ${i}`;
    wrapper.appendChild(slide);
  }
  el.appendChild(wrapper);
  win.document.body.appendChild(el);
  return el;
}

console.log('\nDirect transition test (Issue #8103)\n');

await test('slideTo with directTransition parameter jumps directly to target slide', async () => {
  const el = createSwiperDom(10);
  const swiper = new Swiper(el, {
    width: 500,
    speed: 100,
  });

  assert.equal(swiper.activeIndex, 0);

  // Jump from slide 0 to slide 5 with directTransition = true
  swiper.slideTo(5, 100, true, false, false, true);

  // Active index immediately set to 5
  assert.equal(swiper.activeIndex, 5);

  // Wrapper immediately moved to slide 5's position (-2500px) with 0 transition
  assert.equal(swiper.translate, -2500);
  assert.equal(swiper.wrapperEl.style.transitionDuration, '0ms');

  // Intermediate slides (1, 2, 3, 4) should NOT have any transform applied
  for (let i = 1; i < 5; i += 1) {
    assert.equal(swiper.slides[i].style.transform, '', `Slide ${i} should not be transformed`);
  }

  // Slide 0 and slide 5 should have active transforms
  assert.ok(
    swiper.slides[0].style.transform.includes('translate3d'),
    'Slide 0 has direct transform',
  );
  assert.ok(
    swiper.slides[5].style.transform.includes('translate3d'),
    'Slide 5 has direct transform',
  );

  // Wait for transition end timeout
  await new Promise((resolve) => setTimeout(resolve, 200));

  // Styles cleaned up after transition ends
  assert.equal(swiper.slides[0].style.transform, '');
  assert.equal(swiper.slides[5].style.transform, '');
  assert.equal(swiper.animating, false);

  swiper.destroy();
  el.remove();
});

await test('global params.directTransition enables direct transition for all non-adjacent slideTo calls', async () => {
  const el = createSwiperDom(10);
  const events = [];
  const swiper = new Swiper(el, {
    width: 400,
    speed: 100,
    directTransition: true,
    on: {
      slideChange() {
        events.push('slideChange');
      },
      transitionStart() {
        events.push('transitionStart');
      },
      transitionEnd() {
        events.push('transitionEnd');
      },
    },
  });

  swiper.slideTo(6, 100);

  assert.equal(swiper.activeIndex, 6);
  assert.equal(swiper.translate, -2400);

  // Intermediate slides (1..5) should not be touched
  for (let i = 1; i < 6; i += 1) {
    assert.equal(swiper.slides[i].style.transform, '');
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  assert.equal(swiper.activeIndex, 6);
  assert.ok(events.includes('slideChange'), 'slideChange fired');
  assert.ok(events.includes('transitionStart'), 'transitionStart fired');
  assert.ok(events.includes('transitionEnd'), 'transitionEnd fired');

  swiper.destroy();
  el.remove();
});

await test('adjacent slides use standard transition when directTransition is enabled', async () => {
  const el = createSwiperDom(5);
  const swiper = new Swiper(el, {
    width: 500,
    speed: 100,
    directTransition: true,
  });

  // Slide to adjacent slide (0 -> 1)
  swiper.slideTo(1, 100);

  // Wrapper should have transition duration set (standard transition)
  assert.equal(swiper.wrapperEl.style.transitionDuration, '100ms');
  // Neither slide 0 nor slide 1 should have per-slide transform
  assert.equal(swiper.slides[0].style.transform, '');
  assert.equal(swiper.slides[1].style.transform, '');

  swiper.destroy();
  el.remove();
});

await test('backward direct transition (prev direction)', async () => {
  const el = createSwiperDom(10);
  const swiper = new Swiper(el, {
    width: 500,
    speed: 100,
    initialSlide: 8,
    directTransition: true,
  });

  assert.equal(swiper.activeIndex, 8);

  // Jump from slide 8 to slide 2
  swiper.slideTo(2, 100);

  assert.equal(swiper.activeIndex, 2);
  assert.equal(swiper.translate, -1000);

  // Intermediate slides (3..7) should NOT be touched
  for (let i = 3; i < 8; i += 1) {
    assert.equal(swiper.slides[i].style.transform, '');
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  assert.equal(swiper.slides[2].style.transform, '');
  assert.equal(swiper.slides[8].style.transform, '');
  assert.equal(swiper.activeIndex, 2);

  swiper.destroy();
  el.remove();
});

await test('vertical direct transition', async () => {
  const el = createSwiperDom(8);
  const swiper = new Swiper(el, {
    direction: 'vertical',
    height: 300,
    speed: 100,
    directTransition: true,
  });

  swiper.slideTo(4, 100);

  assert.equal(swiper.activeIndex, 4);
  assert.equal(swiper.translate, -1200);

  // Check that vertical Y transform was applied
  assert.ok(
    swiper.slides[0].style.transform.includes('translate3d(0px,'),
    'Vertical slide 0 transform has Y axis',
  );
  assert.ok(
    swiper.slides[4].style.transform.includes('translate3d(0px,'),
    'Vertical slide 4 transform has Y axis',
  );

  // Intermediates untouched
  for (let i = 1; i < 4; i += 1) {
    assert.equal(swiper.slides[i].style.transform, '');
  }

  await new Promise((resolve) => setTimeout(resolve, 200));

  assert.equal(swiper.slides[0].style.transform, '');
  assert.equal(swiper.slides[4].style.transform, '');

  swiper.destroy();
  el.remove();
});

await test('interrupted direct transition cleans up previous styles', async () => {
  const el = createSwiperDom(10);
  const swiper = new Swiper(el, {
    width: 500,
    speed: 200,
    directTransition: true,
  });

  // Start jump to 7
  swiper.slideTo(7, 200);
  assert.equal(swiper.activeIndex, 7);

  // Interrupt immediately by jumping to 3
  swiper.slideTo(3, 200);
  assert.equal(swiper.activeIndex, 3);

  // Slide 7 should have its transform cleaned up or updated
  await new Promise((resolve) => setTimeout(resolve, 300));

  for (let i = 0; i < swiper.slides.length; i += 1) {
    assert.equal(swiper.slides[i].style.transform, '');
  }

  swiper.destroy();
  el.remove();
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
