import { getWindow } from 'ssr-window';
import { getDevice } from './get-device.mjs';

let browser;

function calcBrowser() {
  const window = getWindow();
  const device = getDevice();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
  }
  if (isSafari()) {
    const ua = String(window.navigator.userAgent);
    if (ua.includes('Version/')) {
      const [major, minor] = ua
        .split('Version/')[1]
        .split(' ')[0]
        .split('.')
        .map((num) => Number(num));
      needPerspectiveFix = major < 16 || (major === 16 && minor < 2);
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
  const isSafariBrowser = isSafari();
  const need3dFix = isSafariBrowser || (isWebView && device.ios);

  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView,
  };
}

function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}

export { getBrowser };
