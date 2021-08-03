// eslint-disable-next-line
import '../../build/css';

// eslint-disable-next-line
import Swiper from '../../build/bundle';

// eslint-disable-next-line
window.swiper = new Swiper({
  el: '.swiper-container',
  slideToClickedSlide: true,
  grabCursor: true,
  scrollbar: true,
  createElements: true,
  pagination: true,
  navigation: true,
  spaceBetween: 20,
});
