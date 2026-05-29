import type { SwiperOptions } from '../core/core';
import defaults from '../core/defaults';
import { paramsList } from './params-list';
import { attrToProp, extend, isObject } from './utils';

type FormattedValue = string | number | boolean | null | undefined | Record<string, unknown>;

const formatValue = (val: unknown): FormattedValue => {
  if (typeof val !== 'string') {
    if (val === undefined || val === null) return val as null | undefined;
    if (typeof val === 'number' || typeof val === 'boolean') return val;
    if (isObject(val)) return val;
    return val as FormattedValue;
  }
  if (parseFloat(val) === Number(val)) return Number(val);
  if (val === 'true') return true;
  if (val === '') return true;
  if (val === 'false') return false;
  if (val === 'null') return null;
  if (val === 'undefined') return undefined;
  if (val.includes('{') && val.includes('}') && val.includes('"')) {
    try {
      return JSON.parse(val) as Record<string, unknown>;
    } catch {
      return val;
    }
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
] as const;

interface AttrLike {
  name: string;
  value: unknown;
}

export interface GetElementParamsResult {
  params: SwiperOptions;
  passedParams: Record<string, unknown>;
}

export function getParams(
  element: Element & Record<string, unknown>,
  propName?: string,
  propValue?: unknown,
): GetElementParamsResult {
  const params: SwiperOptions = {};
  const passedParams: Record<string, unknown> = {};
  extend(params, defaults);

  const localParamsList = [...paramsList, 'on'];

  const allowedParams = localParamsList.map((key) => key.replace(/_/, ''));

  // First check props
  localParamsList.forEach((rawName) => {
    const paramName = rawName.replace('_', '');
    if (typeof element[paramName] !== 'undefined') {
      passedParams[paramName] = element[paramName];
    }
  });

  // Attributes
  const attrsList: AttrLike[] = [...element.attributes];
  if (typeof propName === 'string' && typeof propValue !== 'undefined') {
    attrsList.push({
      name: propName,
      value: isObject(propValue) ? { ...propValue } : propValue,
    });
  }
  attrsList.forEach((attr) => {
    const moduleParam = modulesParamsList.find((mParam) => attr.name.startsWith(`${mParam}-`));
    if (moduleParam) {
      const parentObjName = attrToProp(moduleParam);
      const subObjName = attrToProp(attr.name.split(`${moduleParam}-`)[1]!);
      if (typeof passedParams[parentObjName] === 'undefined') {
        passedParams[parentObjName] = {};
      }
      if (passedParams[parentObjName] === true) {
        passedParams[parentObjName] = { enabled: true };
      }
      if (passedParams[parentObjName] === false) {
        passedParams[parentObjName] = { enabled: false };
      }
      (passedParams[parentObjName] as Record<string, unknown>)[subObjName] = formatValue(
        attr.value,
      );
    } else {
      const name = attrToProp(attr.name);
      if (!allowedParams.includes(name)) return;
      const value = formatValue(attr.value);
      const existing = passedParams[name];
      if (
        existing &&
        modulesParamsList.includes(attr.name as (typeof modulesParamsList)[number]) &&
        !isObject(value)
      ) {
        const existingObj = isObject(existing) ? existing : ({} as Record<string, unknown>);
        existingObj.enabled = !!value;
        passedParams[name] = existingObj;
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
  } else if ((params as Record<string, unknown>).navigation === false) {
    delete params.navigation;
  }

  if (params.scrollbar) {
    params.scrollbar = {
      el: '.swiper-scrollbar',
      ...(params.scrollbar !== true ? params.scrollbar : {}),
    };
  } else if ((params as Record<string, unknown>).scrollbar === false) {
    delete params.scrollbar;
  }

  if (params.pagination) {
    params.pagination = {
      el: '.swiper-pagination',
      ...(params.pagination !== true ? params.pagination : {}),
    };
  } else if ((params as Record<string, unknown>).pagination === false) {
    delete params.pagination;
  }
  return { params, passedParams };
}
