(function () {
    lazyLoad();
    if ($('.header .shop-elements .cart').length != 0) {
        $("body").append('<div id="cart-sidebar" class="d-none"></div>');
        $("#cart-sidebar").load("cart.html");
    }

    $('.header .shop-elements .cart').click(function () {
        $("#cart-sidebar").removeClass('d-none');
        $('.fullscreen-bg').addClass('active cart');
        if ($('html').attr('dir') == 'ltr')
            $('#cart-sidebar').animate({right: 0}, 200);
        else
            $('#cart-sidebar').animate({left: 0}, 200);
    });

    $('.navbar-toggler').click(function () {
        $('.fullscreen-bg').addClass('active header');
        if ($('html').attr('dir') == 'ltr')
            $('#mainNavbar').animate({left: 0}, 200);
        else
            $('#mainNavbar').animate({right: 0}, 200);
    });
    $('.navbar-nav .nav-close a').click(function () {
        sidebarClose();
    });
    $('.fullscreen-bg').click(function () {
        sidebarClose();
    });

    // Search Box
    var searchResults = [];
    $('#search-results-list li').each(function () {
        searchResults.push($(this).text())
    });
    if ($('#search-autocomplete').length != 0) {
        $('#search-autocomplete').devbridgeAutocomplete({
            lookup: searchResults,
            appendTo: '.search-form',
            maxHeight: '200',
            // width: '100%',
            showNoSuggestionNotice: true,
            noSuggestionNotice: 'Sorry, no matching results',
        });
    }
    $("#search-autocomplete").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        if (value == '')
            $(".search-filter-clear").hide();
        else
            $(".search-filter-clear").show();
    });
    $(".search-filter-clear").on("click", function () {
        $(".search-form input").val('');
        $(".search-filter-clear").hide();
    });

    $('.shop-sidebar .filter-options ul li input').on("change", function () {
        var value = $(this).next().find('.title').text();
        var id = $(this).attr('id');
        if ($(this).is(':checked')) {
            var tag = '<div id="' + id + '">' +
                '<span class="title">' + value + '</span>' +
                '<a href="javascript:void(0)" class="clear" onclick="shopFilterTagsClear($(this))"><span>&times;</span></a>' +
                '</div>'
            $('.shop-content .shop-topbar .tags').append(tag);
            shopFilterProducts();
        } else {
            shopFilterTagsClear($('.shop-content .shop-topbar .tags #' + id + ' .clear'));
        }
    });

    $('.modal').on('hidden.bs.modal', function () {
        $('.modal form')[0].reset();
    });
})();

$(window).on("scroll", function () {
    if ($(window).scrollTop() > 0)
        $(".header .navbar").addClass("sticky").animate({top: 0,}, 4000);
    else
        $(".header .navbar").removeClass("sticky").animate({top: 0,}, 4000);
});

function cartItemQtyEditClick(ct) {
    var oldValue = ct.parent().find("span.qty").text();
    var newVal = '';
    if (ct.text() == "+")
        newVal = parseInt(oldValue) + 1;
    else {
        if (oldValue > 0)
            newVal = parseInt(oldValue) - 1;
        else
            newVal = oldValue;
    }
    ct.parent().find("span.qty").text(newVal);
    var price = ct.parent().next().find('.value').attr('value');
    ct.parent().next().find('.value').text((newVal * price).toLocaleString());
}

function sidebarClose() {
    $('.fullscreen-bg').removeClass('active');
    if ($('.fullscreen-bg').hasClass('header')) {
        if ($('html').attr('dir') == 'ltr')
            $('#mainNavbar').animate({left: -300}, 300);
        else
            $('#mainNavbar').animate({right: -300}, 300);
        setTimeout(function () {
            $('#mainNavbar').removeClass('show');
        }, 1000);
    } else if ($('.fullscreen-bg').hasClass('cart')) {
        if ($('html').attr('dir') == 'ltr')
            $('#cart-sidebar').animate({right: -450}, 200);
        else
            $('#cart-sidebar').animate({left: -450}, 200);
    }
    $('.fullscreen-bg').removeClass('cart header');
}

function shopProductsAddToCart(btn, validationCheck) {
    if (validationCheck) {
        if ($('.colors input:checked').length == 0)
            $('.colors .title .error').show();
        if ($('.sizes input:checked').length == 0)
            $('.sizes .title .error').show();
    }
    if (!btn.hasClass('success') && $('.colors input:checked').length != 0 && $('.sizes input:checked').length != 0) {
        btn.addClass('state-change');
        btn.addClass('loading');
        setTimeout(function () {
            btn.removeClass('loading');
        }, 2000);
        setTimeout(function () {
            btn.addClass('success');
            $('.header .shop-elements .cart').addClass('filled');
            setTimeout(function () {
                btn.next().show();
                btn.remove();
            }, 2000);
        }, 2000);
    }
}

