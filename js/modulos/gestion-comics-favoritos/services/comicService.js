'use strict';
angular.module('gestion-comics-favoritos')
	.service("ComicService",["$q", "ComicModel",
	function($q, ComicModel){
		/**
		 * Consulta el detalle de un comic teniendo en cuenta el atributo resourceURI.
		 */
		this.findByResourceURI = function(comic){
			var defered = $q.defer();
  		var promise = defered.promise;
			ComicModel.findByResourceURI(comic)
				.then(function(data){
					defered.resolve(data);
				}).catch(function(err){
					console.log(err);
				});
			return promise;
		};
		/**
		 * Consulta los comics de un personaje.
		 */
		this.findByCharacter = function(character){
			var defered = $q.defer();
      var promise = defered.promise;
			ComicModel.findByCharacter(character)
				.then(function(data){
					defered.resolve(data);
				}).catch(function(err){
					console.log(err);
				});
			return promise;
		};
	}]);
