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
									$scope.filteredTodos = [], $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;
									$scope.numPages = function () {
										return Math.ceil($scope.listadoPersonajes.length / $scope.numPerPage);
									};
									
									$scope.$watch('currentPage + numPerPage', function() {
										var begin = (($scope.currentPage - 1) * $scope.numPerPage)
										, end = begin + $scope.numPerPage;
										
										$scope.filteredTodos = $scope.listadoPersonajes.slice(begin, end);
									});
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
							$scope.verFavoritos = function(){
								$state.go('listaComicsFavoritos');
							};
							if(null != $stateParams.patronBusqueda){
								$scope.patronConsultar = $stateParams.patronBusqueda;
								$scope.consultarPersonajes();
							}
						} ])
	.controller('detallePersonajeController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams","$localStorage", "modeloComicsFavoritos",
						function($scope, $log, $http, $state, $rootScope, $stateParams, $localStorage, modeloComicsFavoritos) {
							$scope.personaje = $stateParams.personaje;
							var patronBusqueda = $stateParams.patronBusqueda;
							
							$scope.agregarComoFavorito = function(comic){
								modeloComicsFavoritos.guardarComicFavorito(comic);
							};
							
							$scope.isFavorito = function(comic){
								return modeloComicsFavoritos.existeComicEnFavoritos(comic);
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
							var fromFavoritos=false;
							if(null == personaje){
								fromFavoritos = true;
							}else{
								fromFavoritos = false;
							}
							$scope.fromFavoritos = fromFavoritos;
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
							$scope.volverFavoritos = function(){
								$state.go('listaComicsFavoritos');
							};
						} ])
	.controller('listaComicsFavoritosController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams", "$localStorage",
						function($scope, $log, $http, $state, $rootScope, $stateParams, $localStorage) {
							$scope.comicsFavoritos = $localStorage.listaFavoritos;
							$scope.detallarComic = function(comic){
								$state.go('detalleComic', {
									comic : comic,
									personaje: null
								});
							};
							$scope.volverListadoPersonajes = function(){
								$state.go('consultarPersonajes', {
									patronBusqueda : null
								});
							};
						} ]);
