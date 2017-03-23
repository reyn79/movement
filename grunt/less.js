// Compile your LESS
// https://github.com/gruntjs/grunt-contrib-less

module.exports = {
	// compile less stylesheets to css
	dev: {
		files: {
			'<%= config.dist.css %>/styles.css': ['<%= config.src.css %>/**/*.less','<%= config.src.css %>/**/*.css']
		}
	},
	prod: {
		files: {
			'<%= config.src.base %>/temp/styles.css': ['<%= config.src.css %>/**/*.less','<%= config.src.css %>/**/*.css']
		}
	},
	bootstrap: {
		files: {
			'<%= config.src.libs.dist %>/css/libs.css': ['<%= config.src.libs.css %>/bootstrap/bootstrap.less']
		}
	}
};