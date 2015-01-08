

// vModal directive
angular.module('vModal.directives')
  .directive('vModal', vModalDirective);


function vModalDirective (modalConfig) {
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    template: '<div ng-click="modalCtrl.close($event)" ng-transclude></div>',
    controller: vModalDirectiveController,
    controllerAs: 'modalCtrl',
    scope: {
      close: '&?'
    },
    compile: function (tElement, tAttrs) {
      tElement.addClass(modalConfig.classes.modal);

      return function postLink (scope, iElement, iAttrs) {
        scope.hasClose = angular.isDefined(iAttrs.close);
      };
    }
  };
}
vModalDirective.$inject = ['modalConfig'];


// vModal directive controller
function vModalDirectiveController ($scope, modalConfig) {
  var ctrl = this;

  ctrl.hasClose = function () {
    return $scope.hasClose;
  };

  ctrl.close = function (event) {
    if (!event) {
      $scope.close();
    } else {
      var target = angular.element(event.target);

      if (target.hasClass(modalConfig.classes.modal)) {
        $scope.close();
      }
    }
  };
}
vModalDirectiveController.$inject = ['$scope', 'modalConfig'];