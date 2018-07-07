jQuery(function( $ ) {
	'use strict';

	var $body = $('body');

	/* -----------------------------------------
	Responsive Menus Init with mmenu
	----------------------------------------- */
	var $mainNav   = $( '.navigation-main' );
	var $mobileNav = $( '#mobilemenu' );

	$mainNav.clone().removeAttr( 'id' ).removeClass().appendTo( $mobileNav );
	$mobileNav.find( 'li' ).removeAttr( 'id' );

	$mobileNav.mmenu({
		offCanvas: {
			position: 'top',
			zposition: 'front'
		},
		"autoHeight": true,
		"navbars": [
			{
				"position": "top",
				"content": [
					"prev",
					"title",
					"close"
				]
			}
		]
	});

	/* -----------------------------------------
	Main Navigation Init
	----------------------------------------- */
	$mainNav.superfish({
		delay: 300,
		animation: { opacity: 'show', height: 'show' },
		speed: 'fast',
		dropShadows: false
	});

	/* -----------------------------------------
	Responsive Videos with fitVids
	----------------------------------------- */
	$body.fitVids();

	/* -----------------------------------------
	Entry likes
	----------------------------------------- */
	$('.entry-like-btn').on('click', function (e) {
		$(this).toggleClass('entry-liked');
		e.preventDefault();
	});

	/* -----------------------------------------
	Image Lightbox
	----------------------------------------- */
	$( '.ci-lightbox' ).magnificPopup({
		type: 'image',
		mainClass: 'mfp-with-zoom',
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true
		}
	} );


	/* -----------------------------------------
	Header search trigger
	----------------------------------------- */
	var $searchTrigger = $('.trigger-search');
	var $searchDismiss = $('.mast-head-search-dismiss');
	var $headSearch    = $('.mast-head-search');

	function dismissHeadSearch(e) {
		if (e) {
			e.preventDefault();
		}

		$headSearch.removeClass('mast-head-search-visible');
		$body.focus();
	}

	function displayHeadSearch(e) {
		if (e) {
			e.preventDefault();
		}

		$headSearch
			.addClass('mast-head-search-visible')
			.find('input')
			.focus();
	}

	function isHeadSearchVisible() {
		return $headSearch.hasClass('mast-head-search-visible')
	}

	$searchTrigger.on('click', displayHeadSearch);
	$searchDismiss.on('click', dismissHeadSearch);

	/* Event propagations */
	$(document).on('keydown', function (e) {
		e = e || window.e;
		if (e.keyCode === 27 && isHeadSearchVisible()) {
			dismissHeadSearch(e);
		}
	});

	$body
		.on('click', function (e) {
			if (isHeadSearchVisible()) {
				dismissHeadSearch();
			}
		})
		.find('.mast-head-search, .trigger-search')
		.on('click', function (e) {
			e.stopPropagation();
		});

	/* -----------------------------------------
	Item Carousels
	----------------------------------------- */
	var $itemCarousels = $('.item-carousel');

	function getBreakpointsFromClasses(classes) {
		return classes.split(' ').map(function (c) {
			var classData = c.split('-');
			var breakpoint;

			if (classData[1] === 'lg') {
				breakpoint = 1200;
			} else if (classData[1] === 'md' ) {
				breakpoint = 992;
			} else if (classData[1] === 'xs') {
				breakpoint = 768;
			}

			var slideNo = 12 / parseInt(classData[2]);

			return {
				breakpoint: breakpoint,
				settings: {
					slidesToShow: slideNo,
					slidesToScroll: slideNo
				}
			}
		});
	}

	$itemCarousels.each(function () {
		var $this = $(this);
		var classes = $this
			.find('div[class^="col"]')
			.first()
			.attr('class');
		var slidesNo = 12 / parseInt(classes.split(' ')[0].split('-')[2]);

		$this.slick({
			infinite: false,
			slidesToShow: slidesNo,
			slidesToScroll: slidesNo,
			appendArrows: $this.parent().find('.item-carousel-nav'),
			prevArrow: '<span><i class="fa fa-angle-left"></i></span>',
			nextArrow: '<span><i class="fa fa-angle-right"></i></span>',
			responsive: getBreakpointsFromClasses(classes)
		});
	});
	
	$( window ).on( 'load', function() {
		/* -----------------------------------------
		MatchHeight
		----------------------------------------- */
		$( '.item-list' ).not( '.item-masonry' ).find( '[class^="col"]' ).matchHeight();

		/* -----------------------------------------
		Isotope
		----------------------------------------- */
		$( '.item-masonry' ).isotope();

		/* -----------------------------------------
		Homeslider Init
		----------------------------------------- */
		var $homeSlider = $( '.main-slider' );

		if ( $homeSlider.length ) {
			$homeSlider.each(function () {
				var $this = $(this);
				var autoplay = $this.data('autoplay');
				var animation = $this.data('animation');
				var animationSpeed = $this.data('animation-speed');
				var slideshowSpeed = $this.data('slideshow-speed');

				$this.slick({
					fade: animation === 'fade',
					autoplay: autoplay,
					speed: animationSpeed,
					autoplaySpeed: slideshowSpeed,
					slide: '.main-slider-slide',
					arrows: false,
					dots: true,
					appendDots: '.main-slider-dots',
					customPaging: function (slider, i) {
						return $('<span class="main-slider-nav-link"></span>').text(i + 1);
					}
				});
			});
		}
	});
});
