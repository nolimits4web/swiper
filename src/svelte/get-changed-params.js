import { paramsList } from './params-list';

function getChangedParams(swiperParams, oldParams) {
  const keys = [];
  if (!oldParams) return keys;
  const watchParams = paramsList.filter((key) => key[0] === '_').map((key) => key.replace(/_/, ''));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams && swiperParams[key] !== oldParams[key]) {
      keys.push(key);
    }
  });
  return keys;
}

export { getChangedParams };
