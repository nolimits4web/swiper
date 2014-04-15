'use strict';
/*===========================
Swiper
===========================*/
window.Swiper = function (container, params) {
    // App
    var swiper = this;

    // Default Parameters
    swiper.params = {
        
    };

    // Extend defaults with parameters
    for (var param in params) {
        swiper.params[param] = params[param];
    }

    // Touch events
    swiper.touchEvents = {
        start: $.supportTouch ? 'touchstart' : 'mousedown',
        move: $.supportTouch ? 'touchmove' : 'mousemove',
        end: $.supportTouch ? 'touchend' : 'mouseup'
    };

    