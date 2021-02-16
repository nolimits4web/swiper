function pushClasses(settings, containerModifierClass) {
  const result = [];
  settings.forEach((item) => {
    if (typeof item === 'object') {
      for (const [condition, classNames] of Object.entries(item)) {
        if (condition) {
          result.push(containerModifierClass + classNames);
        }
      }
    }
    if (typeof value === 'string') {
      result.push(containerModifierClass + item);
    }
  });
  return result;
}

export default function addClasses() {
  const swiper = this;
  const { classNames, params, rtl, $el, device, support } = swiper;
  // prettier-ignore
  const suffixes = pushClasses([
    'initialized',
    params.direction,
    { 'pointer-events': support.pointerEvents && !support.touch },
    { 'free-mode': params.freeMode },
    { 'autoheight': params.autoHeight },
    { 'rtl': rtl },
    { 'multirow': params.slidesPerColumn > 1 },
    { 'multirow-column': params.slidesPerColumn > 1 && params.slidesPerColumnFill === 'column' },
    { 'android': device.android },
    { 'ios': device.ios },
    { 'css-mode': params.cssMode },
  ], params.containerModifierClass);

  $el.addClass([...classNames, ...suffixes].join(' '));
  swiper.emitContainerClasses();
}
