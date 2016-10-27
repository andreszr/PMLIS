var pmlis = angular.module('pmlis');

pmlis.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/login');
	$stateProvider
	.state("login", {
		url: "/login",
		templateUrl: "templates/login.html"
	})
	$stateProvider
	.state("prestamo", {
		url: "/prestamo",
		templateUrl: "templates/login.html"
	})
	$stateProvider
	.state("historial", {
		url: "/historial",
		templateUrl: "templates/login.html"
	})
});
