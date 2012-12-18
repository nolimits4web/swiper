/*
Author: Vladimir Kharlampidi, The iDangero.us
*/
$(function(){
	
	//Main Swiper
	swiper = new Swiper('.swiper1', {
		pagination : '.pagination1'
	});
	$('.arrow-left').click(function(e) {
        e.preventDefault()
		swiper.swipePrev()
    });
	$('.arrow-right').click(function(e) {
        e.preventDefault()
		swiper.swipeNext()
    });
	
	/* Vertical mode: */
	swiperV = $('.swiper-v').swiper({
		mode : "vertical", 
		pagination : '.pagination-v',
		slidesPerSlide : 1
	});
	
	/* Free mode: */
	var swiperFree = $('.swiper-free').swiper({
		pagination : '.pagination-free',
		freeMode : true,
		freeModeFluid: true,
		slidesPerSlide : 1
	});
	
	
	/* Carousel mode: */
	var swiperCar = $('.swiper-car').swiper({
		pagination : '.pagination-car',
		slidesPerSlide : 3
	});
	
	/* Carousel & Loop mode. Infinite Scrolling: */
	var swiperLoop = $('.swiper-loop').swiper({
		pagination : '.pagination-loop',
		slidesPerSlide : 3,
		loop:true
	});
	
	/* Scroll container: */
	var sScroll = $('.swiper-scroll-container').swiper({
		scrollContainer : true,
		scrollbar : {
			container : '.swiper-scrollbar'	
		}
	})	
	
	
	/* Nested Swipers. Vertical Swiper inside of horizontal: */	
	var swiperN1 = $('.swiper-n1').swiper({
		pagination : '.pagination-n1',
		slidesPerSlide : 3
	});
	var swiperN2 = $('.swiper-n2').swiper({
		pagination : '.pagination-n2',
		slidesPerSlide : 2,
		mode: 'vertical'
	});
	
	/* More complex. Nested Swipers + Carousel Mode + Loop Mode: */
	var swiperN11 = $('.swiper-n11').swiper({
		pagination : '.pagination-n11',
		loop : true,
		slidesPerSlide : 3
	});
	var swiperN22 = $('.swiper-n22').swiper({
		pagination : '.pagination-n22',
		slidesPerSlide : 2,
		mode: 'vertical'
	});
	
	
	//Tabs
	var swiperTabs = $('.swiper-tabs').swiper({
		onlyExternal : true,
		speed:500
	});
	$(".tabs a").bind('touchstart',function(e){
		e.preventDefault()
		$(".tabs .active").removeClass('active')
		$(this).addClass('active')
		e.preventDefault()
		swiperTabs.swipeTo( $(this).index() )
	})
	$(".tabs a").click(function(e){
		e.preventDefault()
	})
	$(".tabs a").mousedown(function(e){
		$(".tabs .active").removeClass('active')
		$(this).addClass('active')
		e.preventDefault()
		swiperTabs.swipeTo( $(this).index() )
	})
	
	
	//Puzzle
	var puzzleParams = {
		mode : "horizontal", 
		speed : 300,
		ratio : 1
	}
	$(".p1").swiper(puzzleParams)
	$(".p2").swiper(puzzleParams)
	$(".p3").swiper(puzzleParams)
	$(".p4").swiper(puzzleParams)
	$(".p5").swiper(puzzleParams)
	$(".p6").swiper(puzzleParams)
	
	
	
	//Movies App
	var swiperMovies = $('.mc-posters').swiper({
		mode : "horizontal", 
		onlyExternal : true,
		speed:1000
	});
	var allowMovieClick = true
	var swiperMControl = $('.mc-control').swiper({
		mode : "horizontal", 
		scrollContainer:true,
		onTouchMove : function(){
			allowMovieClick = false	
		},
		onTouchEnd : function() {
			setTimeout(function(){allowMovieClick = true},100)	
		}
	});
	$('.mc-control img').bind('mousedown',function(e){
		e.preventDefault()
	})
	$('.mc-control img').bind('click',function(e){
		e.preventDefault()
		if (!allowMovieClick) return;
		var index = $(this).index()
		swiperMovies.swipeTo ( index )
		$('.mc-control .active').removeClass('active')
		$(this).addClass('active')
	})
	
	
})

