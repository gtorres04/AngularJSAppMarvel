'use strict';

angular.module('gestion-comics-favoritos')
	.controller('consultarPersonajesController',
				["$scope", "$state",	"$rootScope", "$stateParams", "$uibModal", "CharacterService", "ComicFavoritoService",
						function($scope, $state, $rootScope, $stateParams, $uibModal, CharacterService, ComicFavoritoService) {
							$scope.listadoPersonajes;
							$scope.registrosEncontrados=false;
							$scope.consultarPersonajes = function(){
								$scope.filteredTodos=undefined;
								$scope.consultandoPersonajes=true;
								$scope.registrosEncontrados=false;
								CharacterService.findByNameStartsWith($scope.patronConsultar)
								.then(function(data){
									$scope.consultandoPersonajes=false;
									if(0 == data.length){
										$scope.registrosEncontrados=true;
									}else{
										ComicFavoritoService.createThreeComicsFavouritesRandomFromListCharacters(data)
										.then(function(data){
											$scope.comicsFavoritos = ComicFavoritoService.findAll();
										})
										.catch(function(err){
											console.log(err);
										});
										$scope.comicsFavoritos = ComicFavoritoService.findAll();
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
									}

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
							$scope.comicsFavoritos = ComicFavoritoService.findAll();
							$scope.detallarComic = function(comic){
								$state.go('detalleComic', {
									comic : comic,
									personaje: null
								});
							};
							$scope.eliminarComicDeFavoritos = function(comic){
								ComicFavoritoService.delete(comic);
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
						} ]);
