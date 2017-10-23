import window from './window';
import document from './document';

const Browser = (function Browser() {
  function isIE9() {
    // create temporary DIV
    const div = document.createElement('div');
    // add content to tmp DIV which is wrapped into the IE HTML conditional statement
    div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
    // return true / false value based on what will browser render
    return div.getElementsByTagName('i').length === 1;
  }
  function isSafari() {
    const ua = window.navigator.userAgent.toLowerCase();
    return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
  }
  return {
    isSafari: isSafari(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
    ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
    ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) ||
             (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
    lteIE9: isIE9(),
  };
}());

export default Browser;
