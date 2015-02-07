(function (angular) {
  'use strict';

  angular.module('myApp',
    [
      'ngAnimate',
      'vModal'
    ])

    .config(function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    })


    .factory('loginModal', function (vModal) {
      return vModal({
        controller: 'LoginController',
        controllerAs: 'loginModal',
        templateUrl: 'login-modal-template.html'
      });
    })

    .factory('infoModal', function (vModal) {
      return vModal({
        controller: 'InfoController',
        controllerAs: 'infoModal',
        templateUrl: 'info-modal-template.html'
      });
    })

    .factory('loremModal', function (vModal) {
      return vModal({
        controller: 'LoremController',
        controllerAs: 'loremModal',
        templateUrl: 'lorem-modal-template.html'
      });
    })


    .controller('LoginController', function ($scope, loginModal) {
      var ctrl = this;

      $scope.model = {};

      ctrl.close = loginModal.deactivate;
    })

    .controller('InfoController', function ($scope, infoModal) {
      var ctrl = this;

      ctrl.close = infoModal.deactivate;
    })

    .controller('LoremController', function ($scope, loremModal) {
      var ctrl = this;

      ctrl.close = loremModal.deactivate;
    })


    .controller('MainController', function (loginModal, infoModal, loremModal) {
      var ctrl = this;

      ctrl.openLoginModal = loginModal.activate;
      ctrl.openInfoModal = infoModal.activate;
      ctrl.openLoremModal = loremModal.activate;
    });

})(angular);