// Defines the configuration for **require.js**, this lists all the project's
// external dependencies as well as where to find the dependency file in a
// development environment
require.config({
    // List of all the dependencies
    paths: {
        jquery:                             '../bower_components/jquery/dist/jquery',
        lodash:                             '../bower_components/lodash/dist/lodash',
        angular:                            '../bower_components/angular/angular',
        angularRoute:                       '../bower_components/angular-route/angular-route.min',
        restangular:                        '../bower_components/restangular/src/restangular',
        eventEmitter:                       '../bower_components/eventEmitter/EventEmitter',

        // Cached templates
        templates:                          '../templates'
    },
    // Ensure that the dependencies are loaded in the right order
    shim: {
        jquery: { exports: '$' },
        lodash: { exports: '_' },
        angular: { exports: 'angular', deps: ['jquery'] },
        angularRoute: { deps: ['angular'] },
        restangular: { deps: ['angular', 'lodash'] },
        templates: { deps: ['angular'] }
    }
});

// using require() here, so that the related js files will be included in genereated js file build/myservice.build.js by requireJS. require.config.deps won't work withe requireJS build.
require(["bootstrap"]);
