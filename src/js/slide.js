s.slideTo = function (slideIndex, speed, runCallbacks) {
    if (typeof slideIndex === 'undefined') slideIndex = 0;
    if (slideIndex < 0) slideIndex = 0;
    s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
    if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
    
    var translate = - s.snapGrid[s.snapIndex];

    // Update progress
    s.updateProgress(translate);

    // Normalize slideIndex
    for (var i = 0; i < s.slidesGrid.length; i++) {
        if (- translate >= s.slidesGrid[i]) {
            slideIndex = i;
        }
    }

    if (typeof speed === 'undefined') speed = s.params.speed;
    s.previousIndex = s.activeIndex || 0;
    s.activeIndex = slideIndex;
    // s.isFirst = s.activeIndex === 0;
    // s.isLast = translate === -s.snapGrid[s.snapGrid.length - 1];
    if (runCallbacks !== false) s.onTransitionStart();
    var translateX = isH() ? translate : 0, translateY = isH() ? 0 : translate;
    if (speed === 0) {
        s.setWrapperTransition(0);
        s.setWrapperTranslate(translate);
        if (runCallbacks !== false) s.onTransitionEnd();
    }
    else {
        s.animating = true;
        s.setWrapperTransition(speed);
        s.setWrapperTranslate(translate);
        s.wrapper.transitionEnd(function () {
            if (runCallbacks !== false) s.onTransitionEnd();
        });
    }
    s.updateClasses();
};

s.onTransitionStart = function () {
    if (s.params.onTransitionStart) s.params.onTransitionStart(s);
    if (s.params.onSlideChangeStart && s.activeIndex !== s.previousIndex) s.params.onSlideChangeStart(s);
};
s.onTransitionEnd = function () {
    s.animating = false;
    s.setWrapperTransition(0);
    if (s.params.onTransitionEnd) s.params.onTransitionEnd(s);
    if (s.params.onSlideChangeEnd && s.activeIndex !== s.previousIndex) s.params.onSlideChangeEnd(s);
};

s.slideNext = function () {
    s.slideTo(s.activeIndex + s.params.slidesPerGroup);
};
s.slidePrev = function () {
    s.slideTo(s.activeIndex - 1);
};
s.slideReset = function () {
    s.slideTo(s.activeIndex);
};