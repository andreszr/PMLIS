var pmlis = angular.module('pmlis');

pmlis.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/login');
	$stateProvider
	.state("login", {
		url: "/login",
		templateUrl: "templates/login.html"
	})
	$stateProvider
	.state("prestamo", {
		url: "/prestamo",
		templateUrl: "templates/prestamos.html"
	})
	$stateProvider
	.state("historial", {
		url: "/historial",
		templateUrl: "templates/historial.html"
	})
}]);
