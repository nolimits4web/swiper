import type { SwiperOptions } from '../core/core';

interface SwiperLikeFlag {
  __swiper__?: true;
}

export function isObject(o: unknown): o is Record<string, unknown> {
  if (typeof o !== 'object' || o === null) return false;
  const obj = o as Record<string, unknown> & SwiperLikeFlag;
  return (
    !!obj.constructor &&
    Object.prototype.toString.call(obj).slice(8, -1) === 'Object' &&
    !obj.__swiper__
  );
}

export function extend<T extends object, S extends object>(target: T, src: S): T & S {
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  const t = target as Record<string, unknown>;
  const s = src as Record<string, unknown>;
  Object.keys(s)
    .filter((key) => noExtend.indexOf(key) < 0)
    .forEach((key) => {
      const srcVal = s[key];
      const targetVal = t[key];
      if (typeof targetVal === 'undefined') {
        t[key] = srcVal;
      } else if (isObject(srcVal) && isObject(targetVal) && Object.keys(srcVal).length > 0) {
        if ((srcVal as SwiperLikeFlag).__swiper__) {
          t[key] = srcVal;
        } else {
          extend(targetVal, srcVal);
        }
      } else {
        t[key] = srcVal;
      }
    });
  return target as T & S;
}

type ParamsLike = Partial<Pick<SwiperOptions, 'navigation' | 'pagination' | 'scrollbar'>>;

export function needsNavigation(params: ParamsLike = {}): boolean {
  const nav = params.navigation;
  if (!nav) return false;
  if (nav === true) return true;
  return typeof nav.nextEl === 'undefined' && typeof nav.prevEl === 'undefined';
}

export function needsPagination(params: ParamsLike = {}): boolean {
  const pag = params.pagination;
  if (!pag) return false;
  if (pag === true) return true;
  return typeof pag.el === 'undefined';
}

export function needsScrollbar(params: ParamsLike = {}): boolean {
  const sb = params.scrollbar;
  if (!sb) return false;
  if (sb === true) return true;
  return typeof sb.el === 'undefined';
}

export function uniqueClasses(classNames = ''): string {
  const classes = classNames
    .split(' ')
    .map((c) => c.trim())
    .filter((c) => !!c);
  const unique: string[] = [];
  classes.forEach((c) => {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(' ');
}

export function attrToProp(attrName = ''): string {
  return attrName.replace(/-[a-z]/g, (l) => l.toUpperCase().replace('-', ''));
}

export function wrapperClass(className = ''): string {
  if (!className) return 'swiper-wrapper';
  if (!className.includes('swiper-wrapper')) return `swiper-wrapper ${className}`;
  return className;
}
