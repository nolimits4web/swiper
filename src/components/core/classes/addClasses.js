export default function addClasses() {
  const swiper = this;
  const { classNames, params, rtl, $el, device, support } = swiper;
  const suffixes = [];

  suffixes.push('initialized');
  suffixes.push(params.direction);

  if (support.pointerEvents && !support.touch) {
    suffixes.push('pointer-events');
  }
  if (params.freeMode) {
    suffixes.push('free-mode');
  }
  if (params.autoHeight) {
    suffixes.push('autoheight');
  }
  if (rtl) {
    suffixes.push('rtl');
  }
  if (params.slidesPerColumn > 1) {
    suffixes.push('multirow');
    if (params.slidesPerColumnFill === 'column') {
      suffixes.push('multirow-column');
    }
  }
  if (device.android) {
    suffixes.push('android');
  }
  if (device.ios) {
    suffixes.push('ios');
  }

  if (params.cssMode) {
    suffixes.push('css-mode');
  }

  suffixes.forEach((suffix) => {
    classNames.push(params.containerModifierClass + suffix);
  });

  $el.addClass(classNames.join(' '));

  swiper.emitContainerClasses();
}
