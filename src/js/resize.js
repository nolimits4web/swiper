/*=========================
  Resize Handler
  ===========================*/
s.onResize = function () {
    s.updateContainerSize();
    s.updateSlidesSize();
    s.updateProgress();
    s.updateClasses();
    if (s.params.slidesPerView === 'auto') s.updatePagination();
    if (s.isEnd) {
        s.slideTo(s.slides.length - 1, 0, false);
    }
    else {
        s.slideTo(s.activeIndex, 0, false);
    }
    
};