module.exports = {
    all: [
        "dist/"
    ],
    libs: [
        "src/libs"
    ],
    templates: [
    	"<%= config.src.js %>/*.tmpl.js"
    ],
    temp: [
    	"<%= config.src.base %>/temp"
    ]
};