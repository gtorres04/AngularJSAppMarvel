'use strict';
angular.module('gestion-comics-favoritos')
	.value("Constantes",
		{
			"URL_SERVICIO_PERSONAJES": "https://gateway.marvel.com:443/v1/public/characters"
		})
	.value("Utileria",
	{
		getFechaSistema : function(){
			var d=new Date();
			var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
			return datestring;
		},
		addAutenticacionUrl : function(url, ts){
			url += "?apikey=a3583bee65f9d9b86823aede6a2e3c0c"
			url += "&ts=" + ts.replace(" ", "");
			var hash = ts + "af0cd8a70f0403e3e0537fbe11d4a07fc57c0809" + "a3583bee65f9d9b86823aede6a2e3c0c";
			hash = CryptoJS.MD5(hash);
			url += "&hash=" + hash;
			return url;
		},
		getNumeroAleatorio : function(desde, hasta){
			return Math.floor((Math.random() * hasta) + desde);
		},
		existeComicInArrayOfComics : function(array, object){
			for(var i = 0 ; i < array.length ; i++){
				if(object.resourceURI == array[i].resourceURI){
					return true;
				}
			}
			return false;
		},
		getObjectRandomFromListObjects : function(listObject){
			var numeroAleatorioObject = Math.floor((Math.random() * listObject.length) + 1);
			var object = listObject[numeroAleatorioObject - 1];
			return object;
		}
	});
