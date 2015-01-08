

// vDialogFooter directive
angular.module('vModal.directives')
  .directive('vDialogFooter', vDialogFooterDirective);


function vDialogFooterDirective (modalConfig) {
  return {
    restrict: 'AE',
    require: '^vDialog',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    compile: function (tElement) {
      tElement.addClass(modalConfig.classes.dialogFooter);
    }
  };
}
vDialogFooterDirective.$inject = ['modalConfig'];

