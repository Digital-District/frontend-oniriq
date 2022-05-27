$(function() { 
    itemImgGalleryIntialize($('.single-item .item-details .colors form > div:first input'));
    $('.single-item .item-details .fixed-btn-container').addClass('show');

    $(window).on("scroll",function(){  
        if(window.innerWidth < '992'){
            var windowElm = $(document).scrollTop() + window.innerHeight;
            var footerElm = $('.footer').offset().top;
            if (windowElm < footerElm) 
                $('.single-item .item-details .fixed-btn-container').removeClass('hide').addClass('show');
            else 
                $('.single-item .item-details .fixed-btn-container').removeClass('show').addClass('hide');   
        }
    });
});
function itemImgGalleryIntialize(ct){
    var imgsSrcArr = imgThumbsSrcArr = [],
        imgSlides = imgThumbsSlides = '';
        
    var imgsSrc = ct.parent().attr('data-images-src'),
        imgThumbsSrc = ct.parent().attr('data-thumbs-src'),
        value = ct.val();

    if(imgThumbsSrc == '' || imgsSrc == undefined)
        imgThumbsSrc = imgsSrc;

    if(imgsSrc != '' && imgsSrc != undefined){
        imgsSrcArr = imgsSrc.split(',');
        imgThumbsSrcArr = imgThumbsSrc.split(',');

        for (var key in imgsSrcArr)
            imgSlides += '<li><a><img class="lightboxed" rel="group1" data-link="' + imgsSrcArr[key] + '" src="' + imgsSrcArr[key] + '" alt="' + value + '" /></a></li>';
        for (var key in imgThumbsSrcArr)
            imgThumbsSlides += '<li><img src=' + imgThumbsSrcArr[key] + ' alt="' + value + '" /></li>';
        
            $('.flexslider').remove();
        $('.item-image-gallery').attr('color', value)
                                .append('<div id="slider" class="flexslider"><ul class="slides">' + imgSlides +'</ul></div>'+
                                        '<div id="thumbnail-slider" class="flexslider"><ul class="slides">' + imgThumbsSlides + '</ul></div>');

        $('#thumbnail-slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: false,
            itemWidth: 210,
            itemMargin: 0,
            minItems: 4,
            asNavFor: '#slider'
        });

        $('#slider').flexslider({
            animation: "slide",
            controlNav: false,
            animationLoop: false,
            slideshow: true,
            sync: "#thumbnail-slider"
        });  
        
        $('.lightboxed').lightboxed();
    }
}
function itemColorChange(ct){
    ct.closest('form').prev().find('.error').hide();
	var value = ct.val();
	ct.closest('.colors').find('.title p span').text(value);
    itemImgGalleryIntialize(ct);
}
function itemSizeChange(ct){
	ct.closest('form').prev().find('.error').hide();
    var value = ct.val();
	ct.closest('.sizes').find('.title p span').text(value);
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

if($('#owl-similar')){
    var options = {};
    options.elem = $('#owl-similar');
    options.margin = 20;
    options.autoplay = true;
    options.autoplayTimeout = 3000;
    options.autoplayHoverPause = true;
    options.loop = true;
    options.dots = false;
    options.lazyLoad = true;
    options.responsiveClass = true;
    options.responsive = { 0: {items: 1}, 576: {items: 2}, 768: {items: 3}, 992: {items: 4}, 1200: {items: 5, loop: false} };
    
    owlCarouselInit(options);
}

$('.tab-btns .next').click(function () {
    var next = $('.nav-tabs > .nav-item > .active').parent().next();
    if(next.find('a').hasClass('disabled'))
        next = next.next();
    if(next.length)
        next.find('a').trigger('click');
});

$('.tab-btns .previous').click(function () {
    var prev = $('.nav-tabs > .nav-item > .active').parent().prev();
    if(prev.find('a').hasClass('disabled'))
        prev = prev.prev();
    if(prev.length)
        prev.find('a').trigger('click');
});