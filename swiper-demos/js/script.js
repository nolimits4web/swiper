/*
Author: Vladimir Kharlampidi, The iDangero.us
*/
$(function(){
	/* Main Slider */
	swiper = new Swiper('.swiper1', {
		pagination : '.pagination1'
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
		slidesPerSlide : 1,
		loop: true
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
	
	/* Tabs */
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
	
	/* Puzzle */
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
	
	/* Movies */
	var swiperMovies = $('.mc-posters').swiper({
		mode : "horizontal", 
		onlyExternal : true,
		speed:1000
	});
	
	var swiperMControl = $('.mc-control').swiper({
		mode : "horizontal", 
		freeMode: true,
		freeModeFluid:true,
		speed:1000
	});
	$('.mc-control img').bind('mousedown',function(e){
		e.preventDefault()
	})
	$('.mc-control img').bind('click',function(e){
		e.preventDefault()
		var index = $(this).index() + $(this).parent().index()*8
		swiperMovies.swipeTo ( index )
	})
	
	
})

