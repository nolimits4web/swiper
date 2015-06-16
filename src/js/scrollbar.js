/*=========================
  Scrollbar
  ===========================*/
s.scrollbar = {
    set: function () {
        if (!s.params.scrollbar) return;
        var sb = s.scrollbar;
        sb.track = $(s.params.scrollbar);
        sb.drag = sb.track.find('.swiper-scrollbar-drag');
        if (sb.drag.length === 0) {
            sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
            sb.track.append(sb.drag);
        }
        sb.drag[0].style.width = '';
        sb.drag[0].style.height = '';
        sb.trackSize = isH() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
        sb.divider = s.size / s.virtualSize;
        sb.moveDivider = sb.divider * (sb.trackSize / s.size);
        sb.dragSize = sb.trackSize * sb.divider;

        if (isH()) {
            sb.drag[0].style.width = sb.dragSize + 'px';
        }
        else {
            sb.drag[0].style.height = sb.dragSize + 'px';
        }

        if (sb.divider >= 1) {
            sb.track[0].style.display = 'none';
        }
        else {
            sb.track[0].style.display = '';
        }
        if (s.params.scrollbarHide) {
            sb.track[0].style.opacity = 0;
        }
    },
    setTranslate: function () {
        if (!s.params.scrollbar) return;
        var diff;
        var sb = s.scrollbar;
        var translate = s.translate || 0;
        var newPos;
        
        var newSize = sb.dragSize;
        newPos = (sb.trackSize - sb.dragSize) * s.progress;
        if (s.rtl && isH()) {
            newPos = -newPos;
            if (newPos > 0) {
                newSize = sb.dragSize - newPos;
                newPos = 0;
            }
            else if (-newPos + sb.dragSize > sb.trackSize) {
                newSize = sb.trackSize + newPos;
            }
        }
        else {
            if (newPos < 0) {
                newSize = sb.dragSize + newPos;
                newPos = 0;
            }
            else if (newPos + sb.dragSize > sb.trackSize) {
                newSize = sb.trackSize - newPos;
            }
        }
        if (isH()) {
            if (s.support.transforms3d) {
                sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
            }
            else {
                sb.drag.transform('translateX(' + (newPos) + 'px)');   
            }
            sb.drag[0].style.width = newSize + 'px';
        }
        else {
            if (s.support.transforms3d) {
                sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
            }
            else {
                sb.drag.transform('translateY(' + (newPos) + 'px)');   
            }
            sb.drag[0].style.height = newSize + 'px';
        }
        if (s.params.scrollbarHide) {
            clearTimeout(sb.timeout);
            sb.track[0].style.opacity = 1;
            sb.timeout = setTimeout(function () {
                sb.track[0].style.opacity = 0;
                sb.track.transition(400);
            }, 1000);
        }
    },
    setTransition: function (duration) {
        if (!s.params.scrollbar) return;
        s.scrollbar.drag.transition(duration);
    }
};