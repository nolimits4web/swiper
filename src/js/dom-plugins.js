/*===========================
Add .swiper plugin from Dom libraries
===========================*/
var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
function addLibraryPlugin(lib) {
    lib.fn.swiper = function (params) {
        var firstInstance;
        lib(this).each(function () {
            var s = new Swiper(this, params);
            if (!firstInstance) firstInstance = s;
        });
        return firstInstance;
    };
}
for (var i = 0; i < swiperDomPlugins.length; i++) {
    if (window[swiperDomPlugins[i]]) {
        addLibraryPlugin(window[swiperDomPlugins[i]]);
    }
}
// Required DOM Plugins
var domLib;
if (typeof Dom7 === 'undefined') {
    domLib = window.Dom7 || window.Zepto || window.jQuery;
}
else {
    domLib = Dom7;
}
if (domLib) {
    if (!('transitionEnd' in domLib.fn)) {
        domLib.fn.transitionEnd = function (callback) {
            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                i, j, dom = this;
            function fireCallBack(e) {
                /*jshint validthis:true */
                if (e.target !== this) return;
                callback.call(this, e);
                for (i = 0; i < events.length; i++) {
                    dom.off(events[i], fireCallBack);
                }
            }
            if (callback) {
                for (i = 0; i < events.length; i++) {
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        };
    }
    if (!('transform' in domLib.fn)) {
        domLib.fn.transform = function (transform) {
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
            }
            return this;
        };
    }
    if (!('transition' in domLib.fn)) {
        domLib.fn.transition = function (duration) {
            if (typeof duration !== 'string') {
                duration = duration + 'ms';
            }
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
            }
            return this;
        };
    }
}
    
