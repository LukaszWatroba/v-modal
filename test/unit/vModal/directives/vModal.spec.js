describe('vModal directive', function () {

  var $compile;
  var scope;

  var generateTemplate = function (options) {
    var dafaults = {
      attributes: '',
      content: ''
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<v-modal ' + dafaults.attributes + '>\n';
        template += dafaults.content + '\n';
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

    var template = generateTemplate({ content: '{{ message }}' });
    var modal = $compile(template)(scope);

    scope.message = message;
    scope.$digest();

    expect(modal.html()).toContain(message);
  });


  it('should call `close` method on backdrop click', function () {
    var template = generateTemplate({ attributes: 'onclose="close()"' });
    var modal = $compile(template)(scope);

    scope.close = function () {};
    scope.$digest();

    spyOn(scope, 'close');

    modal.click();

    expect(scope.close).toHaveBeenCalled();
  });


  it('should call `close` method when on `v-close` click', function () {
    var template = generateTemplate({ attributes: 'onclose="close()"', content: '<v-close></v-close>' });
    var modal = $compile(template)(scope);
    var vclose = modal.find('v-close');

    scope.close = function () {};
    scope.$digest();

    spyOn(scope, 'close');

    vclose.click();

    expect(scope.close).toHaveBeenCalled();
  });
  
  it('should call `close` method on ESC key press', function () {
    var template = generateTemplate({ attributes: 'onclose="close()"', content: '<v-close></v-close>' });
    var modal = $compile(template)(scope);
    
    scope.close = function () {};
    scope.$digest();
    spyOn(scope, 'close');
    
    var event = document.createEvent('Event');
    event.keyCode = 27;
    event.initEvent('keydown');
    document.dispatchEvent(event);
    
    scope.$digest();

    expect(scope.close).toHaveBeenCalled();
  });

});
