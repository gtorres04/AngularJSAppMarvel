'use strict';

angular.module('gestion-comics-favoritos').config(["$stateProvider", "$urlRouterProvider",
		function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');
			$stateProvider.state('consultarPersonajes', {
				url : "/",
				templateUrl : "consultarPersonajes.html",
				controller : "consultarPersonajesController as findPersonajes"
			})
			.state('detallePersonaje', {
				url : "/detallePersonaje/",
				params:{personaje:null},
				templateUrl : "detallePersonaje.html",
				controller : "detallePersonajeController as detailPersonaje"
			})
			.state('detalleComic', {
				url : "/detalleComic/",
				params:{comic:null},
				templateUrl : "detalleComic.html",
				controller : "detalleComicController as detailComic"
			})
			.state('listaComicsFavoritos', {
				url : "/listaComicsFavoritos/",
				templateUrl : "listaComicsFavoritos.html",
				controller : "listaComicsFavoritosController as listFavoriteComics"
			});
		}]);
