// Copy files and folders
// Docs: https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
  libs: {
    files: [
      // Vendor scripts. Put in src first
      {
        expand: true,
        cwd: '<%= config.src.bower %>/bootstrap.native/lib/V3/',
        src: ['**/*.js'],
        dest: '<%= config.src.libs.js %>/bootstrap/'
      },{
        expand: true,
        cwd: '<%= config.src.bower %>/bootstrap.native/dist/',
        src: ['polyfill.js'],
        dest: '<%= config.src.libs.js %>/bootstrap/'
      }, //{
      //   expand: true,
      //   cwd: '<%= config.src.bower %>/jquery/dist/',
      //   src: ['**/*.min.js', '**/*.min.map'],
      //   dest: '<%= config.src.libs.js %>/jquery/'
      // }
      {
        expand: true,
        cwd: '<%= config.src.bower %>/handlebars/',
        src: ['handlebars.js'],
        dest: '<%= config.src.libs.js %>/handlebars/'
      },
      // Fonts. Straight to dist
      {
        expand: true,
        filter: 'isFile',
        flatten: true,
        cwd: '<%= config.src.bower %>/',
        src: ['bootstrap/fonts/**'],
        dest: '<%= config.dist.libs.fonts %>'
      },
      // Stylesheets
      {
        expand: true,
        cwd: 'bower_components/bootstrap/less/',
        src: ['**/*.less'],
        dest: '<%= config.src.libs.css %>/bootstrap/'
      }
    ]
  },
  main: {
    files: [
    // Main image files
    {
      expand: true,
      cwd: '<%= config.src.img %>',
      src: ['*.*'],
      dest: '<%= config.dist.img %>'
    }, 
    // Main media
    {
      expand: true,
      cwd: '<%= config.src.media %>',
      src: ['*.*'],
      dest: '<%= config.dist.media %>'
    }, 
    // Processed libs
    {
      expand: true,
      cwd: '<%= config.src.libs.dist %>',
      src: ['css/*.css'],
      dest: '<%= config.dist.libs.main %>'
    }]
  },
  libjs: {
    files: [
    // Processed libs
    {
      expand: true,
      cwd: '<%= config.src.libs.dist %>',
      src: ['<%= config.src.libs.dist %>/js/*.*'],
      dest: '<%= config.dist.libs.main %>/js'
    }]
  }
};
