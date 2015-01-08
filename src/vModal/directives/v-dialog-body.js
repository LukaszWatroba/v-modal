

// vDialogBody directive
angular.module('vModal.directives')
  .directive('vDialogBody', vDialogBodyDirective);


function vDialogBodyDirective (modalConfig) {
  return {
    restrict: 'AE',
    require: '^vDialog',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    compile: function (tElement) {
      tElement.addClass(modalConfig.classes.dialogBody);
    }
  };
}
vDialogBodyDirective.$inject = ['modalConfig'];

