'use strict';
/*===========================
Swiper
===========================*/
window.Swiper = function (container, params) {
    // App
    var swiper = this;

    // Define container 
    swiper.container = $(container);
    if (swiper.container.length === 0) return;
    if (swiper.container.length > 1) {
        swiper.container.each(function () {
            new Swiper(this, params);
        });
        return;
    }

    // Default Parameters
    swiper.params = {
        //Namespace
        slideElement: 'div',
        slideClass: 'swiper-slide',
        slideActiveClass: 'swiper-slide-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        wrapperClass: 'swiper-wrapper',
        paginationElementClass: 'swiper-pagination-switch',
        paginationActiveClass: 'swiper-active-switch',
        paginationVisibleClass: 'swiper-visible-switch'
    };

    // Extend defaults with parameters
    for (var param in swiper.params) {
        swiper.params[param] = params[param];
    }

    /*=========================
      Wrapper
      ===========================*/
    swiper.wrapper = $(swiper.container.find('.swiper-wrapper')[0]);

    /*=========================
      Define Touch Events
      ===========================*/
    var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
    if (window.navigator.msPointerEnabled) desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
    if (window.navigator.pointerEnabled) desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];

    swiper.touchEvents = {
        touchStart : swiper.support.touch || !swiper.params.simulateTouch  ? 'touchstart' : desktopEvents[0],
        touchMove : swiper.support.touch || !swiper.params.simulateTouch ? 'touchmove' : desktopEvents[1],
        touchEnd : swiper.support.touch || !swiper.params.simulateTouch ? 'touchend' : desktopEvents[2]
    };
    

    