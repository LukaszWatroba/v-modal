describe('v-dialog directive', function () {
  
  var $compile;
  var scope;

  var generateTemplate = function (options) {
    var dafaults = {
      heading: '',
      transcludedContent: ''
    };

    if (options) {
      angular.extend(dafaults, options);
    }

    var template = '<v-modal>';
        template += '<v-dialog heading="' + dafaults.heading + '">';
        template += dafaults.transcludedContent;
        template += '</v-dialog>';
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


  it('should focus', inject(function ($document) {
    var template = $(generateTemplate());
    
    template.appendTo($document[0].body)

    var modal = $compile(template)(scope);
    var dialog = modal.find('v-dialog');

    expect($document[0].activeElement === dialog[0]).toBe(true);
  }));


  it('should add `arial-label`, `tabindex` and `role` attributes', function () {
    var heading = 'Modal heading';

    var template = generateTemplate({ heading: heading });
    var modal = $compile(template)(scope);
    var dialog = modal.find('v-dialog');

    expect(dialog.attr('aria-label')).toBe(heading);
    expect(dialog.attr('role')).toBe('dialog');
    expect(dialog.attr('tabindex')).toBe('-1');
  });

});