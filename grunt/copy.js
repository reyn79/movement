// Copy files and folders
// Docs: https://github.com/gruntjs/grunt-contrib-copy
module.exports = {
  libs: {
    files: [
      // Vendor scripts. Put in src first
      {
        expand: true,
        cwd: "<%= config.src.bower %>/bootstrap.native/lib/V3/",
        src: ["**/*.js"],
        dest: "<%= config.src.libs.js %>/bootstrap/"
      },
      {
        expand: true,
        cwd: "<%= config.src.bower %>/bootstrap.native/dist/",
        src: ["polyfill.js"],
        dest: "<%= config.src.libs.js %>/bootstrap/"
      },
      {
        expand: true,
        cwd: "<%= config.src.bower %>/handlebars/",
        src: ["handlebars.js"],
        dest: "<%= config.src.libs.js %>/handlebars/"
      },
      // Fonts. Straight to dist
      {
        expand: true,
        filter: "isFile",
        flatten: true,
        cwd: "<%= config.src.bower %>/",
        src: ["bootstrap/fonts/**","components-font-awesome/fonts/**"],
        dest: "<%= config.dist.libs.fonts %>"
      },
      // Bootstrap styles
      {
        expand: true,
        cwd: "bower_components/bootstrap/less/",
        src: ["**/*.less"],
        dest: "<%= config.src.libs.css %>/bootstrap/"
      },
      // Font Awesome styles
      {
        expand: true,
        cwd: "bower_components/components-font-awesome/less/",
        src: ["*.less"],
        dest: "<%= config.src.libs.css %>/fontawesome/"
      }
    ]
  },
  main: {
    files: [
      // Main image files
      {
        expand: true,
        cwd: "<%= config.src.img %>",
        src: ["*.*"],
        dest: "<%= config.dist.img %>"
      },
      // Main media
      {
        expand: true,
        cwd: "<%= config.src.media %>",
        src: ["*.*"],
        dest: "<%= config.dist.media %>"
      },
      // Processed libs
      {
        expand: true,
        cwd: "<%= config.src.mail %>",
        src: ["*.*"],
        dest: "<%= config.dist.mail %>"
      },
      // mail php
      {
        expand: true,
        cwd: "<%= config.src.libs.dist %>",
        src: ["css/*.css"],
        dest: "<%= config.dist.libs.main %>"
      },
      // fonts
      {
        expand: true,
        cwd: "<%= config.src.libs.fonts %>",
        src: ["*.*"],
        dest: "<%= config.dist.libs.fonts %>"
      }
    ]
  },
  libjs: {
    files: [
      // Processed libs
      {
        expand: true,
        cwd: "<%= config.src.libs.dist %>",
        src: ["js/*.*"],
        dest: "<%= config.dist.libs.main %>"
      }
    ]
  }
};
