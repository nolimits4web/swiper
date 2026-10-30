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

// Regression 3 (#8202): virtual mode must render the FIRST slide. The v14 TS migration
// initialized swiper.virtual.to as 0 instead of undefined, so the first update() treated
// slide 0 as already rendered and never appended it — every core/element virtual swiper
// lost its first slide, and a single-slide virtual swiper rendered nothing at all.
await check('virtual mode renders slide 0 (initial window is complete)', async () => {
  const container = mountContainer({
    attrs: { virtual: '', 'slides-per-view': '3' },
    slideCount: 7,
  });
  const swiper = container.swiper;
  assert.equal(swiper.virtual.slides.length, 7, 'all 7 DOM slides must be collected');
  const rendered = [...container.querySelectorAll('swiper-slide')].map((el) =>
    el.getAttribute('data-swiper-slide-index'),
  );
  assert.ok(rendered.includes('0'), `slide index 0 must be rendered, got [${rendered}]`);
  for (let i = swiper.virtual.from; i <= swiper.virtual.to; i += 1) {
    assert.ok(
      rendered.includes(String(i)),
      `slide ${i} within [from, to] = [${swiper.virtual.from}, ${swiper.virtual.to}] must be rendered, got [${rendered}]`,
    );
  }
  const dupes = rendered.filter((v, i) => rendered.indexOf(v) !== i);
  assert.equal(dupes.length, 0, `no slide may render twice, got dupes [${dupes}]`);
  return container;
});

// #8202 worst case: with exactly one slide, from === to === 0 matched the initial
// state so update() early-returned and the swiper rendered completely empty.
await check('virtual mode renders a single slide', async () => {
  const container = mountContainer({ attrs: { virtual: '' }, slideCount: 1 });
  const rendered = [...container.querySelectorAll('swiper-slide')];
  assert.equal(rendered.length, 1, 'the single virtual slide must be rendered');
  assert.equal(rendered[0].getAttribute('data-swiper-slide-index'), '0');
  return container;
});

