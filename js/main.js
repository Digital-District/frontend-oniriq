(function () {
	$(window).on("scroll",function(){
		if($(window).scrollTop() > 0)
			$(".header .navbar").addClass("sticky").animate({top:0,},4000)
		else
			$(".header .navbar").removeClass("sticky").animate({top:0,},4000)
	});

	$('.navbar-toggler').click(function(){
		$('.fullscreen-bg').addClass('active header');
		$('#mainNavbar').animate({
			left: 0
		}, 200);
	});
	$('.fullscreen-bg').click(function(){
		$(this).removeClass('active');
		if($(this).hasClass('header')){
			$('#mainNavbar').animate({left: -300}, 300);
			setTimeout(function(){$('#mainNavbar').removeClass('show');}, 1000);
		}
	});

	// Search Box
	var searchResults = [];
	$('#search-results-list li').each(function() { searchResults.push($(this).text()) });
	$('#search-autocomplete').devbridgeAutocomplete({
		lookup: searchResults,
		appendTo: '.search-form',
		maxHeight: '200',
		// width: '100%',
		showNoSuggestionNotice: true,
		noSuggestionNotice: 'Sorry, no matching results',
	});
	$("#search-autocomplete").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		if(value == '')
			$(".search-filter-clear").hide();
		else
			$(".search-filter-clear").show();
	});
	$(".search-filter-clear").on("click", function() {
		$(".search-form input").val('');
		$(".search-filter-clear").hide();
	});

	$('.shop-sidebar .filter-options ul li input').on("change", function() {
		//shopFilterProducts();
	});
})();

function shopProductsAddToCart(btn){
	if(!btn.hasClass('success')){
		btn.addClass('state-change');
		btn.addClass('loading');
		setTimeout(function(){
			btn.removeClass('loading');
		}, 2000);
		setTimeout(function(){
			btn.addClass('success');
			$('.header .shop-elements .cart').addClass('filled');
			setTimeout(function(){
				btn.hide();
				btn.next().show();
			}, 2000);
		}, 2000);
	}
}
function shopFilterSidebarClose(){
	if($(window).width() < 768 && $(window).width() > 575) 
		$('.shop-sidebar').css('left', '-330px');
	if($(window).width() < 576) {
		$('.shop-sidebar').css('left', '-100%');
		$('body').css('overflow', 'auto');
	}
}
function shopFilterSidebarOpen(){
	$('.shop-sidebar').css('left', '0');
	if($(window).width() < 576) 
		$('body').css('overflow', 'hidden');
}
function shopFilterProducts(){
	$.get("", function(data, status){
		location.reload();
	});
}
function shopProductsPagination(selector, page, range){
	let count = 9;
	if (page > 1){
	  	$(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)">Previous<span><i class="icon-arrow-left"></i</span></a></li>');
	}
	for (let i = 1; i <= count; i++){
	  	if (i == 1 && page-range > 1){
			$(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)">1</a></li>');
		  	if (page-range > 2)
				$(selector).append('<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">...</a></li>');
	  	}
	  	if (i >= page-range && i <= page+range){
			if (i != page)
				$(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');
			else
				$(selector).append('<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');
	  	}
	  	if (i == count && page+range < count){
			if (page+range < count-1)
				$(selector).append('<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">...</a></li>');
			$(selector).append('<li class="page-item"><a class="page-link"href="javascript:void(0)">' + count + '</a></li>'); 
		}
	}
	if (page < count)
		$(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)">Next<span><i class="icon-arrow-right"></i</span></a></li>');
};
shopProductsPagination('.pagination', 1, 3);