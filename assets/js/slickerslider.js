(function ($) {
	let loop = $(".tmsb-loop").val();
	let autoplay = $(".tmsb-autoplay").val();
	let slides = $(".tmsb-slides").val();
	let dots = $(".tmsb-dots").val();
	let scroll = $(".tmsb-scroll").val();
	let fade = $(".tmsb-fade").val();
	let arrow = $(".tmsb-arrow").val();
	let speed = $(".tmsb-speed").val();

	if (fade == 1) {
		slides = 1;
	}

	$(".has-slider").slick({
		infinite: loop == 1 ? true : false,
		autoplay: autoplay == 1 ? true : false,
		slidesToShow: slides,
		slidesToScroll: 1,
		dots: dots == 1 ? true : false,
		arrows: arrow == 1 ? true : false,
		speed: speed,
		focusOnSelect: true,
		fade: fade == 1 ? true : false,
	});

})(jQuery);
