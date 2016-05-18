(function() {
  'use strict';

  // Core module config
  angular
    .module('songs')
    .config(translateConfig);

  translateConfig.$inject = ['$translateProvider'];

  function translateConfig($translateProvider) {
    // Config logic
    // ...
   // console.log($translateProvider);
     $translateProvider.translations('eu', {
      'SONGS': 'Abestiak',
      'LIST_SONGS': 'Abesti zerrenda',
      'CREATE_SONG': 'Abesti berria',
      'NAME': 'Izena',
      'ARTIST': 'Artista',
      'LYRICS' : 'Letra',
      'CHORDS': 'Akordeak',
      'CREATE': 'Gorde',
      'UPDATE': 'Eguneratu',
      'NEW_SONG': 'Abesti berria',
      'EDIT_SONG': 'Abestia editatu'
      
    });
      $translateProvider.translations('es', {
      'SONGS': 'Canciones',
      'LIST_SONGS': 'Lista de canciones',
      'CREATE_SONG': 'Nueva cancion',
      'NAME': 'Nombre',
      'ARTIST': 'Artista',
      'LYRICS' : 'Letra',
      'CHORDS': 'Acordes',
      'CREATE': 'Guardar',
      'UPDATE': 'Actualizar',
      'NEW_SONG': 'Nueva cancion',
      'EDIT_SONG': 'Editar cancion'
      
    });
  //   $translateProvider.preferredLanguage('en');
  }
})();
