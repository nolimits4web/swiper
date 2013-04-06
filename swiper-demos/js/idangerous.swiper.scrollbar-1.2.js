/*
 * Swiper Scrollbar 1.2
 * Plugin for Swiper 1.8.8+
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: March 4, 2013
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
	
	var dq = function(q) {
		return document.querySelectorAll(q)
	}
	if(!(params.container instanceof HTMLElement) && dq(params.container).length==0) return
	var container = params.container instanceof HTMLElement ? params.container : dq(params.container)[0]
	var isH = swiper.params.mode=='horizontal',
		track = container,
		trackWidth, trackHeight, divider, moveDivider, dragWidth, dragHeight;

	//Define Drag
	var drag = document.createElement('div')
	drag.className = 'swiper-scrollbar-drag';
	if (params.draggable) drag.className += ' swiper-scrollbar-cursor-drag';
	track.appendChild(drag)	
	if (params.hide) {
		track.style.opacity=0
	}


	var te = swiper.touchEvents

	//Helper Function to set CSS3 Tranforms
	function transform(el, pos) {
		
		var es = el.style
		x=pos.x||0;
		y=pos.y||0;
		z=pos.z||0;

		if (swiper.support.threeD) {
			es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d('+x+'px, '+y+'px, '+z+'px)'
		}
		else {
			
			es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate('+x+'px, '+y+'px)'
			if (swiper.ie8) {
				es.left = x+'px'
				es.top = y+'px'
			}
		}
	}
	function setTransition(el, dur) {
		
		var es = el.style
		es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = dur+'ms';
	}
	function getOffset(el) {
		var box = el.getBoundingClientRect();
		var body = document.body;
		clientTop  = el.clientTop  || body.clientTop  || 0;
		clientLeft = el.clientLeft || body.clientLeft || 0;
		scrollTop  = window.pageYOffset || el.scrollTop;
		scrollLeft = window.pageXOffset || el.scrollLeft;

		return {
			top: box.top  + scrollTop  - clientTop,
			left: box.left + scrollLeft - clientLeft
		};
	}
	
	//---

	if (params.draggable) {
		var isTouched = false;
		
		function setDragStart(e){
			isTouched = true;
			e.preventDefault();
			setDragPosition(e);
			clearTimeout(timeout);

			setTransition(track,0)
			track.style.opacity = 1;
			
			swiper.setTransition(100);
			setTransition(drag,100)
			
		}
		function setDragMove(e){
			if(!isTouched) return;
			e.preventDefault();
			setDragPosition(e);
			swiper.setTransition(0);
			setTransition(track,0)
			setTransition(drag,0)
		}


		var lestenEl = swiper.support.touch ? track : document
		track.addEventListener(te.touchStart, setDragStart, false)
		lestenEl.addEventListener(te.touchMove, setDragMove, false)
		lestenEl.addEventListener(te.touchEnd, function(e){
			isTouched = false;
			if (params.hide) {
				clearTimeout(timeout)
				timeout = setTimeout(function(){
					track.style.opacity=0;
					setTransition(track,400)
				},1000)
				
			}
			if (params.snapOnRelease) {
				swiper.swipeReset()
			}

		}, false)

		function setDragPosition(e){
			var x = y = 0;
			var position;
			if (isH) {
				x = e.pageX - getOffset(track).left -dragWidth/2
				if (x<0) x = 0;
				else if ( (x+dragWidth) > trackWidth) {
					x = trackWidth - dragWidth;
				}
			}
			else {
				
				y = e.pageY - getOffset(track).top -dragHeight/2;
				
				if (y<0) y = 0;
				else if ( (y+dragHeight) > trackHeight) {
					y = trackHeight - dragHeight;
				}
			}

			
			//Set Drag Position
			transform(drag,{x:x, y:y})

			//Wrapper Offset
			var wrapX = -x/moveDivider;
			var wrapY = -y/moveDivider;
			
			swiper.setTransform(wrapX ,wrapY)
			
		}
	}
	
	function setScrollBars() {
		drag.style.width = ''
		drag.style.height = ''
		if (isH) {
			trackWidth = track.offsetWidth;
			divider = swiper.width/swiper.wrapper.offsetWidth;
			moveDivider = divider*(trackWidth/swiper.width);
			dragWidth = track.offsetWidth*divider;
			drag.style.width = dragWidth+'px';
			
		}
		else {
			trackHeight = track.offsetHeight;
			divider = swiper.height/swiper.wrapper.offsetHeight;
			moveDivider = divider*(trackHeight/swiper.height);
			dragHeight = track.offsetHeight*divider;
			drag.style.height = dragHeight+'px';
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
				setTransition(track,200)
			}
		},
		
		onTouchEnd : function(args) {
			if (params.hide) {
				clearTimeout(timeout)
				timeout = setTimeout(function(){
					track.style.opacity=0;
					setTransition(track,400)
				},1000)
			}
		},
		
		onSetTransform: function(pos){
			
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

				transform(drag,{x:-newLeft})
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
				transform(drag,{y:-newTop})
				drag.style.height  = newHeight+'px';
			}
			if (swiper.params.freeMode && params.hide) {
				clearTimeout(timeout)
				track.style.opacity=1;
				timeout = setTimeout(function(){
					track.style.opacity=0;
					setTransition(track,400)
				},1000)
			}
			
		},
		onSetTransition: function(args){
			setTransition(drag,args.duration)
			
		}

		
	}
	return hooks;
}
