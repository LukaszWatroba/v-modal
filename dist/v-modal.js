/**
 * vModal - Simple, flexible and beautiful modal dialogs in AngularJS
 * @version v0.1.1
 * @link http://lukaszwatroba.github.io/v-modal
 * @author Łukasz Wątroba <l@lukaszwatroba.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (angular) {
'use strict';



// Config
angular.module('vModal.config', [])
  .constant('modalConfig', {
    closeButtonText: 'Close',
    containerSelector: 'body',
    
    classes: {
      modal:  'Modal Modal--withBackdrop Modal--default',

      dialog: 'Dialog Dialog--default',
      dialogContent: 'Dialog-content',
      dialogHeader: 'Dialog-header',
      dialogFooter: 'Dialog-footer',
      dialogBody: 'Dialog-body',
      dialogClose: 'Dialog-close',

      hasModalState: 'has-modal',

      sizes: {
        'medium': 'Dialog--sizeMd',
        'large': 'Dialog--sizeLg',
        'small': 'Dialog--sizeSm',
        'full': 'Dialog--sizeFull'
      },

      positions: {
        'center': 'Dialog--positionCenter',
        'middle': 'Dialog--positionMiddle',
        'top-left': 'Dialog--positionTopLeft',
        'top-right': 'Dialog--positionTopRight',
        'bottom-left': 'Dialog--positionBottomLeft',
        'bottom-right': 'Dialog--positionBottomRight',
      }
    }
  });


// Modules
angular.module('vModal.directives', []);
angular.module('vModal.services', [ 'ngAnimate' ]);
angular.module('vModal',
  [
    'ngAnimate',

    'vModal.config',
    'vModal.directives',
    'vModal.services'
  ]);



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


// vModal directive
angular.module('vModal.directives')
  .directive('vModal', vModalDirective);


function vModalDirective (modalConfig) {
  return {
    restrict: 'AE',
    replace: true,
    transclude: true,
    template: '<div ng-click="modalCtrl.close($event)" ng-transclude></div>',
    controller: vModalDirectiveController,
    controllerAs: 'modalCtrl',
    scope: {
      close: '&?'
    },
    compile: function (tElement, tAttrs) {
      tElement.addClass(modalConfig.classes.modal);

      return function postLink (scope, iElement, iAttrs) {
        scope.hasClose = angular.isDefined(iAttrs.close);
      };
    }
  };
}
vModalDirective.$inject = ['modalConfig'];


// vModal directive controller
function vModalDirectiveController ($scope, modalConfig) {
  var ctrl = this;

  ctrl.hasClose = function () {
    return $scope.hasClose;
  };

  ctrl.close = function (event) {
    if (!event) {
      $scope.close();
    } else {
      var target = angular.element(event.target);

      if (target.hasClass(modalConfig.classes.modal)) {
        $scope.close();
      }
    }
  };
}
vModalDirectiveController.$inject = ['$scope', 'modalConfig'];


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
      container.addClass(modalConfig.classes.hasModalState);
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
            container.removeClass(modalConfig.classes.hasModalState);
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