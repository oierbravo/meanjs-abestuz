(function() {
  'use strict';

  // Core module config
  angular
    .module('core')
    .config(translateConfig);

  translateConfig.$inject = ['$translateProvider'];

  function translateConfig($translateProvider) {
    // Config logic
    // ...
   // console.log($translateProvider);
     $translateProvider.translations('eu', {
      'TITLE': 'Kaixo'
      ,'SIGN_UP': 'Kontu berria sortu',
      'SIGN_IN': 'Sartu',
      'USERNAME': 'Erabiltzailea',
      'PASSWORD': 'Pasahitza',
      'FORGOT_YOUR_PASSWORD?': 'Pasahitza ahaztu duzu?',
      'SIGN_IN_USING_YOUR_SOCIAL_ACCOUNTS': 'Sartu zure sareetako kontuarekin',
      'OR_WITH_YOUR_ACCOUNT': ' edo zure kontuarekin',
      'OR': 'edo',
      'FIRST_NAME': 'Izena',
      'LAST_NAME': 'Abizena',
      'EMAIL': 'Posta elektronikoa',
      'PASSWORD_REQUIRIMENTS': 'Pasahitzaren ezaugarriak',

      'SONG_BOOK':'Abesti liburua'


    });
     $translateProvider.preferredLanguage('eu');
     $translateProvider.useSanitizeValueStrategy('escape');

$translateProvider.registerAvailableLanguageKeys(['es','eu'], {
    'en_US': 'en',
    'en_UK': 'en'
  })
 
  }
})();
