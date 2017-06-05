'use strict';
angular.module('gestion-comics-favoritos')
	.service("CharacterService",["$q","CharacterModel",
	function($q, CharacterModel){
		/**
		 * Consulta los personajes que coincidan con el
		 * inicio de la cadena recibida por parametro. Si
		 * "initName" es undefined consulta todos los personajes.
		 */
		this.findByNameStartsWith = function(initName){
			var defered = $q.defer();
      var promise = defered.promise;
			if(initName){
				CharacterModel.findByNameStartsWith(initName)
					.then(function(data){
						defered.resolve(data);
					}).catch(function(err){
						console.log(err);
					});
			}else{
				CharacterModel.findAll()
					.then(function(data){
						defered.resolve(data);
					}).catch(function(err){
						console.log(err);
					});
			}
			return promise;
		};
	}]);
