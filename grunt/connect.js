// Connect is used to start a web server
// https://github.com/gruntjs/grunt-contrib-connect
module.exports = {
  default: {
    options: {
      hostname: 'localhost',
      port: 2205,
      livereload: true,
      base: 'dist'
    }
  }
}