/*=========================
  Controller
  ===========================*/
s.controller = {
    setTranslate: function (translate, byController) {
        var controlled = s.params.control;
        var multiplier, controlledTranslate;
        if (s.isArray(controlled)) {
            for (var i = 0; i < controlled.length; i++) {
                if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                    translate = controlled[i].rtl && controlled[i].params.direction === 'horizontal' ? -s.translate : s.translate;
                    multiplier = (controlled[i].maxTranslate() - controlled[i].minTranslate()) / (s.maxTranslate() - s.minTranslate());
                    controlledTranslate = (translate - s.minTranslate()) * multiplier + controlled[i].minTranslate();
                    if (s.params.controlInverse) {
                        controlledTranslate = controlled[i].maxTranslate() - controlledTranslate;
                    }
                    controlled[i].updateProgress(controlledTranslate);
                    controlled[i].setWrapperTranslate(controlledTranslate, false, s);
                    controlled[i].updateActiveIndex();
                }
            }
        }
        else if (controlled instanceof Swiper && byController !== controlled) {
            translate = controlled.rtl && controlled.params.direction === 'horizontal' ? -s.translate : s.translate;
            multiplier = (controlled.maxTranslate() - controlled.minTranslate()) / (s.maxTranslate() - s.minTranslate());
            controlledTranslate = (translate - s.minTranslate()) * multiplier + controlled.minTranslate();
            if (s.params.controlInverse) {
                controlledTranslate = controlled.maxTranslate() - controlledTranslate;
            }
            controlled.updateProgress(controlledTranslate);
            controlled.setWrapperTranslate(controlledTranslate, false, s);
            controlled.updateActiveIndex();
        }
    },
    setTransition: function (duration, byController) {
        var controlled = s.params.control;
        if (s.isArray(controlled)) {
            for (var i = 0; i < controlled.length; i++) {
                if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                    controlled[i].setWrapperTransition(duration, s);
                }
            }
        }
        else if (controlled instanceof Swiper && byController !== controlled) {
            controlled.setWrapperTransition(duration, s);
        }
    }
};