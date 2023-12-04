import { createElement, elementChild } from './utils.mjs';

export default function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (!swiper.params.createElements) return params;
  Object.entries(checkProps).forEach(([key, className]) => {
    if (!params[key] && params.auto === true) {
      const element = elementChild(swiper.el, `.${className}`) || createElement('div', className);
      element.className = className;
      swiper.el.append(element);

      params[key] = originalParams[key] = element;
    }
  });
  return params;
}
