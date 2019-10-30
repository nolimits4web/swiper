export default function () {
  const swiper = this;
  const { $el, classNames } = swiper;

  $el.removeClass(classNames.join(' '));
}
