import type { Swiper } from '../core/core';
import { createElement, elementChildren } from './utils';

export default function createElementIfNotDefined<T extends Record<string, any>>(
  swiper: Swiper,
  originalParams: T | undefined,
  params: T | undefined,
  checkProps: Record<string, string>,
): T {
  const target = (params ?? ({} as T)) as Record<string, any>;
  const original = (originalParams ?? ({} as T)) as Record<string, any>;
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!target[key] && target.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0] as HTMLElement;
        if (!element) {
          element = createElement('div', checkProps[key]);
          element.className = checkProps[key]!;
          swiper.el.append(element);
        }
        target[key] = element;
        original[key] = element;
      }
    });
  }
  return target as T;
}
