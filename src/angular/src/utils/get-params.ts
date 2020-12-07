// eslint-disable-next-line
import { isObject, extend } from './utils';
import { paramsList } from './params-list';
import { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper/core';

export const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
export function getParams(obj = {}) {
  const params: SwiperOptions = {
    on: {},
  };
  const passedParams = {};
  extend(params, Swiper.defaults);
  extend(params, Swiper.extendedDefaults);
  params._emitClasses = true;

  const rest = {};
  Object.keys(obj).forEach((key) => {
    const _key = key.replace(/^_/, '');
    if (typeof obj[_key] === 'undefined') return;
    if (allowedParams.indexOf(_key) >= 0) {
      if (isObject(obj[_key])) {
        params[_key] = {};
        passedParams[_key] = {};
        extend(params[_key], obj[_key]);
        extend(passedParams[_key], obj[_key]);
      } else {
        params[_key] = obj[_key];
        passedParams[_key] = obj[_key];
      }
    } else {
      rest[_key] = obj[_key];
    }
  });

  return { params, passedParams, rest };
}
