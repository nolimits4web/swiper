// Accessibility tools
s.a11y = {
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

    onEnterKey: function (event) {
        if (event.keyCode !== 13) return;
        if ($(event.target).is(s.params.nextButton)) {
            s.onClickNext(event);
            if (s.isEnd) {
                s.a11y.notify(s.params.lastSlideMsg);
            }
            else {
                s.a11y.notify(s.params.nextSlideMsg);
            }
        }
        else if ($(event.target).is(s.params.prevButton)) {
            s.onClickPrev(event);
            if (s.isBeginning) {
                s.a11y.notify(s.params.firstSlideMsg);
            }
            else {
                s.a11y.notify(s.params.prevSlideMsg);
            }
        }
    },

    liveRegion: $('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),

    notify: function (message) {
        var notification = s.a11y.liveRegion;
        if (notification.length === 0) return;
        notification.html('');
        notification.html(message);
    },
    init: function () {
        // Setup accessibility
        if (s.params.nextButton) {
            var nextButton = $(s.params.nextButton);
            s.a11y.makeFocusable(nextButton);
            s.a11y.addRole(nextButton, 'button');
            s.a11y.addLabel(nextButton, s.params.nextSlideMsg);
        }
        if (s.params.prevButton) {
            var prevButton = $(s.params.prevButton);
            s.a11y.makeFocusable(prevButton);
            s.a11y.addRole(prevButton, 'button');
            s.a11y.addLabel(prevButton, s.params.prevSlideMsg);
        }

        $(s.container).append(s.a11y.liveRegion);
    },
    destroy: function () {
        if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
    }
};
