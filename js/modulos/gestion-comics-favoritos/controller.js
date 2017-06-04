'use strict';

angular.module('gestion-comics-favoritos')
	.controller('consultarPersonajesController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams", "$localStorage", "modeloComicsFavoritos",
						function($scope, $log, $http, $state, $rootScope, $stateParams, $localStorage, modeloComicsFavoritos) {
							$scope.listadoPersonajes;
							$scope.consultarPersonajes = function(){
								modeloComicsFavoritos.consultarPersonajes($scope.patronConsultar)
								.then(function(data){
									modeloComicsFavoritos.guardarTresComicsAleatorios(data)
									.then(function(data){
										$scope.comicsFavoritos = $localStorage.listaFavoritos;
									})
									.catch(function(err){
										console.log(err);
									});
									$scope.comicsFavoritos = $localStorage.listaFavoritos;
									$scope.listadoPersonajes = data;

									$scope.filteredTodos = []
									$scope.totalItems = $scope.listadoPersonajes.length;
									$scope.currentPage = 1;
									$scope.numPerPage = 10;
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
							$scope.comicsFavoritos = $localStorage.listaFavoritos;
							$scope.detallarComic = function(comic){
								$state.go('detalleComic', {
									comic : comic,
									personaje: null
								});
							};
						} ])
	.controller('detallePersonajeController',
				["$scope", "$log", "$http", "$state", "$rootScope", "$stateParams","$localStorage", "$uibModal", "modeloComicsFavoritos",
						function($scope, $log, $http, $state, $rootScope, $stateParams, $localStorage, $uibModal, modeloComicsFavoritos) {
							$scope.personaje = $stateParams.personaje;
							modeloComicsFavoritos.consultarComicsByCharacter($scope.personaje)
							.then(function(data){
								$scope.comics = data;
							}).catch(function(err){
								console.log(err);
							});
							var patronBusqueda = $stateParams.patronBusqueda;
							
							$scope.agregarComoFavorito = function(comic){
								if(!modeloComicsFavoritos.guardarComicFavorito(comic)){
									alert("Este comic ya existe en favoritos");
								}
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
							$scope.comicsFavoritos = $localStorage.listaFavoritos;
							$scope.eliminarComicDeFavoritos = function(comic){
								modeloComicsFavoritos.deleteComicFromListFavourites(comic);
							}
							/**
							* abre la modal
							*/
							$scope.abrirModalDetalleComic = function (size, comic) {
								var modalInstance = $uibModal.open({
									templateUrl: 'detalle-comic',
									controller: 'detalleComicController',
									size: size,
									resolve: {
										Comic: comic
									}
								});
							};
						} ])
	.controller('detalleComicController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams", "Comic", "modeloComicsFavoritos",
						function($scope, $log, $http, $state, $rootScope, $stateParams, Comic, modeloComicsFavoritos) {
							$scope.comic = Comic;
							$scope.agregarComoFavorito = function(comic){
								if(!modeloComicsFavoritos.guardarComicFavorito(comic)){
									alert("Este comic ya existe en favoritos");
								}
							};
						} ]);
