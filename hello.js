module.exports = {
	curlInstructions: function(options) {
		for (var key in options) {
		   	var obj = options[key],
		   		str = '';
			for (var prop in obj) {
				if(prop === 'portNumber') { 
					str += 'http://localhost:' + obj[prop] + '. '
				}
				else {
					str += obj[prop] + ' ';
				}				
			}
			console.log(str);
		}
    	/*console.log('curl -d "string" http://localhost:' + options.portOne + '. Returns string in console. \n');
    	console.log('curl http://localhost:' + options.portTwo + '. Returns index.html file contents. \n');
    	console.log('curl http://localhost:' + options.portThree + '. Copies README.md \n');
    	console.log('curl --upload-file "file_name.extension" http://localhost:' + options.portFour + '. Will copy file that is passed in');
    	console.log('curl --upload-file "image_name.jpg" http://localhost:' + options.portFive + '. Will copy file that is passed in and display progress');*/
	}
}