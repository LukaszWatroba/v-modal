describe('v-dialog directive', function () {
  
  var $compile;
  var $rootScope;
  var modalConfig;
  var scope;
  var selector;

  var generateTemplate = function (options) {
    var dafaults = {
      dialogSize: null,
      dialogPosition: null,
      closeMethod: false,
      transcludedContent: ''
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<v-modal';
        template += (dafaults.closeMethod) ? ' close="closeModal()"' : '';
        template += '>\n';
        template += '<v-dialog';
        template += (dafaults.dialogSize) ? ' size="' + dafaults.dialogSize + '"' : '';
        template += (dafaults.dialogPosition) ? ' position="' + dafaults.dialogPosition + '"' : '';
        template += '>\n';
        template += dafaults.transcludedContent;
        template += '</v-dialog>\n';
        template += '</v-modal>';

    return template;
  };



  beforeEach(module('vModal'));

  beforeEach(inject(function (_$rootScope_, _$compile_, _modalConfig_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
    modalConfig = _modalConfig_;
  }));

  beforeEach(function () {
    selector = '.' + modalConfig.classes.dialog.split(' ')[0];
  });

  afterEach(function () {
    scope.$destroy();
  });



  it('should throw an error if `v-modal` directive controller can\'t be found', function () {
    var template = '<v-dialog></v-dialog>';

    expect(function () { $compile(template)(scope); }).toThrow();
  });


  it('should replace `v-dialog` with `div` element and add `Dialog` class', function () {
    var template = generateTemplate();

    var modal = $compile(template)(scope);
    var dialog = modal.find(selector);

    expect(dialog[0]).toBeDefined();
    expect(dialog.prop('tagName')).toBe('DIV');
  });


  it('should transclude scope', function () {
    var message = 'Hello World!';

    var template = generateTemplate({ transcludedContent: '{{ message }}' });
    var modal = $compile(template)(scope);
    var dialog = modal.find(selector);

    scope.message = message;
    scope.$digest();

    expect(dialog.html()).toContain(message);
  });


  it('should have a `button` with the `Close` text', function () {
    var template = generateTemplate({ closeMethod: true });
    var modal = $compile(template)(scope);
    var dialog = modal.find(selector);
    var closeButton;

    scope.$digest();

    closeButton = dialog.find('.' + modalConfig.classes.dialogClose);

    expect(closeButton[0]).toBeDefined();
    expect(closeButton.html()).toContain(modalConfig.closeButtonText);
  });


  it('should call `closeModal` method on button click', function () {
    var template = generateTemplate({ closeMethod: true });
    var modal = $compile(template)(scope);
    var closeButton;

    scope.closeModal = function () {};
    scope.$digest();

    closeButton = modal.find('.' + modalConfig.classes.dialogClose);

    spyOn(scope, 'closeModal');

    closeButton.click();
    
    expect(scope.closeModal).toHaveBeenCalled();
  });


  it('should add `Dialog--sizeMd` class if `size` attribute is not defined', function () {
    var className = modalConfig.classes.sizes['medium'];

    var template = generateTemplate();
    var modal = $compile(template)(scope);
    var dialog = modal.find(selector);

    expect(dialog.hasClass(className)).toBe(true);
  });


  it('should add class based on `size` attribute value', function () {
    var dialogSize = 'large';
    var className = modalConfig.classes.sizes[dialogSize];

    var template = generateTemplate({ dialogSize: dialogSize });
    var modal = $compile(template)(scope);
    var dialog = modal.find(selector);

    expect(dialog.hasClass(className)).toBe(true);
  });


  it('should add `Dialog--positionCenter` class if `position` attribute is not defined', function () {
    var className = modalConfig.classes.positions['center'];

    var template = generateTemplate();
    var modal = $compile(template)(scope);
    var dialog = modal.find(selector);

    expect(dialog.hasClass(className)).toBe(true);
  });


  it('should add class based on `position` attribute value', function () {
    var dialogPosition = 'middle';
    var className = modalConfig.classes.positions[dialogPosition];

    var template = generateTemplate({ dialogPosition: dialogPosition });
    var modal = $compile(template)(scope);
    var dialog = modal.find(selector);

    expect(dialog.hasClass(className)).toBe(true);
  });

});