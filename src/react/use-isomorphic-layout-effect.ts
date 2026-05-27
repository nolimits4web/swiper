import { useEffect, useLayoutEffect, type DependencyList, type EffectCallback } from 'react';

export function useIsomorphicLayoutEffect(callback: EffectCallback, deps?: DependencyList): void {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  if (typeof window === 'undefined') return useEffect(callback, deps);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useLayoutEffect(callback, deps);
}
