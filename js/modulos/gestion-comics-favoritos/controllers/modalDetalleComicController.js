'use strict';

angular.module('gestion-comics-favoritos')
	.controller('detalleComicController',
				["$scope", "$state",	"$rootScope", "$stateParams","$uibModalInstance", "Comic","ComicFavoritoService",
						function($scope, $state, $rootScope, $stateParams, $uibModalInstance, Comic,ComicFavoritoService) {
							$scope.comic = Comic;
							$scope.agregarComoFavorito = function(comic){
								if(!ComicFavoritoService.create(comic)){
									alert("Este comic ya existe en favoritos");
								}
							};
							$scope.isFavorito = function(comic){
								return ComicFavoritoService.existsComicInFavourites(comic);
							};
							$scope.cerrarModal = function(){
								$uibModalInstance.close();
							}

						} ]);
