// Validate your JS
// https://github.com/sindresorhus/jshint-stylish
module.exports = {
	// configure jshint to validate js files
	options: {
		reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
	},

	// when this task is run, lint the Gruntfile and all js files in src
	build: ['Gruntfile.js', '<%= config.src.js %>/*.js']
};