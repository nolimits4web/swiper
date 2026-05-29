import { useEffect, useLayoutEffect, type DependencyList, type EffectCallback } from 'react';

export function useIsomorphicLayoutEffect(callback: EffectCallback, deps?: DependencyList): void {
  if (typeof window === 'undefined') return useEffect(callback, deps);
  return useLayoutEffect(callback, deps);
}
