import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { Window } from 'happy-dom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist/ missing — run `npm run build:prod` first.');
  process.exit(1);
}

const win = new Window({ url: 'http://localhost/' });
const FORCE = new Set([
  'Event',
  'CustomEvent',
  'KeyboardEvent',
  'Node',
  'Element',
  'HTMLElement',
  'ShadowRoot',
]);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !FORCE.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* ignore read-only */
  }
}
globalThis.window = win;
globalThis.document = win.document;

const bundleUrl = pathToFileURL(path.join(distDir, 'swiper-bundle.mjs')).href;
const { default: Swiper } = await import(bundleUrl);

const doc = win.document;

let passed = 0;
let failed = 0;

function check(label, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  }
}

console.log('\nSwiper A11y notification regression test\n');

check('preserves plain-text accessibility notification behavior', () => {
  const el = doc.createElement('div');
  el.className = 'swiper';
  const wrapper = doc.createElement('div');
  wrapper.className = 'swiper-wrapper';
  const slide1 = doc.createElement('div');
  slide1.className = 'swiper-slide';
  const slide2 = doc.createElement('div');
  slide2.className = 'swiper-slide';
  wrapper.appendChild(slide1);
  wrapper.appendChild(slide2);
  const prevEl = doc.createElement('div');
  prevEl.className = 'swiper-button-prev';
  const nextEl = doc.createElement('div');
  nextEl.className = 'swiper-button-next';
  el.appendChild(wrapper);
  el.appendChild(prevEl);
  el.appendChild(nextEl);
  doc.body.appendChild(el);

  const swiper = new Swiper(el, {
    navigation: { nextEl, prevEl },
    a11y: {
      enabled: true,
      lastSlideMessage: 'Last slide reached',
    },
  });

  const liveRegion = el.querySelector('.swiper-notification');
  assert.ok(liveRegion, 'Live region element must exist');

  const event = new win.KeyboardEvent('keydown', { bubbles: true, keyCode: 13 });
  nextEl.dispatchEvent(event);

  assert.equal(liveRegion.textContent, 'Last slide reached', 'Text content must match message');
  assert.equal(liveRegion.children.length, 0, 'No child elements should be created');

  swiper.destroy();
  el.remove();
});

check(
  'treats HTML-like notification messages as literal text and creates no child elements',
  () => {
    const el = doc.createElement('div');
    el.className = 'swiper';
    const wrapper = doc.createElement('div');
    wrapper.className = 'swiper-wrapper';
    const slide1 = doc.createElement('div');
    slide1.className = 'swiper-slide';
    const slide2 = doc.createElement('div');
    slide2.className = 'swiper-slide';
    wrapper.appendChild(slide1);
    wrapper.appendChild(slide2);
    const prevEl = doc.createElement('div');
    prevEl.className = 'swiper-button-prev';
    const nextEl = doc.createElement('div');
    nextEl.className = 'swiper-button-next';
    el.appendChild(wrapper);
    el.appendChild(prevEl);
    el.appendChild(nextEl);
    doc.body.appendChild(el);

    const htmlLikeMessage = 'Notice: <span class="badge">Badge</span>';

    const swiper = new Swiper(el, {
      navigation: { nextEl, prevEl },
      a11y: {
        enabled: true,
        lastSlideMessage: htmlLikeMessage,
      },
    });

    const liveRegion = el.querySelector('.swiper-notification');
    assert.ok(liveRegion, 'Live region element must exist');

    const event = new win.KeyboardEvent('keydown', { bubbles: true, keyCode: 13 });
    nextEl.dispatchEvent(event);

    // Before the fix:
    // setInnerHTML parsed 'Notice: <span class="badge">Badge</span>' into a child <span> element,
    // causing liveRegion.children.length to be 1 and liveRegion.querySelector('.badge') to exist.
    //
    // After the fix:
    // Using textContent renders the message strictly as literal text,
    // ensuring liveRegion.children.length === 0, no .badge element exists,
    // and textContent equals the input string.
    assert.equal(
      liveRegion.children.length,
      0,
      `Expected 0 child elements, but found ${liveRegion.children.length} (HTML markup was parsed into DOM elements)`,
    );
    assert.equal(
      liveRegion.querySelector('.badge'),
      null,
      'Live region should not contain child element parsed from message',
    );
    assert.equal(
      liveRegion.textContent,
      htmlLikeMessage,
      'Live region textContent should match literal input',
    );

    swiper.destroy();
    el.remove();
  },
);

console.log(`\n${passed} passed, ${failed} failed\n`);
if (failed > 0) {
  process.exit(1);
}
