/**
 * vModal - Simple, flexible and beautiful modal dialogs in AngularJS
 * @version v1.0.0
 * @link http://lukaszwatroba.github.io/v-modal
 * @author Łukasz Wątroba <l@lukaszwatroba.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (angular) {
'use strict';



// Config
angular.module('vModal.config', [])
  .constant('modalConfig', {
    containerSelector: 'body'
  });


// Modules
angular.module('vModal.directives', []);
angular.module('vModal.services', []);
angular.module('vModal',
  [
    'ngAnimate',

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
    transclude: true,
    scope: {
      heading: '@',
      role: '@'
    },
    link: function (scope, iElement, iAttrs, ctrl, transclude) {
      transclude(scope.$parent, function(clone) {
        iElement.append(clone);
      });

      if (scope.heading) {
        iAttrs.$set('aria-label', scope.heading);
      }

      if (!scope.role) {
        iAttrs.$set('role', 'dialog');
      }

      iAttrs.$set('tabindex', -1);
      iElement[0].focus();
    }
  };
}




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
    link: function (scope, iElement, iAttrs, ctrl, transclude) {
      transclude(scope.$parent, function(clone) {
        iElement.append(clone);
      });

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


/*
 * @license
 * angular-modal v0.4.0
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

    var template        = config.template,
        controller      = config.controller || angular.noop,
        controllerAs    = config.controllerAs,
        container       = angular.element(config.container || $document[0].querySelector(modalConfig.containerSelector)),
        element         = null,
        html,
        scope;

    if (config.template) {
      var deferred = $q.defer();
      deferred.resolve(config.template);
      html = deferred.promise;
    } else {
      html = $http.get(config.templateUrl, {
          cache: $templateCache
        })
        .then(function (response) {
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

      $animate.enter(element, container);
      container.attr('v-modal-open', '');
      scope = $rootScope.$new();

      if (locals) {
        for (var prop in locals) {
          scope[prop] = locals[prop];
        }
      }

      var ctrl = $controller(controller, { $scope: scope });

      if (controllerAs) {
        scope[controllerAs] = ctrl;
      }

      $compile(element)(scope);
    }

    function deactivate () {
      var deferred = $q.defer();
      if (element) {
        $animate
          .leave(element)
          .then(function () {
            scope.$destroy();
            container.removeAttr('v-modal-open');
            element = null;
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function isActive () {
      return !!element;
    }

    return {
      activate: activate,
      deactivate: deactivate,
      isActive: isActive
    };
  };
}
vModalFactory.$inject = ['$animate', '$compile', '$rootScope', '$controller', '$q', '$http', '$templateCache', '$document', 'modalConfig'];


}(angular));