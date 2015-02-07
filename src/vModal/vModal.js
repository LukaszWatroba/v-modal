

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
