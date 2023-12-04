import appendSlide from './methods/appendSlide.mjs';
import prependSlide from './methods/prependSlide.mjs';
import addSlide from './methods/addSlide.mjs';
import removeSlide from './methods/removeSlide.mjs';
import removeAllSlides from './methods/removeAllSlides.mjs';

export default function Manipulation({ swiper }) {
  Object.assign(swiper, {
    appendSlide: appendSlide.bind(swiper),
    prependSlide: prependSlide.bind(swiper),
    addSlide: addSlide.bind(swiper),
    removeSlide: removeSlide.bind(swiper),
    removeAllSlides: removeAllSlides.bind(swiper),
  });
}
