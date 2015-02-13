describe('v-modal directive', function () {
  
  var $compile;
  var scope;

  var generateTemplate = function (options) {
    var dafaults = {
      closeMethod: false,
      closeButton: false,
      transcludedContent: ''
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<v-modal';
        template += (dafaults.closeMethod) ? ' onclose="closeModal()"' : '';
        template += '>';
        template += (dafaults.closeButton) ? '<v-close></v-close>' : '';
        template += dafaults.transcludedContent;
        template += '</v-modal>';

    return template;
  };



  beforeEach(module('vModal'));

  beforeEach(inject(function ($rootScope, _$compile_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    scope.$destroy();
  });



  it('should transclude scope', function () {
    var message = 'Hello World!';

    var template = generateTemplate({ transcludedContent: '{{ message }}' });
    var modal = $compile(template)(scope);

    scope.message = message;
    scope.$digest();

    expect(modal.html()).toContain(message);
  });


  it('should call `closeModal` method on backdrop click', function () {
    var template = generateTemplate({ closeMethod: true });
    var modal = $compile(template)(scope);

    scope.closeModal = function () {};
    scope.$digest();

    spyOn(scope, 'closeModal');

    modal.click();
    
    expect(scope.closeModal).toHaveBeenCalled();
  });


  it('should call `closeModal` method when on `v-close` click', function () {
    var template = generateTemplate({ closeMethod: true, closeButton: true });
    var modal = $compile(template)(scope);
    var vClose = modal.find('v-close');

    scope.closeModal = function () {};
    scope.$digest();

    spyOn(scope, 'closeModal');

    vClose.click();
    
    expect(scope.closeModal).toHaveBeenCalled();
  });

});