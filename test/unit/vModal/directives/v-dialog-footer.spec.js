describe('v-dialog-footer directive', function () {
  
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

    var template = '<v-dialog-footer>' + dafaults.transcludedContent + '</v-pane-footer>\n';

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
  


  it('should replace `v-dialog-footer` with `div` element and add `Dialog-footer` class', function () {
    var template = generateTemplate();

    var dialogFooter = $compile(template)(scope);

    expect(dialogFooter[0]).toBeDefined();
    expect(dialogFooter.hasClass(modalConfig.classes.dialogFooter)).toBe(true);
    expect(dialogFooter.prop('tagName')).toBe('DIV');
  });


  it('should transclude scope', function () {
    var message = 'Hello World!';

    var template = generateTemplate({ transcludedContent: '{{ message }}' });

    var dialogFooter = $compile(template)(scope);

    scope.message = message;
    scope.$digest();

    expect(dialogFooter.html()).toContain(message);
  });

});