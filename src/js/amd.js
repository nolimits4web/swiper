/*===========================
Swiper AMD Export
===========================*/
if (typeof(module) !== 'undefined' && typeof(window) !== 'undefined')
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd && typeof (window) !== 'undefined') {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}
