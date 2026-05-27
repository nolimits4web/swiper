import type { Swiper } from '../core/core';
import { elementTransitionEnd } from './utils';

interface EffectVirtualTransitionEndParams {
  swiper: Swiper;
  duration: number;
  transformElements: HTMLElement[];
  allSlides?: boolean;
}

export default function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformElements,
  allSlides,
}: EffectVirtualTransitionEndParams): void {
  const { activeIndex } = swiper;
  const getSlide = (el: HTMLElement): HTMLElement | undefined => {
    if (!el.parentElement) {
      // assume shadow root
      return swiper.slides.find(
        (slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode,
      );
    }
    if (el.parentElement instanceof HTMLElement) return el.parentElement;
    return undefined;
  };
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget: HTMLElement[];
    if (allSlides) {
      transitionEndTarget = transformElements;
    } else {
      transitionEndTarget = transformElements.filter((transformEl) => {
        const el = transformEl.classList.contains('swiper-slide-transform')
          ? getSlide(transformEl)
          : transformEl;
        return !!el && swiper.getSlideIndex(el) === activeIndex;
      });
    }
    transitionEndTarget.forEach((el) => {
      elementTransitionEnd(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new CustomEvent('transitionend', { bubbles: true, cancelable: true });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}
