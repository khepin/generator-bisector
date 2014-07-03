define([
    'modules/<%= moduleName %>/<%= moduleName %>_module',
    'ngmocks'
], function(
){
    describe('<%= serviceName %>', function(){
        var service;

        beforeEach(module('<%= moduleName %>'));

        beforeEach(inject(function(<%= serviceName %>){
            service = <%= serviceName %>;
        }));

        it('should be instantiable', function(){
            expect(service).toBeDefined();

            expect('This generated test').toBe('re-written by you');
        });
    });
});