import { elementTransitionEnd } from './utils.mjs';

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
      return swiper.slides.find(
        (slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode,
      );
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
        return swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el) => {
      elementTransitionEnd(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent('transitionend', {
          bubbles: true,
          cancelable: true,
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}
