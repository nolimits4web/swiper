// Accessibility tools
var a11y = {

    makeFocusable: function (el) {
        el[0].tabIndex = '0';
        return el;
    },

    onEnterKey: function (fn, event) {
        if (event.keyCode === 13) fn(event);
    },

    init: function() {

    }
};
