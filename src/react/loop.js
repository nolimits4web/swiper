import React from 'react';

function calcLoopedSlides(slides, swiperParams) {
  let loopedSlides = Math.ceil(
    parseFloat(swiperParams.loopedSlides || swiperParams.slidesPerView, 10),
  );

  loopedSlides += swiperParams.loopAdditionalSlides;

  if (loopedSlides > slides.length) {
    loopedSlides = slides.length;
  }
  return loopedSlides;
}

function renderLoop(swiper, swiperParams, children) {
  const slides = React.Children.map(children, (child, index) => {
    return React.cloneElement(child, { swiper, 'data-swiper-slide-index': index });
  });

  function duplicateSlide(child, index, position) {
    return React.cloneElement(child, {
      key: `${child.key}-duplicate-${index}-${position}`,
      className: `${child.props.className || ''} ${swiperParams.slideDuplicateClass}`,
    });
  }

  if (swiperParams.loopFillGroupWithBlank) {
    const blankSlidesNum =
      swiperParams.slidesPerGroup - (slides.length % swiperParams.slidesPerGroup);
    if (blankSlidesNum !== swiperParams.slidesPerGroup) {
      for (let i = 0; i < blankSlidesNum; i += 1) {
        const blankSlide = (
          <div className={`${swiperParams.slideClass} ${swiperParams.slideBlankClass}`} />
        );
        slides.push(blankSlide);
      }
    }
  }

  if (swiperParams.slidesPerView === 'auto' && !swiperParams.loopedSlides) {
    swiperParams.loopedSlides = slides.length;
  }

  const loopedSlides = calcLoopedSlides(slides, swiperParams);

  const prependSlides = [];
  const appendSlides = [];
  slides.forEach((child, index) => {
    if (index < loopedSlides) {
      appendSlides.push(duplicateSlide(child, index, 'prepend'));
    }
    if (index < slides.length && index >= slides.length - loopedSlides) {
      prependSlides.push(duplicateSlide(child, index, 'append'));
    }
  });
  if (swiper) {
    swiper.loopedSlides = loopedSlides;
  }

  return [...prependSlides, ...slides, ...appendSlides];
}

export { calcLoopedSlides, renderLoop };
