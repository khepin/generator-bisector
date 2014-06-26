exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    suites: {
        default: 'tests/e2e/modules/booking/**/*Spec.js'
    },
    baseUrl: 'http://localhost'
}
