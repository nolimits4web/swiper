export function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}

export function extend(target, src) {
  Object.keys(src).forEach((key) => {
    if (typeof target[key] === 'undefined') {
      target[key] = src[key];
      return;
    }
    if (target[key] && !src[key]) {
      return;
    }
    if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
      extend(target[key], src[key]);
    } else {
      target[key] = src[key];
    }
  });
}
export function uniqueClasses(classNames = '') {
  const classes = classNames
    .split(' ')
    .map((c) => c.trim())
    .filter((c) => !!c);
  const unique = [];
  classes.forEach((c) => {
    if (unique.indexOf(c) < 0) unique.push(c);
  });
  return unique.join(' ');
}

export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

export const ignoreNgOnChanges = ['pagination', 'navigation', 'scrollbar', 'virtual'];

export function setProperty(val, obj = {}) {
  if (isObject(val)) {
    return val;
  }
  const newValue = coerceBooleanProperty(val);
  if (newValue === true) {
    return obj;
  }
  return newValue;
}
