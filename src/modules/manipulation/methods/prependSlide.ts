import type { Swiper } from '../../../core/core';
import { setInnerHTML } from '../../../shared/utils';

type SlideInput = HTMLElement | string | Array<HTMLElement | string>;

export default function prependSlide(this: Swiper, slides: SlideInput): void {
  const swiper = this;
  const { params, activeIndex, slidesEl } = swiper;

  if (params.loop) {
    swiper.loopDestroy();
  }
  let newActiveIndex = activeIndex + 1;
  const prependElement = (slideEl: HTMLElement | string): void => {
    if (typeof slideEl === 'string') {
      const tempDOM = document.createElement('div');
      setInnerHTML(tempDOM, slideEl);
      const child = tempDOM.children[0];
      if (child) slidesEl.prepend(child);
      setInnerHTML(tempDOM, '');
    } else {
      slidesEl.prepend(slideEl);
    }
  };
  if (Array.isArray(slides)) {
    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      if (slide) prependElement(slide);
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    prependElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
}
