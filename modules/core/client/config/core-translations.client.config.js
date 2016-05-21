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
     /* ,'SIGN_UP':
      'SIGN_IN':
      'USERNAME':
      'PASSWORD':
      'FORGOT_YOUR_PASSWORD?':
      'SIGN_IN_USING_YOUR_SOCIAL_ACCOUNTS':
      'OR_WITH_YOUR_ACCOUNT':
      'OR':
      'FIRST_NAME':
      'LAST_NAME':
      'EMAIL':
      'USERNAME':
      'PASSWORD':
      'PASSWORD_REQUIRIMENTS'*/


    });
     $translateProvider.preferredLanguage('eu');
     $translateProvider.useSanitizeValueStrategy('escape');

$translateProvider.registerAvailableLanguageKeys(['es','eu'], {
    'en_US': 'en',
    'en_UK': 'en'
  })
 
  }
})();
