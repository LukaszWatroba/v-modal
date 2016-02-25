

// vModal directive
angular.module('vModal.directives')
  .directive('vModal', vModalDirective);


function vModalDirective () {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      close: '&?onclose'
    },
    controller: angular.noop,
    link: function (scope, iElement, iAttrs, ctrl, transclude) {
      transclude(scope.$parent, function(clone) {
        iElement.append(clone);
      });

			scope.close = (angular.isFunction(scope.close)) ? scope.close : angular.noop;

      function hasParentElement (el) {
        while (el.tagName !== 'V-CLOSE') {
          el = el.parentNode;
          if (!el) {
            return false;
          }
        }
        return true;
      }

      function modalClick (event) {
        var isBackdrop = (event.target.tagName === 'V-MODAL');

        if (isBackdrop || hasParentElement(event.target, 'V-CLOSE')) {
          scope.$apply(function () { scope.close(); });
        }
      }

      iElement.on('click', modalClick);

      scope.$on('$destroy', function () {
        iElement.off('click', modalClick);
      });
    }
  };
}
