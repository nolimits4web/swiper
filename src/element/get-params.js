import { attrToProp, extend } from '../components-shared/utils.js';
import { paramsList } from '../components-shared/params-list.js';
import defaults from '../core/defaults.js';

const formatValue = (val) => {
  if (parseFloat(val) === Number(val)) return Number(val);
  if (val === 'true') return true;
  if (val === 'false') return false;
  if (val === 'null') return null;
  if (val === 'undefined') return undefined;
  return val;
};

function getParams(element) {
  const params = {};
  const passedParams = {};
  extend(params, defaults);

  const allowedParams = paramsList.map((key) => key.replace(/_/, ''));

  // First check props
  paramsList.forEach((paramName) => {
    paramName = paramName.replace('_', '');
    if (typeof element[paramName] !== 'undefined') {
      passedParams[paramName] = element[paramName];
    }
  });

  // Attributes
  [...element.attributes].forEach((attr) => {
    const name = attrToProp(attr.name);
    if (!allowedParams.includes(name)) return;
    const value = formatValue(attr.value);
    passedParams[name] = value;
  });

  extend(params, passedParams);

  if (params.navigation === true) {
    params.navigation = {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
    };
  } else if (params.navigation === false) {
    delete params.navigation;
  }

  if (params.scrollbar === true) {
    params.scrollbar = {
      el: '.swiper-scrollbar',
    };
  } else if (params.scrollbar === false) {
    delete params.scrollbar;
  }
  if (params.pagination === true) {
    params.pagination = {
      el: '.swiper-pagination',
    };
  } else if (params.pagination === false) {
    delete params.pagination;
  }

  if (params.control) {
    params.controller = { control: params.control };
    delete params.control;
  } else {
    delete params.controller;
  }

  if (typeof params.thumbs === 'string' || params.thumbs instanceof HTMLElement) {
    params.thumbs = { swiper: params.thumbs };
  }

  return { params, passedParams };
}

export { getParams };
