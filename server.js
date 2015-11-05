// var connect = require('connect');
// var serveStatic = require('serve-static');
// connect().use(serveStatic(__dirname)).listen(8080);

var http = require('http'),
		fs = require('fs');

http.createServer(function(request, response) {

	fs.readFile('./index.html', function (err, html) {
	  if (err) {
	  	response.writeHeader(404);
	  	response.write('Nothing was found!');
	  	response.end();
	  } else {
	  	response.writeHeader(200, {'Content-Type': 'text/html'});  
	  	response.write(html);  
	  	response.end();  
		}
	});

}).listen(29600);
