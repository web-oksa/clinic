$(document).ready(function(){
    $('.promo__slider').slick({
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
            breakpoint: 577,
            settings: {
                arrows: false
            }
            },
        ]
    });

    $('.sales__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
            breakpoint: 1201,
            settings: {
                slidesToShow: 2
            }
            },
            {
            breakpoint: 769,
            settings: {
                slidesToShow: 1
            }
            },
        ]
    });

    $('.page-clinic__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        adaptiveHeight: true,
        fade: true,
        asNavFor: '.page-clinic__slider-mini',
        responsive: [
            {
            breakpoint: 993,
            settings: {
                centerMode: true
            }
            },
        ]
    });

    $('.page-clinic__slider-mini').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        asNavFor: '.page-clinic__slider',
        responsive: [
            {
            breakpoint: 1201,
            settings: {
                slidesToShow: 3
            }
            },
            {
            breakpoint: 641,
            settings: {
                slidesToShow: 2
            }
            },
            {
            breakpoint: 426,
            settings: {
                slidesToShow: 1
            }
            },
        ]
    });

    $('.page-departament__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        fade: true
    });

    // number current slide

    $('.promo__slider, .page-clinic__slider-mini, .page-departament__slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
            console.log(currentSlide);
            let numberSlide = (currentSlide+1);
            $('.current').text(numberSlide);
    });

    // scroll pageup

    $(window).scroll(function() {
        if($(this).scrollTop() > 600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    // change style header when scrolling

    $(window).scroll(function() {
        $('.header').toggleClass("active", $(this).scrollTop() > $(window).height());
    })


    const humburger = document.querySelector('.humburger'),
    menuHeader = document.querySelector('.menu-header'),
    header = document.querySelector('.header'),
    body = document.querySelector('body'),
    navAboutJs = document.querySelector('.about-js'),
    navPatientsJs = document.querySelector('.patients-js'),
    navRulesJs = document.querySelector('.rules-js'),
    navDirectionsJs = document.querySelector('.directions-js');

    // menu active
    
    humburger.addEventListener('click', () => {
        humburger.classList.toggle('active');
        menuHeader.classList.toggle('active');
        header.classList.toggle('open-menu');
        body.classList.toggle('hidden');
    });
    
    // mobile menu

    navAboutJs.addEventListener('click', () => {
        navAboutJs.classList.toggle('about');
    })

    navPatientsJs.addEventListener('click', () => {
        navPatientsJs.classList.toggle('directions');
    })

    navRulesJs.addEventListener('click', () => {
        navRulesJs.classList.toggle('rules');
    })
    
    navDirectionsJs.addEventListener('click', () => {
        navDirectionsJs.classList.toggle('directions');
    })

    // accordion

    const accordionHeaders = document.querySelectorAll('.accordion__header');
    const accordionBodies = document.querySelectorAll('.accordion__body');
    const subaccordionHeaders = document.querySelectorAll('.subaccordion__header');
    const subaccordionBodies = document.querySelectorAll('.subaccordion__body');

    accordionHeaders.forEach((itemHeader) => {
        itemHeader.addEventListener('click', (event) => {
            event.preventDefault();
            const content = itemHeader.nextElementSibling;

            if(content.style.maxHeight) {
                content.style.maxHeight = null;
                itemHeader.classList.remove('accordion__header_active');
            } else {
                content.style.maxHeight = '100%';
                itemHeader.classList.add('accordion__header_active');
            }
            
            accordionBodies.forEach(itemBody => {
                if(itemBody !== content) {
                    itemBody.style.maxHeight = null;
                }
            });
            accordionHeaders.forEach((item) => {
                if(item !== itemHeader) {
                    item.classList.remove('accordion__header_active');
                }
            });
        });
    });

    subaccordionHeaders.forEach((itemHeader) => {
        itemHeader.addEventListener('click', (event) => {
            event.preventDefault();
            const content = itemHeader.nextElementSibling;

            if(content.style.maxHeight) {
                content.style.maxHeight = null;
                itemHeader.classList.remove('subaccordion__header_active');
            } else {
                content.style.maxHeight = '100%';
                itemHeader.classList.add('subaccordion__header_active');
            }
            
            subaccordionBodies.forEach(itemBody => {
                if(itemBody !== content) {
                    itemBody.style.maxHeight = null;
                }
            });
            subaccordionHeaders.forEach((item) => {
                if(item !== itemHeader) {
                    item.classList.remove('subaccordion__header_active');
                }
            });
        });
    });

    // modal

    $('[data-modal=call-back]').on('click', function() {
        $('.overlay, #call-back').fadeIn();
        $('body').addClass('hidden');
    });

    $('[data-modal=appointment]').on('click', function() {
        $('.overlay, #appointment').fadeIn();
        $('body').addClass('hidden');
    })

    $('.modal__close').on('click', function() {
        $('.overlay, #call-back, #appointment, #thanks').fadeOut();
        $('form').trigger('reset');
        $('body').removeClass('hidden');
    });

    $('.overlay').on('click', function(e){
        if(!$('.modal').is(e.target) && $('.modal').has(e.target).length === 0) {
            $('.overlay, #call-back, #appointment, #thanks').fadeOut();
            $('form').trigger('reset');
            $('body').removeClass('hidden');
        }
      });

    // input mask

    $('input[name=tel]').mask("+7 (999) 999-99-99");

    // submit form

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#appointment, #call-back').fadeOut();
            $('overlay, #thanks').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    new WOW().init();
});