

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
angular.module('vModal.services', []);
angular.module('vModal',
  [
    'ngAnimate',

    'vModal.config',
    'vModal.directives',
    'vModal.services'
  ]);
