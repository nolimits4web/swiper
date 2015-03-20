// Accessibility tools
var a11y = {

    makeFocusable: function ($el) {
        $el[0].tabIndex = '0';
        return $el;
    },

    addRole: function ($el, role) {
        $el.attr('role', role);
        return $el;
    },

    addLabel: function ($el, label) {
        $el.attr('aria-label', label);
        return $el;
    },

    disable: function ($el) {
        $el.attr('aria-disabled', true);
        return $el;
    },

    enable: function ($el) {
        $el.attr('aria-disabled', false);
        return $el;
    },

    onEnterKey: function (fn, event) {
        if (event.keyCode === 13) fn(event);
    },

    liveRegion: '<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>',

    notify: function (message) {
        var notification = $('.swiper-notification');
        notification.html('');
        notification.html(message);
    }
};
