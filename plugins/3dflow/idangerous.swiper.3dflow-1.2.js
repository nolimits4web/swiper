/*
 * Swiper 3D Flow 1.2
 * Plugin for Swiper 1.8.5+
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: February 6, 2013
*/

Swiper.prototype.plugins.tdFlow = function(swiper, params) {
	if (!swiper.support.threeD) return;
	var slides, wrapperSize, slideSize, initialized;
	var isH = swiper.params.mode == 'horizontal';
	/*=========================
	  Default Parameters
	  ===========================*/
	var defaults = {
		rotate : 50,
		stretch :0,
		depth: 100,
		modifier : 1,
		shadows : true 
	}
	params = params || {};	
	for (var prop in defaults) {
		if (! (prop in params)) {
			params[prop] = defaults[prop]	
		}
	}
	
	
	function setTransition(el, dur) {
		var es = el.style
		es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = dur+'ms';
	}
	function setTransform (el, transform) {
		var es = el.style
		es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = transform
	}
	function init() {
		initialized = true;
		slides = swiper.slides
		for (var i=0; i<slides.length; i++) {
			setTransition(slides[i], 0)
		}
		
		if (isH) {
			wrapperSize = swiper.wrapper.offsetWidth;
			slideSize = wrapperSize/slides.length;
			
			for (var i=0; i<slides.length; i++) {
				slides[i].swiperSlideOffset = slides[i].offsetLeft
			}
		}
		else {
			wrapperSize = swiper.wrapper.offsetHeight;
			slideSize = wrapperSize/slides.length;
			for (var i=0; i<slides.length; i++) {
				slides[i].swiperSlideOffset = slides[i].offsetTop
			}
		}
	}
	
	function threeDSlides(transform) {
		if (!initialized) return;
		var transform = transform || {x:0, y:0, z:0};
		var center = isH ? -transform.x+swiper.width/2 : -transform.y+swiper.height/2 ;
		
		var rotate = isH ? params.rotate : -params.rotate;
		var translate = params.depth;

		//Each slide offset from center
		for (var i=0; i<swiper.slides.length; i++) {
			
			var slideOffset = swiper.slides[i].swiperSlideOffset
			
			var offsetMultiplier = (center - slideOffset - slideSize/2)/slideSize*params.modifier;
			
			var rotateY = isH ? rotate*offsetMultiplier : 0;
			var rotateX = isH ? 0 : rotate*offsetMultiplier;
			var rotateZ = 0//40*offsetMultiplier;
			var translateZ = -translate*Math.abs(offsetMultiplier);
			
			var translateY = isH ? 0 : params.stretch*(offsetMultiplier)
			var translateX = isH ? params.stretch*(offsetMultiplier) : 0;
			
			//Fix for ultra small values
			if (Math.abs(translateX)<0.001) translateX = 0;
			if (Math.abs(translateY)<0.001) translateY = 0;
			if (Math.abs(translateZ)<0.001) translateZ = 0;
			if (Math.abs(rotateY)<0.001) rotateY = 0;
			if (Math.abs(rotateX)<0.001) rotateX = 0;
			
			var slideTransform = 'translate3d('+translateX+'px,'+translateY+'px,'+translateZ+'px)  rotateX('+rotateX+'deg) rotateY('+rotateY+'deg) rotateZ('+rotateZ+'deg)';
			
			
			setTransform(swiper.slides[i], slideTransform);
			swiper.slides[i].style.zIndex =-Math.abs(Math.round(offsetMultiplier))+1
			if (params.shadows) {
				//Set shadows
				var shadowBefore = isH ? swiper.slides[i].querySelector('.swiper-slide-shadow-left') : swiper.slides[i].querySelector('.swiper-slide-shadow-top');
				var shadowAfter = isH ? swiper.slides[i].querySelector('.swiper-slide-shadow-right') : swiper.slides[i].querySelector('.swiper-slide-shadow-bottom');
				shadowAfter.style.opacity = (-offsetMultiplier)>0 ? (-offsetMultiplier) : 0;
				shadowBefore.style.opacity = offsetMultiplier>0 ? offsetMultiplier : 0;
			}
		}
		
		//Set correct perspective for IE10		
		if (swiper.ie10) {
			var ws = swiper.wrapper.style;
			ws.perspectiveOrigin = center+'px 50%'
		}
		
	}
	
	//Plugin Hooks
	var hooks = {
		onFirstInit : function(args){
			slides = swiper.slides //swiper.wrapper.querySelectorAll('.'+swiper.params.slideClass);
			if (params.shadows) {
				//Add Shadows
				var shadowEl1 = document.createElement('div')
				var shadowEl2 = document.createElement('div')
				shadowEl1.className = isH ? 'swiper-slide-shadow-left' : 'swiper-slide-shadow-top'
				shadowEl2.className = isH ? 'swiper-slide-shadow-right' : 'swiper-slide-shadow-bottom'
				for (var i=0; i<slides.length; i++) {
					slides[i].appendChild(shadowEl1.cloneNode())
					slides[i].appendChild(shadowEl2.cloneNode())
				}
			}
			//Update Dimensions
			init();
			//Set in 3D
			threeDSlides({x:swiper.getTranslate('x'), y:swiper.getTranslate('y'), z:swiper.getTranslate('z')});
		},
		onInit : function(args) {
			init();
			//Set in 3D
			threeDSlides({x:swiper.getTranslate('x'), y:swiper.getTranslate('y'), z:swiper.getTranslate('z')});
		},
		onSetTransform: function(transform){
			threeDSlides(transform);
		},
		onSetTransition: function(args){
			
			for (var i=0; i<swiper.slides.length; i++) {
				setTransition(swiper.slides[i], args.duration)
				if (isH && params.shadows) {
					setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-left'), args.duration)
					setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-right'), args.duration)
				}
				else if(params.shadows) {
					setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-top'), args.duration)
					setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-bottom'), args.duration)
				}
			}
	
			
		}
	}
	return hooks
}
