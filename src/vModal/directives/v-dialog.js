

// vDialog directive
angular.module('vModal.directives')
  .directive('vDialog', vDialogDirective);

function vDialogDirective (modalConfig) {
  return {
    restrict: 'AE',
    require: '^vModal',
    replace: true,
    transclude: true,
    template: '<div><div><button ng-if="modalCtrl.hasClose()" ng-click="modalCtrl.close()"></button><div ng-transclude></div></div></div>',
    scope: {
      size: '@?',
      position: '@?'
    },
    controller: function vDialogDirectiveController () {},
    compile: function (tElement) {
      tElement.addClass(modalConfig.classes.dialog);

      var contentElement = angular.element(tElement.find('div')[0]),
          closeButton = tElement.find('button');

      contentElement
        .addClass(modalConfig.classes.dialogContent);

      closeButton
        .addClass(modalConfig.classes.dialogClose)
        .html('<span>' + modalConfig.closeButtonText + '</span>');

      return function postLink (scope, iElement, iAttrs, modalCtrl) {
        if (!angular.isDefined(scope.vCenter)) {
          scope.vCenter = angular.isDefined(iAttrs.vCenter);
        }

        scope.modalCtrl = modalCtrl;

        iElement.addClass( modalConfig.classes.sizes[ scope.size || 'medium' ] );
        iElement.addClass( modalConfig.classes.positions[ scope.position || 'center' ] );
      };
    }
  };
}
vDialogDirective.$inject = ['modalConfig'];