(function(window, $, undefined) {
    'use strict';

    var menuButton = $('.dropdown-toggle').dropdown(),
        dropdownMenu = $('#dropdown-menu');


    $(document).ready(function() {

        var navOffset = (window.innerWidth >= 768) ? 70 : 50,
            htmlBody = $('html, body'),
            links = {
                work: $('.link-to-recent-work'),
                about: $('.link-to-about'),
                contact: $('.link-to-contact'),
                nav: $('nav a')
            },
            $window = $(window),
            sections = {
                home: $('#home'),
                contact: $('#contact'),
                about: $('#about'),
                content: $('.content')
            },
            aboutHeight = sections.about.height(),
            contactButton = $('#contact-button');



        // Reset main section background to fit screen size and shift other
        // sections down to create parallax-like effect with fixed position.
        sections.home.css('height', window.innerHeight - navOffset);
        sections.content.css('top', window.innerHeight - navOffset);



        // Put after height changed so offsets accurate for section scrolling
        var positions = {
            work: $('#recent-work').offset().top - navOffset,
            about: $('#about').offset().top - navOffset,
            contact: sections.contact.offset().top - navOffset
        };

        // Push first heading and contact button up if not visible
        while (!contactButton.visible()){
            var homePadding = parseInt(sections.home.css('padding-top'), 10);
            sections.home.css('padding-top', homePadding - 100);
        }
        
        // Have links animate scroll to sections of the page.
        $('nav, .home').on('click', 'a, button', function(event) {
            var el = $(this);

            if (!el.hasClass('navbar-toggle')) {
                dropdownMenu.removeClass('in');
                event.preventDefault();
                event.stopPropagation();

                if (el.hasClass('link-to-recent-work')) {
                    htmlBody.animate({ scrollTop: positions.work });
                } else if (el.hasClass('link-to-about')) {
                    htmlBody.animate({ scrollTop: positions.about + 1});
                } else if (el.hasClass('link-to-contact')) {
                    htmlBody.animate({ scrollTop: positions.contact });
                } else if (el.hasClass('link-to-home')) {
                    htmlBody.animate({ scrollTop: 0});
                }
            }
        });

        // Listen for scroll to add active class to links
        $window.on('scroll', function(event) {
            var offsetFromTop = $window.scrollTop();

            if (offsetFromTop < positions.work) {
                links.nav.removeClass('active-link');
            }
            if (offsetFromTop >= positions.work && offsetFromTop < positions.about) {
                links.nav.removeClass('active-link');
                links.work.addClass('active-link');
            }
            if (offsetFromTop >= positions.about && offsetFromTop <= positions.about + aboutHeight * .66) {
                links.nav.removeClass('active-link');
                links.about.addClass('active-link');
            }
            if (offsetFromTop >= positions.about + aboutHeight * .66) {
                links.nav.removeClass('active-link');
                links.contact.addClass('active-link');
            }	    
        });

        // Responsive image loading for contact section map image
        // Only image needed to do this so it's added as some js instead
        // of a fuller solution.
        if (window.innerWidth > 768) {
            $('.responsive-img').each(function() {
                var $this = $(this),
                    small = $this.attr('src');
                $this.attr('src', small.replace('sm', 'full'));
            });
        }
        
        
    });
})(window, jQuery);

