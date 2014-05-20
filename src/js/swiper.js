'use strict';
/*===========================
Swiper
===========================*/
window.Swiper = function (container, params) {
    var defaults = {
        initialSlide: 0,
        spaceBetween: 0,
        speed: 300,
        slidesPerView: 1,
        centeredSlides: false,
        simulateTouch: true,
        direction: 'horizontal',
        pagination: false,
        freeMode: false,
        resistance: true,
        resistanceRatio: 1,
        touchRatio: 1,
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
    if (s.params.freeMode) {
        s.container.addClass('swiper-container-freemode');
    }

    // Wrapper
    s.wrapper = s.container.children('.' + s.params.wrapperClass);

    // Pagination
    if (s.params.pagination) s.pagination = $(s.params.pagination);

    /*=========================
      Observer
      ===========================*/
    if (s.params.observer && s.support.observer) {
        s.observers = [];
        s.container.parents().each(function () {
            var target = this;
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize();
                });
            });
             
            // configuration of the observer:
            var config = { attributes: true, childList: true, characterData: true };
             
            // pass in the target node, as well as the observer options
            observer.observe(target, config);

            s.observers.push(observer);
        });
    }
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
        for (var i = 0; i < s.slides.length; i++) {
            
            var gridSize = 0;
            if (s.params.slidesPerView === 'auto') {
                gridSize = isH() ? s.slides.eq(i).width() : s.slides.eq(i).height();
            }
            else {
                gridSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                if (isH()) {
                    s.slides[i].style.width = gridSize + 'px';
                }
                else {
                    s.slides[i].style.height = gridSize + 'px';
                }
            }
            if (params.centeredSlides) {
                if (i === 0) slidePosition -= s.size / 2 - gridSize / 2;
                s.slidesGrid.push(slidePosition);
                slidePosition = slidePosition + gridSize + spaceBetween;
            }
            else {
                s.slidesGrid.push(slidePosition);
                slidePosition = slidePosition + gridSize + spaceBetween;
            }
        }

        if (s.params.spaceBetween !== 0) {
            if (isH()) s.slides.css({marginRight: spaceBetween + 'px'});
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
        e.stopPropagation();

        if (!isMoved) {
            currentTranslate = $.getTranslate(s.wrapper[0], isH() ? 'x' : 'y');
            s.wrapper.transition(0);
            if (animating) s.onSlideChangeEnd();
        }
        isMoved = true;

        var diff = isH() ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;

        diff = diff * s.params.touchRatio;
        var translate = diff + currentTranslate;

        if (s.params.resistance) {
            if ((diff > 0 && translate > minTranslate())) {
                diff = Math.pow(diff, 0.85) * s.params.resistanceRatio;
            }
            else if (diff < 0 && translate < maxTranslate()) {
                diff = -Math.pow(-diff, 0.85) * s.params.resistanceRatio;
            }
        }

        var translateX = isH() ? diff + currentTranslate: 0, translateY = isH() ? 0 : diff + currentTranslate;
        s.wrapper.transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
    };
    s.onTouchEnd = function (e) {
        if (s.params.onTouchEnd) s.params.onTouchEnd(s, e);
        var touchEndTime = Date.now();
        var timeDiff = touchEndTime - touchStartTime;
        if (s.allowClick) {
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
        s.previousSlideIndex = s.activeSlideIndex;
        s.activeSlideIndex = index;
        s.isFirst = s.activeSlideIndex === 0;
        s.isLast = s.activeSlideIndex === s.slides.length - s.params.slidesPerView;
        s.onSlideChangeStart();
        var translateX = isH() ? translate : 0, translateY = isH() ? 0 : translate;
        if (speed === 0) {
            s.wrapper
                .transition(0)
                .transform('translate3d(' + translateX + 'px,' + translateY + 'px,0)');
            if (runCallbacks !== false) s.onSlideChangeEnd();
        }
        else {
            animating = true;
            s.wrapper
                .transition(speed)
                .transform('translate3d(' + translateX + 'px,' + translateY + 'px,0)')
                .transitionEnd(function () {
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
        s.wrapper.transition(0);
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

    // init
    s.init = function () {
        s.updateSize();
        s.updateSlides();
        s.updatePagination();
        s.slideTo(s.params.initialSlide, 0);
        s.attachEvents();
    };

    // Destroy
    s.destroy = function () {
        s.detachEvents();
        if (s.params.onDestroy) s.params.onDestroy();
        s = undefined;
    };

    s.init();

    return s;


    
};
    