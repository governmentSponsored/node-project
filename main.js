//require libraries and files
var tools = require('./hello'),
	fs = require('fs'),
	http = require('http'),
	stream = require('stream');

//just messing with console message that gets written
tools.cute('clabear!');

//create multiple ports to listen to different requests
http.createServer(onRequestOneThreeThreeSeven).listen(1337);
http.createServer(onRequestOneThreeThreeEight).listen(1338);

//working with the stream API here. Just starting off with a quick pipe response to a request.

function onRequestOneThreeThreeSeven (req, res) {
	res.writeHeader(200);
	req.pipe(res);
}

//read contents of index.html and then send it's contents in response to an http request to 1337 port
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
