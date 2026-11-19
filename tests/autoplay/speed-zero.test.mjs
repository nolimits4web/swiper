// Regression for #7773: autoplay stopped after the first slide when speed was 0.
//
// Every slide change emits beforeTransitionStart, which pauses autoplay. With waitForTransition
// (the default) autoplay then resumed on the wrapper's transitionend. A transition with speed 0
// never fires transitionend, so autoplay stayed paused for good. The same happens with any speed
// when Swiper itself repositions the slider with speed 0, e.g. from onResize() after the container
// changes size, so a resize could also stop autoplay.

import assert from 'node:assert/strict';
import { after, test } from 'node:test';

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

// Autoplay schedules timers on the happy-dom window, which keep the process alive until it closes
after(() => win.happyDOM.close());

const { default: Swiper } = await import('../../dist/swiper-bundle.mjs');

function createSwiper(params) {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML = `<div class="swiper-wrapper">${'<div class="swiper-slide"></div>'.repeat(6)}</div>`;
  document.body.append(el);
  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => 600 });
  const swiper = new Swiper(el, { resizeObserver: false, ...params });
  return { el, swiper };
}

test('autoplay keeps going with speed 0', async () => {
  const { el, swiper } = createSwiper({ speed: 0, autoplay: { delay: 10 } });

  // Without the fix autoplay stops after the first change, so the third one never comes
  const reachedThird = await new Promise((resolve) => {
    let changes = 0;
    swiper.on('slideChange', () => {
      changes += 1;
      if (changes === 3) resolve(true);
    });
    setTimeout(() => resolve(false), 1000);
  });
  assert.equal(reachedThird, true, `stopped at activeIndex ${swiper.activeIndex}`);

  swiper.destroy();
  el.remove();
});

test('autoplay is not left paused by an internal reposition with speed 0', () => {
  const { el, swiper } = createSwiper({ autoplay: { delay: 1000 } });
  assert.equal(swiper.autoplay.running, true);

  // What onResize() does after the container changes size
  swiper.slideTo(2, 0, false, true);
  assert.equal(swiper.activeIndex, 2);
  assert.equal(swiper.autoplay.paused, false);

  swiper.destroy();
  el.remove();
});
