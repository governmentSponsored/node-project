//require libraries, files, and port info
var tools = require('./hello'),
	fs = require('fs'),
	http = require('http'),
	stream = require('stream'),
	util = require('util'),
	path = require('path'),
	options = 
	{
		portOne: {instructions: 'curl -d "string"', portNumber: 1337, outcome: 'Returns string in console'},
		portTwo: {instructions: 'curl', portNumber: 1338, outcome: 'Returns index.html file contents'},
		portThree: {instructions: 'curl', portNumber: 1339, outcome: 'Copies README.md'},
		portFour: {instructions: 'curl --upload-file "file_name.md"', portNumber: 1340, outcome: 'Will copy .md file that is passed in'},
		portFive: {instructions: 'curl --upload-file "image_name.jpg"', portNumber: 1341, outcome: 'Will copy .jpg that is passed in and display progress'},
		portSix: {instructions: 'do not curl. In your browser visit', portNumber: 1342, outcome: 'Will stream an mp3'}
	};

//just messing with console message that gets written
tools.curlInstructions(options);

//create multiple ports to listen to different requests
http.createServer(onRequestOneThreeThreeSeven).listen(options.portOne.portNumber);
http.createServer(onRequestOneThreeThreeEight).listen(options.portTwo.portNumber);
http.createServer(onRequestOneThreeThreeNine).listen(options.portThree.portNumber);
http.createServer(onRequestOneThreeFourZero).listen(options.portFour.portNumber);
http.createServer(onRequestOneThreeFourOne).listen(options.portFive.portNumber);
http.createServer(onRequestOneThreeFourTwo).listen(options.portSix.portNumber);

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

//stream an mp3!! very cool.
function onRequestOneThreeFourTwo (req, res) {
	var filePath = path.join(__dirname, 'footballpodcast.mp3'),
    	stat = fs.statSync(filePath),
    	readStream = fs.createReadStream(filePath);
    
    res.writeHead(200, {
        'Content-Type': 'audio/mpeg', 
        'Content-Length': stat.size
    });
    
    
    util.pump(readStream, res);
}