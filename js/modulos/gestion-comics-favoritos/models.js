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
			var url = Utileria.addAutenticacionUrl(Constantes.URL_SERVICIO_PERSONAJES,ts);
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
		 * Consulta los comics de un personaje.
		 */
		this.consultarComicsByCharacter = function(character){
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
		/**
		 * Agregar el comic a la lista de favoritos.
		 */
		this.guardarComicFavorito = function(comic){
			var listaComicsFavoritos = $localStorage.listaFavoritos;
			if(!listaComicsFavoritos){
				listaComicsFavoritos = new Array();
			}
			if(!Utileria.existeComicInArrayOfComics(listaComicsFavoritos, comic)){
				listaComicsFavoritos.push(comic);
				$localStorage.listaFavoritos = listaComicsFavoritos;
			}else{
				return false;
			}
			return true;
		};
		/**
		 * Se seleccionan 3 comics aleatoriamente para agregarlos a favoritos.
		 */
		this.guardarTresComicsAleatorios = function(personajes){
			var defered = $q.defer();
      		var promise = defered.promise;
			var listaComicsFavoritos = $localStorage.listaFavoritos;
			if(!listaComicsFavoritos){
				listaComicsFavoritos=new Array();
			}
			if(0 == listaComicsFavoritos.length){
				var listaTempComics = new Array();
				while(3 > listaTempComics.length){
					var numeroAleatorioPersonaje = Utileria.getNumeroAleatorio(1,personajes.length);
					var personaje = personajes[numeroAleatorioPersonaje-1];
					if(0 != personaje.comics.items.length){
						var numeroAleatorioComic = Utileria.getNumeroAleatorio(1,personaje.comics.items.length);
						var comic = personaje.comics.items[numeroAleatorioComic-1];
						if(!Utileria.existeComicInArrayOfComics(listaTempComics, comic)){
							listaTempComics.push(comic);
						}
					}
				}
				var guardarComicFavoritoLocal = this.guardarComicFavorito;
				for(var i = 0 ; i < listaTempComics.length ; i++){
					this.consultarComic(listaTempComics[i])
						.then(function(data){
							defered.resolve(guardarComicFavoritoLocal(data));
						}).catch(function(err){
							console.log(err);
							defered.reject(err);
						});
				}
			}
			return promise;
		};
		/**
		 * valida si existe el comic en la lista de favoritos.
		 */
		this.existeComicEnFavoritos = function(comic){
			var listaComicsFavoritos = $localStorage.listaFavoritos;
			if(listaComicsFavoritos){
				return Utileria.existeComicInArrayOfComics(listaComicsFavoritos, comic);
			}
			return false;
		};

		/**
		 * Elimina un comic de la lista de favoritos.
		 */
		this.deleteComicFromListFavourites = function(comic){
			var listaComicsFavoritos = $localStorage.listaFavoritos;
			var positionElemento;
			for(var i = 0 ; i < listaComicsFavoritos.length ; i++){
				if(comic.id === listaComicsFavoritos[i].id){
					listaComicsFavoritos.splice(i,1);
					break;
				}
			}
			$localStorage.listaFavoritos = listaComicsFavoritos;
		};
	}]);
