export default function removeClasses() {
  const swiper = this;
  const { el, classNames } = swiper;
  if (!el || typeof el === 'string') return;

  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
