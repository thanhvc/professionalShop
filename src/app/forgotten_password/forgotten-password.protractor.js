
/**
 * Created by David Verdú on 15/12/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/forgotten-password-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var ForgottenPassword = require('../../../test-helpers/page-objects/forgotten-password.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDate("2014-11-17 11:30:00");
ptor.sleep(9000);

describe('forgot password page', function () {
        var forgotten_password_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];

        beforeEach(function () {
            var fixtures = fixtureGenerator.forgotten_password_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            forgotten_password_page = new ForgottenPassword();
            ptor.sleep(2000);
            //home.showLoginBox();
            //home.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //home.logout(); //TODO
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_forgotten_password_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it('should be at forgotten password page', function() {
            expect(forgotten_password_page.isCurrentPage()).toBe(true);
        });

        describe("registered user email", function() {
            afterEach(function () {
                expect(queue.length).toEqual(0); //1 email should be sent
            });

            it("should send change password link by email", function() {
                queue.push( { sender: 'market.observatory@edosoftfactory.com',
                    receivers: { 'registered.user@foo.bar': true },
                    subject: 'Recuperar Contraseña Market Observatory'
                });

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
                            expect(window.$("a").attr('href')).toMatch('marketobservatory.com\\/#\\/change-password\\/');
                            //expect(window.$("span").text()).toMatch('John Doe');
                        }
                    );
                };

                var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
                ms.bind(handler);
                ptor.sleep(2000);

                forgotten_password_page.fillInEmail("registered.user@foo.bar");
                forgotten_password_page.clickContinue().then(function() {
                    ptor.sleep(10000);
                }).then(function() {
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "registered.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('registered.user@foo.bar');
                        expect(result.rows[0].status).toBe(1);
                        expect(String(result.rows[0].change_password_date)).toContain("Nov 17 2014");
                        expect(result.rows[0].sign_up_token.length).toBe(20);
                    });
                });
            });

        });

        describe("pending user email", function() {
            afterEach(function () {
                expect(queue.length).toEqual(1); //no email should be sent
            });

            it("should not send change password link by email because is not activated", function() {
                queue.push( { sender: 'market.observatory@edosoftfactory.com',
                    receivers: { 'pending.user@foo.bar': true },
                    subject: 'Recuperar Contraseña Market Observatory'
                });

                handler = function(addr,id,email) {
                    expect(queue.length).not.toEqual(0);
                    msg = queue.shift();
                    console.log(addr);
                    console.log(id);
                    console.log(email);
                    expect(true).toBe(false); //mail should not be sent
                };

                var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
                ms.bind(handler);
                ptor.sleep(2000);

                forgotten_password_page.fillInEmail("pending.user@foo.bar");
                forgotten_password_page.clickContinue().then(function() {
                    ptor.sleep(10000);
                }).then(function() {
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "pending.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('pending.user@foo.bar');
                        expect(result.rows[0].status).toBe(0);
                        expect(String(result.rows[0].change_password_date)).not.toContain("Nov 17 2014");
                        expect(result.rows[0].sign_up_token.length).toBe(20);
                        expect(result.rows[0].sign_up_token).toBe('LLLLLLLLLLLLLLLLLLLL');
                    });
                });
            });

        });

        describe("expired user email", function() {
            afterEach(function () {
                expect(queue.length).toEqual(0); //1 email should be sent
            });

            it("should send change password link by email even if it is an expired user", function() {
                queue.push( { sender: 'market.observatory@edosoftfactory.com',
                    receivers: { 'expired.user@foo.bar': true },
                    subject: 'Recuperar Contraseña Market Observatory'
                });

                handler = function(addr,id,email) {
                    expect(queue.length).not.toEqual(0);
                    msg = queue.shift();
                    console.log(addr);
                    console.log(id);
                    console.log(email);
                    expect(true).toBe(false); //mail should not be sent
                };

                var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
                ms.bind(handler);
                ptor.sleep(2000);

                forgotten_password_page.fillInEmail("expired.user@foo.bar");
                forgotten_password_page.clickContinue().then(function() {
                    ptor.sleep(10000);
                }).then(function() {
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "expired.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('expired.user@foo.bar');
                        expect(result.rows[0].status).toBe(2);
                        expect(String(result.rows[0].change_password_date)).toContain("Nov 17 2014");
                        expect(result.rows[0].sign_up_token.length).toBe(20);
                        expect(result.rows[0].sign_up_token).toBe('EEEEEEEEEEEEEEEEEEEE');
                    });
                });
            });

        });

});
