//https://github.com/gruntjs/grunt-contrib-handlebars
module.exports = {
templates: {
    options: {
      namespace: 'movement.templates'
    },
    files: {
      '<%= config.src.js %>/templates.tmpl.js': ['<%= config.src.inc %>/*.hbs']
    }
  }
}