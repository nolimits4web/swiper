import { getDocument, getWindow } from 'ssr-window';

function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
      // no getter for object
    }
    try {
      delete object[key];
    } catch (e) {
      // something got wrong
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle(el) {
  const window = getWindow();
  let style;
  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }

  return style;
}
function getTranslate(el, axis = 'x') {
  const window = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;

  const curStyle = getComputedStyle(el, null);

  if (window.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(',').length > 6) {
      curTransform = curTransform
        .split(', ')
        .map((a) => a.replace(',', '.'))
        .join(', ');
    }
    // Some old versions of Webkit choke when 'none' is passed; pass
    // empty string instead in this case
    transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
  } else {
    transformMatrix =
      curStyle.MozTransform ||
      curStyle.OTransform ||
      curStyle.MsTransform ||
      curStyle.msTransform ||
      curStyle.transform ||
      curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
    matrix = transformMatrix.toString().split(',');
  }

  if (axis === 'x') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === 'y') {
    // Latest Chrome and webkits Fix
    if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    // Crazy IE10 Matrix
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    // Normal Browsers
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject(o) {
  return (
    typeof o === 'object' &&
    o !== null &&
    o.constructor &&
    Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  );
}
function extend(...args) {
  const to = Object(args[0]);
  const noExtend = ['__proto__', 'constructor', 'prototype'];
  // eslint-disable-next-line
  const HTMLElement = typeof window !== 'undefined' ? window.HTMLElement : undefined;
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (
      nextSource !== undefined &&
      nextSource !== null &&
      !(HTMLElement && nextSource instanceof HTMLElement)
    ) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}

function bindModuleMethods(instance, obj) {
  Object.keys(obj).forEach((key) => {
    if (isObject(obj[key])) {
      Object.keys(obj[key]).forEach((subKey) => {
        if (typeof obj[key][subKey] === 'function') {
          obj[key][subKey] = obj[key][subKey].bind(instance);
        }
      });
    }
    instance[key] = obj[key];
  });
}

function classesToSelector(classes = '') {
  return `.${classes
    .trim()
    .replace(/([\.:\/])/g, '\\$1') // eslint-disable-line
    .replace(/ /g, '.')}`;
}

function createElementIfNotDefined($container, params, createElements, checkProps) {
  const document = getDocument();
  if (createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        const element = document.createElement('div');
        element.className = checkProps[key];
        $container.append(element);
        params[key] = element;
      }
    });
  }
  return params;
}

export {
  deleteProps,
  nextTick,
  now,
  getTranslate,
  isObject,
  extend,
  bindModuleMethods,
  getComputedStyle,
  classesToSelector,
  createElementIfNotDefined,
};
