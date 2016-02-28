# AngularJS modal component
Simple, flexible and beautiful modal dialogs in AngularJS.


## Demo
  - [GitHub](http://lukaszwatroba.github.io/v-modal)
  - [CodePen](http://codepen.io/LukaszWatroba/pen/MYOBKb)


## Installation
  - If you use [bower](http://bower.io/) or [npm](https://www.npmjs.com/), just `bower/npm install v-modal`. If not, download files [from the github repo](https://github.com/LukaszWatroba/v-modal/tree/master/dist)
  - Reference `v-modal.css` and `v-modal.js` in your index.html file
  - Reference the module in your app: `angular.module('myApp', [ 'vModal' ])`


## Usage

> app.js

```javascript
angular.module('myApp', ['vModal'])

.factory('myModal', function (vModal) {
  return vModal({
    controller: 'MyModalController',
    controllerAs: 'myModalCtrl',
    templateUrl: 'my-modal.html'
  });
})

.controller('MyModalController', function (myModal) {
  this.close = myModal.deactivate;
})

.controller('AppController', function (myModal) {
  this.show = myModal.activate;
});
```


> index.html

```html
<div ng-app="myApp" ng-controller="AppController as appCtrl">
  <button ng-click="appCtrl.show()">Show</button>
</div>
```


> my-modal.html

```html
<v-modal class="vModal--default" onclose="myModalCtrl.close()">
  <v-dialog heading="My modal" small middle>
    <v-close label="Close"></v-close>

    <h1>My modal</h1>

    <button ng-click="myModalCtrl.close()">OK</button>
  </v-dialog>
</v-modal>
```


#### Sizes
  - `small`
  - `medium`
  - `large`
  - `fit`

```html
<v-dialog large></v-dialog>
```


#### Positions
  - `center` (default)
  - `middle`

```html
<v-dialog middle></v-dialog>
```


## Configuration

#### Module
To change the default container selector, inject `modalConfig` provider in your app config:

```javascript
angular
  .module('myApp', ['vAccordion'])
  .config(function (modalConfig) {
    modalConfig.containerSelector = 'body';
  });
```

#### SCSS
If you are using SASS, you can import vModal.scss file and override following variables:

```scss
$v-modal-default-theme:    true !default;
$v-modal-use-flexbox:      true !default;

$v-modal-spacing:          20px !default;
$v-modal-zindex:           1000 !default;
$v-modal-backdrop:         rgba(0,0,0, 0.5) !default;

$v-dialog-background:      white !default;
$v-dialog-border-radius:   2px   !default;

$v-dialog-sm-width:        340px !default;
$v-dialog-md-width:        560px !default;
$v-dialog-lg-width:        780px !default;

$v-close-color:            #2196F3 !default;
$v-close-hover-color:      #F44336 !default;
$v-close-hover-duration:   0.25s   !default;

$v-modal-fade-animation-duration:    0.25s !default;
$v-dialog-enter-animation-duration:  0.5s  !default;
```


## Accessibility
By default, vModal manages keyboard focus and adds some common ARIA attributes to improve accessibility of your dialogs.


## Credits
`vModal` service is based [angular-modal](https://github.com/btford/angular-modal) by Brian Ford.
