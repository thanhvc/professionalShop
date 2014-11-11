var loadFixture = require('../../../test-helpers/load-fixture.js')
var sha512 = require('sha512')
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js')
var mailBackendMod = require('../../../test-helpers/mail-backend.js');


describe('The home page', function () {
    var page;
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
                email_address:'john.snow@thewall.north',
                sha_password: "\\x" + sha512("phantom").toString('hex'),
                status: 1
            }
        }
        loadFixture.loadFixture(fixture,conString)
        browser.ignoreSynchronization = true;
        page = new Home();
    //    mailBackend = new mailBackendMod.MailBackend(browser.params.smtp_port)
        mailBackend = new mailBackendMod.MailBackend(2025)
    });
    afterEach(function () {
        fixture = {
            type: 'remove',
            table: 'users',
            condition: {
                id: 1
            }
        }
        fixture2 = {
            type: 'remove',
            table: 'email_log',
        }
        loadFixture.loadFixture(fixture2,conString)
        loadFixture.loadFixture(fixture2,conString)


    });
    xit('should allow existing and active user to sign in and show my patterns view', function () {
        page.showLoginBox();
        page.login('john.snow@thewall.north','phantom');
        ptor.sleep(5000);

    });
    it('it should remenber password', function () {
        browser.get('/#/forgotten-password#top');
        ptor.sleep(2000);

        element(by.model('emailRemember')).sendKeys('john.snow@thewall.north');
        ptor.sleep(2000);

        element(by.css('.mo-button.float-left')).click();
        mailBackend.start();
        ms = require('smtp-tester');
        //mailServer = ms.init(1025);
        ptor.sleep(10000);

        mailBackend.stop();
        ptor.sleep(2000);

    });
})
