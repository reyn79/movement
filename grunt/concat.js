module.exports = {
  // app js dependencies
	libjs: {
    src: 
    [
          '<%= config.src.libs.js %>/handlebars/handlebars.js',
          // '<%= config.src.libs.js %>/jquery/jquery.min.js',
          // '<%= config.src.libs.js %>/bootstrap/transition.js',
          // '<%= config.src.libs.js %>/bootstrap/alert.js',
          // '<%= config.src.libs.js %>/bootstrap/button.js',
          // '<%= config.src.libs.js %>/bootstrap/carousel.js',
          // '<%= config.src.libs.js %>/bootstrap/collapse.js',
          // '<%= config.src.libs.js %>/bootstrap/dropdown.js',
          // '<%= config.src.libs.js %>/bootstrap/modal.js',
          // '<%= config.src.libs.js %>/bootstrap/tooltip.js',
          // '<%= config.src.libs.js %>/bootstrap/popover.js',
          // '<%= config.src.libs.js %>/bootstrap/scrollspy.js',
          // '<%= config.src.libs.js %>/bootstrap/tab.js',
          // '<%= config.src.libs.js %>/bootstrap/affix.js',
          '<%= config.src.libs.js %>/bootstrap/polyfill.js',
          '<%= config.src.libs.js %>/bootstrap/utils.js',
          '<%= config.src.libs.js %>/bootstrap/collapse-native.js',
          '<%= config.src.libs.js %>/bootstrap/carousel-native.js',
          '<%= config.src.libs.js %>/bootstrap/modal-native.js'//,
          // '<%= config.src.libs.js %>/smoothscroll/smoothscroll.js'
        ],
		dest: '<%= config.src.libs.dist %>/js/libs.js'
	},
  mainjs: {
    src: [
      '<%= config.src.js %>/*.js'
    ],
    dest: '<%= config.dist.js %>/script.js'
  }
}
