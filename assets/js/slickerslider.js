(function ($) {
	var loop     = $(".tmsb-loop").val();
	var autoplay = $(".tmsb-autoplay").val();
	var slides   = $(".tmsb-slides").val();
	var dots     = $(".tmsb-dots").val();
	var scroll   = $(".tmsb-scroll").val();
	var fade     = $(".tmsb-fade").val();
	var arrow    = $(".tmsb-arrow").val();
	var speed    = $(".tmsb-speed").val();

	$(".has-slider").slick({
		infinite      : loop == 1 ? true    : false,
		autoplay      : autoplay == 1 ? true: false,
		slidesToShow  : slides,
		slidesToScroll: 1,
		dots          : dots == 1 ? true    : false,
		arrows        : arrow == 1 ? true   : false,
		speed         : speed,
		focusOnSelect : true,
		// fade: fade == 1 ? true : false,
	});
})(jQuery);
