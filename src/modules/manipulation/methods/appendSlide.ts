import type { Swiper } from '../../../core/core';
import { setInnerHTML } from '../../../shared/utils';

type SlideInput = HTMLElement | string | Array<HTMLElement | string>;

export default function appendSlide(this: Swiper, slides: SlideInput): void {
  const swiper = this;
  const { params, slidesEl } = swiper;

  if (params.loop) {
    swiper.loopDestroy();
  }

  const appendElement = (slideEl: HTMLElement | string): void => {
    if (typeof slideEl === 'string') {
      const tempDOM = document.createElement('div');
      setInnerHTML(tempDOM, slideEl);
      const child = tempDOM.children[0];
      if (child) slidesEl.append(child);
      setInnerHTML(tempDOM, '');
    } else {
      slidesEl.append(slideEl);
    }
  };

  if (Array.isArray(slides)) {
    for (let i = 0; i < slides.length; i += 1) {
      const slide = slides[i];
      if (slide) appendElement(slide);
    }
  } else {
    appendElement(slides);
  }
  swiper.recalcSlides();
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!params.observer || swiper.isElement) {
    swiper.update();
  }
}
