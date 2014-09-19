/*===========================
Find and Export Dom library in Swiper
===========================*/
var $;
if (typeof Dom7 === 'undefined') {
    $ = window.Dom7 || window.Zepto || window.jQuery;
}
else {
    $ = Dom7;
}
// Swiper Plugin
$.fn.swiper = function (params) {
    return $(this).each(function () {
        return new Swiper(this, params);
    });
};
// Export to Swiper
Swiper.$ = $;
