// eslint-disable-next-line
import '../../build/swiper-bundle.css';

// eslint-disable-next-line
import Swiper from '../../build/swiper-bundle.esm';

// eslint-disable-next-line
window.swiper = new Swiper({
  el: '.swiper-container',
  slideToClickedSlide: true,
  grabCursor: true,
  scrollbar: true,
  createElements: true,
  pagination: true,
  navigation: true,
  a11y: {
    containerMessage: 'Example content',
    containerRoleDescriptionMessage: 'carousel',
    itemRoleDescriptionMessage: 'slide',
  },
});

// eslint-disable-next-line no-restricted-globals
document.querySelector('.append-slide').addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-restricted-globals
  window.swiper.appendSlide('<div class="swiper-slide">Slide</div>');
});

// uncomment to test SlidesPerColumn module TODO: remove
// window.swiper = new Swiper({
//   el: '.swiper-container',
//   slidesPerView: 3,
//   slidesPerColumn: 2,
//   spaceBetween: 30,
// });
