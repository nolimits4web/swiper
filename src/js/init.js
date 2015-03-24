/*=========================
  Init/Destroy
  ===========================*/
s.init = function () {
    if (s.params.loop) s.createLoop();
    s.updateContainerSize();
    s.updateSlidesSize();
    s.updatePagination();
    if (s.params.scrollbar && s.scrollbar) {
        s.scrollbar.set();
    }
    if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
        if (!s.params.loop) s.updateProgress();
        s.effects[s.params.effect].setTranslate();
    }
    if (s.params.loop) {
        s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
    }
    else {
        s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
        if (s.params.initialSlide === 0) {
            if (s.parallax && s.params.parallax) s.parallax.setTranslate();
            if (s.lazy && s.params.lazyLoading) s.lazy.load();
        }
    }
    s.attachEvents();
    if (s.params.observer && s.support.observer) {
        s.initObservers();
    }
    if (s.params.preloadImages && !s.params.lazyLoading) {
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
    if (s.params.a11y && s.a11y) s.a11y.init();
    s.emit('onInit', s);
};

// Detach dynamic classNames
s.detachClassNames = function () {
    // Container
    s.container.removeClass(s.classNames.join(' '));

    // Slides
    if (s.slides.length) {
        s.slides.removeClass([
          s.params.slideVisibleClass,
          s.params.slideActiveClass,
          s.params.slideNextClass,
          s.params.slidePrevClass
        ].join(' '));
    }

    // Bullets
    if (s.bullets.length) {
        s.bullets.removeClass([
          s.params.bulletActiveClass,
          s.params.buttonDisabledClass
        ].join(' '));
    }
};

// Cleanup dynamic styles
s.cleanupStyles = function () {
    s.container.removeAttr('style');
    s.wrapper.removeAttr('style');

    if (s.params.scrollbar) {
        s.scrollbar.track.removeAttr('style');
        s.scrollbar.drag.removeAttr('style');
    }

    if (s.slides.length) s.slides.removeAttr('style');
};

// Destroy
s.destroy = function (deleteInstance) {
    s.detachEvents();
    s.stopAutoplay();

    s.detachClassNames();
    s.cleanupStyles();

    if (s.params.loop) {
        s.destroyLoop();
    }

    s.disconnectObservers();
    if (s.params.keyboardControl) {
        if (s.disableKeyboardControl) s.disableKeyboardControl();
    }
    if (s.params.mousewheelControl) {
        if (s.disableMousewheelControl) s.disableMousewheelControl();
    }
    if (s.params.a11y && s.a11y) s.a11y.destroy();
    s.emit('onDestroy');
    if (deleteInstance !== false) s = null;
};

s.init();
