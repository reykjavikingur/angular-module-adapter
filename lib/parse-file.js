var parseString = require('./parse-string');
var fs = require('fs');

/**
 * Reads the file at the given path to identify Angular module status
 * calling back with error or same data as returned by parseString()
 * 
 * @param  {String}   path The file path
 * @param  {Function} cb   The callback, taking parameters (err, tree)
 */
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