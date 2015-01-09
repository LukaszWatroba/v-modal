describe('v-dialog-header directive', function () {
  
  var $compile;
  var modalConfig;
  var scope;

  var generateTemplate = function (options) {
    var dafaults = {
      transcludedContent: ''
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<v-dialog-header>' + dafaults.transcludedContent + '</v-pane-header>\n';

    return template;
  };


  beforeEach(module('vModal'));

  beforeEach(inject(function ($rootScope, _$compile_, _modalConfig_) {
    scope = $rootScope.$new();
    $compile = _$compile_;
    modalConfig = _modalConfig_;
  }));

  afterEach(function () {
    scope.$destroy();
  });
  


  it('should replace `v-dialog-header` with `div` element and add `Dialog-header` class', function () {
    var template = generateTemplate();

    var dialogHeader = $compile(template)(scope);

    expect(dialogHeader[0]).toBeDefined();
    expect(dialogHeader.hasClass(modalConfig.classes.dialogHeader)).toBe(true);
    expect(dialogHeader.prop('tagName')).toBe('DIV');
  });


  it('should transclude scope', function () {
    var message = 'Hello World!';

    var template = generateTemplate({ transcludedContent: '{{ message }}' });

    var dialogHeader = $compile(template)(scope);

    scope.message = message;
    scope.$digest();

    expect(dialogHeader.html()).toContain(message);
  });

});