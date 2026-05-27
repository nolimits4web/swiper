import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

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

// Public Swiper instance methods that must stay on Swiper.prototype across versions.
// Anything here is documented user-facing API. Removing a name = breaking change.
const REQUIRED_SWIPER_METHODS = [
  'init',
  'destroy',
  'update',
  'updateSize',
  'updateSlides',
  'updateProgress',
  'updateSlidesClasses',
  'updateActiveIndex',
  'updateAutoHeight',
  'changeDirection',
  'changeLanguageDirection',
  'slideNext',
  'slidePrev',
  'slideTo',
  'slideToLoop',
  'slideReset',
  'slideToClickedSlide',
  'slideToClosest',
  'translateTo',
  'getTranslate',
  'setTranslate',
  'setTransition',
  'setProgress',
  'on',
  'once',
  'off',
  'onAny',
  'offAny',
  'emit',
  'enable',
  'disable',
  'attachEvents',
  'detachEvents',
  'mount',
  'addClasses',
  'removeClasses',
  'getSlideIndex',
  'getSlideIndexByData',
  'loopCreate',
  'loopDestroy',
  'loopFix',
  'minTranslate',
  'maxTranslate',
];

const REQUIRED_SWIPER_STATICS = ['use', 'installModule', 'extendDefaults'];

// Module exports from `swiper/modules`. Order doesn't matter, presence does.
const REQUIRED_MODULES = [
  'A11y',
  'Autoplay',
  'Controller',
  'EffectCards',
  'EffectCoverflow',
  'EffectCreative',
  'EffectCube',
  'EffectFade',
  'EffectFlip',
  'FreeMode',
  'Grid',
  'HashNavigation',
  'History',
  'Keyboard',
  'Manipulation',
  'Mousewheel',
  'Navigation',
  'Pagination',
  'Parallax',
  'Scrollbar',
  'Thumbs',
  'Virtual',
  'Zoom',
];

// Required entries in dist/package.json exports map.
const REQUIRED_EXPORT_KEYS = [
  '.',
  './bundle',
  './core',
  './effect-utils',
  './css',
  './css/bundle',
  './element',
  './element/bundle',
  './modules',
  './react',
  './vue',
];

console.log('\nSwiper dist contract test\n');

await check('swiper.mjs loads and exports default Swiper class', async () => {
  const mod = await import(path.join(distDir, 'swiper.mjs'));
  assert.equal(typeof mod.default, 'function', 'default export must be a function/class');
  assert.equal(typeof mod.Swiper, 'function', 'named Swiper export must be a function/class');
  assert.equal(mod.default, mod.Swiper, 'default and named must be the same reference');
});

await check('swiper-bundle.mjs loads and exports default Swiper class', async () => {
  const mod = await import(path.join(distDir, 'swiper-bundle.mjs'));
  assert.equal(typeof mod.default, 'function');
  assert.equal(typeof mod.Swiper, 'function');
});

await check('Swiper.prototype carries every documented public method', async () => {
  const { default: Swiper } = await import(path.join(distDir, 'swiper.mjs'));
  const missing = REQUIRED_SWIPER_METHODS.filter(
    (name) => typeof Swiper.prototype[name] !== 'function',
  );
  assert.equal(missing.length, 0, `Missing prototype methods: ${missing.join(', ')}`);
});

await check('Swiper class exposes required static methods', async () => {
  const { default: Swiper } = await import(path.join(distDir, 'swiper.mjs'));
  const missing = REQUIRED_SWIPER_STATICS.filter((name) => typeof Swiper[name] !== 'function');
  assert.equal(missing.length, 0, `Missing statics: ${missing.join(', ')}`);
});

await check('swiper/modules entry exports every documented module', async () => {
  const mod = await import(path.join(distDir, 'modules', 'index.mjs'));
  const missing = REQUIRED_MODULES.filter((name) => typeof mod[name] !== 'function');
  assert.equal(missing.length, 0, `Missing module exports: ${missing.join(', ')}`);
});

await check('Each module ships as its own .mjs file', async () => {
  const expectedFiles = [
    'a11y',
    'autoplay',
    'controller',
    'effect-cards',
    'effect-coverflow',
    'effect-creative',
    'effect-cube',
    'effect-fade',
    'effect-flip',
    'free-mode',
    'grid',
    'hash-navigation',
    'history',
    'keyboard',
    'manipulation',
    'mousewheel',
    'navigation',
    'pagination',
    'parallax',
    'scrollbar',
    'thumbs',
    'virtual',
    'zoom',
  ];
  const missing = expectedFiles.filter(
    (name) => !fs.existsSync(path.join(distDir, 'modules', `${name}.mjs`)),
  );
  assert.equal(missing.length, 0, `Missing module files: ${missing.join(', ')}`);
});

await check('swiper-effect-utils.mjs is reachable', async () => {
  const mod = await import(path.join(distDir, 'swiper-effect-utils.mjs'));
  assert.ok(mod, 'effect-utils must load');
});

await check('dist/package.json declares every required exports key', async () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(distDir, 'package.json'), 'utf-8'));
  assert.ok(pkg.exports, 'exports map must exist');
  const missing = REQUIRED_EXPORT_KEYS.filter((k) => !(k in pkg.exports));
  assert.equal(missing.length, 0, `Missing exports keys: ${missing.join(', ')}`);
});

await check('Element + framework entry files exist', async () => {
  for (const name of ['swiper-element.mjs', 'swiper-react.mjs', 'swiper-vue.mjs']) {
    assert.ok(fs.existsSync(path.join(distDir, name)), `${name} missing`);
  }
});

await check('Core CSS files exist', async () => {
  for (const name of ['swiper.css', 'swiper-bundle.css']) {
    assert.ok(fs.existsSync(path.join(distDir, name)), `${name} missing`);
  }
});

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
