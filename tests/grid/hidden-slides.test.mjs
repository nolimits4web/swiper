// Regression test for #8065: Hiding & showing slides in grid mode.
// When slides are hidden with display: none, grid recalculations must only account for visible slides,
// unsetting inline grid styles on hidden slides, avoiding gaps in rows/columns, and updating virtualSize.

import assert from 'node:assert/strict';
import path from 'node:path';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';

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

const bundleUrl = pathToFileURL(path.resolve('dist/swiper-bundle.mjs')).href;
const { default: Swiper } = await import(bundleUrl);

test('grid mode with fill: row correctly recalculates layout and virtualSize when slides are hidden and re-shown (#8065)', () => {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML = `<div class="swiper-wrapper">${'<div class="swiper-slide"></div>'.repeat(16)}</div>`;
  document.body.append(el);

  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => 1000 });

  const swiper = new Swiper(el, {
    slidesPerView: 4,
    spaceBetween: 30,
    grid: {
      rows: 2,
      fill: 'row',
    },
    resizeObserver: false,
  });

  const initialVirtualSize = swiper.virtualSize;
  assert.ok(initialVirtualSize > 0, 'initial virtualSize should be greater than 0');

  // Verify all 16 slides are laid out
  swiper.slides.forEach((slide) => {
    assert.notEqual(slide.row, undefined);
    assert.notEqual(slide.column, undefined);
    assert.equal(slide.swiperSlideGridSet, true);
  });

  // Hide 8 slides (every odd slide)
  const hiddenSlides = [];
  const visibleSlides = [];
  swiper.slides.forEach((slide, i) => {
    if (i % 2 === 1) {
      slide.style.display = 'none';
      hiddenSlides.push(slide);
    } else {
      visibleSlides.push(slide);
    }
  });

  swiper.update();

  // Virtual size with 8 visible slides (4 columns) should be strictly smaller than initial (8 columns)
  assert.ok(
    swiper.virtualSize < initialVirtualSize,
    `virtualSize (${swiper.virtualSize}) should be smaller than initial (${initialVirtualSize})`,
  );

  // Hidden slides should have grid properties and styles unset
  hiddenSlides.forEach((slide) => {
    assert.equal(slide.row, undefined, 'hidden slide should not have row');
    assert.equal(slide.column, undefined, 'hidden slide should not have column');
    assert.equal(
      slide.swiperSlideGridSet,
      undefined,
      'hidden slide swiperSlideGridSet should be unset',
    );
    assert.equal(slide.style.height, '', 'hidden slide height should be cleared');
  });

  // Visible slides should be laid out in 2 rows and 4 columns without gaps
  visibleSlides.forEach((slide, i) => {
    assert.notEqual(slide.row, undefined, `visible slide ${i} should have a row`);
    assert.notEqual(slide.column, undefined, `visible slide ${i} should have a column`);
    assert.ok(slide.row >= 0 && slide.row < 2, `visible slide row (${slide.row}) should be 0 or 1`);
    assert.ok(
      slide.column >= 0 && slide.column < 4,
      `visible slide column (${slide.column}) should be between 0 and 3`,
    );
  });

  // Re-show all slides
  hiddenSlides.forEach((slide) => {
    slide.style.display = '';
  });

  swiper.update();

  // Virtual size should be restored to initial
  assert.equal(
    swiper.virtualSize,
    initialVirtualSize,
    'virtualSize should be restored when slides are re-shown',
  );

  swiper.slides.forEach((slide) => {
    assert.notEqual(slide.row, undefined);
    assert.notEqual(slide.column, undefined);
    assert.equal(slide.swiperSlideGridSet, true);
  });

  swiper.destroy();
  el.remove();
});

test('grid mode with fill: column positions visible slides sequentially without gaps (#8065)', () => {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML = `<div class="swiper-wrapper">${'<div class="swiper-slide"></div>'.repeat(6)}</div>`;
  document.body.append(el);

  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => 600 });

  const swiper = new Swiper(el, {
    slidesPerView: 2,
    spaceBetween: 10,
    grid: {
      rows: 2,
      fill: 'column',
    },
    resizeObserver: false,
  });

  // Hide slide 1 (row 1 of column 0 initially)
  swiper.slides[1].style.display = 'none';

  swiper.update();

  assert.equal(swiper.slides[1].row, undefined);
  assert.equal(swiper.slides[1].column, undefined);

  // Visible slides: [0, 2, 3, 4, 5]
  // Slide 0: col 0, row 0
  assert.equal(swiper.slides[0].column, 0);
  assert.equal(swiper.slides[0].row, 0);

  // Slide 2: should fill col 0, row 1 (no empty gap left by slide 1)
  assert.equal(swiper.slides[2].column, 0);
  assert.equal(swiper.slides[2].row, 1);

  // Slide 3: col 1, row 0
  assert.equal(swiper.slides[3].column, 1);
  assert.equal(swiper.slides[3].row, 0);

  // Slide 4: col 1, row 1
  assert.equal(swiper.slides[4].column, 1);
  assert.equal(swiper.slides[4].row, 1);

  // Slide 5: col 2, row 0
  assert.equal(swiper.slides[5].column, 2);
  assert.equal(swiper.slides[5].row, 0);

  swiper.destroy();
  el.remove();
});

test('grid mode with fill: row and slidesPerGroup > 1 updates order properly (#8065)', () => {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML = `<div class="swiper-wrapper">${'<div class="swiper-slide"></div>'.repeat(8)}</div>`;
  document.body.append(el);

  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => 800 });

  const swiper = new Swiper(el, {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 10,
    grid: {
      rows: 2,
      fill: 'row',
    },
    resizeObserver: false,
  });

  // Hide 4 slides (slides 4, 5, 6, 7)
  swiper.slides[4].style.display = 'none';
  swiper.slides[5].style.display = 'none';
  swiper.slides[6].style.display = 'none';
  swiper.slides[7].style.display = 'none';

  swiper.update();

  // Hidden slides should have order reset
  assert.equal(swiper.slides[4].style.order, '');
  assert.equal(swiper.slides[5].style.order, '');

  // Remaining slides 0..3 should have valid order
  for (let i = 0; i < 4; i += 1) {
    assert.notEqual(swiper.slides[i].style.order, '');
    assert.notEqual(swiper.slides[i].row, undefined);
    assert.notEqual(swiper.slides[i].column, undefined);
  }

  swiper.destroy();
  el.remove();
});
