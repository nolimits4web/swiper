// eslint-disable-next-line
import { isObject, extend } from './utils';
import { paramsList } from './params-list';
import { SwiperOptions } from 'build/swiper';
import Swiper from 'build/core';

function getParams(obj = {}) {
  const params: SwiperOptions = {
    on: {},
  };
  const passedParams = {};
  extend(params, Swiper.defaults);
  extend(params, Swiper.extendedDefaults);
  params._emitClasses = true;

  const rest = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
  Object.keys(obj).forEach((key) => {
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

  return { params, passedParams, rest };
}

export { getParams };
