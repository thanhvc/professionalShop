var loadFixture = require('../../../test-helpers/load-fixture.js')
var sha512 = require('sha512')
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js')

describe('The home page', function () {
    var page;
    var conString = browser.params.sqlCon;/*'postgres://super:moserverpass@localhost:25432/moserver'*/
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
    });
    afterEach(function () {
        fixture = {
            type: 'remove',
            table: 'users',
            condition: {
                id: 1
            }
        }
        loadFixture.loadFixture(fixture,conString)

    });
    it('should allow existing and active user to sign in and show my patterns view', function () {
        page.showLoginBox();
        page.login('john.snow@thewall.north','phantom');
        ptor.sleep(5000);

    });
})