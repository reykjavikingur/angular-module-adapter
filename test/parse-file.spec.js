var should = require('should');
var adapter = require('../');

describe('parseFile', function() {

	it('should be a function', function() {
		should(adapter.parseFile).be.a.Function();
	});

	it('should call back with error when given path that does not exist', function(done) {
		var path = __dirname + '/files/no-way-do-i-exist.js';
		adapter.parseFile(path, function(err, modules) {
			should(err).be.ok();
			done();
		});
	});

	describe('given path to file that exists and has valid code', function() {

		var path, actualErr, actualModules;

		beforeEach(function(done) {
			path = __dirname + '/files/simple-app.js';
			adapter.parseFile(path, function(err, modules) {
				actualErr = err;
				actualModules = modules;
				done();
			});
		});

		it('should call back without error', function() {
			should(actualErr).not.be.ok();
		});

		it('should call back with correct modules', function() {
			should(actualModules).eql([{
				name: 'myApp',
				declaration: true
			}]);
		});

	});

	describe('given path to file containing non-angular code', function() {

		var actualErr, actualModules;

		beforeEach(function(done) {
			adapter.parseFile(__dirname + '/files/vanilla.js', function(err, modules) {
				actualErr = err;
				actualModules = modules;
				done();
			});
		});

		it('should call back without error', function() {
			should(actualErr).not.be.ok();
		});

		it('should call back with empty array', function() {
			should(actualModules).eql([]);
		});

	});

	describe('given path to file containing invalid code', function() {

		var actualErr, actualModules;

		beforeEach(function(done) {
			adapter.parseFile(__dirname + '/files/incomplete.js', function(err, modules) {
				actualErr = err;
				actualModules = modules;
				done();
			});
		});

		it('should call back with error', function() {
			should(actualErr).be.ok();
		});

	});

});