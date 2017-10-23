// Compile your LESS
// https://github.com/gruntjs/grunt-contrib-less

module.exports = {
	// compile less stylesheets to css
	options: {
		strictImports: true,
		syncImport: true
	},
	dev: {
		files: {
			"<%= config.dist.css %>/styles.css":
				"<%= config.src.css %>/movement.less"
		}
	},
	prod: {
		files: {
			"<%= config.src.base %>/temp/styles.css":
				"<%= config.src.css %>/movement.less"
		}
	},
	bootstrap: {
		files: {
			"<%= config.src.libs.dist %>/css/libs.css": [
				"<%= config.src.libs.css %>/bootstrap/bootstrap.less",
				"<%= config.src.libs.css %>/fontawesome/font-awesome.less"
			]
		}
	}
};
