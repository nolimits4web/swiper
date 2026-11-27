// Regression test for #8169: a <swiper-container>/<swiper-slide> created in one document and
// inserted into another one must still get its shadow styles.
//
// A framework portal that renders into a same-origin iframe (Angular CDK's DomPortalOutlet,
// a React portal, a window.open popup) builds the element with the HOST document's renderer
// and then appends the root nodes into the iframe's document. Insertion adopts the element and
// its shadow root into that document, and only then fires connectedCallback -> render().
//
// addStyle() used to construct its CSSStyleSheet in the realm of this module, i.e. the host
// document. A constructed stylesheet belongs to the document of the realm that constructed it,
// and every engine rejects assigning it to a shadow root in a different document:
//
//   Chromium  NotAllowedError: Failed to set the 'adoptedStyleSheets' property on 'ShadowRoot':
//             Sharing constructed stylesheets in multiple documents is not allowed
//   Firefox   NotAllowedError: Adopted style sheet's constructor document must match the
//             document or shadow root's node document
//   WebKit    NotAllowedError: Sheet constructor document doesn't match
//
// SwiperSlide.render() therefore threw out of connectedCallback, and SwiperContainer.render()
// threw out of initialize(), so the Swiper instance was never created: the slider was dead,
// not merely unstyled. The fix constructs the sheet from the shadow root's own realm.
//
// happy-dom models the adoption (shadowRoot.ownerDocument becomes the other document) but
// neither runs custom-element reactions across windows nor enforces the same-document rule on
// adoptedStyleSheets, so this test calls initialize() itself and installs the spec's check.
// We assert against the built dist/ (run `build:prod` first).

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
// Same global wiring as element-dom.test.mjs: the element bundle reaches for
// window/document/customElements/HTMLElement/... as globals, so this window is the module's
// own realm — the "host document" of the scenario above.
const win = new Window({ url: 'http://localhost/' });
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

const partShim = (W) => {
  if ('part' in W.Element.prototype) return;
  Object.defineProperty(W.Element.prototype, 'part', {
    configurable: true,
    get() {
      const el = this;
      return {
        add: (...names) =>
          el.setAttribute('part', `${el.getAttribute('part') || ''} ${names.join(' ')}`.trim()),
      };
    },
  });
};
partShim(win);

// A second window stands in for the iframe's document: its CSSStyleSheet is a different class,
// which is exactly what makes a sheet "from another document".
const iframeWin = new Window({ url: 'http://localhost/iframe' });
partShim(iframeWin);

// Install the spec's same-document requirement, which happy-dom doesn't implement: a sheet is
// only acceptable if it came from the realm of the shadow root's own document.
const enforceSameDocument = (W) => {
  const descriptor = Object.getOwnPropertyDescriptor(W.ShadowRoot.prototype, 'adoptedStyleSheets');
  Object.defineProperty(W.ShadowRoot.prototype, 'adoptedStyleSheets', {
    ...descriptor,
    set(sheets) {
      for (const sheet of sheets) {
        const view = this.ownerDocument.defaultView;
        if (view && !(sheet instanceof view.CSSStyleSheet)) {
          const err = new Error(
            'Sharing constructed stylesheets in multiple documents is not allowed',
          );
          err.name = 'NotAllowedError';
          throw err;
        }
      }
      descriptor.set.call(this, sheets);
    },
  });
};
enforceSameDocument(win);
enforceSameDocument(iframeWin);

const { register } = await import(dist('swiper-element-bundle.mjs'));
register();

// Build the subtree with the host document, the way a portal's renderer does, then move it into
// the other document and initialize it there.
const portalInto = (targetDoc, { slideCount = 3 } = {}) => {
  const container = win.document.createElement('swiper-container');
  for (let i = 1; i <= slideCount; i += 1) {
    const slide = win.document.createElement('swiper-slide');
    slide.textContent = `Slide ${i}`;
    container.appendChild(slide);
  }
  targetDoc.body.appendChild(container);
  // connectedCallback in the browser; happy-dom doesn't run reactions across windows.
  for (const slide of container.querySelectorAll('swiper-slide')) slide.initialize();
  container.initialize();
  return container;
};

let failed = 0;
let passed = 0;
const check = (label, fn) => {
  let container;
  try {
    container = fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}`);
    console.log(`        ${err.message}`);
  } finally {
    if (container && container.remove) container.remove();
  }
};

console.log('\nSwiper web component cross-document styles test (happy-dom)\n');

check('control: in its own document the slide adopts one stylesheet', () => {
  const container = portalInto(win.document);
  const slide = container.querySelector('swiper-slide');
  assert.equal(slide.shadowRoot.ownerDocument, win.document);
  assert.equal(slide.shadowRoot.adoptedStyleSheets.length, 1, 'slide must adopt its stylesheet');
  assert.ok(
    slide.shadowRoot.adoptedStyleSheets[0] instanceof win.CSSStyleSheet,
    'the sheet must come from the shadow root own realm',
  );
  return container;
});

check('slides moved into another document still adopt their stylesheet', () => {
  const container = portalInto(iframeWin.document);
  const slides = [...container.querySelectorAll('swiper-slide')];
  assert.equal(slides.length, 3, 'all slides must still be there');
  for (const slide of slides) {
    assert.equal(
      slide.shadowRoot.ownerDocument,
      iframeWin.document,
      'the shadow root must have been adopted into the other document',
    );
    assert.equal(slide.shadowRoot.adoptedStyleSheets.length, 1, 'slide must adopt its stylesheet');
    assert.ok(
      slide.shadowRoot.adoptedStyleSheets[0] instanceof iframeWin.CSSStyleSheet,
      'the sheet must be constructed in the realm of the document the slide now lives in',
    );
    assert.ok(
      slide.shadowRoot.adoptedStyleSheets[0].cssRules.length > 0,
      'the sheet must actually carry the slide CSS',
    );
  }
  return container;
});

check('the container moved into another document initializes and keeps its styles', () => {
  const container = portalInto(iframeWin.document);
  assert.equal(container.shadowRoot.ownerDocument, iframeWin.document);
  assert.equal(container.shadowRoot.adoptedStyleSheets.length, 1, 'container must adopt its CSS');
  assert.ok(
    container.shadowRoot.adoptedStyleSheets[0] instanceof iframeWin.CSSStyleSheet,
    'the sheet must be constructed in the realm of the document the container now lives in',
  );
  assert.ok(container.swiper, 'the Swiper instance must exist');
  assert.equal(container.swiper.initialized, true, 'render() must not have thrown out of init');
  return container;
});

check('without adoptedStyleSheets it falls back to a <style> of the right document', () => {
  // Older WebKit has constructable stylesheets but no adoptedStyleSheets on a shadow root.
  const descriptor = Object.getOwnPropertyDescriptor(
    iframeWin.ShadowRoot.prototype,
    'adoptedStyleSheets',
  );
  Object.defineProperty(iframeWin.ShadowRoot.prototype, 'adoptedStyleSheets', {
    ...descriptor,
    get: () => undefined,
  });
  try {
    const container = portalInto(iframeWin.document);
    const slide = container.querySelector('swiper-slide');
    const style = slide.shadowRoot.querySelector('style');
    assert.ok(style, 'the fallback <style> must be appended');
    assert.equal(style.ownerDocument, iframeWin.document, 'and created by the other document');
    assert.ok(style.textContent.length > 0, 'with the slide CSS in it');
    container.remove();
  } finally {
    Object.defineProperty(iframeWin.ShadowRoot.prototype, 'adoptedStyleSheets', descriptor);
  }
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed ? 1 : 0);
