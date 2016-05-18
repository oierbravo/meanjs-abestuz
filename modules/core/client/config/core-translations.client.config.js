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
    });
     $translateProvider.preferredLanguage('eu');
     $translateProvider.useSanitizeValueStrategy('escape');

$translateProvider.useStaticFilesLoader({
  prefix: '/languages/',
  suffix: '.json'
});
 
  }
})();
