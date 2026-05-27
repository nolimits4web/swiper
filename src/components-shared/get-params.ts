import { isObject, extend } from './utils';
import { paramsList } from './params-list';
import defaults from '../core/defaults';
import type { SwiperOptions, SwiperEvents, SwiperEventHandler } from '../core/core';

export type SwiperEventsMap = {
  [E in keyof SwiperEvents]?: SwiperEvents[E];
};

export interface SwiperParamsFromUser extends SwiperOptions {
  on: SwiperEventsMap;
  _emitClasses?: boolean;
  init?: boolean;
}

export interface GetParamsResult {
  params: SwiperParamsFromUser;
  passedParams: Record<string, unknown>;
  rest: Record<string, unknown>;
  events: Record<string, SwiperEventHandler>;
}

export function getParams(obj: Record<string, unknown> = {}, splitEvents = true): GetParamsResult {
  // Build the params object as a loose Record so dynamic key writes are well-typed,
  // then return it under its precise public shape.
  const params: Record<string, unknown> = { on: {} };
  const events: Record<string, SwiperEventHandler> = {};
  const passedParams: Record<string, unknown> = {};
  extend(params, defaults);
  params._emitClasses = true;
  params.init = false;

  const rest: Record<string, unknown> = {};
  const allowedParams = paramsList.map((key) => key.replace(/_/, ''));
  const plainObj = { ...obj };
  Object.keys(plainObj).forEach((key) => {
    const value = obj[key];
    if (typeof value === 'undefined') return;
    if (allowedParams.indexOf(key) >= 0) {
      if (isObject(value)) {
        params[key] = {};
        passedParams[key] = {};
        extend(params[key] as Record<string, unknown>, value);
        extend(passedParams[key] as Record<string, unknown>, value);
      } else {
        params[key] = value;
        passedParams[key] = value;
      }
    } else if (key.search(/on[A-Z]/) === 0 && typeof value === 'function') {
      const eventName = `${key[2]!.toLowerCase()}${key.substring(3)}`;
      const handler = value as SwiperEventHandler;
      if (splitEvents) {
        events[eventName] = handler;
      } else {
        (params.on as Record<string, SwiperEventHandler>)[eventName] = handler;
      }
    } else {
      rest[key] = value;
    }
  });
  (['navigation', 'pagination', 'scrollbar'] as const).forEach((key) => {
    if (params[key] === true) params[key] = {};
    if (params[key] === false) delete params[key];
  });

  return { params: params as unknown as SwiperParamsFromUser, passedParams, rest, events };
}
