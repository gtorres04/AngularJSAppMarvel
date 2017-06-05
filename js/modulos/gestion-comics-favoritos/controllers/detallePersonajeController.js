'use strict';

angular.module('gestion-comics-favoritos')
	.controller('detallePersonajeController',
				["$scope", "$state", "$rootScope", "$stateParams", "$uibModal","ComicService","ComicFavoritoService",
						function($scope, $state, $rootScope, $stateParams, $uibModal,ComicService,ComicFavoritoService) {
							$scope.personaje = $stateParams.personaje;
							$scope.consultandoPersonajes=true;
							$scope.registrosEncontrados=false;
							ComicService.findByCharacter($scope.personaje)
							.then(function(data){
								$scope.consultandoPersonajes=false;
								if(0 == data.length){
									$scope.registrosEncontrados=true;
								}else{
									$scope.comics = data;
								}
							}).catch(function(err){
								console.log(err);
							});
							var patronBusqueda = $stateParams.patronBusqueda;

							$scope.agregarComoFavorito = function(comic){
								if(!ComicFavoritoService.create(comic)){
									alert("Este comic ya existe en favoritos");
								}
							};

							$scope.isFavorito = function(comic){
								return ComicFavoritoService.existsComicInFavourites(comic);
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
							$scope.comicsFavoritos = ComicFavoritoService.findAll();
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
