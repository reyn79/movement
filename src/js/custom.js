"use strict";
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
		gak: "AIzaSyAerv0HM1ZRtnN1hqRHb545CVYhGRGNd_w",
		bgArray: ["bg-home.jpg", "kickbox-girl.jpg"],
		styles: {
			bjj: [
				"img/bjj/DSCF1142.jpg",
				"img/bjj/DSCF5885.jpg",
				"img/bjj/DSCF5897.jpg",
				"img/bjj/DSCF6005.jpg",
				"img/bjj/DSCF6094.jpg",
				"img/bjj/DSCF6132.jpg",
				"img/bjj/DSCF6152.jpg",
				"img/bjj/DSCF6157.jpg",
				"img/bjj/DSCF6634.jpg",
				"img/bjj/DSCF9751.jpg",
				"img/bjj/Movement Martial Arts-81.jpg",
				"img/bjj/P1000392.jpg",
				"img/bjj/P1020824.jpg"
			],
			mt: [
				"img/mt/DSCF0424.jpg",
				"img/mt/DSCF0530.jpg",
				"img/mt/DSCF1707.jpg",
				"img/mt/DSCF1712.jpg",
				"img/mt/DSCF1713.jpg",
				"img/mt/DSCF1723.jpg",
				"img/mt/DSCF1749.jpg",
				"img/mt/DSCF1764.jpg",
				"img/mt/DSCF1771.jpg",
				"img/mt/DSCF1772.jpg",
				"img/mt/DSCF1776.jpg",
				"img/mt/DSCF1794.jpg",
				"img/mt/DSCF1801.jpg",
				"img/mt/DSCF1811.jpg",
				"img/mt/DSCF1824.jpg",
				"img/mt/DSCF2853.jpg",
				"img/mt/DSCF5828.jpg",
				"img/mt/DSCF5830.jpg",
				"img/mt/IMG_20170103_200108.jpg",
				"img/mt/IMG_1141.jpg"
			],
			kids: [
				"img/kids/DSCF0377.jpg",
				"img/kids/DSCF9769.jpg",
				"img/kids/DSCF9786.jpg",
				"img/kids/DSCF9804.jpg",
				"img/kids/DSCF9904.jpg",
				"img/kids/P1020184.jpg",
				"img/kids/P1020565.jpg",
				"img/kids/P1020605.jpg",
				"img/kids/P1020627.jpg",
				"img/kids/P1020724.jpg"
			],
			mma: [
				"img/mma/DSCF1877.jpg",
				"img/mma/DSCF1884.jpg",
				"img/mma/DSCF1905.jpg",
				"img/mma/DSCF1917.jpg",
				"img/mma/DSCF1922.jpg",
				"img/mma/DSCF1925.jpg",
				"img/mma/DSCF1928.jpg"
			]
		},
		facilities: [
			"entrance.jpg",
			"DSCF1540.jpg",
			"DSCF1557.jpg",
			"DSCF1579.jpg",
			"DSCF1615.jpg",
			"DSCF1648.jpg"
		],
		imgPath: "img/",
		testCar: "src/html/inc/car-item.hbs"
	};
	/**
	 * [CLASSES holds classe reference for DOM elements]
	 * @type {Object}
	 */
	CLASSES = {
		NAVITEM: "js-nav-item",
		SMOOTHLINK: "js-smooth-link",
		CAROUSEL: "carousel-inner",
		INTRO: "intro-banner",
		MAPWRAP: "map-wrapper"
	};
	/**
	 * [ID holds ID references for DOM elements]
	 * @type {Object}
	 */
	ID = {
		INFO: "intro-text",
		TESTCARCONT: "testimonials",
		TESTCARPAR: "test-car",
		CONTACT: "contactForm",
		FACILITIESIMG: "facilities-images"
	};
	var _helpers = {
		/**
		 * [ajax make ajax requests
		 * https://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery]
		 * @type {Object}
		 */
		ajax: {
			x: function() {
				if (typeof XMLHttpRequest !== "undefined") {
					return new XMLHttpRequest();
				}
				var versions = [
					"MSXML2.XmlHttp.6.0",
					"MSXML2.XmlHttp.5.0",
					"MSXML2.XmlHttp.4.0",
					"MSXML2.XmlHttp.3.0",
					"MSXML2.XmlHttp.2.0",
					"Microsoft.XmlHttp"
				];

				var xhr;
				for (var i = 0; i < versions.length; i++) {
					try {
						xhr = new ActiveXObject(versions[i]);
						break;
					} catch (e) {}
				}
				return xhr;
			},
			send: function(url, callback, method, data, async) {
				if (async === undefined) {
					async = true;
				}
				var x = _helpers.ajax.x();
				x.open(method, url, async);
				x.onreadystatechange = function() {
					if (x.readyState == 4) {
						callback(x);
					}
				};
				if (method == "POST") {
					x.setRequestHeader(
						"Content-type",
						"application/x-www-form-urlencoded"
					);
				}
				x.send(data);
			},
			get: function(url, data, callback, async) {
				var query = [];
				for (var key in data) {
					query.push(
						encodeURIComponent(key) +
							"=" +
							encodeURIComponent(data[key])
					);
				}
				_helpers.ajax.send(
					url + (query.length ? "?" + query.join("&") : ""),
					callback,
					"GET",
					null,
					async
				);
			},
			post: function(url, data, callback, async) {
				var query = [];
				for (var key in data) {
					query.push(
						encodeURIComponent(key) +
							"=" +
							encodeURIComponent(data[key])
					);
				}
				_helpers.ajax.send(
					url,
					callback,
					"POST",
					query.join("&"),
					async
				);
			}
		},
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
				var proxy = function() {
					handler.call(el);
				};
				el.attachEvent("on" + type, proxy);
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
				el.detachEvent("on" + type, handler);
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
			return el.classList
				? el.classList.contains(className)
				: new RegExp("\\b" + className + "\\b").test(el.className);
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
				el.className += " " + className;
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
				el.className = el.className.replace(
					new RegExp("\\b" + className + "\\b", "g"),
					""
				);
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
		 * [attachForm find any forms on the page and attach sendForm function
		 * limitations - only attaches the one function, assumes all forms are the same]
		 * @return {[type]} [description]
		 */
		attachForm: function() {
			//find all forms
			var forms = document.getElementsByTagName("form");

			//for each attach the sendForm function to submit
			for (var i = forms.length - 1; i >= 0; i--) {
				_helpers.addEvent(forms[i], "submit", _private.validateForm);
			}
		},
		// TODO implement validation
		validateForm: function() {
			event.preventDefault();
			// get values
			// function to take values and return object with valid or not
			var name = document.getElementById("name");
			var email = document.getElementById("email");
			var phone = document.getElementById("phone");
			// var enquiry = document.getElementById("enquiry");
			// Basic check
			if (this.checkValidity()) {
				var data = {
					name: name.value,
					email: email.value,
					phone: phone.value /*,
					enquiry: enquiry.value*/
				};
				_private.sendForm(data);
			} else {
				// setup messages
				var error = document.getElementById("errormessage");
				_helpers.removeClass(error, "hidden");
			}
		},
		/**
		 * [sendForm Validates form and then posts to PHP]
		 * @return {[type]} [description]
		 */
		sendForm: function(data) {
			event.preventDefault();

			// post to php page
			if (data) {
				movement.ajax.post("mail/contact_me.php", data, function(data) {
					// setup messages
					var success = document.getElementById("successmessage");
					var error = document.getElementById("errormessage");

					// was it successful?
					switch (data.status) {
						case 200:
							_helpers.removeClass(success, "hidden");
							break;
						default:
							_helpers.removeClass(error, "hidden");
					}
				});
			}
		},
		/**
		 * [activeNav sets the active page on the main nav]
		 * @return {[void]} [manipulates DOM]
		 */
		activeNav: function() {
			var body = document.querySelector("body");
			var bodyClass = body.getAttribute("class");
			var nav = document.getElementsByClassName(CLASSES.NAVITEM);
			var hash = window.location.hash;
			// check nav items for match
			for (var i = nav.length - 1; i >= 0; i--) {
				if (_helpers.hasClass(nav[i], bodyClass)) {
					_helpers.addClass(nav[i], "active");
				}
				// check if hash contains styles item
				if (
					hash === "#intro-styles" &&
					_helpers.hasClass(nav[i], "styles")
				) {
					_helpers.addClass(nav[i], "active");
				}
			}
		},
		/**
		 * [loadGoogle create a script object to access google api]
		 * @return {[void]} [manipulates DOM]
		 */
		loadGoogle: function() {
			var scr = document.createElement("script");
			scr.setAttribute(
				"src",
				"https://maps.googleapis.com/maps/api/js?key=" +
					CONST.gak +
					"&libraries=places&callback=movement.getGoogleReviews"
			);
			document.body.appendChild(scr);
		},
		/**
		 * [getGoogleReviews description]
		 * @return {[type]} [description]
		 */
		getGoogleReviews: function() {
			/* jshint ignore:start */
			// jscs:disable

			// Does map exist?
			var theMap = document.getElementById("map");
			if (theMap) {
				// create map element
				// -33.783817, 151.128672
				var movementhq = { lat: -33.783817, lng: 151.128672 };
				// search on maps right click "whats here?"
				var map = new google.maps.Map(theMap, {
					scrollwheel: false,
					center: movementhq,
					zoom: 15
				});
				// create custom marker
				var marker = new google.maps.Marker({
					position: movementhq,
					map: map,
					icon: "img/logo-pin.png"
				});
				// Fire only if testimonial carousel exists
				var testimonial = document.getElementById("testimonials");
				if (testimonial) {
					// request with place ID
					// https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
					var request = {
						placeId: "ChIJjdA5ZQimEmsRXJRgJr7gvDI"
					};
					// create place service call to get details
					// https://developers.google.com/maps/documentation/javascript/places#place_details
					var service = new google.maps.places.PlacesService(map);
					service.getDetails(request, callback);
					// place object has all data
					// TO-DO: store somewhere? whats the logic?
				}
			}
			/**
			 * [callback what to call when google place details has been retrieved]
			 * @param  {[type]}   place  [description]
			 * @param  {[type]}   status [description]
			 * @return {Function}        [description]
			 */
			function callback(place, status) {
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					_private.fillCarousel(
						place.reviews,
						ID.TESTCARCONT,
						ID.TESTCARPAR,
						CLASSES.CAROUSEL,
						CONST.testCar
					);
				}
			}
			// jscs:enable
			/* jshint ignore:end */
		},
		/**
		 * [stylesCarousels description]
		 * @return {[type]} [description]
		 */
		stylesCarousels: function() {
			// for each styles
			var bjj = document.getElementById("bjjCar");
			var mt = document.getElementById("mtCar");
			var mma = document.getElementById("mmaCar");
			var kids = document.getElementById("kidsCar");
			// find the carousel
			// fill the carousel with the appropriate photo array
			if (bjj) {
				_private.fillCarousel(
					CONST.styles.bjj,
					"bjjcarouselcontainer",
					"bjjCar",
					CLASSES.CAROUSEL,
					"src/html/inc/car-item-styles.hbs"
				);
			}
			if (mt) {
				_private.fillCarousel(
					CONST.styles.mt,
					"mtcarouselcontainer",
					"mtCar",
					CLASSES.CAROUSEL,
					"src/html/inc/car-item-styles.hbs"
				);
			}
			if (mma) {
				_private.fillCarousel(
					CONST.styles.mma,
					"mmacarouselcontainer",
					"mmaCar",
					CLASSES.CAROUSEL,
					"src/html/inc/car-item-styles.hbs"
				);
			}
			if (kids) {
				_private.fillCarousel(
					CONST.styles.kids,
					"kidscarouselcontainer",
					"kidsCar",
					CLASSES.CAROUSEL,
					"src/html/inc/car-item-styles.hbs"
				);
			}
		},
		/**
		 * [fillCarousel construct the carousel]
		 * @param  {[array]} arr [array of objects returned from whatever call]
		 * @param  {[string]} con [container ID - hidden by default]
		 * @param  {[string]} car [carousel class]
		 * @param  {[string]} temp [template string]
		 * @return {[void]}     [initialises carousel on success]
		 * TOFIX over engineered lol
		 */
		fillCarousel: function(arr, con, par, car, temp) {
			// carousel parent
			var carPar = document.getElementById(con);
			// carousel
			var cars = document.getElementsByClassName(car);
			// pre compiled handlebars template reference
			var postTemplate = movement.templates[temp];
			var html = postTemplate(arr);
			cars[0].innerHTML = html;
			if (carPar) {
				carPar.style.display = "block";
			}
			// initialise carousel once the html has been set up
			_private.initCarousel(par);
		},
		/**
		 * [initCarousel initialises the carousel]
		 * @return {[void]} [manipulates DOM]
		 */
		initCarousel: function(par) {
			// grab the carousel element
			var myCarousel = document.getElementById(par);
			// initialize with some options
			var myCarouselInit = new Carousel(myCarousel, {
				// these options values will override the ones set via DATA API
				interval: false,
				pause: false,
				keyboard: false,
				indicators: false
			});
		},
		/**
		 * [facilitiesImg description]
		 * @return {[type]} [description]
		 */
		facilitiesImg: function() {
			// grab the fac images parent
			var facImg = document.getElementById(ID.FACILITIESIMG);
			if (facImg) {
				// pre compiled handlebars template reference
				var postTemplate =
					movement.templates["src/html/inc/facilities-image.hbs"];
				var html = postTemplate(CONST.facilities);
				facImg.innerHTML = html;
			}
		},
		/**
		 * Randomly changes the background image of the body on load
		 * @return {[void]}
		 */
		changeBg: function() {
			var el = document.getElementsByClassName(CLASSES.INTRO);
			if (el && el.length > 0) {
				var i = 0;
				setInterval(function() {
					_helpers.css(el[0], {
						"background-image":
							"url(" + CONST.imgPath + CONST.bgArray[i] + ")"
					});
					i = i + 1;
					if (i == CONST.bgArray.length) {
						i = 0;
					}
				}, 5000);
			}
		},
		/**
		 * [smoothLink finds all elements with smoothlink class and attaches an event]
		 * @return {[void]} [attaches event]
		 */
		smoothLink: function() {
			//Get smooth links
			var smoothLinks = document.getElementsByClassName(
				CLASSES.SMOOTHLINK
			);
			// attach smoothscroll to it
			for (var i = smoothLinks.length - 1; i >= 0; i--) {
				// console.log(smoothLinks[i].getAttribute('href'));
				_helpers.addEvent(
					smoothLinks[i],
					"click",
					_private.smoothScroll
				);
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
			var headerEl = document.querySelectorAll("header");
			var scrollOffset = headerEl[0].offsetHeight;
			// where does the link want to go
			var el = document.querySelector(this.getAttribute("href"));
			// distance to top
			// Get an element's distance from the top of the page
			var location = _helpers.getElemDistance(el);
			// scroll to the element minus the height of the header
			document.documentElement.scrollTop = document.body.scrollTop =
				location - scrollOffset;
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
			_helpers.addEvent(el, "scroll", callback);

			function callback() {
				if (window.pageYOffset > scrollElTop) {
					// console.log('scrolling baby');
					// get the modal by ID
					var trialModal = document.getElementById("freetrial");
					// initialize and show the modal right away
					var myModalInstance = new Modal(trialModal);
					myModalInstance.show();
					// When shown record this in localstorage
					localStorage.setItem("freetrialshown", true);
					// remove the event from window
					_helpers.removeEvent(el, "scroll", callback);
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
			var name = document.querySelector("#name").value;
			var number = document.querySelector("#phone").value;
			window.location =
				"mailto:?body=My name is " +
				name +
				", my phone number is " +
				number +
				". Please contact me back about my free trial.";
		},
		/**
		 * [emailSend description]
		 * @return {[type]} [description]
		 */
		emailSend: function() {
			var el = document.getElementById(ID.CONTACT);
			_helpers.addEvent(el, "submit", _private.emailPage);
		},
		/**
		 * [mapScroll description]
		 * @return {[type]} [description]
		 */
		mapScroll: function() {
			// get google map div
			var map = document.getElementById("map");
			if (map) {
				var mapWrapper = document.getElementsByClassName(
					CLASSES.MAPWRAP
				);
				var on = function() {
					_helpers.removeClass(map, "scrolloff");
				};
				var off = function() {
					_helpers.addClass(map, "scrolloff");
				};
				// add class to google map div
				_helpers.addClass(map, "scrolloff");
				// remove on click
				_helpers.addEvent(mapWrapper[0], "click", on);
				_helpers.addEvent(mapWrapper[0], "mouseleave", off);
			}
		}
	};
	/**
	 * [_public exposed functions eg movement.changeBg()]
	 * @type {Object}
	 */
	var _public = {
		ajax: _helpers.ajax,
		attachForm: _private.attachForm,
		activeNav: _private.activeNav,
		loadGoogle: _private.loadGoogle,
		getGoogleReviews: _private.getGoogleReviews,
		changeBg: _private.changeBg,
		smoothLink: _private.smoothLink,
		scrollCta: _private.scrollCta,
		emailSend: _private.emailSend,
		stylesCarousels: _private.stylesCarousels,
		facilitiesImg: _private.facilitiesImg,
		mapScroll: _private.mapScroll
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
	movement.attachForm();
	movement.loadGoogle();
	movement.changeBg();
	movement.stylesCarousels();
	movement.facilitiesImg();
	movement.mapScroll();
	// movement.smoothLink();
	// movement.emailSend();
	// TODO convince to enable CTA check
	/*if (!ctaShown) {
		movement.scrollCta();
	}*/
}
// in case the document is already rendered
if (document.readyState !== "loading") {
	init();
} else if (document.addEventListener) {
	// modern browsers
	document.addEventListener("DOMContentLoaded", init);
} else {
	// IE <= 8
	document.attachEvent("onreadystatechange", function() {
		if (document.readyState === "complete") {
			init();
		}
	});
}
