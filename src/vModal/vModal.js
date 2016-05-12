

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
