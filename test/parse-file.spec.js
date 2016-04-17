var should = require('should');
var adapter = require('../');

describe('parseFile', function() {

	it('should be a function', function() {
		should(adapter.parseFile).be.a.Function();
	});

	it('should call back with error when given path that does not exist', function(done) {
		var path = __dirname + '/files/no-way-do-i-exist.js';
		adapter.parseFile(path, function(err, tree) {
			should(err).be.ok();
			done();
		});
	});

	describe('given path to file that exists and has valid code', function() {

		var path, actualErr, actualTree;

		beforeEach(function(done) {
			path = __dirname + '/files/simple-app.js';
			adapter.parseFile(path, function(err, tree) {
				actualErr = err;
				actualTree = tree;
				done();
			});
		});

		it('should call back without error', function() {
			should(actualErr).not.be.ok();
		});

		it('should call back with correct tree', function() {
			should(actualTree).eql([{
				moduleName: 'myApp',
				instantiation: true
			}]);
		});

	});

	describe('given path to file containing non-angular code', function() {

		var actualErr, actualTree;

		beforeEach(function(done) {
			adapter.parseFile(__dirname + '/files/vanilla.js', function(err, tree) {
				actualErr = err;
				actualTree = tree;
				done();
			});
		});

		it('should call back without error', function() {
			should(actualErr).not.be.ok();
		});

		it('should call back with empty array', function() {
			should(actualTree).eql([]);
		});

	});

	describe('given path to file containing invalid code', function() {

		var actualErr, actualTree;

		beforeEach(function(done) {
			adapter.parseFile(__dirname + '/files/incomplete.js', function(err, tree) {
				actualErr = err;
				actualTree = tree;
				done();
			});
		});

		it('should call back with error', function() {
			should(actualErr).be.ok();
		});

	});

});