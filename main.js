var tools = require('./hello'),
	html = require('fs'),
	http = require('http');

tools.cute('carla brady');

html.readFile('./index.html',function(err, html) {
	if(err) {
		throw err;
	}
	http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});