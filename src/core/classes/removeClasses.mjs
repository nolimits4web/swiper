export default function removeClasses() {
  const swiper = this;
  const { el, classNames } = swiper;

  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
