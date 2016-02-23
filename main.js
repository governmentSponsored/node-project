//require libraries and files
var tools = require('./hello'),
	fs = require('fs'),
	http = require('http'),
	stream = require('stream'),
	options = {portOne: 1337, portTwo: 1338};

//just messing with console message that gets written
tools.cute(options);

//create multiple ports to listen to different requests
http.createServer(onRequestOneThreeThreeSeven).listen(options.portOne);
http.createServer(onRequestOneThreeThreeEight).listen(options.portTwo);

//working with the stream API here. Just starting off with a quick pipe response to a request.
//here is where you use: curl -d "string" http://localhost:1337
function onRequestOneThreeThreeSeven (req, res) {
	res.writeHeader(200);
	req.pipe(res);
}

//read contents of index.html and then send it's contents in response to an http request to 1337 port
//here you use the normal curl http://localhost:1338
function onRequestOneThreeThreeEight (req, res) {
	fs.readFile('./index.html', function(err, html) {
		if(err) {
			throw err;
		} else {
			res.writeHeader(200);
	        res.end(html);
		}	        
	});
}
