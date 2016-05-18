(function () {
  'use strict';

  angular
    .module('songs')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'SONGS',
      state: 'songs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'songs', {
      title: 'LIST_SONGS',
      state: 'songs.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'songs', {
      title: 'CREATE_SONG',
      state: 'songs.create',
      roles: ['user']
    });
  }
})();
