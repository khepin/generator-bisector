define([
    'modules/<%= moduleName %>/<%= moduleName %>_module',
    'templates',
    'jquery',
    'ngmocks'
],function(
    mod,
    templates,
    $
){
    describe('<%= directiveName %> directive',function(){
        var elm, scope, form, $compile;

        beforeEach(module('<%= moduleName %>'));
        beforeEach(module('templates'));

        beforeEach(inject(function($rootScope, _$compile_) {
            $compile = _$compile_;
            // we might move this tpl into an html file as well...
            elm = angular.element(
                '<<%= directiveDashName %>></<%= directiveDashName %>>'
            );

            scope = $rootScope;
            scope.model = {};

            $compile(elm)(scope);
        }));

        it('gets contents replaced', function(){
            scope.$apply(function(){});
            expect($(elm).html()).not.toBe('');

            expect('This is a generated test, modify it and write your own.').toBe('');
        });
    });
});