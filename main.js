//require libraries and files
var tools = require('./hello'),
	fs = require('fs'),
	http = require('http'),
	stream = require('stream'),
	options = 
	{
		portOne: 1337, 
		portTwo: 1338, 
		portThree: 1339, 
		portFour: 1340, 
		portFive: 1341
	};

//just messing with console message that gets written
tools.curlInstructions(options);

//create multiple ports to listen to different requests
http.createServer(onRequestOneThreeThreeSeven).listen(options.portOne);
http.createServer(onRequestOneThreeThreeEight).listen(options.portTwo);
http.createServer(onRequestOneThreeThreeNine).listen(options.portThree);
http.createServer(onRequestOneThreeFourZero).listen(options.portFour);
http.createServer(onRequestOneThreeFourOne).listen(options.portFive);

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

//copy and rename a file and respond with a confirmation message
function onRequestOneThreeThreeNine (req, res) {
	var file = fs.createReadStream('README.md');
	var newFile = fs.createWriteStream('readme_copy_from_node.md');
	file.pipe(newFile);
	res.end('copied the file with 1339 function');	
}

//copy a file that is passed as a request
function onRequestOneThreeFourZero (req, res) {
	var newFile = fs.createWriteStream('readme_copy_from_node_deux.md');
	req.pipe(newFile);

	req.on('end', function() {
		res.end('uploaded with 1340 function');
	});	
}

//more complex file upload with response that includes upload progress
function onRequestOneThreeFourOne (req, res) {
	var largeFile = fs.createWriteStream('image_copy.jpg'),
		fileSize = req.headers['content-length'],
		uploadSize = 0,
		chunk = null,
		progress = 0;

	req.on('readable', function() {
		while(null !== (chunk = req.read())) {
			uploadSize += chunk.length;
			progress = (uploadSize / fileSize) * 100;
			res.write('Percent Complete: ' + parseInt(progress, 10) + "%\n");
		}
	});

	req.pipe(largeFile);
	req.on('end', function() {
		res.end('file finished uploading');
	});
}