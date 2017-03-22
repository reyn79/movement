// Uglify minifies your files
// https://github.com/gruntjs/grunt-contrib-uglify
module.exports = {
  // configure uglify to minify js files
  prod: {
    options: {
      compress: {
        warnings: false
      },
      mangle: true,
      preserveComments: /^!|@preserve|@license|@cc_on/i
    },
    main: {
      '<%= config.dist.js %>/script.min.js': '<%= config.src.js %>/*.js'
    }
  }
};
