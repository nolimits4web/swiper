export default function (speed) {
  const swiper = this;

  // Helper function to get all active slides when the layout is centered:
  const getActiveSlidesWhenCentered = () => {
    const activeSlides = [];
    let centerSlideIndex = 0;
    const slidesArray = Array.from(swiper.slides);

    // First, get the center slide:
    slidesArray.forEach((slide, index) => {
      if (slide.classList.contains('swiper-slide-active')) {
        activeSlides.push(slide);
        centerSlideIndex = index;
      }
    });
    let amountOfSlidesOnEachSide = Math.floor(
      Math.ceil(swiper.params.slidesPerView) / 2
    );

    // Then get each slide inwards from the bounds of the view:
    while (amountOfSlidesOnEachSide > 0) {
      const nextSlide = slidesArray[
        centerSlideIndex + amountOfSlidesOnEachSide
      ];
      if (nextSlide) activeSlides.push(nextSlide);
      const prevSlide = slidesArray[
        centerSlideIndex - amountOfSlidesOnEachSide
      ];
      if (prevSlide) activeSlides.push(prevSlide);
      amountOfSlidesOnEachSide -= 1;
    }

    return activeSlides;
  };

  // Helper function to get all active slides:
  const getActiveSlides = () => {
    const activeSlides = [];
    for (let i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      const index = swiper.activeIndex + i;
      if (index > swiper.slides.length) break;
      activeSlides.push(swiper.slides[index]);
    }
  };

  if (typeof speed === 'number') {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }

  // Find slides currently in view
  let activeSlides = [swiper.slides.eq(swiper.activeIndex)[0]];
  if (
    swiper.params.slidesPerView !== 'auto'
    && swiper.params.slidesPerView > 1
  ) {
    activeSlides = swiper.params.centeredSlides
      ? getActiveSlidesWhenCentered()
      : getActiveSlides();
  }

  // Find new max height from highest slide in view
  const maxHeight = activeSlides.reduce((accum, slide) => {
    return accum < slide.offsetHeight
      ? slide.offsetHeight
      : accum;
  }, 0);

  // Update Height
  if (maxHeight) swiper.$wrapperEl.css('height', `${maxHeight}px`);
}
