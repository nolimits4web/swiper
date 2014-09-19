/*=========================
  Handle Touches
  ===========================*/
function findElementInEvent(e, selector) {
    var el = $(e.target);
    if (!el.is(selector)) {
        if (typeof selector === 'string') {
            el = el.parents(selector);
        }
        else if (selector.nodeType) {
            var found;
            el.parents().each(function (index, _el) {
                if (_el === selector) found = selector;
            });
            if (!found) return undefined;
            else return selector;
        }
    }
    if (el.length === 0) {
        return undefined;
    }
    return el[0];
}
s.updateClickedSlide = function (e) {
    var slide = findElementInEvent(e, '.' + s.params.slideClass);
    if (!slide) {
        s.clickedSlide = s.clickedSlideIndex = undefined;
    }
    else {
        s.clickedSlide = slide;
        s.clickedSlideIndex = $(slide).index();
    }
};

var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, currentTranslate, startTranslate, allowThresholdMove;
s.animating = false;
var lastClickTime = Date.now(), clickTimeout;

// Form elements to match
var formElements = 'input, select, textarea, button';

// Touch handlers
s.onTouchStart = function (e) {
    if (e.type === 'mousedown' && 'which' in e && e.which === 3) return;
    if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) return;
    if (s.params.swipeHandler) {
        if (!findElementInEvent(e, s.params.swipeHandler)) return;
    }
    isTouched = true;
    isMoved = false;
    isScrolling = undefined;
    touchesStart.x = touchesCurrent.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = touchesCurrent.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = Date.now();
    s.allowClick = true;
    s.updateContainerSize();
    s.swipeDirection = undefined;
    if (s.params.threshold > 0) allowThresholdMove = false;
    if (e.type === 'mousedown') {
        var preventDefault = true;
        if ($(e.target).is(formElements)) preventDefault = false;
        if (document.activeElement && $(document.activeElement).is(formElements)) document.activeElement.blur();
    }
    if (s.params.onTouchStart) s.params.onTouchStart(s, e);
};
s.onTouchMove = function (e) {
    if (e.preventedByNestedSwiper) return;
    if (s.params.onlyExternal) {
        isMoved = true;
        s.allowClick = false;
        return;
    }
    if (s.params.onTouchMove) s.params.onTouchMove(s, e);
    s.allowClick = false;
    if (!isTouched) return;
    if (e.targetTouches && e.targetTouches.length > 1) return;
    
    touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(touchesCurrent.y - touchesStart.y) > Math.abs(touchesCurrent.x - touchesStart.x));
    }
    if ((isH() && isScrolling) || (!isH() && !isScrolling))  {
        isTouched = false;
        return;
    }
    if (s.params.onSliderMove) s.params.onSliderMove(s, e);

    e.preventDefault();

    if (!isMoved) {
        startTranslate = s.getWrapperTranslate();
        s.setWrapperTransition(0);
        if (s.animating) s.onTransitionEnd();
        //Grab Cursor
        if (s.params.grabCursor) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = '-webkit-grabbing';
            s.container[0].style.cursor = '-moz-grabbin';
            s.container[0].style.cursor = 'grabbing';
        }
    }
    isMoved = true;

    var diff = isH() ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;

    diff = diff * s.params.touchRatio;
    if (s.rtl) diff = -diff;

    s.swipeDirection = diff > 0 ? 'prev' : 'next';
    currentTranslate = diff + startTranslate;

    var disableParentSwiper = true;
    if ((diff > 0 && currentTranslate > s.minTranslate())) {
        disableParentSwiper = false;
        if (s.params.resistance) currentTranslate = s.minTranslate() + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
    }
    else if (diff < 0 && currentTranslate < s.maxTranslate()) {
        disableParentSwiper = false;
        if (s.params.resistance) currentTranslate = s.maxTranslate() - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
    }
    
    if (disableParentSwiper) {
        e.preventedByNestedSwiper = true;
    }

    // Directions locks
    if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
        currentTranslate = startTranslate;
    }
    if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
        currentTranslate = startTranslate;
    }
    
    if (!s.params.followFinger) return;

    // Threshold
    if (s.params.threshold > 0) {
        if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
            if (!allowThresholdMove) {
                allowThresholdMove = true;
                touchesStart.x = touchesCurrent.x;
                touchesStart.y = touchesCurrent.y;
                currentTranslate = startTranslate;
                return;
            }
        }
        else {
            currentTranslate = startTranslate;
            return;
        }
    }
    // Update progress
    s.updateProgress(currentTranslate);
    // Update translate
    s.setWrapperTranslate(currentTranslate);
};
s.onTouchEnd = function (e) {
    if (!isTouched) return;
    if (s.params.onTouchEnd) s.params.onTouchEnd(s, e);

    //Return Grab Cursor
    if (s.params.grabCursor) {
        s.container[0].style.cursor = 'move';
        s.container[0].style.cursor = '-webkit-grab';
        s.container[0].style.cursor = '-moz-grab';
        s.container[0].style.cursor = 'grab';
    }

    // Time diff
    var touchEndTime = Date.now();
    var timeDiff = touchEndTime - touchStartTime;

    // Tap, doubleTap, Click
    if (s.allowClick) {
        s.updateClickedSlide(e);
        if (s.params.onTap) s.params.onTap(s, e);
        if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
            if (clickTimeout) clearTimeout(clickTimeout);
            clickTimeout = setTimeout(function () {
                if (!s) return;
                if (s.params.paginationHide && s.paginationContainer.length > 0) {
                    s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                }
                if (s.params.onClick) s.params.onClick(s, e);
            }, 300);
            
        }
        if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
            if (clickTimeout) clearTimeout(clickTimeout);
            if (s.params.onDoubleTap) {
                s.params.onDoubleTap(s, e);
            }
        }
    }

    lastClickTime = Date.now();
    setTimeout(function () {
        if (s && s.allowClick) s.allowClick = true;
    }, 0);

    var touchesDiff = isH() ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;

    if (!isTouched || !isMoved || !s.swipeDirection || touchesDiff === 0 || currentTranslate === startTranslate) {
        isTouched = isMoved = false;
        return;
    }
    isTouched = isMoved = false;

    var currentPos;
    if (s.params.followFinger) {
        currentPos = s.rtl ? s.translate : -s.translate;
    }
    else {
        currentPos = -currentTranslate;
    }

    // Find current slide
    var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
    for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
        if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
            if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                stopIndex = i;
                groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
            }
        }
        else {
            if (currentPos >= s.slidesGrid[i]) {
                stopIndex = i;
                groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
            }
        }
    }

    // Find current slide size
    var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
    
    if (timeDiff > 300) {
        // Long touches
        if (!s.params.longSwipes) {
            s.slideTo(s.activeIndex);
            return;
        }
        if (s.swipeDirection === 'next') {
            if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
            else s.slideTo(stopIndex);

        }
        if (s.swipeDirection === 'prev') {
            if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
            else s.slideTo(stopIndex);
        }
    }
    else {
        // Short swipes
        if (!s.params.shortSwipes) {
            s.slideTo(s.activeIndex);
            return;
        }
        if (s.swipeDirection === 'next') {
            s.slideTo(stopIndex + s.params.slidesPerGroup);

        }
        if (s.swipeDirection === 'prev') {
            s.slideTo(stopIndex);
        }
    }
};