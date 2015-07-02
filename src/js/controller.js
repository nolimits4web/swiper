/*=========================
  Controller
  ===========================*/
s.controller = {
    //xxx: for now i will just save one spline function to to 
    getInterpolateFunction: function(c){
       if(!s.spline) s.spline = new LinearSpline(s.snapGrid, c.snapGrid);
    },
    setTranslate: function (translate, byController) {
       var controlled = s.params.control;
       var multiplier, controlledTranslate;
       function setControlledTranslate(c) {
           // this will create an Interpolate function based on the snapGrids
           // x is the Grid of the scrolled scroller and y will be the controlled scroller
           // it makes sense to create this only once and recall it for the interpolation
           // the function does a lot of value caching for performance 
           s.controller.getInterpolateFunction(c);
           translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
           // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
           // but it did not work out
           controlledTranslate = -s.spline.interpolate(-translate);
           if(!controlledTranslate){
               multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
               controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
           }
           
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