jQuery(function ($) {

    // ===================================================== Fix fixed bg's jump

    /MSIE [6-8]|Mac/i.test(navigator.userAgent) || $("header, article, footer").each(function () {
        if ("fixed" == $(this).css("backgroundAttachment")) {
            var i = $(this), a = /WebKit/i.test(navigator.userAgent) ? 9 : 8;
            i.addClass("froid-fixed-bg").data({
                bgX: i.css("backgroundPosition").slice(0, i.css("backgroundPosition").indexOf(" ")),
                bgY: i.css("backgroundPosition").slice(i.css("backgroundPosition").indexOf(" ")),
                margin: a
            })
        }
    }), $(window).bind("SIModals.modalsOpen", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", "calc(" + i.data("bgX") + " - " + i.data("margin") + "px) " + i.data("bgY"))
        })
    }), $(window).bind("SIModals.modalsClose", function () {
        $(".froid-fixed-bg").each(function () {
            var i = $(this);
            i.css("backgroundPosition", i.data("bgX") + " " + i.data("bgY"))
        })
    });

    // ===================================================== Mobile full-width && disable animation

    if (is_mobile()) {

        // Fix mobile fixed bg's
        $("header, section, article, footer").each(function () {
            if ("fixed" == $(this).css("backgroundAttachment")) $(this).css('backgroundAttachment', 'scroll');
        });

        // Remove animation
        $('.cre-animate').css({
            'transform': 'none',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-ms-transform': 'none',
            '-o-transform': 'none',
            'transition': 'none',
            '-webkit-transition': 'none',
            'opacity': 1
        }).removeClass('cre-animate');

        $('.si-floating').css({
            'transform': 'none',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-ms-transform': 'none',
            '-o-transform': 'none'
        }).removeClass('si-floating');

        $('.si-floating2').css({
            'transform': 'none',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-ms-transform': 'none',
            '-o-transform': 'none'
        }).removeClass('si-floating2');

        $('.si-floating3').css({
            'transform': 'none',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-ms-transform': 'none',
            '-o-transform': 'none'
        }).removeClass('si-floating3');

        $('.si-floating4').css({
            'transform': 'none',
            '-webkit-transform': 'none',
            '-moz-transform': 'none',
            '-ms-transform': 'none',
            '-o-transform': 'none'
        }).removeClass('si-floating4');

        // Mobile stretch
        $('html, body').css('min-width', '1340px').addClass('mobile');
        $('html').css('width', window.innerWidth + 'px');


        // ===================================================== звук
        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0
        });
    }
    else {

        $.ionSound({
            sounds: ["bip-1", "bip-2", "wuf-1", "wuf-2", "wuf-3", "wuf-4"],
            path: template_url + "/sounds/",
            volume: 0.3
        });

        $(document).on('mouseenter', '.btn, .btn2,.si-close, .phone-link, .si-jump, .owl-dot, .owl-prev, .owl-next, .tab-link', function () {
            $.ionSound.play('bip-2');
        });
        SIModals.beforeOpen = function () {
            $.ionSound.play('wuf-4');
        };
        SIModals.beforeClose = function () {
            $.ionSound.play('wuf-3');
        };


        // ===================================================== скролл
        SmoothScroll({stepSize: 100});

        //ie11 fix
        if (navigator.userAgent.match(/Trident\/7\./)) {
            $('body').on("mousewheel", function () {
                event.preventDefault();
                var wd = event.wheelDelta;
                var csp = window.pageYOffset;
                window.scrollTo(0, csp - wd);
            });
        }
    }

    if (is_OSX()) {
        $('html, body').addClass('osx');
    }


    $.fn.SIInit = function () {

        $('a[data-rel]').each(function () {
            $(this).attr('rel', $(this).data('rel'));
        });
        $('a[rel^=fancybox]').not('.cloned a').fancybox({
            helpers: {
                thumbs: true
            }
        });

        $('.send-form').SIForms({
            'validateFields': {
                'client_name': 'Укажите Ваше имя',
                'client_phone': 'Укажите Ваш телефон',
                'client_mail': 'Укажите Ваш e-mail',
                'client_file': ''
            },
            'sendSuccess': function (res) {
                yaCounter37742405.reachGoal('target' + res.id);
                //ga('send', 'event', res.gcode, res.gcode);
            }
        });
    };

    $.fn.SIInit();

    $(".show-video").click(function () {
        $.fancybox({
            'padding': 0,
            'autoScale': false,
            'transitionIn': 'none',
            'transitionOut': 'none',
            'title': this.title,
            'width': 640,
            'height': 385,
            'href': this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type': 'swf',
            'swf': {
                'wmode': 'transparent',
                'allowfullscreen': 'true'
            }
        });

        return false;
    });

    // ===================================================== Styler
    $('input[type=file]').styler();
    $('.jq-file__name').html('Прикрепить файл');


    // ===================================================== Jump links
    $('.si-jump').SIJump();


    // ===================================================== Page messages
    SIPageMessages.init();


    // ===================================================== Modals
    SIModals.init();

    // Init modals
    SIModals.attachModal('.open-phone-modal', '.phone-modal', {'.send-extra': 'extra'});
    SIModals.attachModal('.open-calculate-modal', '.calculate-modal', false);
    SIModals.attachModal('.open-calculate2-modal', '.calculate-modal2', false);

    // Modal controls
    SIModals.attachClose('.si-close');

    // ===================================================== owl carousel
    $('.projects-block').owlCarousel({
        items: 1,
        nav: true,
        dots: true,
        loop: true,
        onChange: function () {
            $.ionSound.play('wuf-1');
        }
    });

    $('.documents-block').owlCarousel({
        items: 4,
        nav: true,
        dots: false,
        loop: true,
        onChange: function () {
            $.ionSound.play('wuf-1');
        }
    });
	
	    $('.brand-block').owlCarousel({
        items: 6,
        nav: true,
        dots: false,
        loop: true,
        onChange: function () {
            $.ionSound.play('wuf-1');
        }
    });

    // ===================================================== custom scripts

    //tabs
    function changeActiveTab(tabLink) {
        var tabLinkSibling = tabLink.siblings();
        tabLinkSibling.each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
        });
        tabLink.addClass('active');
    }

    function changeActiveTabContent(tabBlock, id, blockID) {
        var tabContent;
        tabBlock.find('.tab-content').each(function () {
            if ($(this).data('tab-block') == blockID) {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                }
                if ($(this).data('tab') == id) {
                    tabContent = $(this);
                }
            }
        });
        tabContent.addClass('active');
        $.ionSound.play('wuf-4');
    }

    $('.tab-link').click(function () {
        var tabLink = $(this);
        var tabID = $(this).data('tab');
        var tabBlockID = $(this).data('tab-block');
        var tabBlock = $(this).parents('.tabs-block');
        var curTabBlock;
        tabBlock.each(function () {
            if ($(this).data('tab-block') == tabBlockID) {
                curTabBlock = $(this);
            }
        });
        changeActiveTab(tabLink);
        changeActiveTabContent(curTabBlock, tabID, tabBlockID);
    });


    //gallery in projects block
    $('.project-image-nav-tab').click(function () {
        var galleryID = $(this).data('gal');
        var gallerySlide = $(this).parents('.project-image-block').find('.big');
        var curSlide;
        gallerySlide.each(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
            if ($(this).data('gal') == galleryID) {
                curSlide = $(this);
            }
        });
        curSlide.addClass('active');
        $.ionSound.play('wuf-1');
    });
});

ymaps.ready(function () {
    myMap = new ymaps.Map("map", {
        center: [55.721640,37.693040],
        zoom: 16
    });
    myMap.behaviors.disable(['drag', 'rightMouseButtonMagnifier']);
    myMap.controls.add('mapTools');
    myMap.controls.add('typeSelector');
    myMap.controls.add('zoomControl');
    var myPlacemark = new ymaps.Placemark(
        [55.721640,37.693040], {},
        {
            iconImageHref: './images/loc.png',
            iconImageSize: [48, 62],
            iconImageOffset: [-24, -62]
        }
    );
    myMap.geoObjects.add(myPlacemark);
});