// Regression (v14 TS migration, 4a3929c0): core (non-element) swiper with a STRING
// scrollbar.el selector. The migration added an `else { el = params.el }` to the
// isElement branch, so the selector string itself became `el`, `el[0]` picked the
// character '.', and init crashed with "Cannot read properties of undefined
// (reading 'add')". The web-component tests above can't catch this — the bug only
// bites when isElement is false. The scrollbar sits OUTSIDE the swiper el — with it
// inside, the uniqueNavElements fallback happens to re-resolve the selector and masks
// the bug.
await check('core swiper resolves a string scrollbar.el selector', async () => {
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
      </div>
    </div>
    <div class="swiper-scrollbar"></div>`;
  doc.body.appendChild(host);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const { default: Scrollbar } = await import(dist('modules/scrollbar.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), {
    modules: [Scrollbar],
    scrollbar: { el: '.swiper-scrollbar', draggable: true },
  });
  try {
    const el = swiper.scrollbar.el;
    assert.ok(el && typeof el !== 'string', 'scrollbar.el must be an element, not a string');
    assert.equal(el.tagName, 'DIV', 'scrollbar.el must be the .swiper-scrollbar div');
    assert.ok(
      el.classList.contains('swiper-scrollbar-horizontal'),
      'direction class must be applied',
    );
    assert.ok(swiper.scrollbar.dragEl, 'drag element must be created');
  } finally {
    swiper.destroy(true, false);
    host.remove();
  }
});

// Regression: https://github.com/nolimits4web/swiper/issues/8248 - the size handler for
// update/resize/observerUpdate/lock/unlock/changeDirection recomputed the track and drag sizes
// but kept the drag at the position computed for the old sizes, so after a resize away from
// the first slide the drag no longer matched the progress (and could overflow the track).
// happy-dom has no layout, so the track width is stubbed and the slider size set via `width`.
async function resizedScrollbar({ hide = false, event }) {
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
        <div class="swiper-slide">4</div>
      </div>
    </div>
    <div class="swiper-scrollbar"></div>`;
  doc.body.appendChild(host);
  let trackWidth = 300;
  Object.defineProperty(host.querySelector('.swiper-scrollbar'), 'offsetWidth', {
    configurable: true,
    get: () => trackWidth,
  });
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const { default: Scrollbar } = await import(dist('modules/scrollbar.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), {
    modules: [Scrollbar],
    scrollbar: { el: '.swiper-scrollbar', hide },
    slidesPerView: 1,
    width: 300,
    height: 300,
    speed: 0,
  });
  try {
    swiper.slideTo(3, 0);
    const { dragEl, el } = swiper.scrollbar;
    assert.equal(dragEl.style.transform, 'translate3d(225px, 0, 0)');
    trackWidth = 200;
    if (event === 'update') swiper.update();
    else swiper.emit(event);
    return {
      transform: dragEl.style.transform,
      width: dragEl.style.width,
      opacity: el.style.opacity,
    };
  } finally {
    swiper.destroy(true, false);
    host.remove();
  }
}

for (const event of ['update', 'resize']) {
  await check(`scrollbar drag is repositioned for the new track size on ${event}`, async () => {
    const { transform, width } = await resizedScrollbar({ event });
    assert.equal(transform, 'translate3d(150px, 0, 0)');
    assert.equal(width, '50px');
  });
}

await check('scrollbar with hide: true stays hidden when its size is updated', async () => {
  const { transform, opacity } = await resizedScrollbar({ hide: true, event: 'update' });
  assert.equal(transform, 'translate3d(150px, 0, 0)');
  assert.equal(opacity, '0');
});

// Regression: https://github.com/nolimits4web/swiper/issues/8053 — `rtlTranslate` was only
// recomputed by mount() and changeLanguageDirection(), never by changeDirection(). An RTL
// slider switched to vertical therefore kept `rtlTranslate: true`, and every `rtlTranslate
// ? translate : -translate` read (slidePrev, slideToClosest, updateActiveIndex, ...) got the
// wrong sign — slidePrev() found no matching snap and fell back to slide 0.
// `width`/`height` are passed so `swiper.size` is set without real layout, which happy-dom
// doesn't do; with slidesPerView as a number the slide sizes are derived from it.
await check('changeDirection() recomputes rtlTranslate', async () => {
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
        <div class="swiper-slide">4</div>
      </div>
    </div>`;
  doc.body.appendChild(host);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), {
    slidesPerView: 1,
    width: 300,
    height: 300,
    speed: 0,
  });
  try {
    swiper.changeLanguageDirection('rtl');
    assert.equal(swiper.rtlTranslate, true, 'horizontal + rtl must translate RTL');

    swiper.changeDirection('vertical');
    assert.equal(swiper.rtlTranslate, false, 'vertical is never translated RTL');

    swiper.slideTo(2, 0);
    assert.equal(swiper.activeIndex, 2, 'slideTo(2) must land on slide 2');
    swiper.slidePrev(0);
    assert.equal(swiper.activeIndex, 1, 'slidePrev() must step back one slide, not jump to 0');

    swiper.changeDirection('horizontal');
    assert.equal(swiper.rtlTranslate, true, 'back to horizontal restores the RTL translate');
  } finally {
    swiper.destroy(true, false);
    host.remove();
  }
});

// Regression: https://github.com/nolimits4web/swiper/issues/8015 — loopFix()'s compensating
// slideTo() teleports changed indexes with no observable slide change, yet updateActiveIndex()
// emitted activeIndexChange/snapIndexChange/slideChange/realIndexChange for them, so pagination
// (driven by snapIndexChange) flickered mid-gesture and listeners saw transient wrong indexes.
// Emissions are now suppressed while `__loopFixInProgress__` is set; realIndexChange compares
// against the last *emitted* realIndex so a silent teleport can't swallow or duplicate it.
// The second half pins the public contract that suppression must NOT extend to: slideTo's
// `runCallbacks: false` only silences transition events, never index-change events.
// `width`/`height` are passed so `swiper.size` is set without real layout (happy-dom doesn't
// lay out); with a numeric slidesPerView the slide sizes derive from it.
await check('loopFix teleports do not emit index-change events', async () => {
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
        <div class="swiper-slide">3</div>
        <div class="swiper-slide">4</div>
        <div class="swiper-slide">5</div>
      </div>
    </div>`;
  doc.body.appendChild(host);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), {
    slidesPerView: 1,
    loop: true,
    width: 300,
    height: 300,
    speed: 0,
  });
  const counts = { activeIndexChange: 0, snapIndexChange: 0, slideChange: 0, realIndexChange: 0 };
  const reset = () => {
    for (const key of Object.keys(counts)) counts[key] = 0;
  };
  try {
    for (const key of Object.keys(counts)) swiper.on(key, () => (counts[key] += 1));

    // slidePrev from realIndex 0 wraps backwards through a loopFix teleport — listeners
    // must see exactly one change of each kind, not the teleport's extra emissions
    reset();
    swiper.slidePrev(0);
    assert.equal(swiper.realIndex, 4, 'slidePrev from 0 must wrap to the last slide');
    assert.equal(counts.activeIndexChange, 1, 'one activeIndexChange per wrap, teleport silent');
    assert.equal(counts.snapIndexChange, 1, 'one snapIndexChange per wrap, teleport silent');
    assert.equal(counts.slideChange, 1, 'one slideChange per wrap, teleport silent');
    assert.equal(counts.realIndexChange, 1, 'one realIndexChange per wrap, teleport silent');

    // a silent teleport between emitted events must not swallow the next realIndexChange
    reset();
    swiper.slideNext(0);
    assert.equal(swiper.realIndex, 0, 'slideNext must wrap back to the first slide');
    assert.equal(counts.realIndexChange, 1, 'realIndexChange must fire when realIndex changes');

    // public contract: runCallbacks=false silences transition events only — index-change
    // events must still fire (pagination relies on snapIndexChange to stay in sync)
    reset();
    swiper.slideToLoop(2, 0, false);
    // slideToLoop defers its slideTo into requestAnimationFrame — flush it
    await new Promise((resolve) => win.requestAnimationFrame(resolve));
    assert.equal(swiper.realIndex, 2, 'slideToLoop(2) must land on realIndex 2');
    assert.equal(
      counts.activeIndexChange,
      1,
      'runCallbacks:false must not silence activeIndexChange',
    );
    assert.equal(counts.snapIndexChange, 1, 'runCallbacks:false must not silence snapIndexChange');
    assert.equal(counts.slideChange, 1, 'runCallbacks:false must not silence slideChange');
    assert.equal(counts.realIndexChange, 1, 'runCallbacks:false must not silence realIndexChange');
  } finally {
    swiper.destroy(true, false);
    host.remove();
  }
});

