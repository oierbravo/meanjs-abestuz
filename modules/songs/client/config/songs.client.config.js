(function () {
  'use strict';

  angular
    .module('songs')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Songs',
      state: 'songs',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'songs', {
      title: 'List Songs',
      state: 'songs.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'songs', {
      title: 'Create Song',
      state: 'songs.create',
      roles: ['user']
    });
  }
})();
