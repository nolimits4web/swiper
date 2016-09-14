/*=========================
  History Api with fallback to Hashnav
  ===========================*/
s.history = {
    init: function () {
        if (!s.params.history) return;
        if (!window.history || !window.history.pushState) {
            s.params.history = false;
            s.params.hashnav = true;
            return;
        }
        s.history.initialized = true;
        this.paths = this.getPathValues();
        if (!this.paths.key && !this.paths.value) return;
        this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
        if (!s.params.replaceState) {
            window.addEventListener('popstate', this.setHistoryPopState);
        }
    },
    setHistoryPopState: function() {
        s.history.paths = s.history.getPathValues();
        s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
    },
    getPathValues: function() {
        var pathArray = window.location.pathname.slice(1).split('/');
        var total = pathArray.length;
        var key = pathArray[total - 2];
        var value = pathArray[total - 1];
        return { key: key, value: value };
    },
    setHistory: function (key, index) {
        if (!s.history.initialized || !s.params.history) return;
        var slide = s.slides.eq(index);
        var value = this.slugify(slide.attr('data-history'));
        if (!window.location.pathname.includes(key)) {
            value = key + '/' + value;
        }
        if (s.params.replaceState) {
            window.history.replaceState(null, null, value);
        } else {
            window.history.pushState(null, null, value);
        }
    },
    slugify: function(text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    },
    scrollToSlide: function(speed, value, runCallbacks) {
        if (value) {
            for (var i = 0, length = s.slides.length; i < length; i++) {
                var slide = s.slides.eq(i);
                var slideHistory = this.slugify(slide.attr('data-history'));
                if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                    var index = slide.index();
                    s.slideTo(index, speed, runCallbacks);
                }
            }
        } else {
            s.slideTo(0, speed, runCallbacks);
        }
    }
};