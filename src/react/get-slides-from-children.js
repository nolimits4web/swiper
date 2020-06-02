import React from 'react';

function getSlidesFromChildren(children) {
  const slides = [];
  function processChildren(c) {
    React.Children.toArray(c).forEach((child) => {
      if (child.type === React.Fragment && child.props.children) {
        processChildren(child.props.children);
        return;
      }
      if (child.type && child.type.displayName === 'SwiperSlide') {
        slides.push(child);
      }
    });
  }
  processChildren(children);
  return slides;
}

export { getSlidesFromChildren };
