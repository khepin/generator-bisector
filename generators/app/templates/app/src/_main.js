define([
    'angular',
    'restangular',

    // <bisector:require:modules>
    'modules/default/default_module',
    // </bisector:require:modules>

    'templates',
    'config'
], function (
    angular,
    restangular
) {
    var app = angular.module('<%= name %>', [
        'templates',

        'ngRoute',
        'restangular',

        // <bisector:di:modules>
        'default'
        // </bisector:di:modules>
    ])
    .config(['$routeProvider', 'RestangularProvider',
        function($routeProvider, RAProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'modules/default/templates/index.html'
                })
            ;

            RAProvider.setBaseUrl('/');
        }
    ]);
});