// eslint-disable-next-line
import { isObject, extend } from './utils';
import { paramsList } from './params-list';
// @ts-ignore
import Swiper from 'swiper';

export const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
export function getParams(obj: any = {}) {
  const params: any = {
    on: {},
  };
  const events = {};
  const passedParams = {};
  extend(params, Swiper.defaults);
  extend(params, Swiper.extendedDefaults);
  params._emitClasses = true;
  params.init = false;

  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
  Object.keys(obj).forEach((key) => {
    const _key = key.replace(/^_/, '');
    if (allowedParams.indexOf(_key) >= 0) {
      if (isObject(obj[key])) {
        params[_key] = {};
        passedParams[_key] = {};
        extend(params[_key], obj[key]);
        extend(passedParams[_key], obj[key]);
      } else {
        params[_key] = obj[key];
        passedParams[_key] = obj[key];
      }
    }
    // else if (key.search(/on[A-Z]/) === 0 && typeof obj[key] === 'function') {
    //   events[`${_key[2].toLowerCase()}${key.substr(3)}`] = obj[key];
    // }
    else {
      rest[_key] = obj[key];
    }
  });
  ['navigation', 'pagination', 'scrollbar'].forEach((key) => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });

  return { params, passedParams, rest };
}
