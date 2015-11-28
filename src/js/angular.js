if (typeof(angular) !== 'undefined') {
    (function (angular) {
        var app = angular.module('nolimits4web.swiper', []);
      
        app.directive('swiperContainer', [
            '$log',
            function($log) {
                return {
                    restrict: 'C',
                    link: function(scope, element, attributes) {
                        if (typeof attributes.breakpoints === 'string') {
                            attributes.breakpoints = JSON.parse(attributes.breakpoints);
                        }
                        if (typeof attributes.fade === 'string') {
                            attributes.fade = JSON.parse(attributes.fade);
                        }
                        if (typeof attributes.cube === 'string') {
                            attributes.breakpoints = JSON.parse(attributes.cube);
                        }
                        if (typeof attributes.coverflow === 'string') {
                            attributes.breakpoints = JSON.parse(attributes.coverflow);
                        }
      
                        try {
                            var instance = element.swiper(attributes);
      
                            scope.updateSlides = function () {
                                instance.update();
                            };
                        } catch (e) {
                            $log.error('failed to init swiper, invalid options?', attributes, e);
                        }
      
                    }
                };
            }
        ]);
      
        app.directive('swiperSlide', [
            "$log",
            function($log) {
                return {
                    restrict: 'C',
                    link: function(scope, element) {
                        if (scope.$last) {
                            if (!scope.$parent.updateSlides) {
                                $log.error('used swiper-slide class outside of swiper-container', element);
                            }
                            scope.$parent.updateSlides();
                        }
                    }
                };
            }
        ]);
    })(angular);
}
