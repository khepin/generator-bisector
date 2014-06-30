define([
    'modules/<%= moduleName %>/<%= moduleName %>_module',
    'ngmocks'
], function(
){
    describe('<%= controllerName %>', function(){
        var $controller;

        beforeEach(module('<%= moduleName %>'));

        beforeEach(inject(function(_$controller_){
            $controller = _$controller_
        }))

        it('should be instantiable', function(){
            var ctrl = $controller('<%= controllerName %>');
            expect(ctrl).toBeDefined();
        });
    });
});