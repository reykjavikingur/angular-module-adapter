var adapter = require('../');
var should = require('should');

describe('parseString', function() {

	it('should be a function', function() {
		should(adapter.parseString).be.a.Function();
	});

	it('should return empty array when given empty string', function() {
		should(adapter.parseString('')).eql([]);
	});

	it('should return empty array when given string without angular definition', function() {
		var string = 'function foo(y) { return x + y }';
		should(adapter.parseString(string)).eql([]);
	});

	describe('given string with one angular module declaration', function() {

		var string, modules;

		beforeEach(function() {
			string = [
				'angular.module("foo", [])'
			].join('');
			modules = adapter.parseString(string);
		});

		it('should return an array', function() {
			should(modules).be.an.Array();
		});

		it('should put one item in the array', function() {
			should(modules.length).eql(1);
		});

		it('should set the correct module name', function() {
			should(modules[0].name).eql('foo');
		});

		it('should set declaration to true', function() {
			should(modules[0].declaration).eql(true);
		});

	});

	describe('given string with one angular service definition', function() {

		var string, modules;

		beforeEach(function() {
			string = [
				'angular.module("foo").service("thing", function() {})'
			].join('');
			modules = adapter.parseString(string);
		});

		it('should return an Array with one item', function() {
			should(modules.length).eql(1);
		});

		it('should set the correct module name', function() {
			should(modules[0].name).eql('foo');
		});

		it('should set declaration to false', function() {
			should(modules[0].declaration).eql(false);
		});

	});

	describe('given string with one angular module declaration and attached definitions', function() {

		var string, modules;

		beforeEach(function() {
			string = [
				'angular.module("myApp", [])',
				'.run(function() {',
				'  console.log("starting")',
				'})',
				'.service("appService", function($resource) {',
				'  this.load = function() {',
				'    $resource.load()',
				'  }',
				'})',
			].join('\n');
			modules = adapter.parseString(string);
		});

		it('should return the correct modules', function() {
			should(modules).eql([{
				name: 'myApp',
				declaration: true
			}]);
		});

	});

	describe('given string with two angular module declarations', function() {

		var string, modules;

		beforeEach(function() {
			string = [
				'angular.module("foo", []);',
				'angular.module("bar", []);'
			].join('\n');
			modules = adapter.parseString(string);
		});

		it('should return array with two items', function() {
			should(modules.length).eql(2);
		});

		it('should set first item to correct values', function() {
			should(modules[0]).eql({
				name: 'foo',
				declaration: true
			});
		});

		it('should set second item to correct value', function() {
			should(modules[1]).eql({
				name: 'bar',
				declaration: true
			});
		});

	});

});