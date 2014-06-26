define([
    'angular',

    // controllers
    './controllers/DefaultCtrl'
], function(
    angular,

    // controllers
    DefaultCtrl
){
    var module = angular.module('default', []);

    // <bisector:controllers>
    module.controller({
        DefaultCtrl: DefaultCtrl,
    });
    // </bisector:controllers>

    // <bisector:directives>
    // </bisector:directives>

    // <bisector:services>
    // </bisector:services>

    return module;
});