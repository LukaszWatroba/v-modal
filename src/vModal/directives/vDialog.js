

// vDialog directive
angular.module('vModal.directives')
  .directive('vDialog', vDialogDirective);


function vDialogDirective () {
  return {
    restrict: 'AE',
    require: '^vModal',
    transclude: true,
    scope: {
      heading: '@',
      role: '@'
    },
    link: function (scope, iElement, iAttrs, modalCtrl, transclude) {
      transclude(scope.$parent, function(clone) {
        iElement.append(clone);
      });

      if (scope.heading) {
        iAttrs.$set('aria-label', scope.heading);
      }

      iAttrs.$set('role', 'dialog');
      iAttrs.$set('tabindex', -1);

      iElement[0].focus();
      setTimeout(function () { iElement[0].focus(); }, 0);
    }
  };
}
