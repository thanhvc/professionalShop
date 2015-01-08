/**
 * Created by Aitor on 28/05/14.
 */
exports.config = {
    baseUrl: 'http://localhost:9001/', //url del node.js que lanza la tarea, no es de ningun otro server, esta en el
    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000,
        isVerbose: true
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    // Spec patterns are relative to the location of this config.
    suites: {
//        homepage: '../src/app/home/*protractor.js',
//        layout: '../src/app/*protractor.js',
//        signup:' ../src/app/sign_up/*protractor.js',
//        cart:' ../src/app/home/catalog/*protractor.js',
//        menu:' ../src/app/layout_templates/*protractor.js',
          // patterns:' ../src/app/my_patterns/*protractor.js'
//        volatility: ' ../src/app/tools/volatility/*protractor.js',
//        packs: '../src/app/my_subscriptions/*protractor.js',
//        profile: '../src/app/my_profile/*protractor.js',
//        lookup_diary: '../src/app/lookup_diary/*protractor.js',
        //my_subscriptions: '../src/app/my_subscriptions/*protractor.js',
        //my_subscriptions: '../src/app/my_subscriptions/my_subscriptions.protractor.js'
        //sign_up: '../src/app/sign_up/signup.protractor.js'
        //forgotten_password: '../src/app/forgotten_password/forgotten-password.protractor.js'
        //activate: '../src/app/activate/activate.protractor.js'
        //change_password: '../src/app/changePassword/change-password.protractor.js'
        //the_week: '../src/app/the_week/the_week.protractor.js'
        //calendar: '../src/app/calendar/calendar.protractor.js'
        //expired_packs_mail: '../src/app/automatic_mails/expired_packs_mail.protractor.js'
        //end_free_pack_mail: '../src/app/automatic_mails/end_free_pack_mail.protractor.js'
        //publication_and_renew_mail: '../src/app/automatic_mails/publication_and_renew_mail.protractor.js'
        //alerts_mail: '../src/app/automatic_mails/alerts_mail.protractor.js'
        //expiration_last_month: '../src/app/automatic_mails/expiration_last_month_mail.protractor.js'
        //expiration_last_month_2: '../src/app/automatic_mails/expiration_last_month_mail_2.protractor.js'
        //login:'../src/app/home/login.protractor.js'
    },
    multiCapabilities: [
        {
          //  'browserName': 'phantomjs',

            /*
             * Can be used to specify the phantomjs binary path.
             * This can generally be ommitted if you installed phantomjs globally.
             */
            'phantomjs.binary.path': '../../../node_modules/karma-phantomjs-launcher/node_modules/phantomjs/bin/phantomjs',


            /*
             * Csasdommand line arugments to pass to phantomjs.
             * Can be ommitted if no arguments need to be passed.
             * Acceptable cli arugments: https://github.com/ariya/phantomjs/wiki/API-Reference#wiki-command-line-options
             */
            'phantomjs.cli.args': [ "--ignore-ssl-errors=true", "--web-security=false"],
            //},

             browserName: 'chrome'
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

    params: {
        sqlCon : 'postgres://vagrant:vagrant@localhost:15432/moserver_test',
        //sqlCon : 'postgres://postgres:postgres216c@localhost:5432/moserver_test',
        serverVagrantId : '3ad9a5f' //use vagrant global-status to get Id
    }
};
