'use strict';
angular.module('gestion-comics-favoritos')
	.service("ComicFavoritoModel",["$http", "$q", "$localStorage", "Utileria",
	function($http, $q, $localStorage, Utileria){
		/**
		 * Consulta el detalle de un comic.
		 */
		this.findById = function(comic){
			var comicFound;
			if(comic){
				var listaFavoritos = $localStorage.listaFavoritos;
				for (var i = 0; i < listaFavoritos.length; i++) {
					if(comic.id === listaFavoritos[i].id){
						comicFound = listaFavoritos[i];
						break;
					}
				}
			}
			return comicFound;
		};
		/**
		 * Consulta todos los comic favoritos.
		 */
		this.findAll = function(comic){
			return $localStorage.listaFavoritos;
		};
		/**
		 * Agregar el comic a la lista de favoritos.
		 */
		this.create = function(comic){
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
		 * Elimina un comic de la lista de favoritos.
		 */
		this.delete = function(comic){
			var listaComicsFavoritos = $localStorage.listaFavoritos;
			var positionElemento;
			for(var i = 0 ; i < listaComicsFavoritos.length ; i++){
				if(comic.id === listaComicsFavoritos[i].id){
					listaComicsFavoritos.splice(i,1);
					$localStorage.listaFavoritos = listaComicsFavoritos;
					return true;
				}
			}
			return false;
		};
	}]);
