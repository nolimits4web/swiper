import appendSlide from './methods/appendSlide';
import prependSlide from './methods/prependSlide';
import addSlide from './methods/addSlide';
import removeSlide from './methods/removeSlide';
import removeAllSlides from './methods/removeAllSlides';

export default function Manipulation({ swiper }) {
  Object.assign(swiper, {
    appendSlide: appendSlide.bind(swiper),
    prependSlide: prependSlide.bind(swiper),
    addSlide: addSlide.bind(swiper),
    removeSlide: removeSlide.bind(swiper),
    removeAllSlides: removeAllSlides.bind(swiper),
  });
}
