module.exports = {
	// configure cssmin to minify css files
	options: {
		banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
	},
	dev: {
		files: {
			'<%= config.dist.css %>/styles.min.css': '<%= config.dist.css %>/styles.css'
		}
	}
};