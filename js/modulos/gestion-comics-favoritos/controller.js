'use strict';

angular.module('gestion-comics-favoritos')
	.controller('consultarPersonajesController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams", "modeloComicsFavoritos",
						function($scope, $log, $http, $state, $rootScope, $stateParams, modeloComicsFavoritos) {
							$scope.listadoPersonajes;
							$scope.consultarPersonajes = function(){
								modeloComicsFavoritos.consultarPersonajes($scope.patronConsultar)
								.then(function(data){
									$scope.listadoPersonajes = data;
								}).catch(function(err){
									console.log(err);
								});
							}
							$scope.detallarPersonaje = function(personaje){
								$state.go('detallePersonaje', {
									personaje : personaje,
									patronBusqueda : $scope.patronConsultar
								});
							}
							if(null != $stateParams.patronBusqueda){
								$scope.patronConsultar = $stateParams.patronBusqueda;
								$scope.consultarPersonajes();
							}
						} ])
	.controller('detallePersonajeController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams",
						function($scope, $log, $http, $state, $rootScope, $stateParams) {
							$scope.personaje = $stateParams.personaje;
							var patronBusqueda=$stateParams.patronBusqueda;
							$scope.agregarComoFavorito = function(comic){
								alert("agregando a Favorito");
							};
							$scope.detallarComic = function(comic){
								$state.go('detalleComic', {
									comic : comic,
									personaje: $scope.personaje
								});
							};
							$scope.volverListadoPersonajes = function(){
								$state.go('consultarPersonajes', {
									patronBusqueda : patronBusqueda
								});
							};
						} ])
	.controller('detalleComicController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams", "modeloComicsFavoritos",
						function($scope, $log, $http, $state, $rootScope, $stateParams, modeloComicsFavoritos) {
							$scope.comic = $stateParams.comic;
							var personaje = $stateParams.personaje;
							modeloComicsFavoritos.consultarComic($scope.comic)
							.then(function(data){
								$scope.comic = data;
							}).catch(function(err){
								console.log(err);
							});
							$scope.volverPersonaje = function(){
								$state.go('detallePersonaje', {
									personaje : personaje
								});
							};
						} ])
	.controller('listaComicsFavoritosController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams",
						function($scope, $log, $http, $state, $rootScope, $stateParams) {

						} ]);
