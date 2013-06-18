$(function(){
	var gallery = $('.swiper-container').swiper({
		slidesPerView:'auto',
		watchActiveIndex: true,
		centeredSlides: true,
		pagination:'.pagination',
		paginationClickable: true,
		resizeReInit: true,
		keyboardControl: true,
		grabCursor: true,
		onImagesReady: function(){
			changeSize()
		}
	})
	function changeSize() {
		//Unset Width
		$('.swiper-slide').css('width','')
		//Get Size
		var imgWidth = $('.swiper-slide img').width();
		if (imgWidth+40>$(window).width()) imgWidth = $(window).width()-40;
		//Set Width
		$('.swiper-slide').css('width', imgWidth+40);
	}
	
	changeSize()

	//Smart resize
	$(window).resize(function(){
		changeSize()
		gallery.resizeFix(true)	
	})
})
