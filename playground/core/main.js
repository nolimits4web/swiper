// eslint-disable-next-line
import '../../build/swiper-bundle.css';

// eslint-disable-next-line
import Swiper from '../../build/swiper-bundle.esm.js';

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
