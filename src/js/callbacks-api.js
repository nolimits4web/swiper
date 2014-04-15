/*=========================
 Wrapper for Callbacks : Allows additive callbacks via function arrays
 ===========================*/
swiper.fireCallback = function () {
    var callback = arguments[0];
    if (Object.prototype.toString.call(callback) === '[object Array]') {
        for (var i = 0; i < callback.length; i++) {
            if (typeof callback[i] === 'function') {
                callback[i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
        }
    } else if (Object.prototype.toString.call(callback) === '[object String]') {
        if (params['on' + callback]) swiper.fireCallback(params['on' + callback]);
    } else {
        callback(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
    }
};
/**
 * Allows user to add callbacks, rather than replace them
 * @param callback
 * @param func
 * @return {*}
 */
swiper.addCallback = function (callback, func) {
    var swiper = this, tempFunc;
    if (swiper.params['on' + callback]) {
        if ($.isArray(this.params['on' + callback])) {
            return this.params['on' + callback].push(func);
        } else if (typeof this.params['on' + callback] === 'function') {
            tempFunc = this.params['on' + callback];
            this.params['on' + callback] = [];
            this.params['on' + callback].push(tempFunc);
            return this.params['on' + callback].push(func);
        }
    } else {
        this.params['on' + callback] = [];
        return this.params['on' + callback].push(func);
    }
};
swiper.removeCallbacks = function (callback) {
    if (swiper.params['on' + callback]) {
        swiper.params['on' + callback] = null;
    }
};