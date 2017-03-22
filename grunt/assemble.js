// Assemble is used to build the html by using partials
// https://github.com/assemble/grunt-assemble

module.exports = {

  main: {
    options: {
      partials: ['<%= config.src.partials %>/*.hbs'],
      layoutdir: '<%= config.src.layouts %>',
      data: ['<%= config.src.data %>/*.json']
    },
    files: [{
      expand: true,
      src: [ '<%= config.src.pages %>/*.hbs' ],
      flatten: true,
      dest: '<%= config.dist.base %>'
    }]
  }

};
