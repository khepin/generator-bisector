var tests = [];
for (var file in window.__karma__.files) {
    if (/Spec\.js$/.test(file)) {
        tests.push(file);
    }
}
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
        templates:                          '../templates',
        ngmocks:                            '../bower_components/angular-mocks/angular-mocks'
    },
    // Ensure that the dependencies are loaded in the right order
    shim: {
        jquery: { exports: '$' },
        lodash: { exports: '_' },
        angular: { exports: 'angular', deps: ['jquery'] },
        angularRoute: { deps: ['angular'] },
        restangular: { deps: ['angular', 'lodash'] },
        templates: { deps: ['angular'] },
        ngmocks: { deps: ['angular'] }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,
    // start test run, once Require.js is done
    callback: window.__karma__.start,
    baseUrl: '/base/app/src'
});