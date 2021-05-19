// eslint-disable-next-line
import '../../build/swiper-bundle.css';

// eslint-disable-next-line
import Swiper from '../../build/swiper-bundle.esm';

// eslint-disable-next-line
window.swiper = new Swiper({
  el: '.swiper-container',
  initialSlide: 2,
  spaceBetween: 50,
  slidesPerView: 2,
  centeredSlides: true,
  slideToClickedSlide: true,
  grabCursor: true,
  scrollbar: true,
  createElements: true,
  mousewheel: {
    enabled: true,
  },
  keyboard: {
    enabled: true,
  },
  pagination: true,
  navigation: true,
  a11y: {
    containerMessage: 'Example content',
    containerRoleDescriptionMessage: 'carousel',
    itemRoleDescriptionMessage: 'slide',
  },
});