// Regression: https://github.com/nolimits4web/swiper/issues/8229 — elementTransitionEnd()
// registered its listener with `{ once: true }` behind an `e.target !== el` guard. transitionend
// bubbles, so a descendant's event consumed the listener and the element's own end was never
// seen. With virtualTranslate effects (creative forces it) that synthetic end is the only
// producer of transitionEnd, so the swiper stayed `animating` forever. happy-dom runs no CSS
// transitions, so the transitionend events are dispatched by hand.
await check('descendant transitionend does not swallow the effect transition end', async () => {
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><span>1</span></div>
        <div class="swiper-slide"><span>2</span></div>
        <div class="swiper-slide"><span>3</span></div>
      </div>
    </div>`;
  doc.body.appendChild(host);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const { default: EffectCreative } = await import(dist('modules/effect-creative.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), {
    modules: [EffectCreative],
    effect: 'creative',
    width: 300,
    height: 300,
    speed: 300,
  });
  let transitionEndCount = 0;
  swiper.on('transitionEnd', () => (transitionEndCount += 1));
  try {
    swiper.slideTo(1);
    assert.equal(swiper.animating, true, 'slideTo() with speed must start animating');

    const slide = swiper.slides[1];
    slide.querySelector('span').dispatchEvent(new Event('transitionend', { bubbles: true }));
    assert.equal(transitionEndCount, 0, 'descendant transitionend must not end the transition');

    slide.dispatchEvent(new Event('transitionend', { bubbles: true }));
    assert.equal(transitionEndCount, 1, "slide's own transitionend must emit transitionEnd");
    assert.equal(swiper.animating, false, 'swiper must stop animating');
  } finally {
    swiper.destroy(true, false);
    host.remove();
  }
});

// Regression: https://github.com/nolimits4web/swiper/issues/7702 — `nested` swipers listen for
// moves on document in capture phase, so they run in registration order. With three levels
// initialized outer-to-inner, the middle swiper ran before the inner one could set
// preventedByNestedSwiper and took over the inner's drag. Touched nested descendants now run
// first regardless of init order; at the inner's edge the drag still hands off to the parent.
// Moves are also dispatched on body to cover a drag that leaves the inner swiper.
await check('nested swipers keep drag order regardless of init order', async () => {
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const ids = ['outer', 'middle', 'inner'];
  const mount = (id) => {
    const el = doc.createElement('div');
    el.id = id;
    el.className = 'swiper';
    el.innerHTML = `
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide"></div>
        <div class="swiper-slide">3</div>
      </div>`;
    return el;
  };
  // happy-dom leaves pageX/pageY undefined on synthetic PointerEvents
  const pointer = (target, type, x) => {
    const event = new win.PointerEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      pointerId: 1,
      pointerType: 'mouse',
      button: 0,
      buttons: type === 'pointerup' ? 0 : 1,
      clientX: x,
      clientY: 50,
    });
    Object.defineProperties(event, { pageX: { value: x }, pageY: { value: 50 } });
    target.dispatchEvent(event);
  };
  for (const order of [ids, [...ids].reverse()]) {
    for (const outside of [false, true]) {
      const [outerEl, middleEl, innerEl] = ids.map(mount);
      outerEl.querySelector('.swiper-slide:nth-child(2)').appendChild(middleEl);
      middleEl.querySelector('.swiper-slide:nth-child(2)').appendChild(innerEl);
      doc.body.appendChild(outerEl);
      const instances = {};
      for (const id of order) {
        instances[id] = new Swiper(doc.getElementById(id), {
          nested: id !== 'outer',
          initialSlide: 1,
          width: 600,
          height: 300,
          threshold: 0,
          speed: 0,
        });
      }
      const label = `${order.join(' > ')} init${outside ? ', moving outside' : ''}`;
      try {
        // drag right three times: inner goes to its first slide, then middle, then outer
        for (const expected of ['1,1,0', '1,0,0', '0,0,0']) {
          const target = innerEl.querySelector('.swiper-slide');
          const moveTarget = outside ? doc.body : target;
          pointer(target, 'pointerdown', 100);
          pointer(moveTarget, 'pointermove', 150);
          pointer(moveTarget, 'pointermove', 550);
          pointer(moveTarget, 'pointerup', 550);
          assert.equal(
            ids.map((id) => instances[id].activeIndex).join(','),
            expected,
            `${label}: active indexes (outer,middle,inner)`,
          );
        }
      } finally {
        Object.values(instances).forEach((swiper) => swiper.destroy(true, false));
        outerEl.remove();
      }
    }
  }
});

// Regression: https://github.com/nolimits4web/swiper/issues/8224 — the v14 TS migration emitted
// SwiperContainer's `init`/`nested`/`injectStyles`/... declarations as class fields, i.e. own
// instance properties. Vue and React 19 set a prop on a custom element as a DOM property when
// `key in el`, so on an already-defined element `init="false"` became `el.init = 'false'` (a
// string, no attribute) and connectedCallback initialized immediately with defaults; params
// assigned later were ignored by the no-op initialize(). `setProp` mimics that framework rule.
await check('init="false" set the framework way defers init until initialize()', async () => {
  const setProp = (el, key, value) => {
    if (key in el) el[key] = value;
    else el.setAttribute(key, value);
  };
  const probe = doc.createElement('swiper-slide');
  assert.equal('lazy' in probe, false, "'lazy' in swiper-slide must be false");

  const container = doc.createElement('swiper-container');
  assert.equal('init' in container, false, "'init' in swiper-container must be false");
  setProp(container, 'init', 'false');
  for (let i = 1; i <= 3; i += 1) {
    const slide = doc.createElement('swiper-slide');
    slide.textContent = `Slide ${i}`;
    container.appendChild(slide);
  }
  doc.body.appendChild(container);
  assert.ok(!container.swiper, 'init="false" must not initialize on connect');

  Object.assign(container, {
    navigation: { prevEl: '.my-prev', nextEl: '.my-next' },
    injectStyles: ['.swiper { --injected-8224: 1; }'],
  });
  container.initialize();
  const sr = container.shadowRoot;
  assert.equal(container.swiper.params.navigation.prevEl, '.my-prev', 'custom prevEl must apply');
  assert.equal(sr.querySelector('.swiper-button-prev'), null, 'default buttons must not render');
  const css = [
    ...[...(sr.adoptedStyleSheets || [])].flatMap((s) => [...s.cssRules].map((r) => r.cssText)),
    ...[...sr.querySelectorAll('style')].map((s) => s.textContent),
  ].join('\n');
  assert.ok(css.includes('--injected-8224'), 'injectStyles must be applied');
  return container;
});

// Regression: https://github.com/nolimits4web/swiper/issues/8227 — the Vue wrapper invoked the
// default slot in setup() and in the breakpoint callback. Slots compiled without withCtx (JSX,
// plain h() calls) then logged "Slot invoked outside of the render function" on every mount.
// Slots are now only read in render; virtual slides are wired up in onMounted, after the first
// render filled slidesRef, so this also checks that virtual mode still renders the right slides.
await check('Vue wrapper reads slots only in render (no warning, virtual works)', async () => {
  const { createApp, h, nextTick } = await import('vue');
  const { Swiper, SwiperSlide } = await import(dist('swiper-vue.mjs'));
  const { default: Virtual } = await import(dist('modules/virtual.mjs'));
  const flush = async () => {
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 0));
    await nextTick();
  };
  const warnings = [];
  const originalWarn = console.warn;
  console.warn = (...args) => warnings.push(args.map(String).join(' '));
  const host = doc.createElement('div');
  doc.body.appendChild(host);
  let swiper;
  const app = createApp({
    render: () =>
      h(
        Swiper,
        {
          modules: [Virtual],
          virtual: true,
          width: 300,
          slidesPerView: 1,
          onSwiper: (s) => (swiper = s),
        },
        // plain function slot, as @vue/babel-plugin-jsx emits it
        {
          default: () =>
            Array.from({ length: 20 }, (_, i) => h(SwiperSlide, { key: i }, () => `Slide ${i}`)),
        },
      ),
  });
  try {
    app.mount(host);
    await flush();
    const slotWarnings = warnings.filter((w) => w.includes('invoked outside of the render'));
    assert.equal(slotWarnings.length, 0, `no slot warning expected, got ${slotWarnings.length}`);
    assert.equal(swiper.virtual.slides.length, 20, 'virtual must receive all 20 slides');
    swiper.slideTo(10, 0);
    await flush();
    const rendered = [...host.querySelectorAll('.swiper-slide')].map((el) => el.textContent);
    assert.ok(rendered.includes('Slide 10'), `slide 10 must be rendered, got [${rendered}]`);
  } finally {
    console.warn = originalWarn;
    app.unmount();
    host.remove();
  }
});

// Regression: https://github.com/nolimits4web/swiper/issues/8230 — the ResizeObserver callback
// defers to requestAnimationFrame (#5441), so its entry sizes lag one layout behind, while
// onResize() reads the live size into swiper.width. The rAF compared entries against
// swiper.width and skipped every other frame of a continuous resize, painting those frames
// with a stale translate (visible tremor). Entries are now compared against the last handled
// entry size. happy-dom has no layout, so the observer is faked and onResize()'s live read is
// simulated by setting swiper.width one step ahead of the entries.
await check('continuous ResizeObserver resize is handled on every frame', async () => {
  let observerCallback;
  const OriginalResizeObserver = win.ResizeObserver;
  const originalRaf = win.requestAnimationFrame;
  // the module checks window.ResizeObserver but constructs the global one
  const FakeResizeObserver = class {
    constructor(callback) {
      observerCallback = callback;
    }
    observe() {}
    unobserve() {}
  };
  win.ResizeObserver = FakeResizeObserver;
  globalThis.ResizeObserver = FakeResizeObserver;
  win.requestAnimationFrame = (callback) => {
    callback();
    return 1;
  };
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
      </div>
    </div>`;
  doc.body.appendChild(host);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), { width: 800, height: 300 });
  try {
    let resizes = 0;
    swiper.on('resize', () => (resizes += 1));
    const notify = (width) =>
      observerCallback([{ target: swiper.el, contentRect: { width, height: 300 } }]);
    // each frame: the observer reports this frame's size, onResize() already read the next one
    for (const [entryWidth, liveWidth] of [
      [790, 780],
      [780, 770],
      [770, 760],
    ]) {
      notify(entryWidth);
      swiper.width = liveWidth;
    }
    assert.equal(resizes, 3, `every observed size change must resize, got ${resizes}`);
    notify(770);
    assert.equal(resizes, 3, 'an unchanged entry size must not resize again');
  } finally {
    swiper.destroy(true, false);
    host.remove();
    win.ResizeObserver = OriginalResizeObserver;
    globalThis.ResizeObserver = OriginalResizeObserver;
    win.requestAnimationFrame = originalRaf;
  }
});

