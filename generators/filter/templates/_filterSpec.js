define([
    'modules/<%= moduleName %>/<%= moduleName %>_module',
    'ngmocks'
], function(
){
    describe('<%= filterName %>', function(){
        beforeEach(module('<%= moduleName %>'));

        it('should be instantiable', function(){
            expect('This is a generated test, modify it and write your own.').toBe('');
        });
    });
});