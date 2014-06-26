// Include libraries that should be included at "all times" and are dependencies
// to some other behaviors.
//
// Add some functionalities to specific parts of existing libraries
define([
    'angularRoute',
    'restangular',

    // modules
    'main'
], function (
) {
    angular.element(document).ready(function() {
        var appElement = angular.element('body');
        angular.bootstrap(appElement, ['<%= name %>']);
    });
});