function shopFilterSidebarClose() {
    if ($(window).width() < 768 && $(window).width() > 575) {
        if ($('html').attr('dir') == 'ltr')
            $('.shop-sidebar').css('left', '-330px');
        else
            $('.shop-sidebar').css('right', '-330px');
    }
    if ($(window).width() < 576) {
        if ($('html').attr('dir') == 'ltr')
            $('.shop-sidebar').css('left', '-100%');
        else
            $('.shop-sidebar').css('right', '-100%');
        $('body').css('overflow', 'auto');
    }
}

function shopFilterSidebarOpen() {
    if ($('html').attr('dir') == 'ltr')
        $('.shop-sidebar').css('left', '0');
    else
        $('.shop-sidebar').css('right', '0');
    if ($(window).width() < 576)
        $('body').css('overflow', 'hidden');
}

function shopFilterTagsClear(ct) {
    ct.parent().fadeOut(200);
    setTimeout(function () {
        ct.parent().remove();
    }, 300);
    if (ct.parent().hasClass('price')) {
        $("#price-range").slider('option', 'values', [0, 5000]);
        $("#priceRange-start").val($("#price-range").slider("values", 0).toLocaleString());
        $("#priceRange-end").val($("#price-range").slider("values", 1).toLocaleString());
    }
    shopFilterProducts();
}

function shopFilterProducts() {
    $('#ajax-loader').fadeIn();
    $('.shop-sidebar').addClass('loading');
    $.get("", function (data, status) {
        setTimeout(function () {
            location.reload();
        }, 1000);
    });
}

function shopProductsPagination(selector, page, range) {
    let count = 9;
    if (page > 1) {
        $(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)"><span>Previous</span><i class="icon-arrow-left"></i></a></li>');
    }
    for (let i = 1; i <= count; i++) {
        if (i == 1 && page - range > 1) {
            $(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)">1</a></li>');
            if (page - range > 2)
                $(selector).append('<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">...</a></li>');
        }
        if (i >= page - range && i <= page + range) {
            if (i != page)
                $(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');
            else
                $(selector).append('<li class="page-item active"><a class="page-link" href="javascript:void(0)">' + i + '</a></li>');
        }
        if (i == count && page + range < count) {
            if (page + range < count - 1)
                $(selector).append('<li class="page-item disabled"><a class="page-link" href="javascript:void(0)">...</a></li>');
            $(selector).append('<li class="page-item"><a class="page-link"href="javascript:void(0)">' + count + '</a></li>');
        }
    }
    if (page < count)
        $(selector).append('<li class="page-item"><a class="page-link" href="javascript:void(0)"><span>Next</span><i class="icon-arrow-right"></i></a></li>');
}

function owlCarouselInit(options) {
    var autoplay = options.autoplay == undefined ? false : options.autoplay,
        autoplayTimeout = options.autoplayTimeout == undefined ? 5000 : options.autoplayTimeout,
        dots = options.dots == undefined ? true : options.dots,
        nav = options.nav == undefined ? false : options.nav,
        navText = options.navText == undefined ? '[&#x27;next&#x27;,&#x27;prev&#x27;]' : options.navText,
        autoplayHoverPause = options.autoplayHoverPause == undefined ? false : options.autoplayHoverPause,
        loop = options.loop == undefined ? false : options.loop,
        margin = options.margin == undefined ? 30 : options.margin,
        lazyLoad = options.lazyLoad == undefined ? false : options.lazyLoad;
    lazyLoadEager = options.lazyLoadEager == undefined ? 0 : options.lazyLoadEager;
    responsiveClass = options.responsiveClass == undefined ? false : options.responsiveClass,
        responsive = options.responsive == undefined ? {
            768: {items: 1},
            992: {items: 2},
            1200: {items: 3}
        } : options.responsive;

    $(options.elem).owlCarousel({
        autoplay: autoplay,
        autoplayTimeout: autoplayTimeout,
        dots: dots,
        nav: nav,
        navText: navText,
        autoplayHoverPause: autoplayHoverPause,
        loop: loop,
        margin: margin,
        lazyLoad: lazyLoad,
        lazyLoadEager: lazyLoadEager,
        responsiveClass: responsiveClass,
        responsive: responsive,
        rtl: true
    });
}

function discountCodeCheck(ct) {
    var val = ct.val();
    if (val == '')
        ct.next().prop('disabled', true);
    else
        ct.next().prop('disabled', false);
}

function lazyLoad() {
    var lazyLoadEl = $('[data-lazyload]');
    if (lazyLoadEl.length > 0) {
        lazyLoadEl.each(function () {
            var element = $(this),
                elementImg = element.attr('data-lazyload');

            element.appear(function () {
                element.removeClass('loading').removeAttr('width').removeAttr('height').attr('src', elementImg);
            }, {accX: 0, accY: 120}, 'easeInCubic');
        });
    }
}