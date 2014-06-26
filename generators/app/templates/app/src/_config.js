define([
    'angular',
    'lodash'
], function(
    angular,
    lodash
) {
    var module = angular.module('config', [])
        .constant('BISECTOR_VERSION', '<%= version %>')
});