// Uglify minifies your files
// https://github.com/gruntjs/grunt-contrib-uglify
module.exports = {
// configure uglify to minify js files
options: {
    mangle: true
  },
  js: {
    files: {
      '<%= config.dist.js %>/script.js': ['<%= config.src.js %>/*.js']
    }
  },
  libs: {
    files: {
      '<%= config.dist.libs.main %>/js/libs.js': '<%= config.src.libs.dist %>/js/*.js'
    }
  }
};


