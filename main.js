//require libraries and files
var tools = require('./hello'),
	fs = require('fs'),
	http = require('http'),
	server = http.createServer();

//just messing with console message that gets written
tools.cute('clabear');

//read contents of index.html and then send it's contents in response to an http request to 1337 port
fs.readFile('./index.html',function(err, html) {
	if(err) {
		throw err;
	}
	server.on('request', function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        //response.write();  
        response.end(html);  
    }).listen(1337);
});