// slidesPerView: 'auto' + slidesPerGroupAuto: slidePrev pages back so the slide right before the
// active one ends up fully in view, without overshooting it (#8235) and without getting stuck
// when that slide is wider than the viewport. 300px viewport throughout.
async function slidePrevSequence({ widths, start, steps, loop = false }) {
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        ${widths.map((w, i) => `<div class="swiper-slide" style="width:${w}px">${i}</div>`).join('')}
      </div>
    </div>`;
  doc.body.appendChild(host);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), {
    slidesPerView: 'auto',
    slidesPerGroupAuto: true,
    loop,
    width: 300,
    height: 100,
    speed: 0,
  });
  const index = () => (loop ? swiper.realIndex : swiper.activeIndex);
  try {
    swiper.slideTo(start, 0);
    const sequence = [index()];
    for (let i = 0; i < steps; i += 1) {
      swiper.slidePrev(0);
      sequence.push(index());
    }
    return sequence;
  } finally {
    swiper.destroy(true, false);
    host.remove();
  }
}

await check('slidesPerGroupAuto: slidePrev does not skip the previous slide', async () => {
  // 120px slides: two fit fully before slide 4, so prev lands on 2 (not 1, which cuts off 3)
  const sequence = await slidePrevSequence({ widths: Array(6).fill(120), start: 4, steps: 2 });
  assert.deepEqual(sequence, [4, 2, 0]);
});

await check('slidesPerGroupAuto: slidePrev moves past slides wider than the view', async () => {
  const sequence = await slidePrevSequence({ widths: Array(5).fill(400), start: 3, steps: 3 });
  assert.deepEqual(sequence, [3, 2, 1, 0]);
});

await check('slidesPerGroupAuto: slidePrev pages evenly in loop mode', async () => {
  // loopFix must reposition by exactly the number of slides it prepended
  const sequence = await slidePrevSequence({
    widths: Array(8).fill(120),
    start: 4,
    steps: 4,
    loop: true,
  });
  assert.deepEqual(sequence, [4, 2, 0, 6, 4]);
});

// Regression: https://github.com/nolimits4web/swiper/issues/8036 - autoplay start() and stop()
// did not check `swiper.destroyed`, unlike pause(), resume() and run(). Called after destroy()
// (e.g. from a timer that outlives the slider) they threw "Cannot set properties of undefined
// (setting 'running')", and with destroy(false) start() marked the destroyed instance as running.
async function destroyedAutoplay(deleteInstance) {
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">1</div>
        <div class="swiper-slide">2</div>
      </div>
    </div>`;
  doc.body.appendChild(host);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const { default: Autoplay } = await import(dist('modules/autoplay.mjs'));
  const swiper = new Swiper(host.querySelector('.swiper'), {
    modules: [Autoplay],
    autoplay: { delay: 1000 },
  });
  const autoplay = swiper.autoplay;
  assert.equal(autoplay.running, true, 'autoplay must be running before destroy');
  swiper.destroy(deleteInstance, false);
  host.remove();
  assert.equal(autoplay.running, false, 'destroy() must still stop a running autoplay');
  return autoplay;
}

