angular.module('xy.product')
	.service('productInitializer', function($resource) {
		this.init = function init() {
			$resource.load('/init');
		};
	});