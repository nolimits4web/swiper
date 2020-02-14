export default function (speed) {
  const swiper = this;
  let newHeight = 0;
  let i;
  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }

  // Find slides currently in view
  let activeSlides = [];
  if (
    swiper.params.slidesPerView !== 'auto'
    && swiper.params.slidesPerView > 1
    && swiper.params.centeredSlides
  ) {
    let centerSlideIndex = 0;
    const slidesArray = Array.from(swiper.slides);

    // First, get the center slide:
    slidesArray.forEach((slide, index) => {
      if (slide.classList.contains('swiper-slide-active')) {
        activeSlides.push(slide);
        centerSlideIndex = index;
      }
    });
    let amountOfSlidesOnEachSide = Math.floor(Math.ceil(swiper.params.slidesPerView) / 2);

    // Then get each slide outwards - that is currently in view ...
    while (amountOfSlidesOnEachSide > 0) {
      const nextSlide = slidesArray[centerSlideIndex + amountOfSlidesOnEachSide];
      if (nextSlide) activeSlides.push(nextSlide);
      const prevSlide = slidesArray[centerSlideIndex - amountOfSlidesOnEachSide];
      if (prevSlide) activeSlides.push(prevSlide);
      amountOfSlidesOnEachSide -= 1;
    }
  } else if (
    swiper.params.slidesPerView !== 'auto'
    && swiper.params.slidesPerView > 1
  ) {
    for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      const index = swiper.activeIndex + i;
      if (index > swiper.slides.length) break;
      activeSlides.push(swiper.slides[index]);
    }
  } else {
    activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight) swiper.$wrapperEl.css('height', `${newHeight}px`);
}
