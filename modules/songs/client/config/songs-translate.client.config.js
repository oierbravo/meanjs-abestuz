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
            'Songs': 'Abestiak',
      'List Songs': 'Abesti zerrenda',
      'Create Song': 'Abesti berria'
      
    });
  //   $translateProvider.preferredLanguage('en');
  }
})();
