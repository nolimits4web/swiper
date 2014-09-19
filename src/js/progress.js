/*=========================
  Slider/slides progress
  ===========================*/
s.updateSlidesProgress = function (translate) {
    translate = translate || s.translate || 0;
    if (s.slides.length === 0) return;
    if (typeof s.slides[0]._swiperSlideOffset === 'undefined') s.updateSlidesOffset();

    var offsetCenter = s.params.centeredSlides ? -translate + s.size / 2 : -translate;

    for (var i = 0; i < s.slides.length; i++) {
        var slide = s.slides[i];
        var slideCenterOffset = (s.params.centeredSlides === true) ? slide._swiperSlideSize / 2 : 0;
        var slideProgress = (offsetCenter - slide._swiperSlideOffset - slideCenterOffset) / slide._swiperSlideSize;
        slide.progress = slideProgress;
    }
};
s.updateProgress = function (translate) {
    translate = translate || s.translate || 0;
    s.progress = translate / s.maxTranslate();
    if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
    if (s.params.onProgress) s.params.onProgress(s, s.progress);
};
