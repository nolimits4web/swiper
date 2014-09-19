/*=========================
  Events
  ===========================*/

//Define Touch Events
var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];

s.touchEvents = {
    start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
    move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
    end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
};

// Attach/detach events
s.events = function (detach) {
    var action = detach ? 'off' : 'on';
    var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container : s.wrapper;
    var target = s.support.touch ? touchEventsTarget : $(document);

    var moveCapture = s.params.nested ? true : false;
    // Touch events
    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
    target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
    target[action](s.touchEvents.end, s.onTouchEnd, false);
    $(window)[action]('resize', s.onResize);

    // Next, Prev, Index
    if (s.params.nextButton) $(s.params.nextButton)[action]('click', s.onClickNext);
    if (s.params.prevButton) $(s.params.prevButton)[action]('click', s.onClickPrev);
    if (s.params.pagination && s.params.paginationClickable) $(s.paginationContainer)[action]('click', '.' + s.params.bulletClass, s.onClickIndex);

    // Prevent Links Clicks
    if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', 'a', s.preventClicks, true);
};
s.attachEvents = function (detach) {
    s.events();
};
s.detachEvents = function () {
    s.events(true);
};