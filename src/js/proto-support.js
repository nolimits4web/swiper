/*==================================================
    Feature Detection
====================================================*/
support: {

    touch : (window.Modernizr && Modernizr.touch === true) || (function () {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    })(),

    transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
        var div = document.createElement('div').style;
        return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
    })(),

    transforms : (window.Modernizr && Modernizr.csstransforms === true) || (function () {
        var div = document.createElement('div').style;
        return ('transform' in div || 'WebkitTransform' in div || 'MozTransform' in div || 'msTransform' in div || 'MsTransform' in div || 'OTransform' in div);
    })(),

    transitions : (window.Modernizr && Modernizr.csstransitions === true) || (function () {
        var div = document.createElement('div').style;
        return ('transition' in div || 'WebkitTransition' in div || 'MozTransition' in div || 'msTransition' in div || 'MsTransition' in div || 'OTransition' in div);
    })(),

    classList : (function () {
        var div = document.createElement('div').style;
        return 'classList' in div;
    })()
},