await check('autoplay start()/stop() do not throw after destroy()', async () => {
  const { start, stop } = await destroyedAutoplay(true);
  assert.equal(start(), false);
  assert.equal(stop(), false);
});

await check('autoplay start() does not restart a destroyed instance', async () => {
  const autoplay = await destroyedAutoplay(false);
  assert.equal(autoplay.start(), false);
  assert.equal(autoplay.running, false);
  assert.equal(autoplay.stop(), false);
});

// Regression: https://github.com/nolimits4web/swiper/issues/8246 and
// https://github.com/nolimits4web/swiper/issues/8254 — in cssMode the scroll position is the
// slider's state, and a layout change moves it before the ResizeObserver-driven onResize() runs:
// the browser re-snaps the wrapper onto a slide's new offset (slides sized by CSS, centered slides),
// or clamps it when the track can no longer scroll as far (a slider at the end of its track that
// grows, e.g. a phone turned to landscape). That scroll reached onScroll() first and was read
// against the slide grid from before the change, so activeIndex - or isEnd - named another slide,
// and onResize() re-seated the slider onto it. happy-dom has no layout, scroll snapping or
// clamping, so the container size, the CSS-driven slide sizes and the browser's scroll are
// simulated; `browserScroll` returns where the browser puts the wrapper before onResize() runs.
async function resizeCssModeSlider({
  params,
  slidesSizedByCss = false,
  startIndex = 5,
  fromSize,
  toSize,
  browserScroll,
  observeResize = true,
  meanwhile,
  expect,
}) {
  let observerCallback;
  const OriginalResizeObserver = win.ResizeObserver;
  const originalRaf = win.requestAnimationFrame;
  const FakeResizeObserver = class {
    constructor(callback) {
      observerCallback = callback;
    }
    observe() {}
    unobserve() {}
  };
  win.ResizeObserver = FakeResizeObserver;
  globalThis.ResizeObserver = FakeResizeObserver;
  win.requestAnimationFrame = (callback) => {
    callback();
    return 1;
  };
  const host = doc.createElement('div');
  host.innerHTML = `
    <div class="swiper">
      <div class="swiper-wrapper">
        ${Array.from({ length: 10 }, (_, i) => `<div class="swiper-slide">${i + 1}</div>`).join('')}
      </div>
    </div>`;
  doc.body.appendChild(host);
  const el = host.querySelector('.swiper');
  const slides = [...el.querySelectorAll('.swiper-slide')];
  let containerSize = fromSize;
  const layOut = (size) => {
    containerSize = size;
    // each slide is as wide as the container: through CSS here, through Swiper otherwise
    if (slidesSizedByCss) slides.forEach((slide) => (slide.style.width = `${size}px`));
  };
  for (const prop of ['clientWidth', 'offsetWidth']) {
    Object.defineProperty(el, prop, { configurable: true, get: () => containerSize });
  }
  Object.defineProperty(el, 'clientHeight', { configurable: true, get: () => 300 });
  layOut(fromSize);
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const swiper = new Swiper(el, { cssMode: true, ...params });
  try {
    const { wrapperEl } = swiper;
    // a browser reports every change of the scroll position, and only a change, with a scroll event
    let scrollLeft = wrapperEl.scrollLeft;
    Object.defineProperty(wrapperEl, 'scrollLeft', {
      configurable: true,
      get: () => scrollLeft,
      set: (value) => {
        if (value === scrollLeft) return;
        scrollLeft = value;
        wrapperEl.dispatchEvent(new Event('scroll'));
      },
    });
    const scrollWrapperTo = (offset) => {
      wrapperEl.scrollLeft = offset;
    };
    swiper.slideTo(startIndex, 0);

    layOut(toSize);
    const offset = browserScroll && browserScroll({ swiper, fromSize, toSize });
    if (offset !== undefined) scrollWrapperTo(offset);
    // anything the user or the app does in the frame before onResize() runs
    if (meanwhile) meanwhile({ swiper });
    if (observeResize) {
      observerCallback([{ target: el, contentRect: { width: toSize, height: 300 } }]);
    }

    expect({ swiper, wrapperEl, scrollWrapperTo });
  } finally {
    swiper.destroy(true, false);
    host.remove();
    win.ResizeObserver = OriginalResizeObserver;
    globalThis.ResizeObserver = OriginalResizeObserver;
    win.requestAnimationFrame = originalRaf;
  }
}

