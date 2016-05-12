

// vModal directive
angular.module('vModal.directives')
  .directive('vModal', vModalDirective);


function vModalDirective ($document, modalConfig) {
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

      function hasParentElement (elem) {
        while (elem.tagName !== 'V-CLOSE') {
          elem = elem.parentNode;
          if (!elem) {
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
      
      function documentKeydown (event) {
        if (!modalConfig.closeOnEsc) { return false; }
        
        if (event.keyCode === 27) {
          scope.$apply(function () {
            scope.close();
          });
        }
      }

      iElement.on('click', modalClick);
      $document.on('keydown', documentKeydown);

      scope.$on('$destroy', function () {
        iElement.off('click', modalClick);
        $document.off('keydown', documentKeydown);
      });
    }
  };
}

vModalDirective.$inject = ['$document', 'modalConfig'];
