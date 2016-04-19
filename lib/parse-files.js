var _ = require('underscore');
var parseFile = require('./parse-file');

function parseFiles(paths, cb) {
	var items = [];
	_.each(paths, function(path) {
		parseFile(path, function(err, modules) {
			if (err) {
				cb(err);
			} else {
				items.push({
					path: path,
					modules: modules
				});
				if (items.length === paths.length) {
					cb(null, items);
				}
			}
		});
	});
}

module.exports = parseFiles;