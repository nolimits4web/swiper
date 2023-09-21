import { attrToProp, extend, isObject } from './utils.mjs';
import { paramsList } from './params-list.mjs';
import defaults from '../core/defaults.mjs';

const formatValue = (val) => {
  if (parseFloat(val) === Number(val)) return Number(val);
  if (val === 'true') return true;
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'null') return null;
  if (val === 'undefined') return undefined;
  if (typeof val === 'string' && val.includes('{') && val.includes('}') && val.includes('"')) {
    let v;
    try {
      v = JSON.parse(val);
    } catch (err) {
      v = val;
    }
    return v;
  }
  return val;
};

const modulesParamsList = [
  'a11y',
  'autoplay',
  'controller',
  'cards-effect',
  'coverflow-effect',
  'creative-effect',
  'cube-effect',
  'fade-effect',
  'flip-effect',
  'free-mode',
  'grid',
  'hash-navigation',
  'history',
  'keyboard',
  'mousewheel',
  'navigation',
  'pagination',
  'parallax',
  'scrollbar',
  'thumbs',
  'virtual',
  'zoom',
];

function getParams(element, propName, propValue) {
  const params = {};
  const passedParams = {};
  extend(params, defaults);

  const localParamsList = [...paramsList, 'on'];

  const allowedParams = localParamsList.map((key) => key.replace(/_/, ''));

  // First check props
  localParamsList.forEach((paramName) => {
    paramName = paramName.replace('_', '');
    if (typeof element[paramName] !== 'undefined') {
      passedParams[paramName] = element[paramName];
    }
  });

  // Attributes
  const attrsList = [...element.attributes];
  if (typeof propName === 'string' && typeof propValue !== 'undefined') {
    attrsList.push({ name: propName, value: isObject(propValue) ? { ...propValue } : propValue });
  }
  attrsList.forEach((attr) => {
    const moduleParam = modulesParamsList.filter(
      (mParam) => attr.name.indexOf(`${mParam}-`) === 0,
    )[0];
    if (moduleParam) {
      const parentObjName = attrToProp(moduleParam);
      const subObjName = attrToProp(attr.name.split(`${moduleParam}-`)[1]);
      if (typeof passedParams[parentObjName] === 'undefined') passedParams[parentObjName] = {};
      if (passedParams[parentObjName] === true) {
        passedParams[parentObjName] = { enabled: true };
      }
      passedParams[parentObjName][subObjName] = formatValue(attr.value);
    } else {
      const name = attrToProp(attr.name);
      if (!allowedParams.includes(name)) return;
      const value = formatValue(attr.value);
      if (passedParams[name] && modulesParamsList.includes(attr.name) && !isObject(value)) {
        if (passedParams[name].constructor !== Object) {
          passedParams[name] = {};
        }
        passedParams[name].enabled = !!value;
      } else {
        passedParams[name] = value;
      }
    }
  });

  extend(params, passedParams);

  if (params.navigation) {
    params.navigation = {
      prevEl: '.swiper-button-prev',
      nextEl: '.swiper-button-next',
      ...(params.navigation !== true ? params.navigation : {}),
    };
  } else if (params.navigation === false) {
    delete params.navigation;
  }

  if (params.scrollbar) {
    params.scrollbar = {
      el: '.swiper-scrollbar',
      ...(params.scrollbar !== true ? params.scrollbar : {}),
    };
  } else if (params.scrollbar === false) {
    delete params.scrollbar;
  }

  if (params.pagination) {
    params.pagination = {
      el: '.swiper-pagination',
      ...(params.pagination !== true ? params.pagination : {}),
    };
  } else if (params.pagination === false) {
    delete params.pagination;
  }
  return { params, passedParams };
}

export { getParams };
