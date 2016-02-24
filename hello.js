module.exports = {
	cute: function(options) {
    	console.log('curl -d "string" http://localhost:' + options.portOne + '. Returns string in console. \n');
    	console.log('curl http://localhost:' + options.portTwo + '. Returns index.html file contents. \n');
    	console.log('curl http://localhost:' + options.portThree + '/. Copies README.md \n');
    	console.log('curl --upload-file "file_name.extension" http://localhost:' + options.portFour + '/. Will copy file that is passed in');
	}
}