import { extend } from '../../../utils/utils';

export default function updateSize() {
  const swiper = this;
  let width;
  let height;
  const $el = swiper.$el;
  if (typeof swiper.params.width !== 'undefined') {
    width = swiper.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined') {
    height = swiper.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
    return;
  }

  // Subtract paddings
  width =
    width -
    parseInt($el.css('padding-left') || 0, 10) -
    parseInt($el.css('padding-right') || 0, 10);
  height =
    height -
    parseInt($el.css('padding-top') || 0, 10) -
    parseInt($el.css('padding-bottom') || 0, 10);

  extend(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height,
  });
}
