var glob = require('glob');
var should = require('should');
var adapter = require('../');

describe('parseFiles', function() {

	it('should be a function', function() {
		should(adapter.parseFiles).be.a.Function();
	});

	describe('when given one file defining angular module', function() {

		var err, defs;

		beforeEach(function(done) {
			var paths = [
				__dirname + '/files/group/decl.js'
			];
			adapter.parseFiles(paths, function(_err, _defs) {
				err = _err;
				defs = _defs;
				done();
			});
		});

		it('should call back without error', function() {
			should(err).not.be.ok();
		});

		it('should call back with array', function() {
			should(defs).be.an.Array();
		});

		it('should put one item in the array', function() {
			should(defs.length).eql(1);
		});

		it('should put the correct values into the first item of the array', function() {
			should(defs[0]).eql({
				path: __dirname + '/files/group/decl.js',
				modules: [{
					name: 'xy.product',
					declaration: true
				}]
			});
		});

	});

	describe('when given two files comprising one angular module', function() {

		var err, defs;

		beforeEach(function(done) {
			var files = [
				__dirname + '/files/group/decl.js',
				__dirname + '/files/group/config.js'
			];
			adapter.parseFiles(files, function(_err, _defs) {
				err = _err;
				defs = _defs;
				done();
			});
		});

		it('should call back without error', function() {
			should(err).not.be.ok();
		});

		it('should call back with array having two items', function() {
			should(defs.length).eql(2);
		});

		it('should set correct first item', function() {
			should(defs[0]).eql({
				path: __dirname + '/files/group/decl.js',
				modules: [{
					name: 'xy.product',
					declaration: true
				}]
			});
		});

		it('should set correct second item', function() {
			should(defs[1]).eql({
				path: __dirname + '/files/group/config.js',
				modules: [{
					name: 'xy.product',
					declaration: false
				}]
			});
		});

	});

});