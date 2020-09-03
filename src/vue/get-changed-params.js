import { paramsList } from './params-list';

function getChangedParams(swiperParams, oldParams, children, oldChildren) {
  const keys = [];
  if (!oldParams) return keys;
  const oldChildrenKeys = oldChildren.map((child) => child.key);
  const childrenKeys = children.map((child) => child.key);
  if (oldChildrenKeys.join('') !== childrenKeys.join('')) keys.push('children');
  if (oldChildren.length !== children.length) keys.push('children');
  const watchParams = paramsList.filter((key) => key[0] === '_').map((key) => key.replace(/_/, ''));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams && swiperParams[key] !== oldParams[key]) {
      keys.push(key);
    }
  });
  return keys;
}

export { getChangedParams };
