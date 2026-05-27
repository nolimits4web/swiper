import { createElement, elementChildren } from './utils';

type AnySwiper = any;
type AnyParams = Record<string, any>;

export default function createElementIfNotDefined(
  swiper: AnySwiper,
  originalParams: AnyParams,
  params: AnyParams,
  checkProps: Record<string, string>,
): AnyParams {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0] as HTMLElement;
        if (!element) {
          element = createElement('div', checkProps[key]);
          element.className = checkProps[key]!;
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
