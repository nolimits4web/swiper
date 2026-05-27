export interface SwiperSupport {
  touch: boolean;
}

let supportCached: SwiperSupport | undefined;

function calcSupport(): SwiperSupport {
  if (typeof window === 'undefined') return { touch: false };
  return {
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };
}

export function getSupport(): SwiperSupport {
  if (!supportCached) supportCached = calcSupport();
  return supportCached;
}
