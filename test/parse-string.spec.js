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

		var string, tree;

		beforeEach(function() {
			string = [
				'angular.module("foo", [])'
			].join('');
			tree = adapter.parseString(string);
		});

		it('should return an array', function() {
			should(tree).be.an.Array();
		});

		it('should put one item in the array', function() {
			should(tree.length).eql(1);
		});

		it('should set the correct module name', function() {
			should(tree[0].moduleName).eql('foo');
		});

		it('should set instantiation to true', function() {
			should(tree[0].instantiation).eql(true);
		});

	});

	describe('given string with one angular service definition', function() {

		var string, tree;

		beforeEach(function() {
			string = [
				'angular.module("foo").service("thing", function() {})'
			].join('');
			tree = adapter.parseString(string);
		});

		it('should return an Array with one item', function() {
			should(tree.length).eql(1);
		});

		it('should set the correct module name', function() {
			should(tree[0].moduleName).eql('foo');
		});

		it('should set instantiation to false', function() {
			should(tree[0].instantiation).eql(false);
		});

	});

	describe('given string with one angular module declaration and attached definitions', function() {

		var string, tree;

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
			tree = adapter.parseString(string);
		});

		it('should return the correct tree', function() {
			should(tree).eql([{
				moduleName: 'myApp',
				instantiation: true
			}]);
		});

	});

	describe('given string with two angular module declarations', function() {

		var string, tree;

		beforeEach(function() {
			string = [
				'angular.module("foo", []);',
				'angular.module("bar", []);'
			].join('\n');
			tree = adapter.parseString(string);
		});

		it('should return array with two items', function() {
			should(tree.length).eql(2);
		});

		it('should set first item to correct values', function() {
			should(tree[0]).eql({
				moduleName: 'foo',
				instantiation: true
			});
		});

		it('should set second item to correct value', function() {
			should(tree[1]).eql({
				moduleName: 'bar',
				instantiation: true
			});
		});

	});

});