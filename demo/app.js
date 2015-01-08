(function (angular) {
  'use strict';

  angular.module('myApp',
    [
      'ngAnimate',
      'vModal'
    ])

    .factory('loginModal', function (vModal) {
      return vModal({
        controller: 'LoginController',
        controllerAs: 'loginModal',
        templateUrl: 'login-modal-template.html'
      });
    })

    .factory('promoCodeModal', function (vModal) {
      return vModal({
        controller: 'PromoCodeController',
        controllerAs: 'promoCodeModal',
        templateUrl: 'promo-code-modal-template.html'
      });
    })

    .factory('infoModal', function (vModal) {
      return vModal({
        controller: 'InfoController',
        controllerAs: 'infoModal',
        templateUrl: 'info-modal-template.html'
      });
    })

    .controller('MainController', function (loginModal, infoModal, promoCodeModal) {
      var ctrl = this;

      ctrl.openLoginModal = loginModal.activate;

      ctrl.openPromoCodeModal = promoCodeModal.activate;

      ctrl.openInfoModal = infoModal.activate;
    })

    .controller('LoginController', function ($scope, loginModal) {
      var ctrl = this;

      $scope.model = {};

      ctrl.close = loginModal.deactivate;
    })

    .controller('PromoCodeController', function ($scope, promoCodeModal) {
      var ctrl = this;

      $scope.model = {};

      ctrl.close = promoCodeModal.deactivate;
    })

    .controller('InfoController', function ($scope, infoModal) {
      var ctrl = this;

      $scope.model = {};

      ctrl.close = infoModal.deactivate;
    });

})(angular);