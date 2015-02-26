/*=========================
  Mousewheel Control
  ===========================*/
s._wheelEvent = false;
s._lastWheelScrollTime = (new Date()).getTime();
if (s.params.mousewheelControl) {
    if (document.onmousewheel !== undefined) {
        s._wheelEvent = 'mousewheel';
    }
    if (!s._wheelEvent) {
        try {
            new WheelEvent('wheel');
            s._wheelEvent = 'wheel';
        } catch (e) {}
    }
    if (!s._wheelEvent) {
        s._wheelEvent = 'DOMMouseScroll';
    }
}
function handleMousewheel(e) {
    if (e.originalEvent) e = e.originalEvent; //jquery fix
    var we = s._wheelEvent;
    var delta = 0;
    //Opera & IE
    if (e.detail) delta = -e.detail;
    //WebKits
    else if (we === 'mousewheel') {
        if (s.params.mousewheelForceToAxis) {
            if (isH()) {
                if (Math.abs(e.wheelDeltaX) > Math.abs(e.wheelDeltaY)) delta = e.wheelDeltaX;
                else return;
            }
            else {
                if (Math.abs(e.wheelDeltaY) > Math.abs(e.wheelDeltaX)) delta = e.wheelDeltaY;
                else return;
            }
        }
        else {
            delta = e.wheelDelta;
        }
    }
    //Old FireFox
    else if (we === 'DOMMouseScroll') delta = -e.detail;
    //New FireFox
    else if (we === 'wheel') {
        if (s.params.mousewheelForceToAxis) {
            if (isH()) {
                if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) delta = -e.deltaX;
                else return;
            }
            else {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) delta = -e.deltaY;
                else return;
            }
        }
        else {
            delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? - e.deltaX : - e.deltaY;
        }
    }

    if (!s.params.freeMode) {
        if ((new Date()).getTime() - s._lastWheelScrollTime > 60) {
            if (delta < 0) s.slideNext();
            else s.slidePrev();
        }
        s._lastWheelScrollTime = (new Date()).getTime();

    }
    else {
        //Freemode or scrollContainer:
        var position = s.getWrapperTranslate() + delta;

        if (position > 0) position = 0;
        if (position < s.maxTranslate()) position = s.maxTranslate();

        s.setWrapperTransition(0);
        s.setWrapperTranslate(position);
        s.updateProgress();
        s.updateActiveIndex();

        // Return page scroll on edge positions
        if (position === 0 || position === s.maxTranslate()) return;
    }
    if (s.params.autoplay) s.stopAutoplay();

    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;
    return false;
}
s.disableMousewheelControl = function () {
    if (!s._wheelEvent) return false;
    s.container.off(s._wheelEvent, handleMousewheel);
    return true;
};

s.enableMousewheelControl = function () {
    if (!s._wheelEvent) return false;
    s.container.on(s._wheelEvent, handleMousewheel);
    return true;
};