const staysOn =
  (index, scrollLeft) =>
  ({ swiper, wrapperEl }) => {
    assert.equal(
      swiper.activeIndex,
      index,
      `resize moved the slider onto slide ${swiper.activeIndex + 1}`,
    );
    assert.ok(
      Math.abs(wrapperEl.scrollLeft - scrollLeft) < 1,
      `resize left the wrapper at ${wrapperEl.scrollLeft}, not on slide ${index + 1} at ${scrollLeft}`,
    );
    assert.ok(
      Math.abs(swiper.translate + wrapperEl.scrollLeft) < 1,
      `translate ${swiper.translate} does not match the wrapper at ${wrapperEl.scrollLeft}`,
    );
  };

for (const [change, fromSize, toSize] of [
  ['shrinks', 400, 200],
  ['grows', 400, 800],
]) {
  await check(`cssMode slidesPerView 'auto' stays on its slide when the container ${change}`, () =>
    resizeCssModeSlider({
      params: { slidesPerView: 'auto' },
      slidesSizedByCss: true,
      fromSize,
      toSize,
      // slides sized by CSS take their new size at once, and the browser re-snaps onto the sixth
      browserScroll: () => 5 * toSize,
      expect: staysOn(5, 5 * toSize),
    }),
  );
}

// Slides Swiper sizes itself keep their old size until onResize() sizes them, so a slider on its
// last slide that grows can no longer scroll as far: the browser clamps the wrapper, which reads as
// an earlier slide against the old grid.
await check('cssMode stays on its last slide when the container grows', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1 },
    startIndex: 9,
    fromSize: 400,
    toSize: 800,
    browserScroll: ({ fromSize, toSize }) => 10 * fromSize - toSize,
    expect: staysOn(9, 9 * 800),
  }),
);

