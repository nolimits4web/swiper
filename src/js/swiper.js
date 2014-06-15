'use strict';
/*===========================
Swiper
===========================*/
window.Swiper = function (container, params) {
    var defaults = {
        initialSlide: 0,
        spaceBetween: 0,
        speed: 300,
        slidesPerView: 'auto',
        centeredSlides: false,
        simulateTouch: true,
        direction: 'horizontal',
        pagination: false,
        freeMode: false,
        resistance: true,
        resistanceRatio: 1,
        touchRatio: 1,
        nextButton: undefined,
        prevButton: undefined,
        indexButton: undefined,
        slideClass: 'swiper-slide',
        slideActiveClass: 'swiper-slide-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        slideNextClass: 'swiper-slide-next',
        slidePrevClass: 'swiper-slide-prev',
        wrapperClass: 'swiper-wrapper',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        bulletVisibleClass: 'swiper-pagination-bullet-visible',
        onClick: function () {
            console.log('clicked');
        },
        onTap: function () {
            console.log('tapped');
        },
        onDoubleTap: function () {
            console.log('doubletapped');
        },
        observer: true
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    // Swiper
    var s = this;

    // Params
    s.params = params;

    /*=========================
      Define Container, Wrapper and Pagination
      ===========================*/
    s.container = $(container);
    if (s.container.length === 0) return;
    if (s.container.length > 1) {
        s.container.each(function () {
            new Swiper(this, params);
        });
        return;
    }

    if (s.params.direction === 'vertical') {
        s.container.addClass('swiper-container-vertical');
    }
    else {
        s.container.addClass('swiper-container-horizontal');
    }

    if (s.params.freeMode) {
        s.container.addClass('swiper-container-freemode');
    }

    // Wrapper
    s.wrapper = s.container.children('.' + s.params.wrapperClass);

    // Pagination
    if (s.params.pagination) s.pagination = $(s.params.pagination);

    /*=========================
      RTL
      ===========================*/
    s.rtl = s.container[0].dir.toLowerCase() === 'rtl';

    /*=========================
      Observer
      ===========================*/
    s.observers = [];
    function initObserver(target, attributes, childList, characterData) {
        // create an observer instance
        var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
        var observer = new ObserverFunc(function (mutations) {
            mutations.forEach(function (mutation) {
                s.onResize();
            });
        });
         
        observer.observe(target, {
            attributes: typeof attributes === 'undefined' ? true : attributes,
            childList: typeof childList === 'undefined' ? true : childList,
            characterData: typeof characterData === 'undefined' ? true : characterData
        });

        s.observers.push(observer);
    }
    s.initObservers = function () {
        var containerParents = s.container.parents();
        for (var i = 0; i < containerParents.length; i++) {
            initObserver(containerParents[i]);
        }

        // Observe container
        initObserver(s.container[0]);

        // Observe wrapper
        initObserver(s.wrapper[0], false);
    };
    s.disconnectObservers = function () {
        for (var i = 0; i < s.observers.length; i++) {
            s.observers[i].disconnect();
        }
    };
    
    
    /*=========================
      Is Horizontal
      ===========================*/
    function isH() {
        return s.params.direction === 'horizontal';
    }

    /*=========================
      Define Touch Events
      ===========================*/
    var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
    if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
    if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];

    s.touchEvents = {
        start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
        move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
        end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
    };


    s.updateSize = function () {
        s.width = s.container[0].offsetWidth;
        s.height = s.container[0].offsetHeight;
        s.size = isH() ? s.width : s.height;
    };

    s.updateSlides = function () {
        s.slides = s.wrapper.children('.' + s.params.slideClass);
        s.slidesGrid = [];
        
        var spaceBetween = s.params.spaceBetween;
        if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
            spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
        }
        var slidePosition = 0;
        var virtualWidth = -spaceBetween;
        var i, prevSlideSize = 0;
        for (i = 0; i < s.slides.length; i++) {
            var slideSize = 0;
            if (s.params.slidesPerView === 'auto') {
                slideSize = isH() ? s.slides.eq(i).outerWidth(true) : s.slides.eq(i).outerHeight(true);
            }
            else {
                slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                if (isH()) {
                    s.slides[i].style.width = slideSize + 'px';
                }
                else {
                    s.slides[i].style.height = slideSize + 'px';
                }
            }
            
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                s.slidesGrid.push(slidePosition);
            }
            else {
                s.slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }

            virtualWidth += slideSize + spaceBetween;

            prevSlideSize = slideSize;
        }

        // Remove last grid elements depending on width
        if (!s.params.centeredSlides) {
            var newSlidesGrid = [];
            for (i = 0; i < s.slidesGrid.length; i++) {
                if (s.slidesGrid[i] <= virtualWidth - s.size) {
                    newSlidesGrid.push(s.slidesGrid[i]);
                }
            }
            s.slidesGrid = newSlidesGrid;
            if (virtualWidth - s.size > s.slidesGrid[s.slidesGrid.length - 1]) {
                s.slidesGrid.push(virtualWidth - s.size);
            }
        }
            
        if (s.params.spaceBetween !== 0) {
            if (isH()) {
                if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                else s.slides.css({marginRight: spaceBetween + 'px'});
            }
            else s.slides.css({marginBottom: spaceBetween + 'px'});
        }
    };

    function minTranslate() {
        return (-s.slidesGrid[0]);
    }
    function maxTranslate() {
        return (-s.slidesGrid[s.slidesGrid.length - 1]);
    }

    s.updatePagination = function () {
        if (s.paginationContainer && s.paginationContainer.length > 0) {
            var bulletsHTML = '';
            for (var i = 0; i < s.slides.length - s.params.slidesPerView + 1; i++) {
                bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
            }
            s.paginationContainer.html(bulletsHTML);
            s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
        }
    };

    s.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';

        var target = s.support.touch ? s.container : $(document);

        // Slide between photos
        s.container[action](s.touchEvents.start, s.onTouchStart);
        target[action](s.touchEvents.move, s.onTouchMove);
        target[action](s.touchEvents.end, s.onTouchEnd);
        $(window)[action]('resize', s.onResize);

        // Next, Prev, Index
        if (s.params.nextButton) $(s.params.nextButton)[action]('click', s.onClickNext);
        if (s.params.prevButton) $(s.params.prevButton)[action]('click', s.onClickPrev);
        if (s.params.indexButton) $(s.params.indexButton)[action]('click', s.onClickIndex);
    };
    s.detachEvents = function () {
        s.attachEvents(true);
    };

    s.onResize = function () {
        s.updateSize();
        s.updateSlides();
        s.slideTo(s.activeSlideIndex, 0, false);
    };

    var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, currentTranslate, animating = false;
    var lastClickTime = Date.now(), clickTimeout;
    s.allowClick = true;

    s.onTouchStart = function (e) {
        isTouched = true;
        isMoved = false;
        isScrolling = undefined;
        touchesStart.x = touchesCurrent.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = touchesCurrent.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = Date.now();
        s.allowClick = true;
        s.updateSize();
        if (s.params.onTouchStart) s.params.onTouchStart(s, e);
        if (e.type === 'mousedown') e.preventDefault();
    };
    s.onTouchMove = function (e) {
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
            currentTranslate = s.getWrapperTranslate();
            s.wrapperTransition(0);
            if (animating) s.onSlideChangeEnd();
        }
        isMoved = true;

        var diff = isH() ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;

        diff = diff * s.params.touchRatio;
        if (s.rtl) diff = -diff;

        var translate = diff + currentTranslate;
        if (s.params.resistance) {
            if ((diff > 0 && translate > minTranslate())) {
                translate = minTranslate() + Math.pow(-minTranslate() + currentTranslate + diff, 0.85) * s.params.resistanceRatio;
            }
            else if (diff < 0 && translate < maxTranslate()) {
                translate = maxTranslate() - Math.pow(maxTranslate() - currentTranslate - diff, 0.85) * s.params.resistanceRatio;
            }
        }

        s.wrapperTranslate(translate);
    };
    s.onTouchEnd = function (e) {
        if (s.params.onTouchEnd) s.params.onTouchEnd(s, e);
        var touchEndTime = Date.now();
        var timeDiff = touchEndTime - touchStartTime;
        if (s.allowClick) {
            if (s.params.onTap) s.params.onTap(s, e);
            if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                if (clickTimeout) clearTimeout(clickTimeout);
                clickTimeout = setTimeout(function () {
                    if (s.params.paginationHide && s.paginationContainer) {
                        s.paginationContainer.toggleClass('slider-pagination-hidden');
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
        s.allowClick = true;

        if (!isTouched || !isMoved) {
            isTouched = isMoved = false;
            return;
        }
        isTouched = isMoved = false;
        var touchesDiff = isH() ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;
        if (s.rtl) touchesDiff = -touchesDiff;

        if (touchesDiff === 0) {
            return;
        }
        var skipSlides = 1;
        var slideSize = s.size / s.params.slidesPerView;
        if (s.params.slidesPerView > 1) {
            skipSlides = Math.abs((Math.abs(touchesDiff) + slideSize / 2) / slideSize);
        }

        if (timeDiff > 300) {
            // Long touches
            if (touchesDiff <= -slideSize / 2) {
                s.slideTo(s.activeSlideIndex + Math.floor(skipSlides));
            }
            else if (touchesDiff > slideSize / 2) {
                s.slideTo(s.activeSlideIndex - Math.floor(skipSlides));
            }
            else {
                s.slideReset();
            }
        }
        else {
            if (Math.abs(touchesDiff) < 10) {
                s.slideReset();
            }
            else {
                if (touchesDiff < 0) {
                    s.slideTo(s.activeSlideIndex + Math.round(skipSlides));
                }
                else {
                    s.slideTo(s.activeSlideIndex - Math.round(skipSlides));
                }
            }
                
        }
    };

    s.slideTo = function (index, speed, runCallbacks) {
        if (typeof index === 'undefined') index = 0;
        if (index < 0) index = 0;
        if (index >= s.slidesGrid.length) index = s.slidesGrid.length - 1;
        // var translate = - (s.size + s.params.spaceBetween) * index / s.params.slidesPerView;
        var translate = - s.slidesGrid[index];

        if (typeof speed === 'undefined') speed = s.params.speed;
        s.previousActiveSlideIndex = s.activeSlideIndex;
        s.activeSlideIndex = index;
        s.isFirst = s.activeSlideIndex === 0;
        s.isLast = translate === -s.slidesGrid[s.slidesGrid.length - 1];
        s.onSlideChangeStart();
        var translateX = isH() ? translate : 0, translateY = isH() ? 0 : translate;
        if (speed === 0) {
            s.wrapperTransition(0);
            s.wrapperTranslate(translate);
            if (runCallbacks !== false) s.onSlideChangeEnd();
        }
        else {
            animating = true;
            s.wrapperTransition(speed);
            s.wrapperTranslate(translate);
            s.wrapper.transitionEnd(function () {
                if (runCallbacks !== false) s.onSlideChangeEnd();
            });
        }
    };
    s.updateClasses = function () {
        s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
        var activeSlide = s.slides.eq(s.activeSlideIndex);
        activeSlide.addClass(s.params.slideActiveClass);
        activeSlide.next().addClass(s.params.slideNextClass);
        activeSlide.prev().addClass(s.params.slidePrevClass);

        if (s.bullets && s.bullets.length > 0) {
            s.bullets.removeClass(s.params.bulletActiveClass);
            s.bullets.eq(s.activeSlideIndex).addClass(s.params.bulletActiveClass);
        }
    };
    s.onSlideChangeStart = function () {
        s.updateClasses();
        if (s.params.onSlideChangeStart) s.params.onSlideChangeStart(s);
    };
    s.onSlideChangeEnd = function () {
        animating = false;
        s.wrapperTransition(0);
        if (s.params.onSlideChangeEnd) s.params.onSlideChangeEnd(s);
    };
    s.slideNext = function () {
        s.slideTo(s.activeSlideIndex + 1);
    };
    s.slidePrev = function () {
        s.slideTo(s.activeSlideIndex - 1);
    };
    s.slideReset = function () {
        s.slideTo(s.activeSlideIndex);
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

    // Translate/transition helpers
    s.wrapperTransition = function (duration) {
        s.wrapper.transition(duration);
    };
    s.wrapperTranslate = function (x, y, z) {
        if (arguments.length === 1) {
            x = isH() ? x : 0;
            y = isH() ? 0 : x;
            z = 0;
        }
        else {
            x = x || 0;
            y = y || 0;
            z = z || 0;
        }
        if (s.rtl) x = -x;
        if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
        else if (s.support.transforms) s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
    };

    s.getTranslate = function (el, axis) {
        var matrix, curTransform, curStyle, transformMatrix;

        // automatic axis detection
        if (typeof axis === 'undefined') {
            axis = 'x';
        }

        curStyle = window.getComputedStyle(el, null);
        if (window.WebKitCSSMatrix) {
            // Some old versions of Webkit choke when 'none' is passed; pass
            // empty string instead in this case
            transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
        }
        else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
            matrix = transformMatrix.toString().split(',');
        }

        if (axis === 'x') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m41;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[12]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[4]);
        }
        if (axis === 'y') {
            //Latest Chrome and webkits Fix
            if (window.WebKitCSSMatrix)
                curTransform = transformMatrix.m42;
            //Crazy IE10 Matrix
            else if (matrix.length === 16)
                curTransform = parseFloat(matrix[13]);
            //Normal Browsers
            else
                curTransform = parseFloat(matrix[5]);
        }
        if (s.rtl && curTransform) curTransform = -curTransform;
        return curTransform || 0;
    };
    s.getWrapperTranslate = function (axis) {
        if (typeof axis === 'undefined') {
            axis = isH() ? 'x' : 'y';
        }
        return s.getTranslate(s.wrapper[0], axis);
    };

    // init
    s.init = function () {
        s.updateSize();
        s.updateSlides();
        s.updatePagination();
        s.slideTo(s.params.initialSlide, 0);
        s.attachEvents();
        if (s.params.observer && s.support.observer) {
            s.initObservers();
        }
    };

    // Destroy
    s.destroy = function () {
        s.detachEvents();
        s.disconnectObservers();
        if (s.params.onDestroy) s.params.onDestroy();
        s = undefined;
    };

    s.init();

    return s;
};
    