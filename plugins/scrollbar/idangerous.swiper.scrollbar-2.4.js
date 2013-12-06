/*
 * Swiper Scrollbar 2.4
 * Plugin for Swiper 2.0+
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012-2013, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: December 6, 2013
*/

Swiper.prototype.plugins.scrollbar = function(swiper, params){
	
	var enabled = params && params.container;
	if(!enabled) return;
	
	/*=========================
	  Default Parameters
	  ===========================*/
	var defaults = {
		hide : true,
		draggable : true,
		snapOnRelease: false
	}
	params = params || {};	
	for (var prop in defaults) {
		if (! (prop in params)) {
			params[prop] = defaults[prop]	
		}
	}

	/*=========================
	  Container
	  ===========================*/
	if (!document.querySelectorAll) {
        if (!window.jQuery) return;
    }
	function $$(s) {
        if (document.querySelectorAll)
            return document.querySelectorAll(s)
        else
            return jQuery(s)
    }
    if(!(params.container.nodeType)){
        if ($$(params.container).length==0) return;
    }   
    var container = (params.container.nodeType) ? params.container : $$(params.container)[0];
	
	/*=========================
	  Default Vars
	  ===========================*/
	var isH = swiper.params.mode=='horizontal',
		track = container,
		trackWidth, trackHeight, divider, moveDivider, dragWidth, dragHeight;

	/*=========================
	  Define Drag
	  ===========================*/
	var drag = document.createElement('div')
	drag.className = 'swiper-scrollbar-drag';
	if (params.draggable) drag.className += ' swiper-scrollbar-cursor-drag';
	track.appendChild(drag);
	if (params.hide) track.style.opacity=0;

	var te = swiper.touchEvents
	/*=========================
	  Draggable
	  ===========================*/
	if (params.draggable) {
		var isTouched = false;
		function dragStart(e){
			isTouched = true;
			if(e.preventDefault) e.preventDefault();
            else e.returnValue = false;
			setDragPosition(e);
			clearTimeout(timeout);

			swiper.setTransition(track,0)
			track.style.opacity = 1;
			swiper.setWrapperTransition(100);
			swiper.setTransition(drag,100)
			if(params.onScrollbarDrag) {
				params.onScrollbarDrag(swiper)
			}
		}
		function dragMove(e){
			if(!isTouched) return;
			if(e.preventDefault) e.preventDefault();
      else e.returnValue = false;
			setDragPosition(e);
			swiper.setWrapperTransition(0);
			swiper.setTransition(track,0)
			swiper.setTransition(drag,0)
			if(params.onScrollbarDrag) {
				params.onScrollbarDrag(swiper)
			}
		}
		function dragEnd(e) {
			isTouched = false;
			if (params.hide) {
				clearTimeout(timeout)
				timeout = setTimeout(function(){
					track.style.opacity=0;
					swiper.setTransition(track,400)
				},1000)
				
			}
			if (params.snapOnRelease) {
				swiper.swipeReset()
			}
		}


		var lestenEl = swiper.support.touch ? track : document
		swiper.h.addEventListener(track, te.touchStart, dragStart, false)
		swiper.h.addEventListener(lestenEl, te.touchMove, dragMove, false)
		swiper.h.addEventListener(lestenEl, te.touchEnd, dragEnd, false)

		function setDragPosition(e){
			var x = y = 0;
			var position;
			if (isH) {
				var pageX = (e.type=='touchstart' || e.type=='touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX;
				x = (pageX) - swiper.h.getOffset(track).left - dragWidth/2
				if (x<0) x = 0;
				else if ( (x+dragWidth) > trackWidth) {
					x = trackWidth - dragWidth;
				}
			}
			else {
				var pageY = (e.type=='touchstart' || e.type=='touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY;
				y = (pageY)  - swiper.h.getOffset(track).top - dragHeight/2;
				
				if (y<0) y = 0;
				else if ( (y+dragHeight) > trackHeight) {
					y = trackHeight - dragHeight;
				}
			}
			//Set Drag Position
			swiper.setTranslate(drag,{x:x, y:y})

			//Wrapper Offset
			var wrapX = -x/moveDivider;
			var wrapY = -y/moveDivider;
			swiper.setWrapperTranslate(wrapX ,wrapY, 0)
			swiper.updateActiveSlide(isH ? wrapX : wrapY);
		}
	}
	
	function setScrollBars() {
		drag.style.width = ''
		drag.style.height = ''
		if (isH) {
			trackWidth = swiper.h.getWidth(track, true);
			divider = swiper.width/(swiper.h.getWidth(swiper.wrapper) + swiper.wrapperLeft + swiper.wrapperRight);
			moveDivider = divider*(trackWidth/swiper.width);
			dragWidth = trackWidth*divider;
			drag.style.width = dragWidth+'px';
		}
		else {
			trackHeight = swiper.h.getHeight(track, true);
			divider = swiper.height/(swiper.h.getHeight(swiper.wrapper) + swiper.wrapperTop + swiper.wrapperBottom);
			moveDivider = divider*(trackHeight/swiper.height);
			dragHeight = trackHeight*divider;
			if (dragHeight>trackHeight) dragHeight = trackHeight
			drag.style.height = dragHeight+'px';
		}
		if(divider>=1) {
			container.style.display='none'
		}
		else {
			container.style.display=''
		}

	}
	var timeout;

	var hooks = {
		onFirstInit : function(args){
			setScrollBars()
		},
		onInit : function(args) {
			setScrollBars()
		},
		
		onTouchMoveEnd : function(args) {
			if (params.hide) {
				clearTimeout(timeout)
				track.style.opacity=1;
				swiper.setTransition(track,200)
			}
		},
		
		onTouchEnd : function(args) {
			if (params.hide) {
				clearTimeout(timeout)
				timeout = setTimeout(function(){
					track.style.opacity=0;
					swiper.setTransition(track,400)
				},1000)
			}
		},
		
		onSetWrapperTransform: function(pos){
			
			if (isH) {
				var newLeft = pos.x*moveDivider;
				var newWidth = dragWidth;
				if (newLeft > 0) {
					var diff = newLeft;
					newLeft = 0;
					newWidth = dragWidth-diff;
				}
				else if ( (-newLeft+dragWidth) > trackWidth) {
					newWidth = trackWidth + newLeft;
				}

				swiper.setTranslate(drag,{x:-newLeft})
				drag.style.width  = newWidth+'px';
			}
			else {
				var newTop = pos.y*moveDivider;
				var newHeight = dragHeight;
				if (newTop > 0) {
					var diff = newTop;
					newTop = 0;
					newHeight = dragHeight-diff;
				}
				else if ( (-newTop+dragHeight) > trackHeight) {
					newHeight = trackHeight + newTop;
				}
				swiper.setTranslate(drag,{y:-newTop})
				drag.style.height  = newHeight+'px';
			}
			if (swiper.params.freeMode && params.hide) {
				clearTimeout(timeout)
				track.style.opacity=1;
				timeout = setTimeout(function(){
					track.style.opacity=0;
					swiper.setTransition(track,400)
				},1000)
			}
			
		},
		onSetWrapperTransition: function(args){
			swiper.setTransition(drag,args.duration)
		},
		onDestroy: function(){
			var lestenEl = swiper.support.touch ? track : document
			swiper.h.removeEventListener(track, te.touchStart, dragStart, false)
			swiper.h.removeEventListener(lestenEl, te.touchMove, dragMove, false)
			swiper.h.removeEventListener(lestenEl, te.touchEnd, dragEnd, false)
		}
	}
	return hooks;
}
