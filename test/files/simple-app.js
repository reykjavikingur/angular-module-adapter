angular.module("myApp", [])
	.run(function() {
		console.log("starting")
	})
	.service("appService", function($resource) {
		this.load = function() {
			$resource.load()
		}
	})