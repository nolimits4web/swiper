// Regression test for hash navigation and history with non-ASCII slide names.
//
// location.hash and location.pathname are percent-encoded, while data-hash and data-history hold
// the text as is, so a slide named "第二頁" never matched its own URL:
//
// - a deep link to #第二頁 opened the first slide,
// - with hashNavigation.watchState the hashchange that follows every slide change looked like a
//   navigation to an unknown hash and sent the slider back to the first slide,
// - history's slugify() dropped everything outside [A-Za-z0-9_-], so "第二頁" left the URL
//   unchanged and "café" became "caf".

import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';

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

const { default: Swiper } = await import('../../dist/swiper-bundle.mjs');

let swiper;

function createSwiper(attr, names, params) {
  const el = document.createElement('div');
  el.className = 'swiper';
  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';
  for (const name of names) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.setAttribute(attr, name);
    wrapper.append(slide);
  }
  el.append(wrapper);
  document.body.append(el);
  Object.defineProperty(el, 'clientWidth', { configurable: true, get: () => 300 });
  Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => 200 });
  swiper = new Swiper(el, { speed: 0, resizeObserver: false, ...params });
  return swiper;
}

const hashChange = () => new Promise((resolve) => win.setTimeout(resolve, 10));

afterEach(async () => {
  swiper.destroy();
  document.body.replaceChildren();
  win.location.hash = '';
  await hashChange();
});

const HASHES = ['first', '第二頁', 'café au lait', '100%', 'say "hi"', 'plain'];

for (const [index, hash] of HASHES.entries()) {
  test(`hash navigation opens the slide of a deep link to #${hash}`, () => {
    win.location.hash = hash;
    createSwiper('data-hash', HASHES, { hashNavigation: true });
    assert.equal(swiper.activeIndex, index);
  });
}

test('hash navigation finds a data-hash that is percent-encoded itself', () => {
  win.location.hash = '%E7%AC%AC%E4%BA%8C%E9%A0%81';
  createSwiper('data-hash', ['first', '%E7%AC%AC%E4%BA%8C%E9%A0%81'], { hashNavigation: true });
  assert.equal(swiper.activeIndex, 1);
});

test('hash navigation with an unknown hash stays on the first slide', () => {
  win.location.hash = '第三頁';
  createSwiper('data-hash', ['first', '第二頁'], { hashNavigation: true });
  assert.equal(swiper.activeIndex, 0);
});

test('hashNavigation.watchState stays on a slide with a non-ASCII hash', async () => {
  createSwiper('data-hash', HASHES, { hashNavigation: { watchState: true } });

  swiper.slideTo(1);
  await hashChange();
  assert.equal(win.location.hash, '#%E7%AC%AC%E4%BA%8C%E9%A0%81');
  assert.equal(swiper.activeIndex, 1);

  swiper.slideTo(2);
  await hashChange();
  assert.equal(swiper.activeIndex, 2);
});

test('hashNavigation.watchState follows a change to a non-ASCII hash', async () => {
  createSwiper('data-hash', HASHES, { hashNavigation: { watchState: true } });

  win.location.hash = '第二頁';
  await hashChange();
  assert.equal(swiper.activeIndex, 1);
});

test('hashNavigation.getSlideIndex gets the decoded hash', () => {
  const hashes = [];
  win.location.hash = '第二頁';
  createSwiper('data-hash', ['first', 'second'], {
    hashNavigation: {
      getSlideIndex(_swiper, hash) {
        hashes.push(hash);
        return 1;
      },
    },
  });
  assert.deepEqual(hashes, ['第二頁']);
  assert.equal(swiper.activeIndex, 1);
});

const HISTORY_NAMES = ['first', '第二頁', 'café au lait', 'حرف', 'Slide One!'];

function recordPushState() {
  const urls = [];
  const { pushState } = win.history;
  win.history.pushState = (state, title, url) => urls.push(url);
  return {
    urls,
    restore() {
      win.history.pushState = pushState;
    },
  };
}

test('history keeps non-ASCII characters in the slide url', () => {
  const pushed = recordPushState();
  try {
    createSwiper('data-history', HISTORY_NAMES, {
      history: { key: 'slides' },
      url: 'http://localhost/page',
    });
    for (let i = 1; i < HISTORY_NAMES.length; i += 1) swiper.slideTo(i);
    assert.deepEqual(pushed.urls, [
      'slides/第二頁',
      'slides/café-au-lait',
      'slides/حرف',
      'slides/Slide-One',
    ]);
  } finally {
    pushed.restore();
  }
});

for (const [index, url] of [
  [1, 'http://localhost/slides/%E7%AC%AC%E4%BA%8C%E9%A0%81'],
  [2, 'http://localhost/slides/caf%C3%A9-au-lait'],
  [4, 'http://localhost/slides/Slide-One'],
]) {
  test(`history opens the slide of a deep link to ${url}`, () => {
    createSwiper('data-history', HISTORY_NAMES, { history: { key: 'slides' }, url });
    assert.equal(swiper.activeIndex, index);
  });
}

test('history does not repeat a non-ASCII key that is already in the url', () => {
  const pushed = recordPushState();
  try {
    createSwiper('data-history', ['first', '第二頁'], {
      history: { key: '幻燈片' },
      url: 'http://localhost/%E5%B9%BB%E7%87%88%E7%89%87/first',
    });
    swiper.slideTo(1);
    assert.deepEqual(pushed.urls, ['第二頁']);
  } finally {
    pushed.restore();
  }
});
