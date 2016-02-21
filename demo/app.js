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

      ctrl.close = loginModal.deactivate;
    })

    .controller('LoremController', function ($scope, loremModal) {
      var ctrl = this;

      ctrl.close = loremModal.deactivate;
    })

    .controller('InfoController', function ($scope, infoModal) {
      var ctrl = this;

      ctrl.close = infoModal.deactivate;
    })


    .controller('MainController', function (loginModal, infoModal, loremModal) {
      var ctrl = this;

      var lorem = {
        title: 'Lorem ipsum',
        content: 'Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non, consectetuer lobortis quis, varius in, purus. Integer ultrices posuere cubilia Curae, Nulla ipsum dolor lacus, suscipit adipiscing. Cum sociis natoque penatibus et ultrices volutpat. Nullam wisi ultricies a, gravida vitae, dapibus risus ante sodales lectus blandit eu, tempor diam pede cursus vitae, ultricies eu, faucibus quis, porttitor eros cursus lectus, pellentesque eget, bibendum a, gravida ullamcorper quam. Nullam viverra consectetuer. Quisque cursus et, porttitor risus. Aliquam sem. In hendrerit nulla quam nunc, accumsan congue.'
      };

      ctrl.openLoginModal = loginModal.activate;
      ctrl.openInfoModal = infoModal.activate;

      // Add params to the modal $scope
      ctrl.openLoremModal = function () {
        loremModal.activate(lorem);
      };
    });

})(angular);
