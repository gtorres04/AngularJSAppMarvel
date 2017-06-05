'use strict';
angular.module('gestion-comics-favoritos')
	.service("ComicModel",["$http", "$q", "Utileria",
	function($http, $q, Utileria){
		/**
		 * Consulta el detalle de un comic teniendo en cuenta el atributo resourceURI.
		 */
		this.findByResourceURI = function(comic){
			var defered = $q.defer();
  		var promise = defered.promise;
			var ts = Utileria.getFechaSistema();
			var url = Utileria.addAutenticacionUrl(comic.resourceURI,ts);
			$http.get(url)
				.success(function(data, status, headers, config) {
					defered.resolve(data.data.results[0]);
				}).error(function(data, status, header, config) {
					defered.reject(data);
					console.log("status:"+status);
					console.log("data:"+data);
				});
			return promise;
		};
		/**
		 * Consulta los comics de un personaje.
		 */
		this.findByCharacter = function(character){
			var defered = $q.defer();
      		var promise = defered.promise;
			var ts = Utileria.getFechaSistema();
			var url = Utileria.addAutenticacionUrl(character.comics.collectionURI, ts);
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
