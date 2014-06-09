/**
 * Created by Aitor on 28/05/14.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        //homepage: '../src/app/home/*protractor.js',
        //layout: '../src/app/*protractor.js',
        signup:' ../src/app/sign_up/*protractor.js'
        //cart:' ../src/app/home/catalog/*protractor.js',
        //menu:' ../src/app/layout_templates/*protractor.js'


    }
}