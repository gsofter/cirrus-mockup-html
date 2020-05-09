

(function($) {

   'use strict'


/*------------------------------------------------------------------------------*/
/* 01. Preloader
/*------------------------------------------------------------------------------*/
   // makes sure the whole site is loaded
    $(window).on("load",function() {
            // will first fade out the loading animation
         $("#preloader").fadeOut();
            // will fade out the whole DIV that covers the website.
         $("#status").fadeOut(9000);
    })


/*------------------------------------------------------------------------------*/
/* 02. header_search
/*------------------------------------------------------------------------------*/
    
    $(".header_search").each(function(){  
        $(".search_btn", this).on("click", function(e){

            e.preventDefault();
            e.stopPropagation();

            $(".header_search_content").toggleClass("on");

            if ($('.header_search a').hasClass('open')) {

                $( ".header_search a i" ).removeClass('ti-close').addClass('ti-search');
                
                $(this).removeClass('open').addClass('sclose');    

            } 

            else {
                $(".header_search a").removeClass('sclose').addClass('open');

                $( ".header_search a i" ).removeClass('ti-search').addClass('ti-close');  
            
            }
        });

    });


/*------------------------------------------------------------------------------*/
/* 03. Fixed-header
/*------------------------------------------------------------------------------*/

    $(window).scroll(function(){
        if ( matchMedia( 'only screen and (min-width: 1200px)' ).matches ) 
        {
            if ($(window).scrollTop() >= 50 ) {

                $('.cmt-stickable-header').addClass('fixed-header');
            }
            else {

                $('.cmt-stickable-header').removeClass('fixed-header');
            }
        }
    });


/*------------------------------------------------------------------------------*/
/* 04. Menu
/*------------------------------------------------------------------------------*/

    var menu = {
        initialize: function() {
            this.Menuhover();
        },

        Menuhover : function(){
            var getNav = $("nav.main-menu"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.menu").data("in"),
                getOut = getNav.find("ul.menu").data("out");
            
            if ( matchMedia( 'only screen and (max-width: 1200px)' ).matches ) {
                                                     
                // Enable click event
                $("nav.main-menu ul.menu").each(function(){
                    
                    // Dropdown Fade Toggle
                    $("a.mega-menu-link", this).on('click', function (e) {
                        e.preventDefault();
                        var t = $(this);
                        t.toggleClass('active').next('ul').toggleClass('active');
                    });   

                    // Megamenu style
                    $(".megamenu-fw", this).each(function(){
                        $(".col-menu", this).each(function(){
                            $(".title", this).off("click");
                            $(".title", this).on("click", function(){
                                $(this).closest(".col-menu").find(".content").stop().toggleClass('active');
                                $(this).closest(".col-menu").toggleClass("active");
                                return false;
                                e.preventDefault();
                                
                            });

                        });
                    });  
                    
                }); 
            }
        },
    };

    
    $('.btn-show-menu-mobile').on('click', function(e){
        $(this).toggleClass('is-active'); 
        $('.menu-mobile').toggleClass('show'); 
        return false;
        e.preventDefault();  
    });

    // Initialize
    $(document).ready(function(){
        menu.initialize();

    });

 

/*------------------------------------------------------------------------------*/
/* 05. Animation on scroll: Number rotator
/*------------------------------------------------------------------------------*/
    
    $("[data-appear-animation]").each(function() {
    var self      = $(this);
    var animation = self.data("appear-animation");
    var delay     = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);
        
        if( $(window).width() > 959 ) {
            self.html('0');
            self.waypoint(function(direction) {
                if( !self.hasClass('completed') ){
                    var from     = self.data('from');
                    var to       = self.data('to');
                    var interval = self.data('interval');
                    self.numinate({
                        format: '%counter%',
                        from: from,
                        to: to,
                        runningInterval: 2000,
                        stepUnit: interval,
                        onComplete: function(elem) {
                            self.addClass('completed');
                        }
                    });
                }
            }, { offset:'85%' });
        } else {
            if( animation == 'animateWidth' ) {
                self.css('width', self.data("width"));
            }
        }
    });

   
/*------------------------------------------------------------------------------*/
/* 06. Skillbar
/*------------------------------------------------------------------------------*/
    
    $('.cmt-progress-bar').each(function() {
        $(this).find('.progress-bar').width(0);
    });

    $('.cmt-progress-bar').each(function() {

        $(this).find('.progress-bar').animate({
            width: $(this).attr('data-percent')
        }, 2000);
    });


    // Part of the code responsible for loading percentages:

    $('.progress-bar-percent[data-percentage]').each(function () {

        var progress = $(this);
        var percentage = Math.ceil($(this).attr('data-percentage'));

            $({countNum: 0}).animate({countNum: percentage}, {
                duration: 2000,
                easing:'linear',
                step: function() {
                // What todo on every count
                    var pct = '';
                    if(percentage == 0){
                        pct = Math.floor(this.countNum) + '%';
                    }else{
                        pct = Math.floor(this.countNum+1) + '%';
                    }
                    progress.text(pct);
                }
            });
    });


/*------------------------------------------------------------------------------*/
/* 07. Tab
/*------------------------------------------------------------------------------*/ 

    $(document).ready(function() { 
        
        $('.content-tab').children('.content-inner').first().addClass('active');
        $('.cmt-tabs .tabs li').on('click', function(e) {  
            if (!$(this).hasClass('active')) { 
                var i = $(this).index(); 
                $('.cmt-tabs .tabs li.active').removeClass('active'); 
                $('.content-tab .active').hide().removeClass('active'); 
                $(this).addClass('active'); 
                $($('.content-tab').children('.content-inner')[i]).fadeIn(600).addClass('active');
                e.preventDefault();
            } 
        });
    });
    

/*------------------------------------------------------------------------------*/
/* 08. Accordion
/*------------------------------------------------------------------------------*/

/*https://www.antimath.info/jquery/quick-and-simple-jquery-accordion/*/
$(".accordion").each(function(){

    var allPanels = $('.toggle').children(".toggle-content").hide();
    $('.toggle').children(".toggle-content").eq(2).slideDown("easeOutExpo");
    $('.toggle').children(".toggle-title").children("a").eq(2).addClass("active");

    $('.toggle').children(".toggle-title").children("a").click(function(){        
        var current = $(this).parent().next(".toggle-content");
        $(".toggle-title > a").removeClass("active");
        $(this).addClass("active");
        allPanels.not(current).slideUp("easeInExpo");
        $(this).parent().next().slideDown("easeOutExpo");                
        return false;                
    });

});


/*------------------------------------------------------------------------------*/
/* 09. Isotope
/*------------------------------------------------------------------------------*/

   $(function () {

        if ( $().isotope ) {           
            var $container = $('.isotope-project');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.cmt-box-col-wrapper',
                    transitionDuration: '1s',
                    layoutMode: 'fitRows'
                });
            });

            $('.portfolio-filter li').on('click',function() {                           
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });
        };

   });

    
