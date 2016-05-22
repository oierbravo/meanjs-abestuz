(function () {
  'use strict';

  angular
    .module('songs')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('songs', {
        abstract: true,
        url: '/songs',
        template: '<ui-view/>'
      })
      .state('songs.list', {
        url: '',
        templateUrl: 'modules/songs/client/views/list-songs.client.view.html',
        controller: 'SongsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'SONGS_LIST'
        }
      })
      .state('songs.create', {
        url: '/create',
        templateUrl: 'modules/songs/client/views/form-song.client.view.html',
        controller: 'SongsController',
        controllerAs: 'vm',
        resolve: {
          songResolve: newSong
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'SONGS_CREATE'
        }
      })
      .state('songs.edit', {
        url: '/:songId/edit',
        templateUrl: 'modules/songs/client/views/form-song.client.view.html',
        controller: 'SongsController',
        controllerAs: 'vm',
        resolve: {
          songResolve: getSong
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'EDIT_SONG {{ songResolve.name }}'
        }
      })
      .state('songs.view', {
        url: '/:songId',
        templateUrl: 'modules/songs/client/views/view-song.client.view.html',
        controller: 'SongsController',
        controllerAs: 'vm',
        resolve: {
          songResolve: getSong
        },
        data:{
          pageTitle: 'SONG {{ articleResolve.name }}'
        }
      });
  }

  getSong.$inject = ['$stateParams', 'SongsService'];

  function getSong($stateParams, SongsService) {
    return SongsService.get({
      songId: $stateParams.songId
    }).$promise;
  }

  newSong.$inject = ['SongsService'];

  function newSong(SongsService) {
    return new SongsService();
  }
})();
