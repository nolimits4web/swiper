/*=========================
  Hash Navigation
  ===========================*/
s.hashnav = {
    onHashCange: function (e, a) {
        var newHash = document.location.hash.replace('#', '');
        var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
        if (newHash !== activeSlideHash) {
            s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
        }
    },
    attachEvents: function (detach) {
        var action = detach ? 'off' : 'on';
        $(window)[action]('hashchange', s.hashnav.onHashCange);
    },
    setHash: function () {
        if (!s.hashnav.initialized || !s.params.hashnav) return;
        if (s.params.replaceState && window.history && window.history.replaceState) {
            window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
        } else {
            var slide = s.slides.eq(s.activeIndex);
            var hash = slide.attr('data-hash') || slide.attr('data-history');
            document.location.hash = hash || '';
        }
    },
    init: function () {
        if (!s.params.hashnav || s.params.history) return;
        s.hashnav.initialized = true;
        var hash = document.location.hash.replace('#', '');
        if (hash) {
            var speed = 0;
            for (var i = 0, length = s.slides.length; i < length; i++) {
                var slide = s.slides.eq(i);
                var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                    var index = slide.index();
                    s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                }
            }
        }
        if (s.params.hashnavWatchState) s.hashnav.attachEvents();
    },
    destroy: function () {
        if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
    }
};