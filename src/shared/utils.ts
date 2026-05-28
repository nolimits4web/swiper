/* eslint no-param-reassign: "off" */
import classesToTokens from './classes-to-tokens';

export function deleteProps(obj: Record<string, unknown>): void {
  Object.keys(obj).forEach((key) => {
    try {
      obj[key] = null;
    } catch {
      // no getter for object
    }
    try {
      delete obj[key];
    } catch {
      // something got wrong
    }
  });
}

export function nextTick(callback: () => void, delay = 0): ReturnType<typeof setTimeout> {
  return setTimeout(callback, delay);
}

export function now(): number {
  return Date.now();
}

export function getComputedStyle(el: Element): CSSStyleDeclaration {
  return window.getComputedStyle(el, null);
}

export function getTranslate(el: Element, axis: 'x' | 'y' = 'x'): number {
  const style = getComputedStyle(el);
  const transform = style.transform || style.webkitTransform;
  if (!transform || transform === 'none') return 0;
  const matrix = new DOMMatrixReadOnly(transform);
  return axis === 'x' ? matrix.m41 : matrix.m42;
}

export function isObject(o: unknown): o is Record<string, unknown> {
  return (
    typeof o === 'object' &&
    o !== null &&
    (o as object).constructor === Object &&
    Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  );
}

function isNode(node: unknown): boolean {
  if (typeof HTMLElement !== 'undefined' && node instanceof HTMLElement) return true;
  return (
    !!node &&
    typeof node === 'object' &&
    ((node as Node).nodeType === 1 || (node as Node).nodeType === 11)
  );
}

type SwiperBranded = { __swiper__?: unknown };

export function extend<T extends object>(target: T, ...sources: unknown[]): T {
  const to = Object(target) as Record<string, unknown>;
  for (let i = 0; i < sources.length; i += 1) {
    const nextSource = sources[i];
    if (nextSource === undefined || nextSource === null || isNode(nextSource)) continue;
    const sourceObj = nextSource as Record<string, unknown>;
    const keysArray = Object.keys(Object(sourceObj)).filter(
      (key) => key !== '__proto__' && key !== 'constructor' && key !== 'prototype',
    );
    for (const nextKey of keysArray) {
      const desc = Object.getOwnPropertyDescriptor(sourceObj, nextKey);
      if (!desc || !desc.enumerable) continue;
      const sourceVal = sourceObj[nextKey];
      if (isObject(to[nextKey]) && isObject(sourceVal)) {
        if ((sourceVal as SwiperBranded).__swiper__) {
          to[nextKey] = sourceVal;
        } else {
          extend(to[nextKey] as object, sourceVal);
        }
      } else if (!isObject(to[nextKey]) && isObject(sourceVal)) {
        to[nextKey] = {};
        if ((sourceVal as SwiperBranded).__swiper__) {
          to[nextKey] = sourceVal;
        } else {
          extend(to[nextKey] as object, sourceVal);
        }
      } else {
        to[nextKey] = sourceVal;
      }
    }
  }
  return to as T;
}

export function setCSSProperty(el: HTMLElement, varName: string, varValue: string): void {
  el.style.setProperty(varName, varValue);
}

export function getSlideTransformEl(slideEl: HTMLElement): HTMLElement {
  const direct = slideEl.querySelector<HTMLElement>('.swiper-slide-transform');
  if (direct) return direct;
  if (slideEl.shadowRoot) {
    const shadowed = slideEl.shadowRoot.querySelector<HTMLElement>('.swiper-slide-transform');
    if (shadowed) return shadowed;
  }
  return slideEl;
}

export function findElementsInElements(elements: Element[] = [], selector = ''): Element[] {
  return elements.flatMap((el) => [...el.querySelectorAll(selector)]);
}

export function elementChildren(element: Element, selector = ''): Element[] {
  const children: Element[] = [...element.children];
  if (element instanceof HTMLSlotElement) {
    children.push(...(element.assignedElements() as Element[]));
  }
  return selector ? children.filter((el) => el.matches(selector)) : children;
}

function elementIsChildOfSlot(el: Element, slot: Element): boolean {
  const queue: Element[] = [slot];
  while (queue.length > 0) {
    const cur = queue.shift()!;
    if (el === cur) return true;
    queue.push(
      ...cur.children,
      ...(cur.shadowRoot ? cur.shadowRoot.children : []),
      ...((cur as HTMLSlotElement).assignedElements
        ? (cur as HTMLSlotElement).assignedElements()
        : []),
    );
  }
  return false;
}

