/**
 * Created by Aitor on 28/05/14.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        homepage: '../src/app/home/*protractor.js'

    },
}