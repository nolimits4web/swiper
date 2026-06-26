// Runtime SSR smoke test — runs in pure Node.js with no DOM (window/document undefined).
//
// Swiper v14 dropped the `ssr-window` dependency in favor of inline `typeof` guards.
// This guards against the regression that reintroduced unguarded `document` / `HTMLElement`
// references on the instantiation path (see core.ts constructor + mount, virtual.ts init).
// The other test suites are type-level only and cannot catch a runtime SSR throw.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderToString as renderVue } from '@vue/server-renderer';
import React from 'react';
import { renderToString as renderReact } from 'react-dom/server';
import { createSSRApp, h } from 'vue';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', '..', 'dist');
const dist = (p) => path.join(distDir, p);

if (!fs.existsSync(distDir)) {
  console.error('dist/ missing — run `npm run build:prod` first.');
  process.exit(1);
}

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

console.log('\nSwiper SSR runtime test (pure Node, no DOM)\n');

// The whole point of this file is to run where there is no DOM. If a future Node version
// (or a test harness) starts defining these globals, the assertions below stop being meaningful.
await check('environment really has no DOM', async () => {
  assert.equal(
    typeof window,
    'undefined',
    'window must be undefined for this test to be meaningful',
  );
  assert.equal(
    typeof document,
    'undefined',
    'document must be undefined for this test to be meaningful',
  );
});

// 1. Bare imports must not throw at module-eval time.
await check('bare imports do not throw', async () => {
  for (const file of [
    'swiper.mjs',
    'swiper-bundle.mjs',
    'modules/index.mjs',
    'swiper-element.mjs',
    'swiper-react.mjs',
    'swiper-vue.mjs',
  ]) {
    await import(dist(file));
  }
});

// 2. Instantiating in a non-DOM env must not throw — it should gracefully no-op
//    (mount() returns false, so the instance is created but never initialized).
await check('new Swiper() forms do not throw and no-op gracefully', async () => {
  const { default: Swiper } = await import(dist('swiper.mjs'));
  for (const make of [
    () => new Swiper(),
    () => new Swiper({}),
    () => new Swiper('.does-not-exist'),
    () => new Swiper('.x', { slidesPerView: 3, loop: true }),
  ]) {
    const swiper = make();
    assert.ok(swiper, 'constructor must return an instance');
    assert.ok(!swiper.initialized, 'instance must not be initialized without a DOM');
  }
});

// 3. The bundle auto-registers every module; constructing it runs each module's init code.
//    This is the path that previously threw via Virtual's eager document.createElement.
await check('new Swiper() from swiper/bundle (all modules) does not throw', async () => {
  const { default: Swiper } = await import(dist('swiper-bundle.mjs'));
  const swiper = new Swiper('.x', {
    navigation: { nextEl: '.next', prevEl: '.prev' },
    pagination: { el: '.pg' },
    scrollbar: { el: '.sb' },
    autoplay: { delay: 3000 },
    virtual: { enabled: true, slides: ['a', 'b', 'c'] },
    zoom: true,
  });
  assert.ok(!swiper.initialized);
});

// 4. No module may touch the DOM during its init (constructor) phase. Guards every module,
//    not just the ones the bundle config above happens to enable.
await check('no module touches the DOM during init', async () => {
  const { default: Swiper } = await import(dist('swiper.mjs'));
  const modules = await import(dist('modules/index.mjs'));
  const offenders = [];
  for (const [name, Mod] of Object.entries(modules)) {
    if (typeof Mod !== 'function') continue;
    try {
      new Swiper({ modules: [Mod], init: false });
    } catch (err) {
      offenders.push(`${name} (${err.message})`);
    }
  }
  assert.equal(offenders.length, 0, `Modules throwing at init: ${offenders.join(', ')}`);
});

// 5. React wrapper server-rendering (the real Next.js scenario).
await check('React <Swiper> renders to string', async () => {
  const { Swiper, SwiperSlide } = await import(dist('swiper-react.mjs'));
  const html = renderReact(
    React.createElement(
      Swiper,
      { slidesPerView: 3 },
      React.createElement(SwiperSlide, null, 'Slide 1'),
      React.createElement(SwiperSlide, null, 'Slide 2'),
    ),
  );
  assert.match(html, /swiper-wrapper/, 'output should contain swiper-wrapper markup');
  assert.match(html, /Slide 1/);
});

// 6. Vue wrapper server-rendering.
await check('Vue <Swiper> renders to string', async () => {
  const { Swiper, SwiperSlide } = await import(dist('swiper-vue.mjs'));
  const app = createSSRApp({
    render: () =>
      h(
        Swiper,
        { slidesPerView: 3 },
        {
          default: () => [
            h(SwiperSlide, {}, { default: () => 'Slide 1' }),
            h(SwiperSlide, {}, { default: () => 'Slide 2' }),
          ],
        },
      ),
  });
  app.config.warnHandler = () => {}; // smoke test only cares about throw + markup, not Vue dev warnings
  const html = await renderVue(app);
  assert.match(html, /swiper/, 'output should contain swiper markup');
  assert.match(html, /Slide 1/);
});

// 7. Web component register() must be a safe no-op on the server.
await check('swiper-element register() is a no-op on the server', async () => {
  const { register } = await import(dist('swiper-element-bundle.mjs'));
  register();
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
