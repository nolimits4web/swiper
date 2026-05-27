import type { Swiper } from '../core';

const toggleSlideClasses = (slideEl: HTMLElement, condition: boolean, className: string): void => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};

export default function updateSlidesProgress(
  this: Swiper,
  translate: number = (this && this.translate) || 0,
): void {
  const swiper = this;
  const params = swiper.params;

  const { slides, rtlTranslate: rtl, snapGrid } = swiper;

  if (slides.length === 0) return;
  if (typeof slides[0]!.swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();

  let offsetCenter = -translate;
  if (rtl) offsetCenter = translate;

  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];

  let spaceBetween: number | string = params.spaceBetween!;
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiper.size;
  } else if (typeof spaceBetween === 'string') {
    spaceBetween = parseFloat(spaceBetween);
  }

  for (let i = 0; i < slides.length; i += 1) {
    const slide = slides[i]!;
    let slideOffset = slide.swiperSlideOffset ?? 0;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0]!.swiperSlideOffset ?? 0;
    }

    const slideSize = slide.swiperSlideSize ?? 0;
    const slideProgress =
      (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) /
      (slideSize + (spaceBetween as number));
    const originalSlideProgress =
      (offsetCenter -
        snapGrid[0]! +
        (params.centeredSlides ? swiper.minTranslate() : 0) -
        slideOffset) /
      (slideSize + (spaceBetween as number));
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i]!;

    const isFullyVisible =
      slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i]!;

    const isVisible =
      (slideBefore >= 0 && slideBefore < swiper.size - 1) ||
      (slideAfter > 1 && slideAfter <= swiper.size) ||
      (slideBefore <= 0 && slideAfter >= swiper.size);
    if (isVisible) {
      swiper.visibleSlides.push(slide);
      swiper.visibleSlidesIndexes.push(i);
    }
    toggleSlideClasses(slide, isVisible, params.slideVisibleClass!);
    toggleSlideClasses(slide, isFullyVisible, params.slideFullyVisibleClass!);
    slide.progress = rtl ? -slideProgress : slideProgress;
    slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}
