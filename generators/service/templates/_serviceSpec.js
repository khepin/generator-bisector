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

            expect('This is a generated test, modify it and write your own.').toBe('');
        });
    });
});