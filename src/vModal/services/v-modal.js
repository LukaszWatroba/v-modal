

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

