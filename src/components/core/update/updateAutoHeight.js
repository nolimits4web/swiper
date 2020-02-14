export default function(speed) {
  const swiper = this;
  let newHeight = 0;
  let i;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }

  // Find slides currently in view
  let activeSlides = [];
  if (swiper.params.slidesPerView > 1 && swiper.params.centeredSlides) {
    activeSlides = swiper.slides.filter(
      (index, slide) =>
        slide.classList.contains("swiper-slide-active") ||
        slide.classList.contains("swiper-slide-prev") ||
        slide.classList.contains("swiper-slide-next")
    );
  } else if (
    swiper.params.slidesPerView !== "auto" &&
    swiper.params.slidesPerView > 1
  ) {
    for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      const index = swiper.activeIndex + i;
      if (index > swiper.slides.length) break;
      activeSlides.push(swiper.slides.eq(index)[0]);
    }
  } else {
    activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== "undefined") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight) swiper.$wrapperEl.css("height", `${newHeight}px`);
}
