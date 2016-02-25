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
	}
}