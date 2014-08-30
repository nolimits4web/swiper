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
        slidesPerGroup: 1,
        centeredSlides: false,
        simulateTouch: true,
        direction: 'horizontal',
        pagination: undefined,
        freeMode: false,
        resistance: true,
        resistanceRatio: 0.85,
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
        onSlideChangeStart: function () {
            console.log('slidechangestart');
        },
        onSlideChangeEnd: function () {
            console.log('slidechangeend');
        },
        onTransitionStart: function () {
            console.log('transitionstart');
        },
        onTransitionEnd: function () {
            console.log('transitionend');
        },
        observer: true,
        observeParents: true,
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
    if (s.params.pagination) s.paginationContainer = $(s.params.pagination);

    // RTL
    s.rtl = s.container[0].dir.toLowerCase() === 'rtl';

    // Translate
    s.translate = 0;

    // Progress
    s.progress = 0;

    /*=========================
      Observer
      ===========================*/
    s.observers = [];
    function initObserver(target, options) {
        options = options || {};
        // create an observer instance
        var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
        var observer = new ObserverFunc(function (mutations) {
            mutations.forEach(function (mutation) {
                s.onResize();
            });
        });
         
        observer.observe(target, {
            attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
            childList: typeof options.childList === 'undefined' ? true : options.childList,
            characterData: typeof options.characterData === 'undefined' ? true : options.characterData
        });

        s.observers.push(observer);
    }
    s.initObservers = function () {
        if (s.params.observeParents) {
            var containerParents = s.container.parents();
            for (var i = 0; i < containerParents.length; i++) {
                initObserver(containerParents[i]);
            }
        }

        // Observe container
        initObserver(s.container[0]);

        // Observe wrapper
        initObserver(s.wrapper[0], {attributes: false});
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
    if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
    else if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];

    s.touchEvents = {
        start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
        move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : desktopEvents[1],
        end : s.support.touch || !s.params.simulateTouch ? 'touchend' : desktopEvents[2]
    };


    s.updateContainerSize = function () {
        s.width = s.container[0].offsetWidth;
        s.height = s.container[0].offsetHeight;
        s.size = isH() ? s.width : s.height;
    };

    s.updateSlidesSize = function () {
        s.slides = s.wrapper.children('.' + s.params.slideClass);
        s.snapGrid = [];
        s.slidesGrid = [];
        s.slidesSizesGrid = [];
        
        var spaceBetween = s.params.spaceBetween,
            slidePosition = 0,
            i,
            prevSlideSize = 0,
            index = 0;
        if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
            spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
        }

        s.virtualWidth = -spaceBetween;
        // reset margins
        if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
        else s.slides.css({marginRight: '', marginBottom: ''});

        // Calc slides
        for (i = 0; i < s.slides.length; i++) {
            var slideSize = 0;
            var slide = s.slides.eq(i);
            if (slide.css('display') === 'none') continue;
            if (s.params.slidesPerView === 'auto') {
                slideSize = isH() ? slide.outerWidth(true) : slide.outerHeight(true);
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
            
            s.slidesSizesGrid.push(slideSize);
            
            
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                s.slidesGrid.push(slidePosition);
            }
            else {
                if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                s.slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }

            s.virtualWidth += slideSize + spaceBetween;

            prevSlideSize = slideSize;

            index ++;
        }

        // Remove last grid elements depending on width
        if (!s.params.centeredSlides) {
            var newSlidesGrid = [];
            for (i = 0; i < s.snapGrid.length; i++) {
                if (s.snapGrid[i] <= s.virtualWidth - s.size) {
                    newSlidesGrid.push(s.snapGrid[i]);
                }
            }
            s.snapGrid = newSlidesGrid;
            if (Math.floor(s.virtualWidth - s.size) > Math.floor(s.snapGrid[s.snapGrid.length - 1])) {
                s.snapGrid.push(s.virtualWidth - s.size);
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

    s.layout = function () {
        s.updateContainerSize();
        s.updateSlidesSize();
        s.updatePagination();
        s.updateClasses();
    };

    s.minTranslate = function () {
        return (-s.snapGrid[0]);
    };
    s.maxTranslate = function () {
        return (-s.snapGrid[s.snapGrid.length - 1]);
    };

    s.updatePagination = function () {
        if (!s.params.pagination) return;
        if (s.paginationContainer && s.paginationContainer.length > 0) {
            var bulletsHTML = '';
            var numberOfBullets = s.snapGrid.length;
            for (var i = 0; i < numberOfBullets; i++) {
                bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
            }
            s.paginationContainer.html(bulletsHTML);
            s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
        }
    };
    s.events = function (detach) {
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
    s.attachEvents = function (detach) {
        s.events();
    };
    s.detachEvents = function () {
        s.events(true);
    };

    s.onResize = function () {
        s.updateContainerSize();
        s.updateSlidesSize();
        if (s.params.slidesPerView === 'auto') s.updatePagination();
        if (s.isLast) {
            s.slideTo(s.slides.length - 1, 0, false);
        }
        else {
            s.slideTo(s.activeIndex, 0, false);
        }
        
    };

    var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, currentTranslate;
    s.animating = false;
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
        s.updateContainerSize();
        s.slideDirection = undefined;
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
            s.setWrapperTransition(0);
            if (s.animating) s.onTransitionEnd();
        }
        isMoved = true;

        var diff = isH() ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;

        diff = diff * s.params.touchRatio;
        if (s.rtl) diff = -diff;

        s.slideDirection = diff > 0 ? 'prev' : 'next';

        var translate = diff + currentTranslate;
        if (s.params.resistance) {
            if ((diff > 0 && translate > s.minTranslate())) {
                translate = s.minTranslate() + Math.pow(-s.minTranslate() + currentTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && translate < s.maxTranslate()) {
                translate = s.maxTranslate() - Math.pow(s.maxTranslate() - currentTranslate - diff, s.params.resistanceRatio);
            }
        }

        s.progress = translate / s.maxTranslate();
        s.setWrapperTranslate(translate);
    };
    s.onTouchEnd = function (e) {
        if (s.params.onTouchEnd) s.params.onTouchEnd(s, e);
        var touchEndTime = Date.now();
        var timeDiff = touchEndTime - touchStartTime;
        // Tap, doubleTap, Click
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

        var currentPos = s.rtl ? s.translate : -s.translate;

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
            if (s.slideDirection === 'next') {
                if (ratio >= 0.5) s.slideTo(stopIndex + s.params.slidesPerGroup);
                else s.slideTo(stopIndex);

            }
            if (s.slideDirection === 'prev') {
                if (ratio > 0.5) s.slideTo(stopIndex + s.params.slidesPerGroup);
                else s.slideTo(stopIndex);
            }
        }
        else {
            if (s.slideDirection === 'next') {
                s.slideTo(stopIndex + s.params.slidesPerGroup);

            }
            if (s.slideDirection === 'prev') {
                s.slideTo(stopIndex);
            }
        }
    };
    s.slideTo = function (slideIndex, speed, runCallbacks) {
        if (typeof slideIndex === 'undefined') slideIndex = 0;
        if (slideIndex < 0) slideIndex = 0;
        s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
        if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
        var translate = - s.snapGrid[s.snapIndex];

        // Update progress
        s.progress = translate / s.maxTranslate();

        // Normalize slideIndex
        for (var i = 0; i < s.slidesGrid.length; i++) {
            if (- translate >= s.slidesGrid[i]) {
                slideIndex = i;
            }
        }

        if (typeof speed === 'undefined') speed = s.params.speed;
        s.previousIndex = s.activeIndex || 0;
        s.activeIndex = slideIndex;
        s.isFirst = s.activeIndex === 0;
        s.isLast = translate === -s.snapGrid[s.snapGrid.length - 1];
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
    s.setWrapperTransition = function (duration) {
        s.wrapper.transition(duration);
    };
    s.setWrapperTranslate = function (x, y, z) {
        if (arguments.length === 1) {
            if (isH()) {
                y = 0;
            }
            else {
                y = x;
                x = 0;
            }
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
        s.translate = isH() ? x : y;
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
        s.updateContainerSize();
        s.updateSlidesSize();
        s.updatePagination();
        s.slideTo(s.params.initialSlide, 0, false);
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
    