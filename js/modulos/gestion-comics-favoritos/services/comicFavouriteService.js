'use strict';
angular.module('gestion-comics-favoritos')
	.service("ComicFavoritoService",["$q", "ComicService", "ComicFavoritoModel", "Utileria",
	function($q, ComicService,  ComicFavoritoModel, Utileria){
		/**
		 * Consulta todos los comic favoritos.
		 */
		this.findAll = function(comic){
			return ComicFavoritoModel.findAll();
		};
		/**
		 * Agregar el comic a la lista de favoritos.
		 */
		this.create = function(comic){
			return ComicFavoritoModel.create(comic);
		};

		/**
		 * Elimina un comic de la lista de favoritos.
		 */
		this.delete = function(comic){
			return ComicFavoritoModel.delete(comic);
		};

		/**
		 * valida si existe el comic en la lista de favoritos.
		 */
		this.existsComicInFavourites = function(comic){
			var listaComicsFavoritos = ComicFavoritoModel.findAll();
			if(listaComicsFavoritos){
				return Utileria.existeComicInArrayOfComics(listaComicsFavoritos, comic);
			}
			return false;
		};

		/**
		 * Se crea un comic favorito aleatorio a partir de una lista de comics.
		 */
		this.createComicFavoriteRandomFromListComics = function(listComics){
			var defered = $q.defer();
      var promise = defered.promise;
			var comic = Utileria.getObjectRandomFromListObjects(listComics);
			var referenciaMetodoCreateService = this.create;
			ComicService.findByResourceURI(comic)
				.then(function(data){
					defered.resolve(referenciaMetodoCreateService(data));
				}).catch(function(err){
					console.log(err);
					defered.reject(err);
				});
			return promise;
		}
		/**
		 * Se seleccionan 3 comics aleatoriamente para agregarlos a favoritos.
		 */
		/*this.createThreeComicsFavouritesRandomFromListCharacters = function(personajes){
			var defered = $q.defer();
      var promise = defered.promise;
			var cantidadAgregados = 0;
			while(3 > cantidadAgregados){
				var personaje = Utileria.getObjectRandomFromListObjects(personajes);
				if(0 != personaje.comics.items.length){
					this.createComicFavoriteRandomFromListComics(personaje.comics.items)
						.then(function(data){
							if(data){
								cantidadAgregados++;
							}
							defered.resolve(data);
						}).catch(function(err){
							console.log(err);
							defered.reject(err);
						});
				}
			}
			return promise;
		};*/
		/**
		 * Se seleccionan 3 comics aleatoriamente para agregarlos a favoritos.
		 */
		this.createThreeComicsFavouritesRandomFromListCharacters = function(personajes){
			var defered = $q.defer();
      var promise = defered.promise;
			var listaComicsFavoritos = this.findAll();
			if(!listaComicsFavoritos){
				listaComicsFavoritos = new Array();
			}
			if(0 == listaComicsFavoritos.length){
				var listaTempComics = new Array();
				while(3 > listaTempComics.length){
					var personaje = Utileria.getObjectRandomFromListObjects(personajes);
					if(0 != personaje.comics.items.length){
						var comic = Utileria.getObjectRandomFromListObjects(personaje.comics.items);
						if(!Utileria.existeComicInArrayOfComics(listaTempComics, comic)){
							listaTempComics.push(comic);
						}
					}
				}
				var referenciaMetodoCreateService = this.create;
				for(var i = 0 ; i < listaTempComics.length ; i++){
					ComicService.findByResourceURI(listaTempComics[i])
						.then(function(data){
							defered.resolve(referenciaMetodoCreateService(data));
						}).catch(function(err){
							console.log(err);
							defered.reject(err);
						});
				}
			}
			return promise;
		};
	}]);
