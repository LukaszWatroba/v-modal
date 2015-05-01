# AngularJS modal component
Simple, flexible and beautiful modal dialogs in AngularJS.


## Demo
  - [GitHub](http://lukaszwatroba.github.io/v-modal)


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


### Sizes
  - `small`
  - `medium`
  - `large`
  - `fit`

```html
<v-dialog large></v-dialog>
```


### Positions
  - `center` (default)
  - `middle`

```html
<v-dialog middle></v-dialog>
```


## Accessibility
By default, vModal manages keyboard focus and adds some common ARIA attributes to improve accessibility of your dialogs.


## Credits
`vModal` service is based [angular-modal](https://github.com/btford/angular-modal) by Brian Ford.
