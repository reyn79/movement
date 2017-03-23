module.exports = {
	// configure cssmin to minify css files
	options: {
		
	},
	dev: {
		files: {
			'<%= config.dist.css %>/styles.css': '<%= config.src.base %>/temp/styles.css'
		}
	}
};