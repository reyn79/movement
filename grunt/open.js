// Open urls and files from a grunt task
// Docs: https://github.com/jsoverson/grunt-open

module.exports = {
	options: {
		//delay: 5000
	},
	browser: {
    'path' : '<%= config.server.protocol %>://<%= config.server.ip %>:<%= config.server.port %>/'
  }

};
