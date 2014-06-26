define([
    'angular',
    'restangular',

    'modules/default/default_module',

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

        'default'
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