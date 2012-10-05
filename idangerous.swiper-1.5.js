/*
 * Swiper 1.5 - Mobile Touch Slider
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Updated on: October 1, 2012
*/
Swiper = function(selector, params, callback) {
	if (!document.querySelectorAll||document.querySelectorAll(selector).length==0) return;
	function dQ(s) {
		return document.querySelectorAll(s)
	}
	var _this = this
	_this.touches = {};
	_this.positions = {
		current : 0	
	};
	_this.times = {};
	_this.isTouched = false;
	_this.realIndex = 0;
	_this.activeSlide = 0;
    _this.previousSlide = null;
	_this.use3D = _this.isSupport3D()
	params = params || {};
	_this.params = params;

	//Default Parameters
	params.mode = params.mode || "horizontal";
	params.ratio = params.ratio || 1;
	params.speed = params.speed || 300;
	params.freeMode = params.freeMode || false;
	params.freeModeFluid = params.freeModeFluid || false;
	params.slidesPerSlide = params.slidesPerSlide || 1;
	if (params.simulateTouch === false) params.simulateTouch = false
	else params.simulateTouch = true
	if (params.followFinger === false) params.followFinger = false
	else params.followFinger = true
	
	//AutoPlay
	params.autoPlay = params.autoPlay || false
	
	//Only External Control
	params.onlyExternal = params.onlyExternal || false
	//Pagination
	if (params.createPagination === false) params.createPagination = false
	else params.createPagination = true
	
	params.pagination = params.pagination || false
	//Default Element Classes
	params.slideClass = params.slideClass || 'swiper-slide'
	params.wrapperClass = params.wrapperClass || 'swiper-wrapper'
	params.paginationClass = params.paginationClass || 'swiper-pagination-switch';
	params.paginationActiveClass = params.paginationActiveClass || 'swiper-active-switch';
	
	//Default Params and Vars
	var	wrapper = dQ(selector+' .'+params.wrapperClass).item(0), isHorizontal,
	 slideSize, numOfSlides, wrapperSize, direction, isScrolling, containerSize;
	
	//Wrapper
	_this.wrapper = wrapper;
	 
	//Mode
	isHorizontal = params.mode == 'horizontal';
		
	//Define Touch Events
	var touchEvents = {
		touchStart : _this.isSupportTouch() || !params.simulateTouch  ? 'touchstart' : 'mousedown',
		touchMove : _this.isSupportTouch() || !params.simulateTouch ? 'touchmove' : 'mousemove',
		touchEnd : _this.isSupportTouch() || !params.simulateTouch ? 'touchend' : 'mouseup'
	};
	
	//Loop
	if (params.loop) {
		(function(){
			numOfSlides = dQ(selector + ' > .'+params.wrapperClass + ' > .' + params.slideClass).length
			var slideFirstHTML = '';
			var slideLastHTML = '';
			//Grab First Slides
			for (var i=0; i<params.slidesPerSlide; i++) {
				slideFirstHTML+=dQ(selector + ' > .'+params.wrapperClass + ' > .' + params.slideClass).item(i).outerHTML
			}
			//Grab Last Slides
			for (var i=numOfSlides-params.slidesPerSlide; i<numOfSlides; i++) {
				slideLastHTML+=dQ(selector + ' > .'+params.wrapperClass + ' > .' + params.slideClass).item(i).outerHTML
			}
			wrapper.innerHTML = slideLastHTML + wrapper.innerHTML + slideFirstHTML;
		})();
		setTimeout(function(){
			_this.swipeTo(0,0);	
		},0)
	}
	
	//Init Function
	_this.init = function() {
		var sliderWidth  = dQ(selector).item(0).offsetWidth;
		var sliderHeight  = dQ(selector).item(0).offsetHeight;
		slideSize = containerSize = isHorizontal ? sliderWidth : sliderHeight;
		numOfSlides = dQ(selector + ' > .'+params.wrapperClass + ' > .' + params.slideClass).length

		var dividerVertical = isHorizontal ? 1 : params.slidesPerSlide
		var dividerHorizontal = isHorizontal ? params.slidesPerSlide : 1
		
		for (var i=0; i<numOfSlides; i++ ) {
            var el = dQ(selector + ' > .'+params.wrapperClass + ' > .' + params.slideClass).item(i);
            el.style.width=sliderWidth/dividerHorizontal+"px"
            el.style.height=sliderHeight/dividerVertical+"px"
            if (params.onSlideInitialize) {
                params.onSlideInitialize(_this, el);
            }
		}
		
		var wrapperWidth = numOfSlides*sliderWidth/dividerHorizontal;
		var wrapperHeight = numOfSlides*sliderHeight/dividerVertical;
		
		wrapperSize = isHorizontal ? wrapperWidth : wrapperHeight;
		
		if (isHorizontal) {
			wrapper.style.width = wrapperWidth+"px";
		}
		else {
			wrapper.style.height = wrapperHeight+"px"
		}
		
		if (params.slidesPerSlide && params.slidesPerSlide > 1) {
			slideSize = slideSize/params.slidesPerSlide	
		}
		
	}
	_this.init()
	
	//Get Max And Min Positions
	function maxPos() {
		var a = (wrapperSize - slideSize*params.slidesPerSlide);
		if (params.loop) a = a - containerSize;	
		return a;
	}
	function minPos() {
		var a = 0;
		if (params.loop) a = containerSize;
		return a;	
	}
	
	//Pagination
	if (params.pagination && params.createPagination) {
		
		var paginationHTML = ""
		var numOfButtons = params.loop ? numOfSlides - params.slidesPerSlide*2 : numOfSlides;
		for (var i = 0; i < numOfButtons; i++) {
			paginationHTML += '<span class="'+params.paginationClass+'"></span>'
		}
		dQ(params.pagination)[0].innerHTML = paginationHTML
		setTimeout(function(){
			_this.updatePagination()
		},0)
	}
	
	//Window Resize Re-init
	if (!params.disableAutoResize) {
		window.addEventListener('resize', swiperResizeFix, false)
	}
	function swiperResizeFix() {
		_this.init()
		//To fix translate value
		_this.swipeTo(_this.activeSlide, 0, false)
	}
	//Autoplay
	var autoPlay
	_this.startAutoPlay = function() {
		if (params.autoPlay) {
			autoPlay = setInterval(function(){
				var newSlide = _this.realIndex + 1
				if ( newSlide == numOfSlides) newSlide = 0 
				_this.swipeTo(newSlide) 
			}, params.autoPlay)
		}
	}
	_this.stopAutoPlay = function() {
		if (autoPlay)
			clearInterval(autoPlay)
	}
	if (params.autoPlay) {
		_this.startAutoPlay()
	}
	
	//Event Listeners
	wrapper.addEventListener(touchEvents.touchStart, onTouchStart, false);
	
	//Mouse 'mousemove' and 'mouseup' events should be assigned to document
	var lestenEl = _this.isSupportTouch() ? wrapper : document
	lestenEl.addEventListener(touchEvents.touchMove, onTouchMove, false);
	lestenEl.addEventListener(touchEvents.touchEnd, onTouchEnd, false);
	
	//Remove Events
	_this.destroy = function(removeResizeFix){
		removeResizeFix = removeResizeFix===false ? removeResizeFix : removeResizeFix || true
		if (removeResizeFix) {
			window.removeEventListener('resize', swiperResizeFix, false);
		}
		wrapper.removeEventListener(touchEvents.touchStart, onTouchStart, false);
		lestenEl.removeEventListener(touchEvents.touchMove, onTouchMove, false);
		lestenEl.removeEventListener(touchEvents.touchEnd, onTouchEnd, false);
	}
	
	//Event Handlers
	function onTouchStart(event) {
		
		//Exit if slider is already was touched
		if (_this.isTouched || params.onlyExternal) {
			return false
		}
		
		//Check For Nested Swipers
		if (event.assignedToSwiper) return
		event.assignedToSwiper = true;
		
		_this.isTouched = true;
		
		if (!_this.isSupportTouch() || event.targetTouches.length == 1 ) {
			if (params.loop) _this.fixLoop();
			if(!_this.isSupportTouch()) event.preventDefault()
			
			//Start Touches to check the scrolling
			_this.touches.startX = _this.touches.currentX = _this.isSupportTouch() ? event.targetTouches[0].pageX : event.pageX;
			_this.touches.startY = _this.touches.currentY = _this.isSupportTouch() ? event.targetTouches[0].pageY : event.pageY;
			
			_this.touches.start = _this.touches.current = isHorizontal ? _this.touches.startX : _this.touches.startY ;
			
			//Set Transition Time to 0
			_this.setTransition(0)
			
			//Get Start Translate Position
			_this.positions.start = _this.positions.current = isHorizontal ? _this.getTranslate('x') : _this.getTranslate('y');
			
			//Set Transform
			if (isHorizontal) {
				_this.setTransform( _this.positions.start, 0, 0)
			}
			else {
				_this.setTransform( 0, _this.positions.start, 0)
			}
			
			//TouchStartTime
			var tst = new Date()
			_this.times.start = tst.getTime()
			
			//Unset Scrolling
			isScrolling = undefined;
			
			//CallBack
			if (params.onTouchStart) params.onTouchStart(_this)
			
		}
	}
	function onTouchMove(event) {
		
		// If slider is not touched - exit
		if (!_this.isTouched || params.onlyExternal) return
		
		//Check For Nested Swipers
		
		//check for scrolling
		if (_this.isSupportTouch()) {
		    if ( typeof isScrolling == 'undefined' && isHorizontal) {
		      isScrolling = !!( isScrolling || Math.abs(event.targetTouches[0].pageY - _this.touches.startY) > Math.abs( event.targetTouches[0].pageX - _this.touches.startX ) )
		    }
		    if ( typeof isScrolling == 'undefined' && !isHorizontal) {
		      isScrolling = !!( isScrolling || Math.abs(event.targetTouches[0].pageY - _this.touches.startY) < Math.abs( event.targetTouches[0].pageX - _this.touches.startX ) )
		    }
			if (isScrolling ) return
		}	
		
		//Check For Nested Swipers
		if (event.assignedToSwiper) return
		event.assignedToSwiper = true;	
		
		
		//Stop AutoPlay if exist
		if (params.autoPlay) {
			_this.stopAutoPlay()
		}
		
		if (!_this.isSupportTouch() || event.touches.length == 1) {
						
			event.preventDefault()
			
			if (params.onTouchMove) params.onTouchMove(_this)
			
			_this.touches.current = isHorizontal ? (_this.isSupportTouch() ? event.targetTouches[0].pageX : event.pageX) : (_this.isSupportTouch() ? event.targetTouches[0].pageY : event.pageY) ;
			
			_this.positions.current = (_this.touches.current - _this.touches.start)*params.ratio + _this.positions.start			
			
			//Resistance for Negative-Back sliding
			if(_this.positions.current > 0 && !(params.freeMode&&!params.freeModeFluid)) {
				if (params.loop) {
					var resistance = 1;
					if (_this.positions.current>0) _this.positions.current = 0;
				}
				else {
					var resistance = (containerSize*2-_this.positions.current)/containerSize/2;
				}
				if (resistance < 0.5) 
					_this.positions.current = (containerSize/2)
				else 
					_this.positions.current = _this.positions.current * resistance
				
			}
			//Resistance for After-End Sliding
			if ( Math.abs(_this.positions.current) > (wrapperSize-slideSize*params.slidesPerSlide) && !(params.freeMode&&!params.freeModeFluid)) {
				if (params.loop) {
					var resistance = 1;
					var newPos = _this.positions.current
					var stopPos = -maxPos() - containerSize
				}
				else {
					var diff = (_this.touches.current - _this.touches.start)*params.ratio + (maxPos()+_this.positions.start)
					var resistance = (containerSize+diff)/(containerSize);
					var newPos = _this.positions.current-diff*(1-resistance)/2
					var stopPos = -maxPos() - containerSize/2;
				}
				
				if (newPos < stopPos || resistance<=0)
					_this.positions.current = stopPos;
				else 
					_this.positions.current = newPos
			}
			
			//Move Slides
			if (!params.followFinger) return
			if (isHorizontal) _this.setTransform( _this.positions.current, 0, 0)
			else _this.setTransform( 0, _this.positions.current, 0)
			
			if (params.freeMode) {
				_this.updateActiveSlide(_this.positions.current)
			}
		}
	}
	function onTouchEnd(event) {
		// If slider is not touched exit
		if ( params.onlyExternal || !_this.isTouched ) return
		_this.isTouched = false
		
		//Check for Current Position
		if (!_this.positions.current && _this.positions.current!==0) {
			_this.positions.current = _this.positions.start	
		}
		
		//For case if slider touched but not moved
		if (isHorizontal) _this.setTransform( _this.positions.current, 0, 0)
		else _this.setTransform( 0, _this.positions.current, 0)
		//--
		
		// TouchEndTime
		var tet = new Date()
		_this.times.end = tet.getTime();
		
		//Difference
		_this.touches.diff = _this.touches.current - _this.touches.start		
		_this.touches.abs = Math.abs(_this.touches.diff)
		
		_this.positions.diff = _this.positions.current - _this.positions.start
		_this.positions.abs = Math.abs(_this.positions.diff)
		
		var diff = _this.positions.diff ;
		var diffAbs =_this.positions.abs ;

		if(diffAbs < 5) {
			_this.swipeReset()
		}
		
		var maxPosition = wrapperSize - slideSize*params.slidesPerSlide;
		
		
		//Prevent Negative Back Sliding
		if (_this.positions.current > 0) {
			_this.swipeReset()
			if (params.onTouchEnd) params.onTouchEnd(_this)
			return
		}
		//Prevent After-End Sliding
		if (Math.abs(_this.positions.current) > maxPosition) {
			_this.swipeReset()
			if (params.onTouchEnd) params.onTouchEnd(_this)
			return
		}
		
		//Free Mode
		if (params.freeMode) {
			if ( (_this.times.end - _this.times.start) < 300 && params.freeModeFluid ) {
				var newPosition = _this.positions.current + _this.touches.diff * 2 ;
				if (newPosition < maxPosition*(-1)) newPosition = -maxPosition;
				if (newPosition > 0) newPosition = 0;
				if (isHorizontal)
					_this.setTransform( newPosition, 0, 0)
				else 
					_this.setTransform( 0, newPosition, 0)
					
				_this.setTransition( (_this.times.end - _this.times.start)*2 )
				_this.updateActiveSlide(newPosition)
			}
			if (!params.freeModeFluid || (_this.times.end - _this.times.start) >= 300) _this.updateActiveSlide(_this.positions.current)
			if (params.onTouchEnd) params.onTouchEnd(_this)
			return
		}
		
		//Direction
		direction = diff < 0 ? "toNext" : "toPrev"
		
		//Short Touches
		if (direction=="toNext" && ( _this.times.end - _this.times.start <= 300 ) ) {
			if (diffAbs < 30) _this.swipeReset()
			else _this.swipeNext(true);
		}
		
		if (direction=="toPrev" && ( _this.times.end - _this.times.start <= 300 ) ) {
		
			if (diffAbs < 30) _this.swipeReset()
			else _this.swipePrev(true);
		}
		
		//Long Touches
		if (direction=="toNext" && ( _this.times.end - _this.times.start > 300 ) ) {
			if (diffAbs >= slideSize*0.5) {
				_this.swipeNext(true);
			}
			else {
				_this.swipeReset()
			}
		}
		if (direction=="toPrev" && ( _this.times.end - _this.times.start > 300 ) ) {
			if (diffAbs >= slideSize*0.5) {
				_this.swipePrev(true);
			}
			else {
				_this.swipeReset()
			}
		}
		if (params.onTouchEnd) params.onTouchEnd(_this)
	}
	
	/* ---- Swipe Functions ----*/
	_this.swipeNext = function(internal) {
		if (!internal&&params.loop) _this.fixLoop();
		
		var getTranslate = isHorizontal ? _this.getTranslate('x') : _this.getTranslate('y')
		
		var newPosition = Math.floor(Math.abs(getTranslate)/Math.floor(slideSize))*slideSize + slideSize 

		if (newPosition==wrapperSize) return;
		
		if (newPosition > maxPos() && !params.loop) return;
		
		if (params.loop) {
			if (newPosition >= (maxPos()+containerSize)) newPosition = maxPos()+containerSize
		}
		
		if (isHorizontal) {
			_this.setTransform(-newPosition,0,0)
		}
		else {
			_this.setTransform(0,-newPosition,0)
		}
		
		_this.setTransition( params.speed)
		
		//Update Active Slide
		_this.updateActiveSlide(-newPosition)
		
		//Run Callbacks
		slideChangeCallbacks()
		
		return true
	}
	
	_this.swipePrev = function(internal) {
		
		if (!internal&&params.loop) _this.fixLoop();
		
		var getTranslate = isHorizontal ? _this.getTranslate('x') : _this.getTranslate('y')
		
		var newPosition = (Math.ceil(-getTranslate/slideSize)-1)*slideSize;
		
		if (newPosition < 0) newPosition = 0;
		
		if (isHorizontal) {
			_this.setTransform(-newPosition,0,0)
		}
		else  {
			_this.setTransform(0,-newPosition,0)
		}		
		_this.setTransition(params.speed)
		
		//Update Active Slide
		_this.updateActiveSlide(-newPosition)
		
		//Run Callbacks
		slideChangeCallbacks()
		
		return true
	}
	
	_this.swipeReset = function(prevention) {
		var getTranslate = isHorizontal ? _this.getTranslate('x') : _this.getTranslate('y');
		var newPosition = getTranslate<0 ? Math.round(getTranslate/slideSize)*slideSize : 0
		var maxPosition = -maxPos()
		
		if (newPosition <= maxPosition) {
			newPosition = maxPosition
		}
		
		if (params.mode=='horizontal') {
			_this.setTransform(newPosition,0,0)
		}
		else {
			_this.setTransform(0,newPosition,0)
		}
		
		_this.setTransition( params.speed)
		
		//Update Active Slide
		_this.updateActiveSlide(newPosition)
		
		//Reset Callback
		if (params.onSlideReset) {
			params.onSlideReset(_this)
		}
		
		return true
	}
	
	_this.swipeTo = function (index, speed, runCallbacks) {
		
		if (index > (numOfSlides-1)) return;
		if (index<0 && !params.loop) return;
		runCallbacks = runCallbacks===false ? false : runCallbacks || true
		var speed = speed===0 ? speed : speed || params.speed;
		
		if (params.loop) index = index + params.slidesPerSlide;
		
		if (index > numOfSlides - params.slidesPerSlide) index = numOfSlides - params.slidesPerSlide;
		var newPosition =  -index*slideSize ;
		
		if (isHorizontal) {
			_this.setTransform(newPosition,0,0)
		}
		else {
			_this.setTransform(0,newPosition,0)
		}
		_this.setTransition( speed )	
		_this.updateActiveSlide(newPosition)

		//Run Callbacks
		if (runCallbacks) 
			slideChangeCallbacks()
			
        return true
	}
	
	function slideChangeCallbacks() {
		//Transition Start Callback
		if (params.onSlideChangeStart) {
			params.onSlideChangeStart(_this)
		}
		
		//Transition End Callback
		if (params.onSlideChangeEnd) {
			_this.transitionEnd(params.onSlideChangeEnd)
		}
	}
	
	_this.updateActiveSlide = function(position) {
        _this.previousSlide = _this.realIndex
		_this.realIndex = Math.round(-position/slideSize)
		if (!params.loop) _this.activeSlide = _this.realIndex;
		else {
			_this.activeSlide = _this.realIndex-params.slidesPerSlide
			if (_this.activeSlide>=numOfSlides-params.slidesPerSlide*2) {
				_this.activeSlide = numOfSlides - params.slidesPerSlide*2 - _this.activeSlide
			}
			if (_this.activeSlide<0) {
				_this.activeSlide = numOfSlides - params.slidesPerSlide*2 + _this.activeSlide	
			}
		}
		if (_this.realIndex==numOfSlides) _this.realIndex = numOfSlides-1
		if (_this.realIndex<0) _this.realIndex = 0

		//Update Pagination
		if (params.pagination) {
			_this.updatePagination()
		}
		
	}
	
	_this.updatePagination = function() {
		var activeSwitch = dQ(params.pagination+' .'+params.paginationActiveClass)
		if(!activeSwitch) return
		for (var i=0; i < activeSwitch.length; i++) {
			if (activeSwitch.item(i).className.indexOf('active')>=0) {
				activeSwitch.item(i).className = activeSwitch.item(i).className.replace(params.paginationActiveClass,'')
			}	
		}
		var pagers = dQ(params.pagination+' .'+params.paginationClass).length;
		var minPagerIndex = params.loop ? _this.realIndex-params.slidesPerSlide : _this.realIndex;
		var maxPagerIndex = minPagerIndex + (params.slidesPerSlide-1);
		for (var i = minPagerIndex; i <= maxPagerIndex; i++ ) {
			var j = i;
			if (j>=pagers) j=j-pagers;
			if (j<0) j = pagers + j;
			if (j<numOfSlides)
				dQ(params.pagination+' .'+params.paginationClass).item( j ).className = dQ(params.pagination+' .'+params.paginationClass).item( j ).className+' '+params.paginationActiveClass
		}
		
	}
	
	_this.fixLoop = function(){
		//Fix For Negative Oversliding
		if (_this.realIndex < params.slidesPerSlide) {
			var newIndex = numOfSlides - params.slidesPerSlide*3 + _this.realIndex;
			_this.swipeTo(newIndex,0)
		}
		//Fix For Positive Oversliding
		if (_this.realIndex > numOfSlides - params.slidesPerSlide*2) {
			var newIndex = -numOfSlides + _this.realIndex + params.slidesPerSlide
			_this.swipeTo(newIndex,0)
		}
	}
}

