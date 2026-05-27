import { paramsList } from './params-list';
import { isObject } from './utils';

export function getChangedParams<T>(
  swiperParams: Record<string, unknown>,
  oldParams: Record<string, unknown> | null | undefined,
  children: T[] | null | undefined,
  oldChildren: T[] | null | undefined,
  getKey: (child: T) => unknown,
): string[] {
  const keys: string[] = [];
  if (!oldParams) return keys;
  const addKey = (key: string) => {
    if (keys.indexOf(key) < 0) keys.push(key);
  };
  if (children && oldChildren) {
    const oldChildrenKeys = oldChildren.map(getKey);
    const childrenKeys = children.map(getKey);
    if (oldChildrenKeys.join('') !== childrenKeys.join('')) addKey('children');
    if (oldChildren.length !== children.length) addKey('children');
  }
  const watchParams = paramsList.filter((key) => key[0] === '_').map((key) => key.replace(/_/, ''));
  watchParams.forEach((key) => {
    if (key in swiperParams && key in oldParams) {
      const newVal = swiperParams[key];
      const oldVal = oldParams[key];
      if (isObject(newVal) && isObject(oldVal)) {
        const newKeys = Object.keys(newVal);
        const oldKeys = Object.keys(oldVal);
        if (newKeys.length !== oldKeys.length) {
          addKey(key);
        } else {
          newKeys.forEach((newKey) => {
            if (newVal[newKey] !== oldVal[newKey]) {
              addKey(key);
            }
          });
          oldKeys.forEach((oldKey) => {
            if (newVal[oldKey] !== oldVal[oldKey]) addKey(key);
          });
        }
      } else if (newVal !== oldVal) {
        addKey(key);
      }
    }
  });
  return keys;
}
