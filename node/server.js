var http = require('http');
var fs = require('fs');

var server = new http.Server(function (req, res) {
	console.log(req.method, req.url);

	if (req.url === "/phones") {
		fs.readFile("./people.json",
			function (err, data) {

				res.setHeader('Access-Control-Allow-Origin', '*');
				res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
				res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
				
				res.end(data);

			});
	} else {
		res.writeHead(200, {
			"Content-Type": "text/plain"
		});
		res.write("Hello world\n");
		res.end();
	}

});

server.listen(8077, "127.0.0.1");