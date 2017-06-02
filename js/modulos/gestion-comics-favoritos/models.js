'use strict';
angular.module('gestion-comics-favoritos')
	.service("modeloComicsFavoritos",["$http","$q", "$localStorage","Constantes","Utileria",
	function($http, $q, $localStorage, Constantes, Utileria){
		/**
		 * Consulta por un patron de busqueda los personajes.
		 */
		this.consultarPersonajes = function(patronBusqueda){
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
				}).error(function(data, status, header, config) {
					defered.reject(data);
					console.log("status:"+status);
					console.log("data:"+data);
				});
			return promise;
		};
		/**
		 * Consulta el detalle de un comic.
		 */
		this.consultarComic = function(comic){
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
		 * Agregar el comic a la lista de favoritos.
		 */
		this.guardarComicFavorito = function(comic){
			var listaComicsFavoritos = $localStorage.listaFavoritos;
			if(!listaComicsFavoritos){
				listaComicsFavoritos = new Array();
			}
			if(!this.existeComicEnFavoritos(comic)){
				listaComicsFavoritos.push(comic);
				$localStorage.listaFavoritos = listaComicsFavoritos;
			}else{
				alert("El comic ya existe como favorito");
			}
			
		};

		/**
		 * valida si existe el comic en la lista de favoritos.
		 */
		this.existeComicEnFavoritos = function(comic){
			var listaComicsFavoritos = $localStorage.listaFavoritos;
			if(listaComicsFavoritos){
				for(var i = 0 ; i < listaComicsFavoritos.length ; i++){
					if(listaComicsFavoritos[i].resourceURI===comic.resourceURI){
						return true;
					}
				}
			}
			return false;
		}
	}]);
