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
  this.show = myModal.activate;
});
```


> index.html

```html
<div ng-app="myApp" ng-controller="MyCtrl as ctrl">
  <a href ng-click="ctrl.show()">Show</a>
</div>
```


> my-modal.html

```html
<v-modal class="vModal--default" onclose="modal.close()">
  <v-dialog role="dialog" aria-labelby="helloWorld" small middle>
    <v-close role="button" tabindex="0" aria-label="Close"></v-close>
    
    <h3 id="helloWorld">Hello World!</h3>

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


## Credits
`vModal` service is based [angular-modal](https://github.com/btford/angular-modal) by Brian Ford.


