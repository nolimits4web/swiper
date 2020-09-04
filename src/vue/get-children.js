function getChildren(originalSlots = {}, slidesRef, oldSlidesRef) {
  const slides = [];

  const slots = {
    'container-start': [],
    'container-end': [],
    'wrapper-start': [],
    'wrapper-end': [],
  };
  Object.keys(originalSlots).forEach((slotName) => {
    const els = originalSlots[slotName]();
    if (slotName === 'default') slotName = 'container-end';
    els.forEach((vnode) => {
      if (vnode.type && vnode.type.name === 'SwiperSlide') {
        slides.push(vnode);
      } else if (slots[slotName]) {
        slots[slotName].push(vnode);
      }
    });
  });
  oldSlidesRef.value = slidesRef.value;
  slidesRef.value = slides;

  return { slides, slots };
}

export { getChildren };
