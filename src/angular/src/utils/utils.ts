export function isObject(o: any): boolean {
  return (
    typeof o === 'object' &&
    o !== null &&
    o.constructor &&
    Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  );
}

export function isEnabled(val: boolean | { enabled?: boolean }) {
  return typeof val !== 'undefined' && typeof val !== 'boolean' && val.enabled === true;
}

export function isShowEl(val: any, obj: any, el: any): boolean {
  return (
    (coerceBooleanProperty(val) === true && obj && !obj.el) ||
    !(
      typeof obj !== 'boolean' &&
      obj.el !== el?.nativeElement &&
      (typeof obj.el === 'string' || typeof obj.el === 'object')
    )
  );
}

export function extend(target: any, src: any) {
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  Object.keys(src)
    .filter((key) => noExtend.indexOf(key) < 0)
    .forEach((key) => {
      if (typeof target[key] === 'undefined') {
        target[key] = src[key];
        return;
      }
      if (target[key] && !src[key]) {
        return;
      }
      if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        if (src[key].__swiper__) target[key] = src[key];
        else extend(target[key], src[key]);
      } else {
        target[key] = src[key];
      }
    });
}

export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

export const ignoreNgOnChanges = ['pagination', 'navigation', 'scrollbar', 'virtual'];

export function setProperty(val: any, obj = {}): {} | false {
  if (isObject(val)) {
    return val;
  }

  if (coerceBooleanProperty(val) === true) {
    return obj;
  }

  return false;
}
