define([
    'modules/<%= moduleName %>/<%= moduleName %>_module',
    'ngmocks'
], function(
){
    describe('<%= filterName %>', function(){
        beforeEach(module('<%= moduleName %>'));

        it('should be instantiable', function(){
            expect('This generated test').toBe('re-written by you');
        });
    });
});