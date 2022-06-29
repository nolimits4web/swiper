import { children } from 'solid-js';

function childrenAsArray(c) {
  const cachedChildren = children(() => c);

  return Array.isArray(cachedChildren()) ? cachedChildren() : [cachedChildren()];
}

function processChildren(c) {
  const slides = [];

  childrenAsArray(c).forEach((child) => {
    if (!child) return;

    if (child.className && child.className.indexOf('swiper-slide') >= 0) {
      slides.push(child);
    } else if (child.children) {
      processChildren(child.children).forEach((slide) => slides.push(slide));
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
    if (!child) return;

    if (child.className && child.className.indexOf('swiper-slide') >= 0) {
      slides.push(child);
    } else if (child.slot && slots[child.slot]) {
      slots[child.slot].push(child);
    } else if (child.children) {
      const foundSlides = processChildren(child.children);
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
