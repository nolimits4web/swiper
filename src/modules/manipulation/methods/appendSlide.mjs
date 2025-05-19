import { setInnerHTML } from '../../../shared/utils.mjs';

export default function appendSlide(slides) {
  const swiper = this;
  const { params, slidesEl } = swiper;

  if (params.loop) {
    swiper.loopDestroy();
  }

  const appendElement = (slideEl) => {
    if (typeof slideEl === 'string') {
      const tempDOM = document.createElement('div');
      setInnerHTML(tempDOM, slideEl);
      slidesEl.append(tempDOM.children[0]);
      setInnerHTML(tempDOM, '');
    } else {
      slidesEl.append(slideEl);
    }
  };

  if (typeof slides === 'object' && 'length' in slides) {
    for (let i = 0; i < slides.length; i += 1) {
      if (slides[i]) appendElement(slides[i]);
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
