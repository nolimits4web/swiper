// Regression test for https://github.com/nolimits4web/swiper/issues/8229
//
// elementTransitionEnd() used `{ once: true }` together with `if (e.target !== el) return`.
// `transitionend` bubbles, so a descendant's event invoked the listener and `{ once: true }`
// removed it before the wrapper's own transitionend arrived. Swiper often leaves
// `transition-property` at the default `all`, so slide descendants fire competing events.
//
// The listener must stay registered until `e.target === el`, then be removed by hand.

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

const win = new Window({ url: 'http://localhost/' });
const FORCE = new Set(['Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'ShadowRoot']);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !FORCE.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* read-only global (e.g. navigator) — not needed for this test */
  }
}
globalThis.window = win;

// Rollup mangles this chunk's named exports (`elementTransitionEnd as m`).
const utilsSrc = fs.readFileSync(dist('shared/utils.mjs'), 'utf8');
const exportAlias = utilsSrc.match(/elementTransitionEnd as ([A-Za-z_$][\w$]*)/);
if (!exportAlias) {
  console.error('Could not find elementTransitionEnd export in dist/shared/utils.mjs');
  process.exit(1);
}
const utils = await import(dist('shared/utils.mjs'));
const elementTransitionEnd = utils[exportAlias[1]];
const doc = win.document;

let failed = 0;
let passed = 0;
async function check(label, fn) {
  try {
    await fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  }
}

function mountWrapper() {
  const wrapper = doc.createElement('div');
  wrapper.className = 'swiper-wrapper';
  const slide = doc.createElement('div');
  slide.className = 'swiper-slide';
  wrapper.appendChild(slide);
  doc.body.appendChild(wrapper);
  return { wrapper, slide };
}

console.log('\nSwiper elementTransitionEnd regression test (happy-dom, #8229)\n');

await check('dist exports elementTransitionEnd', () => {
  assert.equal(typeof elementTransitionEnd, 'function');
});

await check('a bubbling descendant transitionend does not drop the wrapper listener', () => {
  const { wrapper, slide } = mountWrapper();
  const calls = [];
  elementTransitionEnd(wrapper, function onEnd(e) {
    calls.push({ thisArg: this, target: e.target });
  });

  slide.dispatchEvent(new Event('transitionend', { bubbles: true }));
  assert.equal(calls.length, 0, 'descendant transitionend must not invoke the callback');

  wrapper.dispatchEvent(new Event('transitionend', { bubbles: true }));
  assert.equal(calls.length, 1, 'wrapper transitionend must still invoke the callback');
  assert.equal(calls[0].thisArg, wrapper, 'callback this must be the wrapper');
  assert.equal(calls[0].target, wrapper, 'event target must be the wrapper');

  wrapper.dispatchEvent(new Event('transitionend', { bubbles: true }));
  assert.equal(calls.length, 1, 'listener must be removed after the matching event');

  wrapper.remove();
});

await check('missing callback is a no-op', () => {
  const { wrapper, slide } = mountWrapper();
  elementTransitionEnd(wrapper);
  slide.dispatchEvent(new Event('transitionend', { bubbles: true }));
  wrapper.dispatchEvent(new Event('transitionend', { bubbles: true }));
  wrapper.remove();
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