Swiper.prototype = {

	//Transition End
	transitionEnd : function(callback) {
		var a = this
		var el = a.wrapper
		var events = ['webkitTransitionEnd','transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
		if (callback) {
			function fireCallBack() {
				callback(a)
				for (var i=0; i<events.length; i++) {
					el.removeEventListener(events[i], fireCallBack, false)
				}
			}
			for (var i=0; i<events.length; i++) {
				el.addEventListener(events[i], fireCallBack, false)
			}
		}
	},
	
	//Touch Support
	isSupportTouch : function() {
		return ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch;
	},
		
	// 3D Transforms Test 
	isSupport3D : function() {
		var div = document.createElement('div');
		div.id = 'test3d';
			
		var s3d=false;	
		if("webkitPerspective" in div.style) s3d=true;
		if("MozPerspective" in div.style) s3d=true;
		if("OPerspective" in div.style) s3d=true;
		if("MsPerspective" in div.style) s3d=true;
		if("perspective" in div.style) s3d=true;

		/* Test with Media query for Webkit to prevent FALSE positive*/	
		if(s3d && ("webkitPerspective" in div.style) ) {
			var st = document.createElement('style');
			st.textContent = '@media (-webkit-transform-3d), (transform-3d), (-moz-transform-3d), (-o-transform-3d), (-ms-transform-3d) {#test3d{height:5px}}'
			document.getElementsByTagName('head')[0].appendChild(st);
			document.body.appendChild(div);
			s3d = div.offsetHeight === 5;
			st.parentNode.removeChild(st);
			div.parentNode.removeChild(div);
		}
		
		return s3d;
	},
		
	//GetTranslate
	getTranslate : function(axis){
		var el = this.wrapper
		var matrix;
		var curTransform;
		if (window.WebKitCSSMatrix) {
			var transformMatrix = new WebKitCSSMatrix(window.getComputedStyle(el, null).webkitTransform)
			matrix = transformMatrix.toString().split(',');
		}
		else {
			var transformMatrix = 	window.getComputedStyle(el, null).MozTransform || window.getComputedStyle(el, null).OTransform || window.getComputedStyle(el, null).MsTransform || window.getComputedStyle(el, null).msTransform  || window.getComputedStyle(el, null).transform
			matrix = transformMatrix.toString().split(',');
			
		}
		if (axis=='x') {
			//Crazy IE10 Matrix
			if (matrix.length==16) 
				curTransform = parseInt( matrix[12], 10 )
			//Normal Browsers
			else 
				curTransform = parseInt( matrix[4], 10 )
				
		}
		
		if (axis=='y') {
			//Crazy IE10 Matrix
			if (matrix.length==16) 
				curTransform = parseInt( matrix[13], 10 )
			//Normal Browsers
			else 
				curTransform = parseInt( matrix[5], 10 )
		}
		
		return curTransform;
	},
	
	//Set Transform
	setTransform : function(x,y,z) {
		var es = this.wrapper.style
		x=x||0;
		y=y||0;
		z=z||0;
		if (this.use3D) {
			es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d('+x+'px, '+y+'px, '+z+'px)'
		}
		else {
			es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate('+x+'px, '+y+'px)'
		}
	},
	
	//Set Transition
	setTransition : function(duration) {
		var es = this.wrapper.style
		es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration/1000+'s'
	}
	
}

//Small jQuery and Zepto Plugins
if (window.jQuery||window.Zepto) {
	(function($){
		$.fn.swiper = function(params) {
			return new Swiper($(this).selector, params)
		}
	})(window.jQuery||window.Zepto)
}