$(function () {
	// Initialize nScroll
	$('.popup').click(function(){
		$('.nScroll').niceScroll({ cursorborder: "", cursorcolor: "#ddd" });
	});

	// Image Comparison Mobile
	if ($(window).width() < 768) {
		$('.cd-image-container').addClass('is-visible');
	} else {
		$('.cd-image-container').removeClass('is-visible');
	}
});