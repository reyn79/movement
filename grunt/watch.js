module.exports = {
  // configure watch to auto update
  // for stylesheets, watch css and less files 
  // only run less and cssmin stylesheets: 
  options: {
    livereload: true,
    keepAlive: true
  },
  css: {
    files: ['<%= config.src.css %>/*.less', '<%= config.src.css %>/*.css'],
    tasks: ['less'],
  },
  js: {
    files: ['<%= config.src.js %>/*.js','!<%= config.src.js %>/*.tmpl.js'],
    tasks: ['clean:templates','jshint','handlebars', 'concat:mainjs'],
  },
  templates: {
    files: ['<%= config.src.layouts %>/*.hbs', ],
    tasks: ['assemble']
  },
  pages: {
    files: ['<%= config.src.pages %>/*.hbs', ],
    tasks: ['assemble']
  },
  partials: {
    files: ['<%= config.src.partials %>/*.hbs', ],
    tasks: ['assemble']
  },
  data: {
    files: ['<%= config.src.data %>/*.json', ],
    tasks: ['assemble']
  },
  inc: {
    files: ['<%= config.src.inc %>/*.hbs', ],
    tasks: ['clean:templates','handlebars','concat:mainjs']
  },
};
