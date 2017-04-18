module.exports = {
  // app js dependencies
	libjs: {
    src: 
    [
          '<%= config.src.libs.js %>/handlebars/handlebars.js',
          '<%= config.src.libs.js %>/bootstrap/polyfill.js',
          '<%= config.src.libs.js %>/bootstrap/utils.js',
          '<%= config.src.libs.js %>/bootstrap/dropdown-native.js',
          '<%= config.src.libs.js %>/bootstrap/collapse-native.js',
          '<%= config.src.libs.js %>/bootstrap/carousel-native.js',
          '<%= config.src.libs.js %>/bootstrap/modal-native.js'
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
