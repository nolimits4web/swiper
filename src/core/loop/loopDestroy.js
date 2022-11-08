export default function loopDestroy() {
  const swiper = this;
  const { $wrapperEl, params, slides } = swiper;
  $wrapperEl
    .children(
      `.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass},swiper-slide.${params.slideDuplicateClass},swiper-slide.${params.slideBlankClass}`,
    )
    .remove();
  slides.removeAttr('data-swiper-slide-index');
}
