module.exports = {
	cute: function(options) {
    	console.log('Server running at http://localhost:' + options.portOne + '/ \n');
    	console.log('Server running at http://localhost:' + options.portTwo + '/. Be sure to curl -d "string"');
	}
}