(function () {
	$(window).on("scroll",function(){
		if($(window).scrollTop() > 0)
			$(".header .navbar").addClass("sticky").animate({top:0,},4000)
		else
			$(".header .navbar").removeClass("sticky").animate({top:0,},4000)
	});

	$('.navbar-toggler').click(function(){
		$('.fullscreen-bg').addClass('active');
		$('#mainNavbar').animate({
			left: 0
		}, 200);
	});
	$('.fullscreen-bg').click(function(){
		$(this).removeClass('active');
		$('#mainNavbar').animate({
			left: -300
		}, 300);
		setTimeout(function(){
			$('#mainNavbar').removeClass('show');
		}, 1000)
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
	  
})();