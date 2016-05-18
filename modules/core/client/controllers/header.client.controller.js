(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService','$translate'];

  function HeaderController($scope, $state, Authentication, menuService,$translate) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
    $scope.currentLanguage = $translate.proposedLanguage();
    $scope.languages = $translate.getAvailableLanguageKeys();
    $scope.changeLanguage = function(langKey){
      $translate.use(langKey);
      $scope.currentLanguage = langKey;
    }
  }
}());
