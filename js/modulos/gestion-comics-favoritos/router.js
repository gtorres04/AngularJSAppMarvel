'use strict';

angular.module('gestion-comics-favoritos').config(["$stateProvider", "$urlRouterProvider",
		function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');
			$stateProvider.state('consultarPersonajes', {
				url : "/",
				params:{patronBusqueda : null},
				templateUrl : "consultarPersonajes.html",
				controller : "consultarPersonajesController as findPersonajes"
			})
			.state('detallePersonaje', {
				url : "/detallePersonaje/",
				params:{personaje : null, patronBusqueda : null},
				templateUrl : "detallePersonaje.html",
				controller : "detallePersonajeController as detailPersonaje"
			});
		}]);
