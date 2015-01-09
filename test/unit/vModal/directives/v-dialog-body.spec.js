describe('v-dialog-body directive', function () {
  
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

    var template = '<v-dialog-body>' + dafaults.transcludedContent + '</v-pane-body>\n';

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
  


  it('should replace `v-dialog-body` with `div` element and add `Dialog-body` class', function () {
    var template = generateTemplate();

    var dialogBody = $compile(template)(scope);

    expect(dialogBody[0]).toBeDefined();
    expect(dialogBody.hasClass(modalConfig.classes.dialogBody)).toBe(true);
    expect(dialogBody.prop('tagName')).toBe('DIV');
  });


  it('should transclude scope', function () {
    var message = 'Hello World!';

    var template = generateTemplate({ transcludedContent: '{{ message }}' });

    var dialogBody = $compile(template)(scope);

    scope.message = message;
    scope.$digest();

    expect(dialogBody.html()).toContain(message);
  });

});