// With more than one slide in view the clamp also clears isEnd, which is what keeps onResize()
// at the end of the track.
await check('cssMode with partial slides stays at the end when the container grows', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1.5 },
    startIndex: 9,
    fromSize: 400,
    toSize: 800,
    browserScroll: ({ fromSize, toSize }) => (10 * fromSize) / 1.5 - toSize,
    expect: ({ swiper, wrapperEl }) => {
      assert.equal(swiper.isEnd, true, 'resize moved the slider off the end of its track');
      assert.ok(
        Math.abs(wrapperEl.scrollLeft + swiper.maxTranslate()) < 1,
        `resize left the wrapper at ${wrapperEl.scrollLeft}, not at the end ${-swiper.maxTranslate()}`,
      );
    },
  }),
);

// Centered slides snap by their center, so the browser re-snaps the sixth slide into the middle of
// the wider container while its old width still stands.
await check('cssMode centered slides stay on their slide when the container grows', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1.5, centeredSlides: true },
    fromSize: 400,
    toSize: 800,
    browserScroll: ({ fromSize, toSize }) => 5.5 * (fromSize / 1.5) - toSize / 2,
    expect: ({ swiper, wrapperEl }) => staysOn(5, swiper.snapGrid[5])({ swiper, wrapperEl }),
  }),
);

