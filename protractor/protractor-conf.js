/**
 * Created by Aitor on 28/05/14.
 */
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        homepage: '../src/app/home/*protractor.js',
        layout: '../src/app/*protractor.js',
        signup:' ../src/app/sign_up/*protractor.js',
        cart:' ../src/app/home/catalog/*protractor.js',
        menu:' ../src/app/layout_templates/*protractor.js',
        patterns:' ../src/app/my_patterns/*protractor.js',
        volatility:' ../src/app/tools/volatility/*protractor.js',
        my_packs: '../src/app/my_subscriptions/*protractor.js'



    },
    multiCapabilities: [
        /* {
         'browserName': 'phantomjs',

         /*
         * Can be used to specify the phantomjs binary path.
         * This can generally be ommitted if you installed phantomjs globally.

         'phantomjs.binary.path': './node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',

         /*
         * Command line arugments to pass to phantomjs.
         * Can be ommitted if no arguments need to be passed.
         * Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options

         'phantomjs.cli.args': [ "--ignore-ssl-errors=true", ]
         },*/
        {
            browserName: 'chrome'
        }/*,
         {
         browserName:'firefox'
         }*/
    ]
}