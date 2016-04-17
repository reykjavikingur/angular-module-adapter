var parseString = require('./parse-string');
var fs = require('fs');

function parseFile(path, cb) {
	fs.readFile(path, 'utf8', function(err, data) {
		if (err) {
			cb(err);
		} else {
			var err, tree;
			try {
				tree = parseString(data);
			} catch (e) {
				err = e;
			}
			cb(err, tree);
		}
	});
}

module.exports = parseFile;