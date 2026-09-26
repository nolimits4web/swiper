import assert from 'node:assert/strict';

import { Window } from 'happy-dom';

const win = new Window({ url: 'http://localhost/' });
const force = new Set(['Event', 'CustomEvent', 'Node', 'Element', 'HTMLElement', 'ShadowRoot']);
for (const key of Object.getOwnPropertyNames(win)) {
  if (key in globalThis && key !== 'window' && !force.has(key)) continue;
  try {
    globalThis[key] = win[key];
  } catch {
    /* read-only Node globals */
  }
}
globalThis.window = win;
const { default: Swiper } = await import('../../dist/swiper.mjs');

function mount(id, content = '') {
  const el = win.document.createElement('div');
  el.id = id;
  el.className = 'swiper';
  el.innerHTML = `<div class="swiper-wrapper"><div class="swiper-slide">first</div><div class="swiper-slide">${content}</div><div class="swiper-slide">last</div></div>`;
  return el;
}
function pointer(target, type, x) {
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
}
for (const { order, outside } of [
  ['outer', 'middle', 'inner'],
  ['inner', 'middle', 'outer'],
].flatMap((order) => [false, true].map((outside) => ({ order, outside })))) {
  const outer = mount('outer');
  const middle = mount('middle');
  const inner = mount('inner');
  outer.querySelector('.swiper-slide:nth-child(2)').appendChild(middle);
  middle.querySelector('.swiper-slide:nth-child(2)').appendChild(inner);
  win.document.body.appendChild(outer);
  const instances = {};
  for (const id of order)
    instances[id] = new Swiper(win.document.getElementById(id), {
      width: 600,
      height: 300,
      nested: id !== 'outer',
      initialSlide: 1,
      threshold: 0,
      speed: 0,
    });
  for (const expected of [
    [1, 1, 0],
    [1, 0, 0],
    [0, 0, 0],
  ]) {
    const target = inner.querySelector('.swiper-slide');
    pointer(target, 'pointerdown', 100);
    const moveTarget = outside ? win.document.body : target;
    pointer(moveTarget, 'pointermove', 150);
    pointer(moveTarget, 'pointermove', 550);
    pointer(moveTarget, 'pointerup', 550);
    assert.deepEqual(
      ['outer', 'middle', 'inner'].map((id) => instances[id].activeIndex),
      expected,
      `nested edge handoff for ${order}`,
    );
  }
  for (const instance of Object.values(instances)) instance.destroy();
  outer.remove();
}
console.log('Nested pointer ownership passes for both initialization orders.');
win.happyDOM.abort();
