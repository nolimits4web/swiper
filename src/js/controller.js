/*=========================
  Controller
  ===========================*/
s.controller = {
    setTranslate: function (translate, byController) {
        var controlled = s.params.control;
        var multiplier, controlledTranslate;
        function setControlledTranslate(c) {
            translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
            multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
            controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
            if (s.params.controlInverse) {
                controlledTranslate = c.maxTranslate() - controlledTranslate;
            }
            c.updateProgress(controlledTranslate);
            c.setWrapperTranslate(controlledTranslate, false, s);
            c.updateActiveIndex();
        }
        if (s.isArray(controlled)) {
            for (var i = 0; i < controlled.length; i++) {
                if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                    setControlledTranslate(controlled[i]);
                }
            }
        }
        else if (controlled instanceof Swiper && byController !== controlled) {
            setControlledTranslate(controlled);
        }
    },
    setTransition: function (duration, byController) {
        var controlled = s.params.control;
        var i;
        function setControlledTransition(c) {
            c.setWrapperTransition(duration, s);
            if (duration !== 0) {
                c.onTransitionStart();
                c.wrapper.transitionEnd(function(){
                    if (!controlled) return;
                    c.onTransitionEnd();
                });
            }
        }
        if (s.isArray(controlled)) {
            for (i = 0; i < controlled.length; i++) {
                if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                    setControlledTransition(controlled[i]);
                }
            }
        }
        else if (controlled instanceof Swiper && byController !== controlled) {
            setControlledTransition(controlled);
        }
    }
};