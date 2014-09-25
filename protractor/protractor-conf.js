/**
 * Created by Aitor on 28/05/14.
 */
exports.config = {
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        isVerbose: true
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    suites: {
        homepage: '../src/app/home/*protractor.js',
        layout: '../src/app/*protractor.js',
        signup:' ../src/app/sign_up/*protractor.js',
        cart:' ../src/app/home/catalog/*protractor.js',
        menu:' ../src/app/layout_templates/*protractor.js',
        patterns:' ../src/app/my_patterns/*protractor.js',
        volatility: ' ../src/app/tools/volatility/*protractor.js',
        packs: '../src/app/my_subscriptions/*protractor.js',
        profile: '../src/app/my_profile/*protractor.js',
        lookup_diary: '../src/app/lookup_diary/*protractor.js',

    },
    multiCapabilities: [
        {
            'browserName': 'phantomjs',

            /*
             * Can be used to specify the phantomjs binary path.
             * This can generally be ommitted if you installed phantomjs globally.
             */
            'phantomjs.binary.path': 'node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',


            /*
             * Csasdommand line arugments to pass to phantomjs.
             * Can be ommitted if no arguments need to be passed.
             * Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options
             */
            'phantomjs.cli.args': [ "--ignore-ssl-errors=true", "--web-security=false"],
            //},

           //  browserName: 'chrome'
        }
        // },
        /*
         {
         browserName:'firefox'
         }*/
    ],

/*    onPrepare: function () {
        // The require statement must be down here, since jasmine-reporters
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        var jasmineReporters =require('jasmine-reporters');
        jasmine.getEnv().addReporter(
            new jasmineReporters.JUnitXmlReporter('e2e-test-results/', true, true));
    }*/
};