export function elementIsChildOf(el: Element, parent: Element): boolean {
  let isChild = parent.contains(el);
  if (!isChild && parent instanceof HTMLSlotElement) {
    const children = [...parent.assignedElements()];
    isChild = children.includes(el);
    if (!isChild) isChild = elementIsChildOfSlot(el, parent);
  }
  return isChild;
}

export function showWarning(text: string): void {
  try {
    console.warn(text);
  } catch {
    // err
  }
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classes?: string | string[],
): HTMLElementTagNameMap[K];
export function createElement(tag: string, classes?: string | string[]): HTMLElement;
export function createElement(tag: string, classes: string | string[] = []): HTMLElement {
  const el = document.createElement(tag);
  el.classList.add(...(Array.isArray(classes) ? classes : classesToTokens(classes)));
  return el;
}

export function elementOffset(el: Element): { top: number; left: number } {
  const box = el.getBoundingClientRect();
  return {
    top: box.top + window.scrollY - (el.clientTop || 0),
    left: box.left + window.scrollX - (el.clientLeft || 0),
  };
}

export function elementPrevAll(el: Element, selector?: string): Element[] {
  const prevEls: Element[] = [];
  let prev = el.previousElementSibling;
  while (prev) {
    if (!selector || prev.matches(selector)) prevEls.push(prev);
    prev = prev.previousElementSibling;
  }
  return prevEls;
}

export function elementNextAll(el: Element, selector?: string): Element[] {
  const nextEls: Element[] = [];
  let next = el.nextElementSibling;
  while (next) {
    if (!selector || next.matches(selector)) nextEls.push(next);
    next = next.nextElementSibling;
  }
  return nextEls;
}

export function elementStyle(el: Element, prop: string): string {
  return window.getComputedStyle(el, null).getPropertyValue(prop);
}

export function elementIndex(el: Element): number | undefined {
  if (!el || !el.parentNode) return undefined;
  return [...el.parentNode.children].indexOf(el);
}

export function elementParents(el: Element, selector?: string): Element[] {
  const parents: Element[] = [];
  let parent = el.parentElement;
  while (parent) {
    if (!selector || parent.matches(selector)) parents.push(parent);
    parent = parent.parentElement;
  }
  return parents;
}

export function elementTransitionEnd(el: Element, callback?: (e: TransitionEvent) => void): void {
  if (!callback) return;
  el.addEventListener(
    'transitionend',
    function fireCallBack(this: Element, e: Event) {
      if (e.target !== el) return;
      callback.call(el, e as TransitionEvent);
    },
    { once: true },
  );
}

export function elementOuterSize(
  el: HTMLElement,
  size: 'width' | 'height',
  includeMargins?: boolean,
): number {
  if (includeMargins) {
    const style = window.getComputedStyle(el, null);
    return (
      el[size === 'width' ? 'offsetWidth' : 'offsetHeight'] +
      parseFloat(style.getPropertyValue(size === 'width' ? 'margin-right' : 'margin-top')) +
      parseFloat(style.getPropertyValue(size === 'width' ? 'margin-left' : 'margin-bottom'))
    );
  }
  return el.offsetWidth;
}

export function makeElementsArray<T>(el: T | T[]): NonNullable<T>[] {
  return (Array.isArray(el) ? el : [el]).filter((e): e is NonNullable<T> => !!e);
}

export function getRotateFix(swiper: { browser?: { need3dFix?: boolean } }) {
  return (v: number): number => {
    if (Math.abs(v) > 0 && swiper.browser && swiper.browser.need3dFix && Math.abs(v) % 90 === 0) {
      return v + 0.001;
    }
    return v;
  };
}

interface TrustedTypePolicy {
  createHTML: (s: string) => string;
}
interface TrustedTypePolicyFactory {
  createPolicy: (name: string, rules: { createHTML: (s: string) => string }) => TrustedTypePolicy;
}

export function setInnerHTML(el: Element, html = ''): void {
  const tt = (globalThis as { trustedTypes?: TrustedTypePolicyFactory }).trustedTypes;
  if (typeof tt !== 'undefined') {
    el.innerHTML = tt.createPolicy('html', { createHTML: (s: string) => s }).createHTML(html);
  } else {
    el.innerHTML = html;
  }
}
