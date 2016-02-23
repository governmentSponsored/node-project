module.exports = {
	cute: function(str_text) {
    	console.log('Server running at http://localhost:1337/ ' + str_text + ' \n');
    	console.log('Server running at http://localhost:1338/. Be sure to curl -d "string" before localhost:1338.');
	}
}