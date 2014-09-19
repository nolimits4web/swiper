/*=========================
  Init/Destroy
  ===========================*/
s.init = function () {
    s.updateContainerSize();
    s.updateSlidesSize();
    s.updatePagination();
    s.slideTo(s.params.initialSlide, 0, false);
    s.attachEvents();
    if (s.params.observer && s.support.observer) {
        s.initObservers();
    }
};

// Destroy
s.destroy = function (deleteInstance) {
    s.detachEvents();
    s.disconnectObservers();
    if (s.params.onDestroy) s.params.onDestroy();
    if (deleteInstance !== false) s = null;
};

s.init();

