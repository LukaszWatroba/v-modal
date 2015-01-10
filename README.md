# AngularJS modal component
Simple, flexible and beautiful modal dialogs in AngularJS.


## Demos
  - [GitHub](http://lukaszwatroba.github.io/v-modal)


## Installation
  - If you use [bower](http://bower.io/), just `bower install v-modal`. If not, download files [from the github repo](./dist)
  - Reference `v-modal.css` and `v-modal.js` in your index.html file
  - Reference the module in your app: `angular.module('myApp', [ 'vModal' ])`


## Usage

> app.js

```javascript
angular.module('myApp', ['vModal'])

.factory('myModal', function (vModal) {
  return vModal({
    controller: 'MyModalCtrl',
    controllerAs: 'modal',
    templateUrl: 'my-modal.html'
  });
})

.controller('MyModalCtrl', function (myModal) {
  this.close = myModal.deactivate;
})

.controller('MyCtrl', function (myModal) {
  this.openMyModal = myModal.activate;
});
```

> my-modal.html

```html
<v-modal close="modal.close()">
  <v-dialog size="small" position="middle">

    <v-dialog-header>
      Dialog header
    </v-dialog-header>

    <v-dialog-body>
      Dialog content
    </v-dialog-body>

    <v-dialog-footer>
      Dialog footer
    </v-dialog-footer>

  </v-dialog>
</v-modal>
```

> index.html

```html
<div ng-app="myApp" ng-controller="MyCtrl as ctrl">
  <a href ng-click="ctrl.openMyModal()">Show the modal</a>
</div>
```


### Sizes
  - `small`
  - `medium`
  - `large`

```html
<v-dialog size="large"></v-dialog>
```


### Positions
  - `center`
  - `middle`
  - `top-left`
  - `top-right`
  - `bottom-left`
  - `bottom-right`

```html
<v-dialog position="top-right"></v-dialog>
```


## Config

```js
angular
  .module('myApp', [ 'vModal' ])

  .config(function (modalConfig) {
    
    modalConfig = {
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
          'small': 'Dialog--sizeSm'
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
    };
    
  })
```


## Credits
`vModal` service is based [angular-modal](https://github.com/btford/angular-modal) by Brian Ford.


