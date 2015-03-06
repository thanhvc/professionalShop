
/**
 * Created by David Verdú on 15/12/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/activate-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Activate = require('../../../test-helpers/page-objects/activate.po.js');
var Reactivate = require('../../../test-helpers/page-objects/reactivate.po.js');
var MyPatterns = require('../../../test-helpers/page-objects/mypatterns.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDate("2014-11-17 11:30:00");
ptor.sleep(9000);

describe('activation page', function () {
        var activate_page;
        var reactivate_page;
        var my_patterns_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];

        beforeEach(function () {
            var fixtures = fixtureGenerator.activate_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            my_patterns_page = new MyPatterns();
            home = new Home();
            ptor.sleep(2000);
            //home.showLoginBox();
            //home.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //home.logout(); //TODO
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_activate_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });


        describe("correct validation code", function() {
            beforeEach(function () {
                activate_page = new Activate('LVK567V01KAOPMMGFNL8');
                ptor.sleep(2000);
            });
             
            it("should activate the user", function() {
                expect(my_patterns_page.isCurrentPage()).toBe(true);
                expect(home.isCurrentPage()).toBe(false);

                var select_fixture = fixtureGenerator.select_user_fixture({email_address: "new.user@foo.bar"});
                loadFixture.executeQuery(select_fixture, conString, function(result) {
                    expect(result.rowCount).toBe(1);
                    expect(result.rows[0].email_address).toBe('new.user@foo.bar');
                    expect(result.rows[0].status).toBe(1);
                });
            });

            it("Should be automatically log in", function() {
                //home.showLoginBox();
                //home.login('new.user@foo.bar', 'phantom');
                //ptor.sleep(2000);
                expect(home.myAccountLink().isDisplayed()).toBe(true);
                expect(home.logoutLink().isDisplayed()).toBe(true);
            });
        });

        describe("incorrect validation code", function() {
            beforeEach(function () {
                reactivate_page = new Reactivate();
                activate_page = new Activate('FOO');
                ptor.sleep(2000);
            });
             
            it("should not activate the user", function() {
                expect(home.isCurrentPage()).toBe(true);

                var select_fixture = fixtureGenerator.select_user_fixture({email_address: "new.user@foo.bar"});
                loadFixture.executeQuery(select_fixture, conString, function(result) {
                    expect(result.rowCount).toBe(1);
                    expect(result.rows[0].email_address).toBe('new.user@foo.bar');
                    expect(result.rows[0].status).toBe(0);
                });
            });

            it("Should not be able to log in", function() {
                home.showLoginBox();
                home.login('new.user@foo.bar', 'phantom');
                ptor.sleep(2000);
                expect(home.loginLink().isDisplayed()).toBe(true);
                expect(home.isCurrentPage()).toBe(false);
                expect(reactivate_page.isCurrentPage()).toBe(true);
            });
        });
});
