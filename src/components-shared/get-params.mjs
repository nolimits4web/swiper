import { isObject, extend } from './utils.mjs';
import { paramsList } from './params-list.mjs';
import defaults from '../core/defaults.mjs';

function getParams(obj = {}) {
  const params = {
    on: {},
  };
  const passedParams = {};
  extend(params, defaults);
  params._emitClasses = true;
  params.init = false;

  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
  const plainObj = Object.assign({}, obj);
  Object.keys(plainObj).forEach((key) => {
    if (typeof obj[key] === 'undefined') return;
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(obj[key])) {
        params[key] = {};
        passedParams[key] = {};
        extend(params[key], obj[key]);
        extend(passedParams[key], obj[key]);
      } else {
        params[key] = obj[key];
        passedParams[key] = obj[key];
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
      params.on[`${key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
    } else {
      rest[key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach((key) => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });

  delete params.touchEventsTarget;

  return { params, passedParams, rest };
}

export { getParams };
