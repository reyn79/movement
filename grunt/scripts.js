module.exports = {
  // for scripts, run jshint and uglify 
  files: '<%= config.src.js %>/*.js',
  tasks: ['jshint', 'uglify']
};
