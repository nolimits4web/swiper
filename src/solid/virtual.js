function renderVirtual(swiper, slides, virtualData) {
  if (!virtualData) return null;
  const style = swiper.isHorizontal()
    ? {
        [swiper.rtlTranslate ? 'right' : 'left']: `${virtualData.offset}px`,
      }
    : {
        top: `${virtualData.offset}px`,
      };
  return slides
    .filter((child, index) => index >= virtualData.from && index <= virtualData.to)
    .map((child) => {
      const node = child.cloneNode(true);
      node.swiper = swiper;
      Object.assign(node.style, style);
      return node;
    });
}

export { renderVirtual };
