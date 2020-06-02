import React from 'react';

function updateOnVirtualData(swiper) {
  if (!swiper || swiper.destroyed) return;
  swiper.updateSlides();
  swiper.updateProgress();
  swiper.updateSlidesClasses();
  if (swiper.lazy && swiper.params.lazy.enabled) {
    swiper.lazy.load();
  }
}

function renderVirtual(swiper, slides, virtualData) {
  if (!virtualData) return null;
  const style = swiper.isHorizontal()
    ? {
        left: `${virtualData.offset}px`,
      }
    : {
        top: `${virtualData.offset}px`,
      };
  return slides
    .filter((child, index) => index >= virtualData.from && index <= virtualData.to)
    .map((child) => {
      return React.cloneElement(child, {
        swiper,
        style,
      });
    });
}

export { renderVirtual, updateOnVirtualData };