// Nothing moves the scroller before onResize() here: Swiper-sized slides away from the end keep
// their offsets until onResize() sizes them, and free mode does not snap.
await check('cssMode slides sized by Swiper stay on their slide across a resize', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1 },
    fromSize: 400,
    toSize: 800,
    expect: staysOn(5, 5 * 800),
  }),
);
await check('cssMode free mode stays on its slide across a resize', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 'auto', freeMode: { enabled: true } },
    slidesSizedByCss: true,
    fromSize: 400,
    toSize: 800,
    expect: staysOn(5, 5 * 800),
  }),
);

// A navigation in that frame - a pagination bullet, an arrow, the app's own slideTo() - is not the
// browser adapting to the layout: onResize() must re-seat the slider onto the slide it asked for.
await check('cssMode keeps a slideTo() made before onResize() runs', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1 },
    fromSize: 400,
    toSize: 800,
    meanwhile: ({ swiper }) => swiper.slideTo(2, 0),
    expect: staysOn(2, 2 * 800),
  }),
);
await check('cssMode keeps a slideNext() made before onResize() runs', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1 },
    fromSize: 400,
    toSize: 800,
    meanwhile: ({ swiper }) => swiper.slideNext(0),
    expect: staysOn(6, 6 * 800),
  }),
);
await check('cssMode keeps a slideTo() made after a clamp, before onResize() runs', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1 },
    startIndex: 9,
    fromSize: 400,
    toSize: 800,
    browserScroll: ({ fromSize, toSize }) => 10 * fromSize - toSize,
    meanwhile: ({ swiper }) => swiper.slideTo(7, 0),
    expect: staysOn(7, 7 * 800),
  }),
);

// A change across the slider - autoHeight fitting the container to the active slide, say - leaves
// the slide grid as it was, so a scroll meanwhile is the user's and is followed at once.
await check('cssMode follows a scroll while the container changes height', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1 },
    fromSize: 400,
    toSize: 400,
    observeResize: false,
    expect: ({ swiper, scrollWrapperTo }) => {
      Object.defineProperty(swiper.el, 'clientHeight', { configurable: true, get: () => 500 });
      scrollWrapperTo(3 * 400);
      assert.equal(swiper.activeIndex, 3, 'the scroll was ignored during a height change');
    },
  }),
);

// Without the ResizeObserver no onResize() follows a container resize, so a scroll after one is
// read as before rather than waiting for a resize that never comes.
await check('cssMode without a ResizeObserver still follows a scroll after a resize', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1, resizeObserver: false },
    fromSize: 400,
    toSize: 800,
    observeResize: false,
    expect: ({ swiper, scrollWrapperTo }) => {
      scrollWrapperTo(3 * 400);
      assert.equal(swiper.activeIndex, 3, 'the scroll was ignored while no resize was coming');
    },
  }),
);

// A padding change alone changes clientWidth but not the content box the ResizeObserver watches,
// so no onResize() follows: the slide grid still stands and a scroll must be read as before.
await check('cssMode follows a scroll after a padding change of a fixed-width container', () =>
  resizeCssModeSlider({
    params: { slidesPerView: 1 },
    fromSize: 400,
    toSize: 400,
    observeResize: false,
    expect: ({ swiper, scrollWrapperTo }) => {
      swiper.el.style.padding = '0 20px';
      Object.defineProperty(swiper.el, 'clientWidth', { configurable: true, get: () => 440 });
      scrollWrapperTo(3 * 400);
      assert.equal(swiper.activeIndex, 3, 'the scroll was ignored after a padding change');
      scrollWrapperTo(4 * 400);
      assert.equal(swiper.activeIndex, 4, 'the scroll was ignored after a padding change');
    },
  }),
);

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
