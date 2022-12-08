export default function effectTarget(effectParams, slideEl) {
  if (effectParams.transformEl) {
    const transformEl = slideEl.querySelector(effectParams.transformEl);
    if (transformEl) {
      transformEl.style.backfaceVisibility = 'hidden';
      transformEl.style['-webkit-backface-visibility'] = 'hidden';
    }
    return transformEl;
  }
  return slideEl;
}
