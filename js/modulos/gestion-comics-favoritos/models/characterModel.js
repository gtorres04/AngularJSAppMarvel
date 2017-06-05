'use strict';
angular.module('gestion-comics-favoritos')
	.service("CharacterModel",["$http", "$q", "Constantes", "Utileria",
	function($http, $q, Constantes, Utileria){
		/**
		 * Consulta los personajes que coincidan con el inicio de la cadena recibida por parametro.
		 */
		this.findByNameStartsWith = function(initName){
			var defered = $q.defer();
      		var promise = defered.promise;
			var ts = Utileria.getFechaSistema();
			var url = Utileria.addAutenticacionUrl(Constantes.URL_SERVICIO_PERSONAJES,ts);
			url += "&nameStartsWith=" + initName;
			var listObjectPersonajes;
			$http.get(url)
				.success(function(data, status, headers, config) {
					defered.resolve(data.data.results);
				}).error(function(data, status, header, config) {
					defered.reject(data);
					console.log("status:"+status);
					console.log("data:"+data);
				});
			return promise;
		};
		/**
		 * Consulta todos los personajes del servicio.
		 */
		this.findAll = function(){
			var defered = $q.defer();
      var promise = defered.promise;
			var ts = Utileria.getFechaSistema();
			var url = Utileria.addAutenticacionUrl(Constantes.URL_SERVICIO_PERSONAJES,ts);
			var listObjectPersonajes;
			$http.get(url)
				.success(function(data, status, headers, config) {
					defered.resolve(data.data.results);
				}).error(function(data, status, header, config) {
					defered.reject(data);
					console.log("status:"+status);
					console.log("data:"+data);
				});
			return promise;
		};
	}]);
