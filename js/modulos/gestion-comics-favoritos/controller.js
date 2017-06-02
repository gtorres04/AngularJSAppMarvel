'use strict';

angular.module('gestion-comics-favoritos')
	.controller('consultarPersonajesController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams", "modeloComicsFavoritos",
						function($scope, $log, $http, $state, $rootScope, $stateParams, modeloComicsFavoritos) {
							$scope.listadoPersonajes;
							$scope.consultarPersonaje = function(){
								modeloComicsFavoritos.consultarPersonaje($scope.patronConsultar)
								.then(function(data){
									$scope.listadoPersonajes = data;
								}).catch(function(err){
									console.log(err);
								});
							}
							$scope.detallarPersonaje = function(personaje){
								$state.go('detallePersonaje', {
									personaje : personaje
								});
							}
						} ])
	.controller('detallePersonajeController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams",
						function($scope, $log, $http, $state, $rootScope, $stateParams) {
							var personaje = $stateParams.personaje;
							$scope.nombrePersonaje = personaje.name;
						} ])
	.controller('detalleComicController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams",
						function($scope, $log, $http, $state, $rootScope, $stateParams) {

						} ])
	.controller('listaComicsFavoritosController',
				["$scope", "$log", "$http", "$state",	"$rootScope", "$stateParams",
						function($scope, $log, $http, $state, $rootScope, $stateParams) {

						} ]);
