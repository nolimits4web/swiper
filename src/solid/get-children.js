import { children } from 'solid-js';

function childrenAsArray(c) {
  const cachedChildren = children(() => c);

  return Array.isArray(cachedChildren()) ? cachedChildren() : [cachedChildren()];
}

function processChildren(c) {
  const slides = [];

  childrenAsArray(c).forEach((child) => {
    if (child.type && child.type.displayName === 'SwiperSlide') {
      slides.push(child);
    } else if (child.props && child.props.children) {
      processChildren(child.props.children).forEach((slide) => slides.push(slide));
    }
  });

  return slides;
}

function getChildren(c) {
  const slides = [];

  const slots = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': [],
  };

  childrenAsArray(c).forEach((child) => {
    if (child.type && child.type.displayName === 'SwiperSlide') {
      slides.push(child);
    } else if (child.props && child.props.slot && slots[child.props.slot]) {
      slots[child.props.slot].push(child);
    } else if (child.props && child.props.children) {
      const foundSlides = processChildren(child.props.children);
      if (foundSlides.length > 0) {
        foundSlides.forEach((slide) => slides.push(slide));
      } else {
        slots['container-end'].push(child);
      }
    } else {
      slots['container-end'].push(child);
    }
  });

  return { slides, slots };
}

export { getChildren };
