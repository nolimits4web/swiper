import { elementTransitionEnd, findElementsInElements } from './utils.js';

export default function effectVirtualTransitionEnd({ swiper, duration, transformEl, allSlides }) {
  const { slides, activeIndex } = swiper;
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    if (allSlides) {
      transitionEndTarget = transformEl ? findElementsInElements(slides, transformEl) : slides;
    } else {
      transitionEndTarget = transformEl
        ? [...slides[activeIndex].querySelectorAll(activeIndex)]
        : [slides[activeIndex]];
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
