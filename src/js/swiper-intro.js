'use strict';
/*===========================
Swiper
===========================*/
window.Swiper = function (container, params) {
    var defaults = {
        touchEventsTarget: 'container',
        initialSlide: 0,
        spaceBetween: 0,
        speed: 300,
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        centeredSlides: false,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: 0.5,
        followFinger: true,
        onlyExternal: false,
        direction: 'horizontal',
        pagination: undefined,
        paginationClickable: true,
        paginationHide: true,
        freeMode: false,
        resistance: true,
        resistanceRatio: 0.85,
        touchRatio: 1,
        nextButton: undefined,
        prevButton: undefined,
        allowSwipeToPrev: true,
        allowSwipeToNext: true,
        threshold: 0,
        grabCursor: true,
        watchSlidesProgress: false,
        preventClicks: true,
        preventClicksPropagation: true,
        releaseFormElements: true,
        // swipeHandler: '.swipe-handler',
        noSwiping: true,
        noSwipingClass: 'swiper-no-swiping',
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
        buttonDisabledClass: 'swiper-button-disabled',
        paginationHiddenClass: 'swiper-pagination-hidden',
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
        onProgress: function () {
            console.log('progressChanged');
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
      Preparation - Define Container, Wrapper and Pagination
      ===========================*/
    s.container = $(container);
    if (s.container.length === 0) return;
    if (s.container.length > 1) {
        s.container.each(function () {
            new Swiper(this, params);
        });
        return;
    }

    // Save instance in container HTML Element and in data
    s.container[0].swiper = s;
    s.container.data('swiper', s);
    
    s.container.addClass('swiper-container-' + s.params.direction);

    if (s.params.freeMode) {
        s.container.addClass('swiper-container-freemode');
    }

    // Wrapper
    s.wrapper = s.container.children('.' + s.params.wrapperClass);

    // Pagination
    if (s.params.pagination) s.paginationContainer = $(s.params.pagination);

    // RTL
    s.rtl = s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl';

    // Translate
    s.translate = 0;

    // Progress
    s.progress = 0;

    // Is Horizontal
    function isH() {
        return s.params.direction === 'horizontal';
    }

    /*=========================
      Set grab cursor
      ===========================*/
    if (s.params.grabCursor) {
        s.container[0].style.cursor = 'move';
        s.container[0].style.cursor = '-webkit-grab';
        s.container[0].style.cursor = '-moz-grab';
        s.container[0].style.cursor = 'grab';
    }
    