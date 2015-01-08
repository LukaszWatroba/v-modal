'use strict';

describe('', function() {

  var dependencies = [];

  var hasModule = function(module) {
    return dependencies.indexOf(module) >= 0;
  };



  beforeEach(function () {
    dependencies = angular.module('vModal').requires;
  });

  
  
  it('should load config module', function () {
    expect(hasModule('vModal.config')).toBe(true);
  });


  it('should load directives module', function () {
    expect(hasModule('vModal.directives')).toBe(true);
  });


  it('should load services module', function () {
    expect(hasModule('vModal.services')).toBe(true);
  });
  

});