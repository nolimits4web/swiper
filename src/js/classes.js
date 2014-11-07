/*=========================
  Classes
  ===========================*/
s.updateClasses = function () {
    s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
    var activeSlide = s.slides.eq(s.activeIndex);

    // Active classes
    activeSlide.addClass(s.params.slideActiveClass);
    activeSlide.next().addClass(s.params.slideNextClass);
    activeSlide.prev().addClass(s.params.slidePrevClass);

    // Pagination
    if (s.bullets && s.bullets.length > 0) {
        s.bullets.removeClass(s.params.bulletActiveClass);
        s.bullets.eq(s.snapIndex || s.activeIndex || 0).addClass(s.params.bulletActiveClass);
    }

    // Next/active buttons
    if (s.params.prevButton) {
        if (s.isBeginning) $(s.params.prevButton).addClass(s.params.buttonDisabledClass);
        else $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
    }
    if (s.params.nextButton) {
        if (s.isEnd) $(s.params.nextButton).addClass(s.params.buttonDisabledClass);
        else $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
    }

};
