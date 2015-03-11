
/**
 * Created by David Verdú on 17/12/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/change-password-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var ChangePassword = require('../../../test-helpers/page-objects/change-password.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDate("2014-11-17 11:30:00");
ptor.sleep(9000);

describe('change password page', function () {
        var change_password_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];

        beforeEach(function () {
            var fixtures = fixtureGenerator.change_password_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            ptor.sleep(2000);
            //home.showLoginBox();
            //home.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //home.logout(); //TODO
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_change_password_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });


        describe("correct token on time to change password", function() {
            beforeEach(function () {
                change_password_page = new ChangePassword('LVK567V01KAOPMMGFNL8');
                ptor.sleep(2000);
            });
             
            it("should be on change password page", function() {
                expect(change_password_page.isCurrentPage()).toBe(true);
                expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
            });

            describe("new password with correct pattern and length", function() {
                beforeEach(function() {
                    change_password_page.fillInPassword("Phantom_2_ghost");
                    change_password_page.fillInPasswordConfirmation("Phantom_2_ghost");
                    change_password_page.clickChangePassword();
                    ptor.sleep(3000);
                });
                
                it("should change user password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(true);
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "ontime.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('ontime.user@foo.bar');
                        expect(result.rows[0].status).toBe(1);
                        expect(String(result.rows[0].change_password_date)).not.toContain("Nov 17 2014");
                        expect(String(result.rows[0].sign_up_token).length).not.toBe(20);
                        expect(String(result.rows[0].auth_token).length).toBe(36);
                    });
                });

                it("should be able to login with new password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(true);
                    expect(home.myAccountLink().isDisplayed()).toBe(true);
                    home.logout();
                    ptor.sleep(2000);
                    expect(home.loginLink().isDisplayed()).toBe(true);
                    home.showLoginBox();
                    home.login('ontime.user@foo.bar', 'Phantom_2_ghost');
                    ptor.sleep(4000);
                    expect(home.myAccountLink().isDisplayed()).toBe(true);
                    ptor.sleep(3000);
                    home.logout();
                });

            });

            describe("new password with incorrect length", function() {
                beforeEach(function() {
                    change_password_page.fillInPassword("short");
                    change_password_page.fillInPasswordConfirmation("short");
                    change_password_page.clickChangePassword();
                    ptor.sleep(3000);
                });
                
                it("should not change user password because it is too short", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_invalid').isDisplayed()).toBe(true); //TODO this test should not fail
                    expect(change_password_page.getValidationMessage('password_mismatch').isDisplayed()).toBe(false); //TODO this test should not fail
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "ontime.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('ontime.user@foo.bar');
                        expect(result.rows[0].status).toBe(1);
                        expect(String(result.rows[0].change_password_date)).toContain("Nov 17 2014");
                        expect(String(result.rows[0].sign_up_token).length).toBe(20);
                        expect(String(result.rows[0].auth_token).length).not.toBe(36);
                    });
                });

                it("should be able to login with old password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    expect(home.loginLink().isDisplayed()).toBe(true);
                    home.showLoginBox();
                    home.login('ontime.user@foo.bar', 'phantom');
                    ptor.sleep(4000);
                    expect(home.myAccountLink().isDisplayed()).toBe(true);
                    ptor.sleep(3000);
                    home.logout();
                });

            });

            describe("new password with incorrect pattern", function() {
                beforeEach(function() {
                    change_password_page.fillInPassword("Weird?ª!$pattern");
                    change_password_page.fillInPasswordConfirmation("Weird?ª!$pattern");
                    change_password_page.clickChangePassword();
                    ptor.sleep(3000);
                });
                
                it("should not change user password because it is incorrect pattern", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_invalid').isDisplayed()).toBe(false); //TODO this test should not fail
                    expect(change_password_page.getValidationMessage('password_incorrect_pattern').isDisplayed()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_mismatch').isDisplayed()).toBe(false); //TODO this test should not fail
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "ontime.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('ontime.user@foo.bar');
                        expect(result.rows[0].status).toBe(1);
                        expect(String(result.rows[0].change_password_date)).toContain("Nov 17 2014");
                        expect(String(result.rows[0].sign_up_token).length).toBe(20);
                        expect(String(result.rows[0].auth_token).length).not.toBe(36);
                    });
                });

                it("should be able to login with old password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    expect(home.loginLink().isDisplayed()).toBe(true);
                    home.showLoginBox();
                    home.login('ontime.user@foo.bar', 'phantom');
                    ptor.sleep(4000);
                    expect(home.myAccountLink().isDisplayed()).toBe(true);
                    ptor.sleep(3000);
                    home.logout();
                });

            });

            describe("new password with password mismatch", function() {
                beforeEach(function() {
                    change_password_page.fillInPassword("newpassword");
                    change_password_page.fillInPasswordConfirmation("mismatch");
                    change_password_page.clickChangePassword();
                    ptor.sleep(3000);
                });
                
                it("should not change user password because it do not match confirmacion", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_invalid').isDisplayed()).toBe(false); //TODO this test should not fail
                    expect(change_password_page.getValidationMessage('password_incorrect_pattern').isDisplayed()).toBe(false);
                    expect(change_password_page.getValidationMessage('password_mismatch').isDisplayed()).toBe(true); 
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "ontime.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('ontime.user@foo.bar');
                        expect(result.rows[0].status).toBe(1);
                        expect(String(result.rows[0].change_password_date)).toContain("Nov 17 2014");
                        expect(String(result.rows[0].sign_up_token).length).toBe(20);
                        expect(String(result.rows[0].auth_token).length).not.toBe(36);
                    });
                });

                it("should be able to login with old password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    expect(home.loginLink().isDisplayed()).toBe(true);
                    home.showLoginBox();
                    home.login('ontime.user@foo.bar', 'phantom');
                    ptor.sleep(4000);
                    expect(home.myAccountLink().isDisplayed()).toBe(true);
                    ptor.sleep(3000);
                    home.logout();
                });

            });

        });

        describe("correct token out of time to change password", function() {
            beforeEach(function () {
                change_password_page = new ChangePassword('ABCD1111222233334444');
                ptor.sleep(2000);
            });
             
            it("should be on change password page with incorrect token message", function() {
                expect(change_password_page.isCurrentPage()).toBe(true);
                expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                expect(change_password_page.getValidationMessage('incorrect_token').isDisplayed()).toBe(true);
            });

            describe("new password with correct pattern and length", function() {
                beforeEach(function() {
                    change_password_page.fillInPassword("Phantom_2_ghost");
                    change_password_page.fillInPasswordConfirmation("Phantom_2_ghost");
                    change_password_page.clickChangePassword();
                    ptor.sleep(3000);
                });
                
                it("should not change user password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('incorrect_token').isDisplayed()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "out_of_time.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('out_of_time.user@foo.bar');
                        expect(result.rows[0].status).toBe(1);
                        expect(String(result.rows[0].change_password_date)).toContain("Nov 17 2014");
                        expect(String(result.rows[0].sign_up_token).length).toBe(20);
                        expect(String(result.rows[0].auth_token).length).not.toBe(36);
                    });
                });

                it("should be able to login with old password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                    expect(home.loginLink().isDisplayed()).toBe(true);
                    home.showLoginBox();
                    home.login('out_of_time.user@foo.bar', 'phantom');
                    ptor.sleep(4000);
                    expect(home.myAccountLink().isDisplayed()).toBe(true);
                    ptor.sleep(3000);
                    home.logout();
                });

            });
        });

        describe("correct token on time but expired", function() {
            beforeEach(function () {
                change_password_page = new ChangePassword('EEEEEEEEEEEEEEEEEEEE');
                ptor.sleep(2000);
            });
             
            it("should be on change password page with incorrect token message", function() {
                expect(change_password_page.isCurrentPage()).toBe(true);
                expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                expect(change_password_page.getValidationMessage('incorrect_token').isDisplayed()).toBe(false);
            });

            describe("new password with correct pattern and length", function() {
                beforeEach(function() {
                    change_password_page.fillInPassword("Phantom_2_ghost");
                    change_password_page.fillInPasswordConfirmation("Phantom_2_ghost");
                    change_password_page.clickChangePassword();
                    ptor.sleep(3000);
                });
                
                it("should change user password", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(true);
                    var select_fixture = fixtureGenerator.select_user_fixture({email_address: "expired.user@foo.bar"});
                    loadFixture.executeQuery(select_fixture, conString, function(result) {
                        expect(result.rowCount).toBe(1);
                        expect(result.rows[0].email_address).toBe('expired.user@foo.bar');
                        expect(result.rows[0].status).toBe(2);
                        expect(String(result.rows[0].change_password_date)).not.toContain("Nov 17 2014");
                        expect(String(result.rows[0].sign_up_token).length).not.toBe(20);
                        expect(String(result.rows[0].auth_token).length).toBe(36);
                    });
                });

                it("should not automatically login because is still an expired user", function() {
                    expect(change_password_page.isCurrentPage()).toBe(true);
                    expect(home.loginLink().isDisplayed()).toBe(true); //TODO this should not fail
                });

            });
        });

        describe("incorrect validation code", function() {
            beforeEach(function () {
                change_password_page = new ChangePassword('FOO');
                ptor.sleep(2000);
            });
            
            it("should be on change password page with incorrect token message", function() {
                expect(change_password_page.isCurrentPage()).toBe(true);
                expect(change_password_page.getValidationMessage('password_correctly_modified').isDisplayed()).toBe(false);
                expect(change_password_page.getValidationMessage('incorrect_token').isDisplayed()).toBe(true);
            });

             
        });
});
