import Support from '../../../utils/support';

export default function () {
  const swiper = this;
  if (Support.touch) return;
  swiper.el.style.cursor = '';
}
