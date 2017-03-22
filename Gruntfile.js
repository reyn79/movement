// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {
  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  var CONFIG = {
    client: {
      basePath: {
        dev: '',
        prod: ''
      }
    },
    src: {
      base: 'src',
      html: 'src/html',
      inc: 'src/html/inc',
      css: 'src/css',
      js: 'src/js',
      img: 'src/img',
      media: 'src/media',
      layouts: 'src/html/layouts',
      partials: 'src/html/partials',
      pages: 'src/html/pages',
      data: 'src/html/data',
      libs: {
        dist: 'src/libs/dist',
        js: 'src/libs/js',
        css: 'src/libs/less'
      },
      bower: 'bower_components'
    },
    dist: {
      base: 'dist',
      html: 'dist',
      css: 'dist/css',
      js: 'dist/js',
      img: 'dist/img',
      media: 'dist/media',
      libs: {
        main: 'dist/libs',
        fonts: 'dist/libs/fonts'
      }
    },
    server: {
      protocol: 'http',
      ip: 'localhost',
      port: 2205
    }
  };
  // get the configuration info from package.json ----------------------------
  // this way we can use things like name and version (pkg.name)
  // all of our configuration will go here
  // https://github.com/firstandthird/load-grunt-config
  var pkg = grunt.file.readJSON('package.json');
  require('load-grunt-config')(grunt, {
    data: {
      pkg: pkg,
      config: CONFIG
    }
  });
  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  // https://github.com/shootaroo/jit-grunt
  require('jit-grunt')(grunt, {
    // JIT plugin loader for Grunt.
    // Load time of Grunt does not slow down even if there are many plugins.
    // Docs: https://github.com/shootaroo/jit-grunt
    // custom: 'uglify-js'
  });
  // ============= // CREATE TASKS ========== //
  // this default task will go through all configuration (dev and production) in each task 
  grunt.registerTask('default', [
    // remove temp files
    'clean',
    // copy dependencies eg bootstrap etc
    'copy:libs',
    // lint js
    'jshint',
    // create template file
    'handlebars',
    // compile less
    'less',
    // join all files that need to be
    'concat',
    // copy up main site resources and processed libs
    'copy:main',
    // create pages from temnplates
    'assemble',
    // create server and load page
    'connect', 'open:browser',
    // start watching for any changes to files
    'watch'
  ]);
  // this task will only run the dev configuration 
  //grunt.registerTask('dev', ['jshint:dev', 'uglify:prod', 'less', 'cssmin:dev']);
  // only run production configuration 
  //grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production']);
};
