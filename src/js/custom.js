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
  CONST = {
    gak: 'AIzaSyAerv0HM1ZRtnN1hqRHb545CVYhGRGNd_w',
    bgArray: [ 'bg-home.jpg', 'kickbox-girl.jpg' ],
    imgPath: 'img/'
  };
  CLASSES = {
    NAVITEM: 'js-nav-item',
    SMOOTHLINK: 'js-smooth-link',
    CAROUSEL: 'carousel-inner'
  };
  ID = {
    INFO: 'intro-text',
    CARPAR: 'testimonials'
  };
  /**
   * [_private internal functions]
   * @type {Object}
   */
  var _private = {
    activeNav: function() {
      var body = document.querySelector('body');
      var bodyClass = body.getAttribute('class');
      var nav = document.getElementsByClassName(CLASSES.NAVITEM);
      for (var i = nav.length - 1; i >= 0; i--) {
        if(_helpers.hasClass(nav[i],bodyClass)) {
          _helpers.addClass(nav[i],'active');
        }
      }
    },
    loadGoogle: function() {
      var scr = document.createElement('script');
      scr.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=' + CONST.gak + '&libraries=places&callback=movement.getGoogleReviews');
      document.body.appendChild(scr);
    },
    getGoogleReviews: function() {
      // create map element
      var movementhq = { lat: -33.783971, lng: 151.128471 };
      // search on maps right click "whats here?"
      var map = new google.maps.Map(document.getElementById('map'), {
        scrollwheel: false,
        center: movementhq,
        zoom: 15
      });
      var marker = new google.maps.Marker({
        position: movementhq,
        map: map,
        icon: 'img/logo-pin.png'
      });
      // Only if testimonial carousel exists
      var testimonial = document.getElementById('testimonials');
      if(testimonial) {
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
      function callback(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            _private.fillCarousel(place.reviews);
          }
        }
    },
    fillCarousel: function(arr) {
      var carPar = document.getElementById(ID.CARPAR);
      var cars = document.getElementsByClassName(CLASSES.CAROUSEL);
      var postTemplate = movement.templates['src/html/inc/car-item.hbs'];
      var html = postTemplate(arr);
      cars[0].innerHTML = html;
      carPar.style.display = 'block';
      _private.initCarousel();
    },
    initCarousel: function() {
      // grab the carousel element
      var myCarousel = document.getElementById('test-car');
      // initialize with some options
      var myCarouselInit = new Carousel(myCarousel, { // these options values will override the ones set via DATA API 
        interval: false,
        pause: false,
        keyboard: false,
        indicators: false
      });
    },
    /**
     * Randomly changes the background image of the body on load
     * @return {void}
     */
    changeBg: function() {
      var bg = CONST.bgArray[Math.floor(Math.random() * CONST.bgArray.length)];
      var imageUrl = 'url(' + CONST.imgPath + bg + ')';
      var body = document.querySelector('body');
      _helpers.css(body, { 'background-image': imageUrl });
    },
    smoothLink: function() {
      //Get smooth links
      var smoothLinks = document.getElementsByClassName(CLASSES.SMOOTHLINK);
      // attach smoothscroll to it
      for (var i = smoothLinks.length - 1; i >= 0; i--) {
        // console.log(smoothLinks[i].getAttribute('href'));
        _helpers.addEvent(smoothLinks[i], 'click', _private.smoothScroll);
      }
    },
    smoothScroll: function() {
      // scroll into view
      event.preventDefault();
      // get header height
      var headerEl = document.querySelectorAll('header');
      var scrollOffset = headerEl[0].offsetHeight;
      var el = document.querySelector(this.getAttribute('href'));
      document.documentElement.scrollTop = document.body.scrollTop = el.offsetTop - scrollOffset;
    },
    scrollCta: function() {
      var el = window;
      var scrollEl = document.getElementById(ID.INFO);
      var scrollElTop = scrollEl.offsetTop - 55;
      _helpers.addEvent(el, 'scroll', callback);

      function callback() {
        if (window.pageYOffset > scrollElTop) {
          // console.log('scrolling baby');
          // get the modal by ID
          var trialModal = document.getElementById('freetrial');
          // OR initialize and show the modal right away
          var myModalInstance = new Modal(trialModal);
          myModalInstance.show();
          // When shown record this
          localStorage.setItem('freetrialshown', true);
          _helpers.removeEvent(el, 'scroll', callback);
        }
      }
    }
  };
  var _helpers = {
    /**
     * Takes an element and applies style rules to it
     * @param  {HTMLElement} el - the element you want to style
     * @param  {[object]} styles - contains the css rules to apply
     * @return {void}
     */
    css: function(el, styles) {
      for (var property in styles) el.style[property] = styles[property];
    },
    addEvent: function(el, type, handler) {
      if (el.attachEvent) {
        // IE9 fix
        var proxy = function() { handler.call(el); };
        el.attachEvent('on' + type, proxy);
      } else {
        el.addEventListener(type, handler);
      }
    },
    removeEvent: function(el, type, handler) {
      if (el.detachEvent) el.detachEvent('on' + type, handler);
      else el.removeEventListener(type, handler);
    },
    hasClass: function(el, className) {
      return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
    },
    addClass: function(el, className) {
      if (el.classList) el.classList.add(className);
      else if (!hasClass(el, className)) el.className += ' ' + className;
    },
    removeClass: function(el, className) {
      if (el.classList) el.classList.remove(className);
      else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
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
    scrollCta: _private.scrollCta
  };
  return _public;
})();

function init() {
  var ctaShown = localStorage.getItem('freetrialshown');
  movement.activeNav();
  movement.loadGoogle();
  movement.changeBg();
  movement.smoothLink();
  if (!ctaShown) {
    movement.scrollCta();
  }
}
// in case the document is already rendered
if (document.readyState != 'loading') init();
// modern browsers
else if (document.addEventListener) document.addEventListener('DOMContentLoaded', init);
// IE <= 8
else document.attachEvent('onreadystatechange', function() {
  if (document.readyState == 'complete') init();
});
