var tools = require('./hello'),
	fs = require('fs'),
	http = require('http');

tools.cute('carla brady');

fs.readFile('./index.html',function(err, html) {
	if(err) {
		throw err;
	}
	http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        //response.write();  
        response.end(html);  
    }).listen(8000);
});