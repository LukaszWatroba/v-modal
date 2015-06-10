

// vModal directive
angular.module('vModal.directives')
  .directive('vModal', vModalDirective);


function vModalDirective () {
  return {
    restrict: 'AE',
    transclude: true,
    scope: {
      closeMethod: '&?onclose'
    },
    controller: function () {},
    link: function (scope, iElement, iAttrs, ctrl, transclude) {
      transclude(scope.$parent, function(clone) {
        iElement.append(clone);
      });
			
			scope.closeMethod = (angular.isFunction(scope.closeMethod)) ? scope.closeMethod : angular.noop;

      function isClose (el) {
        while (el.tagName !== 'V-CLOSE') {
          el = el.parentNode;
          if (!el) {
            return false;
          }
        }
        return true;
      }

      iElement.on('click', function (event) {
        var isBackdrop = (event.target.tagName === 'V-MODAL');

        if (isBackdrop || isClose(event.target)) {
          scope.$apply(function () { scope.closeMethod(); });
        }
      });
    }
  };
}

