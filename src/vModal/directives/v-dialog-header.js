

// vDialogHeader directive
angular.module('vModal.directives')
  .directive('vDialogHeader', vDialogHeaderDirective);


function vDialogHeaderDirective (modalConfig) {
  return {
    restrict: 'AE',
    require: '^vDialog',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    compile: function (tElement) {
      tElement.addClass(modalConfig.classes.dialogHeader);
    }
  };
}
vDialogHeaderDirective.$inject = ['modalConfig'];

