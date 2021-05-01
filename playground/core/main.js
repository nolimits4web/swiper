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
  slidesPerColumn: 2,
  centeredSlides: true,
  slideToClickedSlide: true,
  grabCursor: true,
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  mousewheel: {
    enabled: true,
  },
  keyboard: {
    enabled: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
    containerMessage: 'Example content',
    containerRoleDescriptionMessage: 'carousel',
    itemRoleDescriptionMessage: 'slide',
  },
});

// uncomment to test SlidesPerColumn module TODO: remove
// window.swiper = new Swiper({
//   el: '.swiper-container',
//   slidesPerView: 3,
//   slidesPerColumn: 2,
//   spaceBetween: 30,
// });
