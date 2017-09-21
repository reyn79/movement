const ajax = {
	x: function() {
		if (typeof XMLHttpRequest !== "undefined") {
			return new XMLHttpRequest();
		}
		var versions = [
			"MSXML2.XmlHttp.6.0",
			"MSXML2.XmlHttp.5.0",
			"MSXML2.XmlHttp.4.0",
			"MSXML2.XmlHttp.3.0",
			"MSXML2.XmlHttp.2.0",
			"Microsoft.XmlHttp"
		];

		var xhr;
		for (var i = 0; i < versions.length; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			} catch (e) {
				console.warn("We got an error = ", e)
			}
		}
		return xhr;
	},
	send: function(url, callback, method, data, async) {
		if (async === undefined) {
			async = true;
		}
		var x = ajax.x();
		x.open(method, url, async);
		x.onreadystatechange = function() {
			if (x.readyState == 4) {
				callback(x);
			}
		};
		if (method == "POST") {
			x.setRequestHeader(
				"Content-type",
				"application/x-www-form-urlencoded"
			);
		}
		x.send(data);
	},
	get: function(url, data, callback, async) {
		var query = [];
		for (var key in data) {
			query.push(
				encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
			);
		}
		_helpers.ajax.send(
			url + (query.length ? "?" + query.join("&") : ""),
			callback,
			"GET",
			null,
			async
		);
	},
	post: function(url, data, callback, async) {
		var query = [];
		for (var key in data) {
			query.push(
				encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
			);
		}
		_helpers.ajax.send(url, callback, "POST", query.join("&"), async);
	}
};

export default ajax;
