/*
 * Swiper Smooth Progress 1.0+
 * Plugin for Swiper 2.3+
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: November 2, 2013
*/

Swiper.prototype.plugins.progress = function(swiper, params) {
	var isH = swiper.params.mode == 'horizontal';
	var wrapperMaxPosition;
	function initSlides(){
		for (var i=0; i<swiper.slides.length; i++) {
			var slide = swiper.slides[i];
			slide.progressSlideSize = isH ? swiper.h.getWidth(slide) : swiper.h.getHeight(slide);
			if ('offsetLeft' in slide) {
				slide.progressSlideOffset = isH ? slide.offsetLeft : slide.offsetTop;
			}
			else {
				slide.progressSlideOffset = isH ? slide.getOffset().left - swiper.h.getOffset(swiper.container).left : slide.getOffset().top - swiper.h.getOffset(swiper.container).top;	
			}
		}
		if (isH) {
			wrapperMaxPosition = swiper.h.getWidth(swiper.wrapper) + swiper.wrapperLeft + swiper.wrapperRight - swiper.width;
		}
		else {
			wrapperMaxPosition = swiper.h.getHeight(swiper.wrapper) + swiper.wrapperTop + swiper.wrapperBottom - swiper.height;
		}
	}
	function calcProgress(transform) {
		var transform = transform || {x:0, y:0, z:0};
		var offsetCenter;
		if(swiper.params.centeredSlides==true) offsetCenter = isH ? -transform.x+swiper.width/2 : -transform.y+swiper.height/2 ;
		else offsetCenter = isH ? -transform.x : -transform.y ;
		//Each slide offset from offset center
		for (var i=0; i<swiper.slides.length; i++) {
			var slide = swiper.slides[i];
			var slideCenterOffset = (swiper.params.centeredSlides==true) ? slide.progressSlideSize/2 : 0;

			var offsetMultiplier = (offsetCenter - slide.progressSlideOffset - slideCenterOffset)/slide.progressSlideSize;
			slide.progress = offsetMultiplier;

		}
		// Global Swiper Progress
		swiper.progress = isH ? -transform.x/wrapperMaxPosition : -transform.y/wrapperMaxPosition;
		
		if(swiper.params.onProgressChange) swiper.params.onProgressChange(swiper);
	}
	
	//Plugin Hooks
	var hooks = {
		onFirstInit : function(args){
			initSlides()
			calcProgress({
				x: swiper.getWrapperTranslate('x'),
				y: swiper.getWrapperTranslate('y')
			});
		},
		onInit : function(args) {
			initSlides()
		},
		onSetWrapperTransform: function(transform){
			calcProgress(transform);
		}
	}
	return hooks
}
