/*=========================
  Translate/transition helpers
  ===========================*/
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
