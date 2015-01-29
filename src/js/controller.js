/*=========================
  Controller
  ===========================*/
s.controller = {
    setTranslate: function () {
        var controlled = s.params.control;
        if (!controlled instanceof Swiper) {
            return;
        }
        var translate = controlled.rtl && controlled.params.direction === 'horizontal' ? -s.translate : s.translate;
        var multiplier = (controlled.maxTranslate() - controlled.minTranslate()) / (s.maxTranslate() - s.minTranslate());
        var controlledTranslate = (translate - s.minTranslate()) * multiplier + controlled.minTranslate();
        controlled.updateProgress(controlledTranslate);
        controlled.setWrapperTranslate(controlledTranslate, false, true);
        controlled.updateActiveIndex();
    },
    setTransition: function (duration) {
        var controlled = s.params.control;
        if (!controlled instanceof Swiper) {
            return;
        }
        controlled.setWrapperTransition(duration, true);
    }
};