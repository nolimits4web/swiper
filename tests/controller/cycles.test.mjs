import assert from 'node:assert/strict';

import { Window } from 'happy-dom';

const win = new Window({ url: 'http://localhost/' });
const FORCE = new Set(['Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'ShadowRoot']);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !FORCE.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    // Some Node globals are read-only.
  }
}
globalThis.window = win;

const { default: Swiper } = await import('../../dist/swiper-bundle.mjs');

let passed = 0;
let failed = 0;
const mounted = [];
function mount(params = {}) {
  const el = document.createElement('div');
  el.className = 'swiper';
  el.innerHTML =
    '<div class="swiper-wrapper"><div class="swiper-slide">1</div><div class="swiper-slide">2</div><div class="swiper-slide">3</div></div>';
  document.body.appendChild(el);
  const swiper = new Swiper(el, {
    width: 300,
    height: 200,
    speed: 0,
    resizeObserver: false,
    ...params,
  });
  mounted.push(swiper);
  return swiper;
}
function check(label, fn) {
  try {
    fn();
    passed += 1;
    console.log(`  ok  ${label}`);
  } catch (err) {
    failed += 1;
    console.log(`  FAIL  ${label}: ${err.message}`);
  } finally {
    for (const swiper of mounted.splice(0)) {
      if (!swiper.destroyed) swiper.destroy();
    }
    document.body.innerHTML = '';
  }
}
function connect(swipers, topology) {
  swipers.forEach((swiper, i) => {
    const targets =
      topology === 'ring' ? [swipers[(i + 1) % swipers.length]] : swipers.filter((_, j) => i !== j);
    swiper.controller.control = topology === 'ring' ? targets[0] : targets;
  });
}

// Only the immediate sender was excluded, so a third controller could send
// the same update back to the first and recurse until the call stack overflowed.
for (const by of ['slide', 'container']) {
  for (const topology of ['ring', 'mesh']) {
    for (const count of [3, 4]) {
      for (const method of ['setTranslate', 'setTransition']) {
        check(`${method}: ${count}-slider ${topology}, by ${by}`, () => {
          const swipers = Array.from({ length: count }, () => mount({ controller: { by } }));
          connect(swipers, topology);
          const root = swipers[0];
          root[method](method === 'setTranslate' ? -300 : 0);
          swipers.forEach((swiper) => {
            if (method === 'setTranslate') assert.equal(swiper.translate, -300);
            else assert.equal(swiper.wrapperEl.style.transitionDuration, '0ms');
          });
          // Guards must be released when the synchronous propagation finishes.
          root[method](method === 'setTranslate' ? -600 : 150);
          swipers.forEach((swiper) => {
            if (method === 'setTranslate') assert.equal(swiper.translate, -600);
            else assert.equal(swiper.wrapperEl.style.transitionDuration, '150ms');
          });
        });
      }
    }
  }
}

check('slideTo synchronizes a fully connected group in both directions', () => {
  const swipers = [mount(), mount(), mount()];
  connect(swipers, 'mesh');
  swipers[0].slideTo(1, 0);
  assert.deepEqual(
    swipers.map((swiper) => swiper.activeIndex),
    [1, 1, 1],
  );
  swipers[2].slideTo(2, 0);
  assert.deepEqual(
    swipers.map((swiper) => swiper.activeIndex),
    [2, 2, 2],
  );
});

for (const method of ['setTranslate', 'setTransition']) {
  check(`${method}: an exception does not leave a controller blocked`, () => {
    const swipers = [mount(), mount(), mount()];
    connect(swipers, 'mesh');
    const expected = new Error('listener failed');
    const fail = () => {
      throw expected;
    };
    swipers[1].on(method, fail);
    assert.throws(() => swipers[0][method](method === 'setTranslate' ? -300 : 0), expected);
    swipers[1].off(method, fail);
    swipers[2][method](method === 'setTranslate' ? -600 : 150);
    swipers.forEach((swiper) => {
      if (method === 'setTranslate') assert.equal(swiper.translate, -600);
      else assert.equal(swiper.wrapperEl.style.transitionDuration, '150ms');
    });
  });
}

for (const method of ['setTranslate', 'setTransition']) {
  check(`${method}: a fully connected group updates every slider once`, () => {
    const swipers = Array.from({ length: 6 }, () => mount());
    connect(swipers, 'mesh');
    const calls = swipers.map(() => 0);
    swipers.forEach((swiper, i) =>
      swiper.on(method, () => {
        calls[i] += 1;
      }),
    );
    swipers[0][method](method === 'setTranslate' ? -300 : 0);
    // Once per slider, not once per path from the first one (65 each for six sliders)
    assert.deepEqual(calls, [1, 1, 1, 1, 1, 1]);
  });
}

