// Regression for #8240. happy-dom has no layout: metrics below model the
// container becoming measurable. The React wrapper and Swiper are real.
import assert from 'node:assert/strict';
import { after, test } from 'node:test';

import { Window } from 'happy-dom';

const win = new Window({ url: 'http://localhost/' });
const force = new Set(['Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'ShadowRoot']);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !force.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    // Some Node globals are read-only.
  }
}
globalThis.window = win;
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const { default: React, act } = await import('react');
const { createRoot } = await import('react-dom/client');
const { default: Swiper } = await import('../../dist/swiper.mjs');
const { Grid } = await import('../../dist/modules/index.mjs');
const { Swiper: ReactSwiper, SwiperSlide } = await import('../../dist/swiper-react.mjs');

after(() => win.happyDOM.close());

function metrics(el) {
  let visible = false;
  for (const [key, value] of Object.entries({
    clientWidth: 600,
    offsetWidth: 600,
    clientHeight: 300,
    offsetHeight: 300,
  })) {
    Object.defineProperty(el, key, { configurable: true, get: () => (visible ? value : 0) });
  }
  return () => {
    visible = true;
    el.style.display = '';
  };
}

for (const direction of ['horizontal', 'vertical']) {
  for (const fill of ['column', 'row']) {
    test(`hidden ${direction} Grid (${fill}) updates and navigates after reveal`, () => {
      const el = document.createElement('div');
      el.className = 'swiper';
      el.style.display = 'none';
      el.innerHTML = `<div class="swiper-wrapper">${['A', 'B', 'C', 'D', 'E', 'F']
        .map((text) => `<div class="swiper-slide">${text}</div>`)
        .join('')}</div>`;
      document.body.append(el);
      const reveal = metrics(el);
      let initCount = 0;
      const swiper = new Swiper(el, {
        modules: [Grid],
        direction,
        slidesPerView: 2,
        spaceBetween: 12,
        grid: { rows: 2, fill },
        speed: 0,
        on: { init: () => (initCount += 1) },
      });
      try {
        assert.equal(initCount, 1);
        assert.equal(swiper.size, undefined);
        for (let i = 0; i < 3; i += 1) swiper.update();
        reveal();
        swiper.update();
        assert.equal(swiper.size, direction === 'horizontal' ? 600 : 300);
        assert.deepEqual(
          swiper.slides.map((slide) => slide.textContent),
          ['A', 'B', 'C', 'D', 'E', 'F'],
        );
        swiper.slideNext(0);
        assert.equal(swiper.activeIndex, 1);
        assert.equal(swiper.translate, direction === 'horizontal' ? -306 : -156);
        swiper.slidePrev(0);
        assert.equal(swiper.activeIndex, 0);
        assert.equal(swiper.translate, 0);
      } finally {
        swiper.destroy();
        el.remove();
      }
    });
  }
}

test('React replaces and appends children while the same Grid swiper is hidden', async () => {
  const host = document.createElement('div');
  host.style.display = 'none';
  document.body.append(host);
  const errors = [];
  const root = createRoot(host, { onUncaughtError: (error) => errors.push(error) });
  let swiper;
  let initCount = 0;
  let updateCalls = 0;
  const render = async (labels) => {
    await act(() => {
      root.render(
        React.createElement(
          ReactSwiper,
          {
            modules: [Grid],
            slidesPerView: 2,
            spaceBetween: 12,
            grid: { rows: 2, fill: 'column' },
            speed: 0,
            onSwiper: (instance) => {
              swiper = instance;
              initCount += 1;
              const update = instance.update;
              instance.update = function (...args) {
                updateCalls += 1;
                return update.apply(this, args);
              };
            },
          },
          labels.map((label) => React.createElement(SwiperSlide, { key: label }, label)),
        ),
      );
    });
    assert.equal(errors.length, 0, errors[0]?.stack);
  };
  try {
    await render(['A', 'B', 'C', 'D', 'E', 'F']);
    assert.equal(initCount, 1);
    const original = swiper;
    const reveal = metrics(swiper.el);
    const beforeChildrenChange = updateCalls;
    await render(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']);
    await render(['A', 'B', 'C', 'D', 'I', 'J', 'G', 'H']);
    assert.ok(updateCalls >= beforeChildrenChange + 2, 'both React child changes call update');
    assert.equal(swiper, original);
    assert.equal(initCount, 1);
    const labels = ['A', 'B', 'C', 'D', 'I', 'J', 'G', 'H'];
    assert.deepEqual(
      [...host.querySelectorAll('.swiper-slide')].map((slide) => slide.textContent),
      labels,
    );
    host.style.display = '';
    reveal();
    await act(() => swiper.update());
    assert.deepEqual(
      swiper.slides.map((slide) => slide.textContent),
      labels,
    );
    await act(() => swiper.slideNext(0));
    assert.equal(swiper.activeIndex, 1);
    assert.equal(swiper.realIndex, 1);
    assert.equal(swiper.el.querySelector('.swiper-slide-active').textContent, 'C');
    await act(() => swiper.slidePrev(0));
    assert.equal(swiper.activeIndex, 0);
    assert.equal(swiper.el.querySelector('.swiper-slide-active').textContent, 'A');
  } finally {
    await act(() => root.unmount());
    host.remove();
  }
});

for (const [direction, dimension, value] of [
  ['horizontal', 'width', 600],
  ['vertical', 'height', 300],
]) {
  test(`hidden ${direction} Grid honors explicit ${dimension}`, () => {
    const el = document.createElement('div');
    el.style.display = 'none';
    el.innerHTML = `<div class="swiper-wrapper">${['A', 'B', 'C', 'D', 'E', 'F']
      .map((text) => `<div class="swiper-slide">${text}</div>`)
      .join('')}</div>`;
    document.body.append(el);
    const swiper = new Swiper(el, {
      modules: [Grid],
      direction,
      [dimension]: value,
      slidesPerView: 2,
      spaceBetween: 12,
      grid: { rows: 2 },
      speed: 0,
    });
    try {
      swiper.update();
      assert.equal(swiper.size, value);
      swiper.slideNext(0);
      assert.equal(swiper.activeIndex, 1);
      assert.equal(swiper.translate, direction === 'horizontal' ? -306 : -156);
    } finally {
      swiper.destroy();
      el.remove();
    }
  });
}

test('hidden Grid can switch to a single row before its first measurement', () => {
  const el = document.createElement('div');
  el.innerHTML = `<div class="swiper-wrapper">${['A', 'B', 'C', 'D', 'E', 'F']
    .map((text) => `<div class="swiper-slide">${text}</div>`)
    .join('')}</div>`;
  document.body.append(el);
  const reveal = metrics(el);
  let updates = 0;
  const swiper = new Swiper(el, {
    modules: [Grid],
    slidesPerView: 2,
    grid: { rows: 2 },
    speed: 0,
    on: { update: () => (updates += 1) },
  });
  try {
    assert.equal(swiper.size, undefined);
    assert.ok(el.classList.contains('swiper-grid'));
    swiper.params.grid.rows = 1;
    swiper.update();
    assert.equal(el.classList.contains('swiper-grid'), false);
    assert.equal(el.classList.contains('swiper-grid-column'), false);
    assert.equal(updates, 1, 'deferred updates still notify modules and listeners');
    reveal();
    swiper.emit('resize');
    assert.equal(swiper.size, 600);
    assert.equal(el.classList.contains('swiper-grid'), false);
    swiper.slideNext(0);
    assert.equal(swiper.activeIndex, 1);
    assert.equal(swiper.translate, -300);
  } finally {
    swiper.destroy();
    el.remove();
  }
});
