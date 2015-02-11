/*=========================
  Init/Destroy
  ===========================*/
s.init = function () {
    if (s.params.loop) s.createLoop();
    s.updateContainerSize();
    s.updateSlidesSize();
    s.updatePagination();
    if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.init();
    }
    if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        if (!s.params.loop) s.updateProgress();
        s.effects[s.params.effect].setTranslate();
    }
    if (s.params.loop) {
        s.slideTo(s.params.initialSlide + s.loopedSlides, 0, false);
    }
    else {
        s.slideTo(s.params.initialSlide, 0, false);
    }
    s.attachEvents();
    if (s.params.observer && s.support.observer) {
        s.initObservers();
    }
    if (s.params.updateOnImagesReady) {
        s.preloadImages();
    }
    if (s.params.autoplay) {
        s.startAutoplay();
    }
    if (s.params.keyboardControl) {
        if (s.enableKeyboardControl) s.enableKeyboardControl();
    }
    if (s.params.mousewheelControl) {
        if (s.enableMousewheelControl) s.enableMousewheelControl();
    }
    if (s.params.hashnav) {
        if (s.hashnav) s.hashnav.init();
    }
};

// Destroy
s.destroy = function (deleteInstance) {
    s.detachEvents();
    s.disconnectObservers();
    if (s.params.keyboardControl) {
        if (s.disableKeyboard) s.disableKeyboard();
    }
    if (s.params.mousewheelControl) {
        if (s.disableMousewheel) s.disableMousewheel();
    }
    if (s.params.onDestroy) s.params.onDestroy();
    if (deleteInstance !== false) s = null;
};

s.init();

