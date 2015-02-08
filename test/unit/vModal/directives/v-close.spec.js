describe('v-close directive', function () {
  
  var $compile;
  var scope;


  beforeEach(module('vModal'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    scope.$destroy();
  });



  it('should add `arial-label`, `tabindex` and `role` attributes', function () {
    var label = 'Clase';
    var template = '<v-close label="' + label + '"></v-close>';
    var close = $compile(template)(scope);

    expect(close.attr('aria-label')).toBe(label);
    expect(close.attr('role')).toBe('button');
    expect(close.attr('tabindex')).toBe('0');
  });

});