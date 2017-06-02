'use strict';
angular.module('gestion-comics-favoritos')
	.service("modeloComicsFavoritos",["$http","$q","Constantes","Utileria",
	function($http, $q, Constantes, Utileria){
		/**
		* Consulta por un patron de busqueda los personajes.
		*/
		this.consultarPersonaje = function(patronBusqueda){
			var defered = $q.defer();
      var promise = defered.promise;
			var ts = Utileria.getFechaSistema();
			var url = Utileria.addAutenticacionUrl(Constantes.urlPersonajes,ts);
			if(patronBusqueda){
				url += "&nameStartsWith=" + patronBusqueda;
			}
			var listObjectPersonajes;
			$http.get(url)
				.success(function(data, status, headers, config) {
					defered.resolve(data.data.results);
					//listObjectPersonajes = data.data.results;
				}).error(function(data, status, header, config) {
					defered.reject(data);
					console.log("status:"+status);
					console.log("data:"+data);
				});
			return promise;
		};
	}]);
