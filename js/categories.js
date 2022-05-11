(function () {
    if($('#owl-newin')){
		var options = {};
		options.elem = $('#owl-newin');
		options.margin = 20;
        options.autoplay = true;
        options.autoplayTimeout = 3000;
        options.autoplayHoverPause = true;
        options.loop = true;
        options.dots = false;
        options.lazyLoad = true;
		options.responsiveClass = true;
		options.responsive = { 0: {items: 1}, 768: {items: 2}, 992: {items: 3}, 1200: {items: 4, loop: false} };
		
		owlCarouselInit(options);
	}
    if($('#owl-discover')){
		var options = {};
		options.elem = $('#owl-discover');
		options.margin = 20;
        options.autoplay = true;
        options.autoplayTimeout = 3000;
        options.autoplayHoverPause = true;
        options.loop = true;
        options.dots = false;
        options.lazyLoad = true;
		options.responsiveClass = true;
		options.responsive = { 0: {items: 1}, 768: {items: 2}, 992: {items: 3}, 1200: {items: 4, loop: false} };
		
		owlCarouselInit(options);
	}
    if($('#owl-newCategories')){
		var options = {};
		options.elem = $('#owl-newCategories');
		options.margin = 20;
        options.autoplay = true;
        options.autoplayTimeout = 3000;
        options.autoplayHoverPause = true;
        options.loop = true;
        options.dots = false;
        options.lazyLoad = true;
		options.responsiveClass = true;
		options.responsive = { 0: {items: 1}, 768: {items: 2}, 992: {items: 3}, 1200: {items: 4, loop: false} };
		
		owlCarouselInit(options);
	}
    if($('#owl-categories')){
		var options = {};
		options.elem = $('#owl-categories');
		options.margin = 20;
        options.autoplay = true;
        options.autoplayTimeout = 3000;
        options.autoplayHoverPause = true;
        options.loop = true;
        options.dots = false;
        options.lazyLoad = true;
        options.lazyLoadEager= 1;
		options.responsiveClass = true;
		options.responsive = { 0: {items: 1}, 576: {items: 1, stagePadding: 150}, 768: {items: 2, stagePadding: 150}, 992: {items: 3, stagePadding: 200} };
		
		owlCarouselInit(options);
	}
    if($('#owl-testimonials')){
		var options = {};
		options.elem = $('#owl-testimonials');
		options.margin = 20;
        options.autoplay = true;
        options.autoplayTimeout = 3000;
        options.autoplayHoverPause = true;
        options.loop = true;
        options.dots = false;
		options.responsiveClass = true;
        options.nav = true;
        options.navText = [
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(0, 0, 0, 1);"><path d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"></path></svg>'
        ];
		options.responsive = { 0: {items: 1}, 576: {items: 2}, 768: {items: 3}, 992: {items: 4}, 1200: {items: 4.5} };
		
		owlCarouselInit(options);
	}
})();