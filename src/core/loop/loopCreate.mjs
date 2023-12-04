import { createElement, elementChildren, showWarning } from '../../shared/utils.mjs';

export default function loopCreate(slideRealIndex) {
  const swiper = this;
  const { params, slidesEl } = swiper;
  if (!params.loop || (swiper.virtual && swiper.params.virtual.enabled)) return;

  const initSlides = () => {
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);

    slides.forEach((el, index) => {
      el.setAttribute('data-swiper-slide-index', index);
    });
  };

  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;

  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);

  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;

  const addBlankSlides = (amountOfSlides) => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement
        ? createElement('swiper-slide', [params.slideBlankClass])
        : createElement('div', [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  };

  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - (swiper.slides.length % slidesPerGroup);
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning(
        'Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    }

    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - (swiper.slides.length % params.grid.rows);
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning(
        'Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)',
      );
    }
    initSlides();
  } else {
    initSlides();
  }

  swiper.loopFix({ slideRealIndex, direction: params.centeredSlides ? undefined : 'next' });
}
