/*=========================
  Handle Clicks
  ===========================*/

// Prevent Clicks
s.allowClick = true;
s.preventClicks = function (e) {
    if (!s.allowClick) {
        if (s.params.preventClicks) e.preventDefault();
        if (s.params.preventClicksPropagation) {
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }
};
// Clicks
s.onClickNext = function (e) {
    e.preventDefault();
    s.slideNext();
};
s.onClickPrev = function (e) {
    e.preventDefault();
    s.slidePrev();
};
s.onClickIndex = function (e) {
    e.preventDefault();
    s.slideTo($(this).index());
};
