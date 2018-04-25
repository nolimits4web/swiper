import { window } from 'ssr-window';

const Browser = (function Browser() {
  function isSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
  }
  return {
    isIE: !!window.navigator.userAgent.match(/Trident/g) || !!window.navigator.userAgent.match(/MSIE/g),
    isSafari: isSafari(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
  };
}());

export default Browser;