/*------------------------------------------------------------------------------*/
/* 10. Prettyphoto
/*------------------------------------------------------------------------------*/
$(function () {

     // Normal link
    jQuery('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function(){
        if( jQuery(this).attr('target')!='_blank' && !jQuery(this).hasClass('prettyphoto') && !jQuery(this).hasClass('modula-lightbox') ){
            var attr = $(this).attr('data-gal');
            if (typeof attr !== typeof undefined && attr !== false && attr!='prettyPhoto' ) {
                jQuery(this).attr('data-rel','prettyPhoto');
            }
        }
    });     

    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery('a.ttm_prettyphoto').prettyPhoto();
    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({hook: 'data-gal'})

});
    

/*------------------------------------------------------------------------------*/
/* 11. Slick_slider
/*------------------------------------------------------------------------------*/
    $(".slick_slider").slick({
        speed: 1000,
        infinite: true,
        arrows: false,
        dots: false,                   
        autoplay: false,
        centerMode : false,

        responsive: [{

            breakpoint: 1360,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {

            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {

            breakpoint: 680,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });


/*------------------------------------------------------------------------------*/
/* 12. Back to top
/*------------------------------------------------------------------------------*/

    // ===== Scroll to Top ==== 
    jQuery('#totop').hide();

    jQuery(window).scroll(function() {
        "use strict";
        if (jQuery(this).scrollTop() >= 1000) {        // If page is scrolled more than 50px
            jQuery('#totop').fadeIn(200);    // Fade in the arrow
            jQuery('#totop').addClass('top-visible');
        } else {
            jQuery('#totop').fadeOut(200);   // Else fade out the arrow
            jQuery('#totop').removeClass('top-visible');
        }
    });

    jQuery('#totop').click(function() {      // When arrow is clicked
        jQuery('body,html').animate({
            scrollTop : 0                       // Scroll to top of body
        }, 500);
        return false;
    });



$(function() {

    });

})(jQuery);