define(function(){
    /**
     * Directive for...
     *
     * Sample usage:
     * =============================
     * <<%= directiveDashName %>></<%= directiveDashName %>>
     */
    function <%= directiveName %>() {
        return {
            restrict: 'AE',
            // transclude: true,
            // scope: {
            // },
            templateUrl: 'modules/<%= moduleName %>/templates/<%= templateName %>.html',
            // link: function(scope, el, attrs, controller) {},
            // compile: function() {}
        };
    }

    // IE8 compatibility, ensure that the directive is available as a custom HTML tag
    document.createElement('<%= directiveDashName %>');
    return [<%= directiveName %>];
});