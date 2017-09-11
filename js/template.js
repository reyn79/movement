/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


 $(window).scroll(function(){      
        /* -------------------
        Header Animation
        ---------------------*/
        if ($(this).scrollTop() > 50){  
            $('.before-color').addClass("after-color");
        }
        else{
            $('.before-color').removeClass("after-color");
        }
    });

//full width revolution
var revapi;


jQuery(document).ready(function() {

    revapi = jQuery('.tp-banner').revolution(
            {
                delay: 6000,
                startwidth: 1170,
                startheight: 450,
                hideThumbs: 10,
                fullScreen: "on",
                forceFullWidth: "on",
                navigationStyle: "preview4"
            });

    // Free trial pre select
    $('#navbar li a[href*="contactFormContainer"],#free a[href*="contactForm"]').on('click',function(){
        $("#contactForm select").val("Free Trial");
    })

    // Popovers
    // directions
     $(".location-icon").popover({
        html : true, 
        placement : 'bottom',
        content: function() {
          return $('.directions .content').html();
        },
        title: function() {
          return $('.directions .title').html();
        }
    });
     // Timetable
     // call timetable tabs
     $('#timeTabs a[href="#name"]').tab('show');

     // set up days of the week classes
     var days = ['mon','tue','wed','thu','fri','sat','sun'];
     //add day of the week class to table cells
     $('#tables').find('table tbody tr').each(function(){
            $(this).find('td').each(function(index){
                if(index === 0){
                    $(this).addClass('time');
                };
                if(index>0){
                    $(this).addClass(days[index-1]);
                }
            });
     });
     
     // add default day
     $('#tables').find('table').addClass('Monday');
     // add day of week selected as class to table
     $('#timetable-select').on('change', function() {
        $('#tables table').attr('class', 'table table-bordered');
        $('#tables table').addClass(this.value);
    });

     // maps
     $('.google-map').addClass('scrolloff');
     $('.map-wrapper').on('click', function() {
        $('.google-map').removeClass('scrolloff');
    });
     $('.map-wrapper').mouseleave(function() {
        $('.google-map').addClass('scrolloff');
    });

    $div = $("<div>", {id: 'waynold', class: 'transition'});
    $('body').append($div);
    cheet('w a y n o l d', function () {
      $('#waynold').toggleClass('waynoldon');
    });
    $('#waynold').on('click',function(){
        $('#waynold').toggleClass('waynoldon');
      });

    
    
});	//ready

/**smooth scroll on anchor tag****/
$(function() {
    $('.scroll-to a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


/* -------------------
 Parallax Sections
 ---------------------*/
if (!Modernizr.touch) {
    $('.parallax-1').parallax("50%", 0.5);
    $('.parallax-2').parallax("50%", 0.5);
    $('.parallax-3').parallax("50%", 0.5);
}
/*----------------
 Auto Close Navbar
 -----------------*/
function close_toggle() {
    if ($(window).width() <= 992) {
        $('.navbar-collapse a').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });
    }
    else {
        $('.navbar .navbar-default a').off('click');
    }
}
close_toggle();
$(window).resize(close_toggle);
$(".navbar-collapse").css({maxHeight: $(window).height() - $(".navbar-header").height() + "px"});
$(function() {
    $('.navbar-toggle').bind('click', function(event) {
        var $anchor = $('.navbar-header');
        $('html, body').stop().animate({
            scrollTop: $($anchor).offset().top - 0
        }, 800, 'swing');
        event.preventDefault();
    });
});
