/**
 * vModal - Simple, flexible and beautiful modal dialogs in AngularJS
 * @version v1.3.6
 * @link http://lukaszwatroba.github.io/v-modal
 * @author Łukasz Wątroba <l@lukaszwatroba.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (angular) {
'use strict';



// Config
angular.module('vModal.config', [])
  .constant('modalConfig', {
    containerSelector: 'body',
    closeOnEsc: true
  });


// Modules
angular.module('vModal.directives', []);
angular.module('vModal.services', []);
angular.module('vModal',
  [
    'vModal.config',
    'vModal.directives',
    'vModal.services'
  ]);



// vClose directive
angular.module('vModal.directives')
  .directive('vClose', vCloseDirective);


function vCloseDirective () {
  return {
    restrict: 'E',
    scope: {
      label: '@'
    },
    link: function (scope, iElement, iAttrs) {
      if (scope.label) {
        iAttrs.$set('aria-label', scope.label);
      }

      iAttrs.$set('role', 'button');
      iAttrs.$set('tabindex', 0);
    }
  };
}




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

/*
* @license
* angular-modal v0.5.0
* (c) 2013 Brian Ford http://briantford.com
* License: MIT
*/


// vModal service
angular.module('vModal.services')
.factory('vModal', vModalFactory);

function vModalFactory ($animate, $compile, $rootScope, $controller, $q, $http, $templateCache, $document, modalConfig) {
  return function modalFactory (config) {
    if (!(!config.template ^ !config.templateUrl)) {
      throw new Error('Expected modal to have exacly one of either `template` or `templateUrl`');
    }

    var controller      = config.controller || null,
        controllerAs    = config.controllerAs,
        container       = angular.element(config.container || $document[0].querySelector(modalConfig.containerSelector)),
        root            = angular.element($document[0].querySelector('html')),
        element         = null,
        html,
        scope;

    if (config.template) {
      html = $q.when(config.template);
    } else {
      html = $http.get(config.templateUrl, {
        cache: $templateCache
      }).
      then(function (response) {
        return response.data;
      });
    }

    function activate (locals) {
      return html.then(function (html) {
        if (!element) {
          attach(html, locals);
        }
      });
    }


    function attach (html, locals) {
      element = angular.element(html);
      if (element.length === 0) {
        throw new Error('The template contains no elements; you need to wrap text nodes');
      }
      scope = $rootScope.$new();
      if (controller) {
        if (!locals) {
          locals = {};
        }
        for (var prop in locals) {
          scope[prop] = locals[prop];
        }
        var ctrl = $controller(controller, {$scope: scope});
        if (controllerAs) {
          scope[controllerAs] = ctrl;
        }
      } else if (locals) {
        for (var prop in locals) {
          scope[prop] = locals[prop];
        }
      }
      $compile(element)(scope);
      container.attr('v-modal-open', '');
      root.attr('v-modal-active', '');
      return $animate.enter(element, container);
    }

    function deactivate () {
      if (!element) {
        return $q.when();
      }
      return $animate.leave(element).then(function () {
        scope.$destroy();
        scope = null;
        element.remove();
        element = null;
        container.removeAttr('v-modal-open');
        root.removeAttr('v-modal-active', '');
      });
    }

    function active () {
      return !!element;
    }

    return {
      activate: activate,
      deactivate: deactivate,
      active: active
    };
  };
}

vModalFactory.$inject = ['$animate', '$compile', '$rootScope', '$controller', '$q', '$http', '$templateCache', '$document', 'modalConfig'];

}(angular));