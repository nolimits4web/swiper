// Real-DOM regression test for the <swiper-container> / <swiper-slide> web component.
//
// The rest of the v14 suite is type-level, SSR-string, or import-contract only — none of it
// ever upgrades the custom element in a live DOM and runs Swiper's init. Two v14 regressions
// shipped through that gap (https://github.com/nolimits4web/swiper/issues/8196):
//
//   1. core mount() resolved `slidesEl` to the shadow root instead of the host element, so the
//      web component initialized with ZERO slides.
//   2. needsNavigation/needsPagination/needsScrollbar stopped treating a bare boolean as truthy,
//      so `<swiper-container navigation>` (etc.) rendered no built-in controls.
//
// happy-dom gives us a real-ish DOM (custom element upgrade, shadow DOM, slots) in pure Node —
// no browser download, runs in CI. We assert against the built dist/ (run `build:prod` first).

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Window } from 'happy-dom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');
const dist = (p) => path.join(distDir, p);

if (!fs.existsSync(distDir)) {
  console.error('dist/ missing — run `npm run build:prod` first.');
  process.exit(1);
}

// --- happy-dom setup ---------------------------------------------------------
// The element bundle references window/document/customElements/HTMLElement/... as globals,
// so expose happy-dom's window globals on globalThis (like @happy-dom/global-registrator does).
const win = new Window({ url: 'http://localhost/' });
// Force happy-dom's own constructors for these even if Node defines a global of the same name,
// so happy-dom's internal `instanceof` checks (e.g. in dispatchEvent) see matching classes.
const FORCE = new Set(['Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'ShadowRoot']);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !FORCE.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* read-only global (e.g. navigator) — happy-dom's value isn't needed for this test */
  }
}
globalThis.window = win;

// happy-dom doesn't implement the shadow-parts `part` DOMTokenList that render() calls
// `.add()` on. Minimal shim — the test doesn't assert on part attributes.
if (!('part' in win.Element.prototype)) {
  Object.defineProperty(win.Element.prototype, 'part', {
    configurable: true,
    get() {
      const el = this;
      return {
        add: (...names) =>
          el.setAttribute('part', `${el.getAttribute('part') || ''} ${names.join(' ')}`.trim()),
      };
    },
  });
}

const { register } = await import(dist('swiper-element-bundle.mjs'));
register();

const doc = win.document;

// Build the container + slides as a detached subtree, then append atomically. Browsers insert a
// parsed fragment in one operation (children present when connectedCallback fires); happy-dom's
// parser connects the parent before its children, so building detached is what matches the browser.
function mountContainer({ attrs = {}, slideCount = 3 } = {}) {
  const container = doc.createElement('swiper-container');
  for (const [name, value] of Object.entries(attrs)) {
    container.setAttribute(name, value);
  }
  for (let i = 1; i <= slideCount; i += 1) {
    const slide = doc.createElement('swiper-slide');
    slide.textContent = `Slide ${i}`;
    container.appendChild(slide);
  }
  doc.body.appendChild(container);
  return container;
}

let failed = 0;
let passed = 0;
async function check(label, fn) {
  let container;
  try {
    container = await fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  } finally {
    // disconnectedCallback -> swiper.destroy(); keep the document clean between tests.
    if (container && container.remove) container.remove();
  }
}

console.log('\nSwiper web component real-DOM test (happy-dom)\n');

// Sanity: this test is only meaningful with a working DOM + upgraded custom element.
await check('environment has a DOM and the custom element is defined', async () => {
  assert.equal(typeof document, 'object', 'document must exist');
  assert.ok(customElements.get('swiper-container'), 'swiper-container must be defined');
  assert.ok(customElements.get('swiper-slide'), 'swiper-slide must be defined');
});

// Regression 1: the web component must detect its slotted slides (was 0 in 14.0.0).
await check('detects slotted slides (slidesEl = host, not shadow root)', async () => {
  const container = mountContainer({ slideCount: 3 });
  assert.ok(container.swiper, 'swiper instance must exist');
  assert.equal(container.swiper.initialized, true, 'swiper must be initialized');
  assert.equal(container.swiper.isElement, true, 'isElement must be true for the web component');
  assert.equal(container.swiper.slides.length, 3, 'all 3 slides must be detected');
  return container;
});

// Regression 2: bare boolean attributes must render the built-in controls (rendered none in 14.0.0).
await check('boolean navigation/pagination/scrollbar render their controls', async () => {
  const container = mountContainer({
    attrs: { navigation: '', pagination: '', scrollbar: '' },
    slideCount: 4,
  });
  const sr = container.shadowRoot;
  assert.ok(sr.querySelector('.swiper-button-prev'), 'prev button must render');
  assert.ok(sr.querySelector('.swiper-button-next'), 'next button must render');
  assert.ok(sr.querySelector('.swiper-pagination'), 'pagination must render');
  assert.ok(sr.querySelector('.swiper-scrollbar'), 'scrollbar must render');
  return container;
});

// Negative guard: when the user supplies explicit nav elements, the default buttons must NOT
// be rendered — i.e. the boolean fix above must not over-render for the object form.
await check('explicit navigation nextEl/prevEl does not render default buttons', async () => {
  const container = mountContainer({
    attrs: { 'navigation-next-el': '.my-next', 'navigation-prev-el': '.my-prev' },
    slideCount: 3,
  });
  const sr = container.shadowRoot;
  assert.equal(
    sr.querySelector('.swiper-button-next'),
    null,
    'default next button must not render',
  );
  assert.equal(
    sr.querySelector('.swiper-button-prev'),
    null,
    'default prev button must not render',
  );
  return container;
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