for (const method of ['setTranslate', 'setTransition']) {
  check(`${method}: an independent group can update from a listener`, () => {
    const swipers = Array.from({ length: 6 }, () => mount());
    connect(swipers.slice(0, 3), 'mesh');
    connect(swipers.slice(3), 'mesh');
    let nested = false;
    swipers[1].on(method, () => {
      if (nested) return;
      nested = true;
      swipers[3][method](method === 'setTranslate' ? -600 : 150);
    });
    const calls = swipers.map(() => 0);
    swipers.forEach((swiper, i) =>
      swiper.on(method, () => {
        calls[i] += 1;
      }),
    );
    swipers[0][method](method === 'setTranslate' ? -300 : 0);
    assert.equal(nested, true);
    assert.deepEqual(calls, [1, 1, 1, 1, 1, 1]);
    swipers.slice(3).forEach((swiper) => {
      if (method === 'setTranslate') assert.equal(swiper.translate, -600);
      else assert.equal(swiper.wrapperEl.style.transitionDuration, '150ms');
    });
  });
}

check('two-way inverse controllers still synchronize', () => {
  const a = mount({ controller: { inverse: true } });
  const b = mount({ controller: { inverse: true } });
  a.controller.control = b;
  b.controller.control = a;
  a.setTranslate(-150);
  assert.equal(a.translate, -150);
  assert.equal(b.translate, -450);
});

check('translation and transition propagation have separate guards', () => {
  const swipers = [mount(), mount(), mount()];
  connect(swipers, 'mesh');
  let nested = false;
  swipers[1].on('setTranslate', () => {
    if (nested) return;
    nested = true;
    swipers[1].setTransition(150);
  });
  swipers[0].setTranslate(-300);
  assert.equal(nested, true);
  swipers.forEach((swiper) => {
    assert.equal(swiper.translate, -300);
    assert.equal(swiper.wrapperEl.style.transitionDuration, '150ms');
  });
});

// Groups without a cycle: a slider reached through two paths is still updated once.

check(
  'diamond: a slider reached through two paths is updated once, with correct active index and classes',
  () => {
    const [a, b, c, d] = [mount(), mount(), mount(), mount()];
    a.controller.control = [b, c];
    b.controller.control = d;
    c.controller.control = d;
    const events = [];
    d.on('setTranslate', () => events.push('setTranslate'));
    a.slideTo(2, 0);
    assert.equal(events.length, 1);
    assert.equal(d.activeIndex, 2);
    assert.ok(d.slides[2].classList.contains('swiper-slide-active'));
  },
);

check('reentrant navigation during a cascade still refreshes the whole group, as on master', () => {
  const [a, b, c] = [mount(), mount(), mount()];
  a.controller.control = b;
  b.controller.control = c;
  let reentered = false;
  b.on('setTranslate', () => {
    if (reentered) return;
    reentered = true;
    a.setTranslate(-999);
  });
  a.setTranslate(-300);
  assert.equal(a.translate, -999);
  assert.equal(b.translate, -999);
  assert.equal(c.translate, -999);
});

check(
  'reentrant navigation from the deepest slider still refreshes the whole group, as on master',
  () => {
    const [a, b, c] = [mount(), mount(), mount()];
    a.controller.control = b;
    b.controller.control = c;
    let reentered = false;
    c.on('setTranslate', () => {
      if (reentered) return;
      reentered = true;
      a.setTranslate(-999);
    });
    a.setTranslate(-300);
    assert.equal(a.translate, -999);
    assert.equal(b.translate, -999);
    assert.equal(c.translate, -999);
  },
);

check('conflicting paths: the first path to reach a slider wins', () => {
  const [a, b, c, d] = [mount(), mount({ controller: { inverse: true } }), mount(), mount()];
  a.controller.control = [b, c];
  b.controller.control = d;
  c.controller.control = d;
  a.setTranslate(-150);
  assert.equal(d.translate, -450);

  const [a2, b2, c2, d2] = [mount(), mount({ controller: { inverse: true } }), mount(), mount()];
  a2.controller.control = [c2, b2];
  b2.controller.control = d2;
  c2.controller.control = d2;
  a2.setTranslate(-150);
  assert.equal(d2.translate, -150);
});

check('a controller destroyed mid-cascade is skipped and the rest stay usable', () => {
  const [a, b, c] = [mount(), mount(), mount()];
  a.controller.control = [b, c];
  b.controller.control = c;
  b.on('setTranslate', () => {
    if (!c.destroyed) c.destroy();
  });
  a.setTranslate(-300);
  assert.equal(c.destroyed, true);
  assert.equal(a.translate, -300);
  assert.equal(b.translate, -300);
  a.setTranslate(-600);
  assert.equal(b.translate, -600);
});

console.log(`\n${passed} passed, ${failed} failed\n`);
win.happyDOM.abort();
process.exit(failed === 0 ? 0 : 1);
