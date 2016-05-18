//Songs service used to communicate Songs REST endpoints
(function () {
  'use strict';

  angular
    .module('songs')
    .factory('SongsService', SongsService);

  SongsService.$inject = ['$resource'];

  function SongsService($resource) {
    return $resource('api/songs/:songId', {
      songId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
