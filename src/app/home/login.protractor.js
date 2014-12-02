var loadFixture = require('../../../test-helpers/load-fixture.js')
var sha512 = require('sha512')
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js')
var mailBackendMod = require('../../../test-helpers/mail-backend.js');


describe('The home page', function () {
    var page;
    var queue = []
    var conString = browser.params.sqlCon;/*'postgres://super:moserverpass@localhost:25432/moserver'*/
    var mailBackend;
    beforeEach(function () {
        fixture = {
            type: 'insert',
            table: 'users',
            values: {
                id: 1,
                name: 'John',
                surname: 'Snow',
                creation_date: '10-06-2014',
                address:'The wall',
                city:'North',
                zip_code:'Fr3zz3',
                email_address:'john.snow@thewall.com',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1
            }
        }
        loadFixture.loadFixture(fixture,conString)
        browser.ignoreSynchronization = true;
        page = new Home();
        var queue = []

        //    mailBackend = new mailBackendMod.MailBackend(browser.params.smtp_port)
    //    mailBackend = new mailBackendMod.MailBackend(2025)
    });
    afterEach(function () {
        fixture1 = {
            type: 'remove',
            table: 'users'
        }
        fixture2 = {
            type: 'remove',
            table: 'email_log'
        }
        loadFixture.loadFixture(fixture1,conString)
        loadFixture.loadFixture(fixture2,conString)
        expect(queue.length).toEqual(0);



    });
    it('it should remenber password', function () {

        queue.push( { sender: 'market.observatory@edosoftfactory.com',
            receivers: { 'john.snow@thewall.north': true },
            subject: 'Recuperar Contrase?a Market Observatory'
             })


        handler = function(addr,id,email) {
            expect(queue.length).not.toEqual(0);
            msg = queue.shift();
            console.log(addr);
            console.log(id);
            console.log(email);
            expect(email.sender).toEqual(msg.sender);
            expect(email.receivers).toEqual(msg.receivers);
            expect(email.subject).toEqual(msg.subject);
            var jsdom = require("jsdom");

            jsdom.env(
                email.html,
                ["http://code.jquery.com/jquery.js"],
                function (errors, window) {
                    expect(window.$("a").attr('href')).toMatch('\^http:\\/\\/mo\\.devel\\.edosoftfactory.com\\/#\\/change-password\\/');
                }
            );


        };

        browser.get('/#/forgotten-password#top');
        ptor.sleep(2000);

        element(by.model('emailRemember')).sendKeys('john.snow@thewall.north');
        ptor.sleep(2000);
      //  mailBackend.start();
        var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});


        ms.bind(handler);
        ptor.sleep(2000);
        element(by.css('.mo-button.float-left')).click();
        ptor.sleep(10000);

    });
})
