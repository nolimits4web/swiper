import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Window } from 'happy-dom';

const win = new Window({ url: 'http://localhost/', width: 1024, height: 768 });
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

const { default: Swiper } = await import('../../dist/swiper-bundle.mjs');

function createSwiper() {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML = `<div class="swiper-wrapper">${'<div class="swiper-slide"></div>'.repeat(3)}</div>`;
  document.body.append(el);
  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => 600 });
  Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => 300 });
  return new Swiper(el, {
    speed: 0,
    keyboard: { enabled: true, onlyInViewport: false },
    resizeObserver: false,
  });
}

function cleanup(swiper, input) {
  input?.blur();
  const el = swiper.el;
  swiper.destroy();
  el.remove();
}

function pressArrowRight() {
  document.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39, bubbles: true }),
  );
}

test('arrow keys in a light DOM input do not change the slide', () => {
  const swiper = createSwiper();
  const input = document.createElement('input');
  try {
    swiper.slides[0].append(input);
    input.focus();
    pressArrowRight();
    assert.equal(swiper.activeIndex, 0);
  } finally {
    cleanup(swiper, input);
  }
});

test('arrow keys in an input inside a shadow root do not change the slide', () => {
  const swiper = createSwiper();
  const host = document.createElement('div');
  const input = document.createElement('input');
  try {
    host.attachShadow({ mode: 'open' }).append(input);
    swiper.slides[0].append(host);
    input.focus();
    // focus inside a shadow root is reported on the host
    assert.ok(document.activeElement === host);
    pressArrowRight();
    assert.equal(swiper.activeIndex, 0);
  } finally {
    cleanup(swiper, input);
  }
});

test('arrow keys still change the slide when no input is focused', () => {
  const swiper = createSwiper();
  try {
    assert.ok(document.activeElement === document.body);
    pressArrowRight();
    assert.equal(swiper.activeIndex, 1);
  } finally {
    cleanup(swiper);
  }
});
