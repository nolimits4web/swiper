import { getDevice } from './get-device';

export interface SwiperBrowser {
  isSafari: boolean;
  isWebView: boolean;
  need3dFix: boolean;
}

let browserCached: SwiperBrowser | undefined;

function calcBrowser(): SwiperBrowser {
  if (typeof window === 'undefined') {
    return { isSafari: false, isWebView: false, need3dFix: false };
  }
  const device = getDevice();
  const ua = navigator.userAgent;
  const uaLower = ua.toLowerCase();
  const isSafari =
    uaLower.includes('safari') && !uaLower.includes('chrome') && !uaLower.includes('android');
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(ua);
  // 3D transform glitches still affect iOS WebView and Safari at the baseline (16.4+).
  const need3dFix = isSafari || (isWebView && device.ios);
  return { isSafari, isWebView, need3dFix };
}

export function getBrowser(): SwiperBrowser {
  if (!browserCached) browserCached = calcBrowser();
  return browserCached;
}
