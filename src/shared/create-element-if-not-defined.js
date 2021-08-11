import { getDocument } from 'ssr-window';

export default function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  const document = getDocument();
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        const element = document.createElement('div');
        element.className = checkProps[key];
        swiper.$el.append(element);
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
