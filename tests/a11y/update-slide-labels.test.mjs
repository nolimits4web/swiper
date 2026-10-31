// Regression test for https://github.com/nolimits4web/swiper/issues/7757
// Slides replaced in the DOM (same count) must get their a11y attributes back after swiper.update().

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Window } from 'happy-dom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');
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

const { default: Swiper } = await import(path.join(distDir, 'swiper-bundle.mjs'));
const doc = win.document;

const el = doc.createElement('div');
el.className = 'swiper';
el.innerHTML = `<div class="swiper-wrapper">${'<div class="swiper-slide"></div>'.repeat(3)}</div>`;
doc.body.appendChild(el);
const swiper = new Swiper(el, { width: 300, height: 300 });

assert.equal(swiper.slides[1].getAttribute('aria-label'), '2 / 3');

// A CMS re-renders the slide markup, keeping the slide count
el.querySelector('.swiper-wrapper').innerHTML = '<div class="swiper-slide"></div>'.repeat(3);
swiper.update();

swiper.slides.forEach((slideEl, index) => {
  assert.equal(slideEl.getAttribute('aria-label'), `${index + 1} / 3`);
  assert.equal(slideEl.getAttribute('role'), 'group');
});

swiper.destroy();
console.log('a11y update slide labels: ok');
