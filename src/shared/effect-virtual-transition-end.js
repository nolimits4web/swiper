import { elementIndex, elementTransitionEnd } from './utils.js';

export default function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformElements,
  allSlides,
}) {
  const { activeIndex } = swiper;
  const getSlide = (el) => {
    if (!el.parentElement) {
      // assume shadow root
      const slide = swiper.slides.filter(
        (slideEl) => slideEl.shadowEl && slideEl.shadowEl === el.parentNode,
      )[0];
      return slide;
    }
    return el.parentElement;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el = transformEl.classList.contains('swiper-slide-transform')
          ? getSlide(transformEl)
          : transformEl;
        return elementIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el) => {
      elementTransitionEnd(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        triggerEvents.forEach((eventName) => {
          const evt = new window.CustomEvent(eventName, {
            bubbles: true,
            cancelable: true,
          });
          swiper.wrapperEl.dispatchEvent(evt);
        });
      });
    });
  }
}
