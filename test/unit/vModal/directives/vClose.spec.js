describe('vClose directive', function () {

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
    var template = '<v-close label="Close"></v-close>';
    var close = $compile(template)(scope);

    expect(close.attr('aria-label')).toBe('Close');
    expect(close.attr('role')).toBe('button');
    expect(close.attr('tabindex')).toBe('0');
  });

});
