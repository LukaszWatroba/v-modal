describe('v-modal directive', function () {
  
  var $compile;
  var $rootScope;
  var modalConfig;
  var scope;

  var generateTemplate = function (options) {
    var dafaults = {
      closeMethod: false,
      transcludedContent: ''
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<v-modal';
        template += (dafaults.closeMethod) ? ' close="closeModal()"' : '';
        template += '>\n';
        template += dafaults.transcludedContent;
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

  afterEach(function () {
    scope.$destroy();
  });



  it('should replace v-modal with div element and add a class', function () {
    var template = generateTemplate();

    var modal = $compile(template)(scope);

    expect(modal.hasClass(modalConfig.classes.modal)).toBe(true);
    expect(modal.prop('tagName')).toBe('DIV');
  });


  it('should transclude scope', function () {
    var message = 'Hello World!';

    var template = generateTemplate({ transcludedContent: '{{ message }}' });
    var modal = $compile(template)(scope);

    scope.message = message;
    scope.$digest();

    expect(modal.html()).toContain(message);
  });


  it('should call close function on backdrop click', function () {
    var template = generateTemplate({ closeMethod: true });
    var modal = $compile(template)(scope);

    scope.closeModal = function () {};
    scope.$digest();

    spyOn(scope, 'closeModal');

    modal.click();
    
    expect(scope.closeModal).toHaveBeenCalled();
  });

});