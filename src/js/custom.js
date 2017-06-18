'use strict';
/**
 * movement object with exposed functionality
 * @param  {Object}
 * @param  {[type]}
 * @return {[Object]}
 *
 * https://github.com/tim-montague/Definitive-Module-Pattern
 */
var movement = (function() {
	var CONST;
	var CLASSES;
	var ID;
	/**
	 * [CONST holds misc constants, arrays, api keys etc]
	 * @type {Object}
	 */
	CONST = {
		gak: 'AIzaSyAerv0HM1ZRtnN1hqRHb545CVYhGRGNd_w',
		bgArray: ['bg-home.jpg', 'kickbox-girl.jpg'],
		imgPath: 'img/'
	};
	/**
	 * [CLASSES holds classe reference for DOM elements]
	 * @type {Object}
	 */
	CLASSES = {
		NAVITEM: 'js-nav-item',
		SMOOTHLINK: 'js-smooth-link',
		CAROUSEL: 'carousel-inner'
	};
	/**
	 * [ID holds ID references for DOM elements]
	 * @type {Object}
	 */
	ID = {
		INFO: 'intro-text',
		CARPAR: 'testimonials',
		CONTACT: 'contactForm'
	};
	var _helpers = {
		/**
		 * Takes an element and applies style rules to it
		 * @param  {[HTMLElement]} el - the element you want to style
		 * @param  {[object]} styles - contains the css rules to apply
		 * @return {[void]}
		 */
		css: function(el, styles) {
			for (var property in styles) {
				el.style[property] = styles[property];
			}
		},
		/**
		 * [addEvent adds events to elements]
		 * @param {[HTML]} el      [element you want to attach event to]
		 * @param {[string]} type    [the event type, click, scroll etc]
		 * @param {[function]} handler [reference to the function you want to fire, can't contain params]
		 */
		addEvent: function(el, type, handler) {
			if (el.attachEvent) {
				// IE9 fix
				var proxy = function() { handler.call(el); };
				el.attachEvent('on' + type, proxy);
			} else {
				el.addEventListener(type, handler);
			}
		},
		/**
		 * [removeEvent removes events from elements]
		 * @param {[HTML]} el      [element you want to attach event to]
		 * @param {[string]} type    [the event type, click, scroll etc]
		 * @param {[function]} handler [reference to the function you want to fire, can't contain params]
		 * @return {[void]}         [removes events]
		 */
		removeEvent: function(el, type, handler) {
			if (el.detachEvent) {
				el.detachEvent('on' + type, handler);
			} else {
				el.removeEventListener(type, handler);
			}
		},
		/**
		 * [hasClass checks if an element has a class]
		 * @param {[HTML]} el      [element you want to check for class]
		 * @param  {[string]}  className [name of class]
		 * @return {Boolean}           [return true or false]
		 */
		hasClass: function(el, className) {
			return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
		},
		/**
		 * [addClass adds a class to an element]
		 * @param {[HTML]} el        [element you want to add a class to]
		 * @param {[string]} className [name of class]
		 */
		addClass: function(el, className) {
			if (el.classList) {
				el.classList.add(className);
			} else if (!_helpers.hasClass(el, className)) {
				el.className += ' ' + className;
			}
		},
		/**
		 * [removeClass removes a class from an element]
		 * @param  {[HTML]} el        [element you want to remove class from]
		 * @param  {[string]} className [class you want to remove]
		 * @return {[void]}           [manipulates DOM]
		 */
		removeClass: function(el, className) {
			if (el.classList) {
				el.classList.remove(className);
			} else {
				el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
			}
		},
		/**
		 * [getElemDistance retrieves the distance from top of page to an element, loops up through elements parents]
		 * @param  {[HTML]} elem [element you want to get distance from top]
		 * @return {[int]}      [returns the distance]
		 */
		getElemDistance: function(elem) {
			var location = 0;
			if (elem.offsetParent) {
				do {
					location += elem.offsetTop;
					elem = elem.offsetParent;
				} while (elem);
			}
			return location >= 0 ? location : 0;
		}
	};
	/**
	 * [_private internal functions]
	 * @type {Object}
	 */
	var _private = {
		/**
		 * [activeNav sets the active page on the main nav]
		 * @return {[void]} [manipulates DOM]
		 */
		activeNav: function() {
			var body = document.querySelector('body');
			var bodyClass = body.getAttribute('class');
			var nav = document.getElementsByClassName(CLASSES.NAVITEM);
			for (var i = nav.length - 1; i >= 0; i--) {
				if (_helpers.hasClass(nav[i], bodyClass)) {
					_helpers.addClass(nav[i], 'active');
				}
			}
		},
		/**
		 * [loadGoogle create a script object to access google api]
		 * @return {[void]} [manipulates DOM]
		 */
		loadGoogle: function() {
			var scr = document.createElement('script');
			scr.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + CONST.gak + '&libraries=places&callback=movement.getGoogleReviews');
			document.body.appendChild(scr);
		},
		/**
		 * [getGoogleReviews description]
		 * @return {[type]} [description]
		 */
		getGoogleReviews: function() {
			/* jshint ignore:start */
			// jscs:disable
			// create map element
			// -33.783817, 151.128672
			var movementhq = { lat: -33.783817, lng: 151.128672 };
			// search on maps right click "whats here?"
			var map = new google.maps.Map(document.getElementById('map'), {
				scrollwheel: false,
				center: movementhq,
				zoom: 15
			});
			// create custom marker
			var marker = new google.maps.Marker({
				position: movementhq,
				map: map,
				icon: 'img/logo-pin.png'
			});
			// Fire only if testimonial carousel exists
			var testimonial = document.getElementById('testimonials');
			if (testimonial) {
				// request with place ID
				// https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
				var request = {
					placeId: 'ChIJjdA5ZQimEmsRXJRgJr7gvDI'
				};
				// create place service call to get details
				// https://developers.google.com/maps/documentation/javascript/places#place_details
				var service = new google.maps.places.PlacesService(map);
				service.getDetails(request, callback);
				// place object has all data
				// TO-DO: store somewhere? whats the logic?
			}
			/**
			 * [callback what to call when google place details has been retrieved]
			 * @param  {[type]}   place  [description]
			 * @param  {[type]}   status [description]
			 * @return {Function}        [description]
			 */
			function callback(place, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					_private.fillCarousel(place.reviews);
				}
			}
			// jscs:enable
			/* jshint ignore:end */
		},
		/**
		 * [fillCarousel construct the carousel]
		 * @param  {[array]} arr [array of objects returned from whatever call]
		 * @return {[void]}     [initialises carousel on success]
		 */
		fillCarousel: function(arr) {
			// carousel parent
			var carPar = document.getElementById(ID.CARPAR);
			// carousel
			var cars = document.getElementsByClassName(CLASSES.CAROUSEL);
			// pre compiled handlebars template reference
			var postTemplate = movement.templates['src/html/inc/car-item.hbs'];
			var html = postTemplate(arr);
			cars[0].innerHTML = html;
			carPar.style.display = 'block';
			// initialise carousel once the html has been set up
			_private.initCarousel();
		},
		/**
		 * [initCarousel initialises the carousel]
		 * @return {[void]} [manipulates DOM]
		 */
		initCarousel: function() {
			/* jshint ignore:start */
			// jscs:disable
			// grab the carousel element
			var myCarousel = document.getElementById('test-car');
			// initialize with some options
			var myCarouselInit = new Carousel(myCarousel, { // these options values will override the ones set via DATA API
				interval: false,
				pause: false,
				keyboard: false,
				indicators: false
			});
			// jscs:enable
			/* jshint ignore:end */
		},
		/**
		 * Randomly changes the background image of the body on load
		 * @return {[void]}
		 */
		changeBg: function() {
			var bg = CONST.bgArray[Math.floor(Math.random() * CONST.bgArray.length)];
			var imageUrl = 'url(' + CONST.imgPath + bg + ')';
			var body = document.querySelector('body');
			_helpers.css(body, { 'background-image': imageUrl });
		},
		/**
		 * [smoothLink finds all elements with smoothlink class and attaches an event]
		 * @return {[void]} [attaches event]
		 */
		smoothLink: function() {
			//Get smooth links
			var smoothLinks = document.getElementsByClassName(CLASSES.SMOOTHLINK);
			// attach smoothscroll to it
			for (var i = smoothLinks.length - 1; i >= 0; i--) {
				// console.log(smoothLinks[i].getAttribute('href'));
				_helpers.addEvent(smoothLinks[i], 'click', _private.smoothScroll);
			}
		},
		/**
		 * [smoothScroll creates a smooth scroll to element when an anchor tag is clicked]
		 * @return {[void]} [scrolls the page]
		 * TO-DO this is currently not smooth HAHA
		 */
		smoothScroll: function() {
			// scroll into view
			event.preventDefault();
			// get header height
			var headerEl = document.querySelectorAll('header');
			var scrollOffset = headerEl[0].offsetHeight;
			// where does the link want to go
			var el = document.querySelector(this.getAttribute('href'));
			// distance to top
			// Get an element's distance from the top of the page
			var location = _helpers.getElemDistance(el);
			// scroll to the element minus the height of the header
			document.documentElement.scrollTop = document.body.scrollTop = location - scrollOffset;
		},
		/**
		 * [scrollCta fires a CTA modal based on user funnel logic]
		 * @return {[void]} [adds event to element]
		 */
		scrollCta: function() {
			/* jshint ignore:start */
			// jscs:disable
			var el = window;
			// where do you want to scroll to?
			var scrollEl = document.getElementById(ID.INFO);
			var scrollElTop = scrollEl.offsetTop - 55;
			// add callback to scroll event on window
			_helpers.addEvent(el, 'scroll', callback);

			function callback() {
				if (window.pageYOffset > scrollElTop) {
					// console.log('scrolling baby');
					// get the modal by ID
					var trialModal = document.getElementById('freetrial');
					// initialize and show the modal right away
					var myModalInstance = new Modal(trialModal);
					myModalInstance.show();
					// When shown record this in localstorage
					localStorage.setItem('freetrialshown', true);
					// remove the event from window
					_helpers.removeEvent(el, 'scroll', callback);
				}
			}
			// jscs:enable
			/* jshint ignore:end */
		},
		/**
		 * [emailPage description]
		 * @return {[type]} [description]
		 */
		emailPage: function() {
			event.preventDefault();
			var name = document.querySelector('#name').value;
			var number = document.querySelector('#phone').value;
			window.location = 'mailto:?body=My name is ' + name + ', my phone number is ' + number + '. Please contact me back about my free trial.';
		},
		/**
		 * [emailSend description]
		 * @return {[type]} [description]
		 */
		emailSend: function() {
			var el = document.getElementById(ID.CONTACT);
			_helpers.addEvent(el, 'submit', _private.emailPage);
		}
	};
	/**
	 * [_public exposed functions eg movement.changeBg()]
	 * @type {Object}
	 */
	var _public = {
		activeNav: _private.activeNav,
		loadGoogle: _private.loadGoogle,
		getGoogleReviews: _private.getGoogleReviews,
		changeBg: _private.changeBg,
		smoothLink: _private.smoothLink,
		scrollCta: _private.scrollCta,
		emailSend: _private.emailSend
	};
	return _public;
})();
/**
 * [init runs all the functionailty we want at start up]
 * @return {[void]} [runs functions]
 * TO-DO can i make this more smarter?
 */
function init() {
	// TODO convince to enable CTA check
	// var ctaShown = localStorage.getItem('freetrialshown');
	movement.activeNav();
	movement.loadGoogle();
	movement.changeBg();
	movement.smoothLink();
	movement.emailSend();
	// TODO convince to enable CTA check
	/*if (!ctaShown) {
		movement.scrollCta();
	}*/
}
// in case the document is already rendered
if (document.readyState !== 'loading') { init(); }
// modern browsers
else if (document.addEventListener) { document.addEventListener('DOMContentLoaded', init); }
// IE <= 8
else {
	document.attachEvent('onreadystatechange', function() {
		if (document.readyState === 'complete') { init(); }
	});
}
