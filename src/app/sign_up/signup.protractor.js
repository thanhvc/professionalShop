/**
 * Created by David Verdú on 6/11/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/signup-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var SignUp = require('../../../test-helpers/page-objects/signup.po.js');
var SignUpStep2 = require('../../../test-helpers/page-objects/signup_step2.po.js');
var SignUpSuccessful = require('../../../test-helpers/page-objects/signup_successful.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDate("2014-11-17 11:30:00");
ptor.sleep(9000);

describe('the Sign Up page', function () {
        var signup_page;
        var signup_step2_page;
        var signup_successful_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var queue = [];

        beforeEach(function () {
            var fixtures = fixtureGenerator.signup_fixture();
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
            var fixtures = fixtureGenerator.remove_signup_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        describe('test link to signup page logged out', function() {
            beforeEach(function() {
                ptor.sleep(2000);
                signup_page = new SignUp(false);
                ptor.sleep(2000);
            });

            it('signup page link must be present', function() {
                expect(home.signupLink().isDisplayed()).toBe(true);
                //expect(home.logoutLink().isDisplayed()).toBe(false);
                //expect(home.myAccountLink().isDisplayed()).toBe(false);
            });

            it('should go to signup page if I click on signup link', function() {
                expect(home.signupLink().isDisplayed()).toBe(true);
                home.signupLink().click();
                ptor.sleep(4000);
                expect(signup_page.isCurrentPage()).toBe(true);
            });
        });

        describe('test signup link and page when logged in', function() {
            beforeEach(function() {
                ptor.sleep(2000);
                home.showLoginBox();
                home.login('registered.user@foo.bar', 'phantom');
                ptor.sleep(8000);
            });
        
            afterEach(function () {
                home.logout();
                ptor.sleep(2000);
            });

            it('signup page link must not be present', function() {
                //expect(home.signupLink().isDisplayed()).toBe(false);
                expect(home.logoutLink().isDisplayed()).toBe(true);
                expect(home.myAccountLink().isDisplayed()).toBe(true);
            });

            it('should exit from signup page if I enter that url when I am logged in', function() {
                signup_page = new SignUp(true);
                ptor.sleep(4000);
                expect(signup_page.isCurrentPage()).toBe(false);
            });
        });

        describe('validations on first step page', function() {
            
            beforeEach(function() {
                ptor.sleep(2000);
                signup_page = new SignUp();
                ptor.sleep(6000);
            });

            it('should show error message when click on continue with no field filled in', function () {

                signup_page.clickContinue();
                ptor.sleep(8000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                //TODO need to be fixed in the application code
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('missing_required_fields'), 'ng-hide')).toBe(false);
            });

            it('should show error message when click on continue with incorrect email', function () {
                signup_page.fillInEmail("incorrect_email");
                signup_page.fillInEmailConfirmation("incorrect_email");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(4000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                //TODO need to be fixed in the application code
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('email_invalid'), 'ng-hide')).toBe(false);
                //expect(helper.hasClass(signup_page.getErrorMessageElement('missing_required_fields'), 'ng-hide')).toBe(false);
            });

            it('should show error message when click on continue with mismatch email', function () {
                signup_page.fillInEmail("new.email@foo.bar");
                signup_page.fillInEmailConfirmation("mismatch.email@foo.bar");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(6000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('email_mismatch'), 'ng-hide')).toBe(false);
            });

            it('should show error message when click on continue with password too short', function () {
                signup_page.fillInEmail("new.email@foo.bar");
                signup_page.fillInEmailConfirmation("new.email@foo.bar");
                signup_page.fillInPassword("short");
                signup_page.fillInPasswordConfirmation("short");
               
                signup_page.clickContinue();
                ptor.sleep(4000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('password_minlength'), 'ng-hide')).toBe(false);
                expect(helper.hasClass(signup_page.getErrorMessageElement('password_mismatch'), 'ng-hide')).toBe(true);
            });

            it('should show error message when click on continue with password with invalid characters', function () {
                signup_page.fillInEmail("new.email@foo.bar");
                signup_page.fillInEmailConfirmation("new.email@foo.bar");
                signup_page.fillInPassword("weirdPattern?%_ñÑ&");
                signup_page.fillInPasswordConfirmation("weirdPattern?%_ñÑ&");
               
                signup_page.clickContinue();
                ptor.sleep(3000);
                ptor.sleep(3000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('password_invalid_characters'), 'ng-hide')).toBe(false);
                expect(helper.hasClass(signup_page.getErrorMessageElement('password_mismatch'), 'ng-hide')).toBe(true);
            });

            it('should show error message when click on continue with a repeated email with a validated', function () {
                signup_page.fillInEmail("registered.user@foo.bar");
                signup_page.fillInEmailConfirmation("registered.user@foo.bar");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(3000);
                ptor.sleep(3000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('email_used'), 'ng-hide')).toBe(false);
            });

            it('should show error message when click on continue with a repeated email with a pending user', function () {
                signup_page.fillInEmail("pending.user@foo.bar");
                signup_page.fillInEmailConfirmation("pending.user@foo.bar");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(3000);
                ptor.sleep(3000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('email_used'), 'ng-hide')).toBe(false);
            });

            it('should show error message when click on continue with a repeated email with an expired user', function () {
                signup_page.fillInEmail("expired.user@foo.bar");
                signup_page.fillInEmailConfirmation("expired.user@foo.bar");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(3000);
                ptor.sleep(3000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('email_used'), 'ng-hide')).toBe(false);
            });

        });
        
        describe('go to second step page', function() {
            
            beforeEach(function() {
                ptor.sleep(2000);
                signup_page = new SignUp();
                ptor.sleep(6000);
                signup_page.fillInEmail("new.user@foo.bar");
                signup_page.fillInEmailConfirmation("new.user@foo.bar");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(3000);
                signup_step2_page = new SignUpStep2();
            });

            it('should be on second step page', function() {
                //I still in this page after click sign up
                expect(signup_step2_page.isCurrentPage()).toBe(true);
            });

            describe('second step page validations', function() {
                it('should display form errors when no field filled in', function() {
                    signup_step2_page.clickSignUp();
                    ptor.sleep(2000);
                    expect(signup_step2_page.errorMessagesCount()).toBe(3);
                    //I still in this page after click sign up
                    expect(signup_step2_page.isCurrentPage()).toBe(true);
                    expect(helper.hasClass(signup_step2_page.getErrorMessageElement('missing_required_fields'), 'ng-hide')).toBe(false);
                    expect(helper.hasClass(signup_step2_page.getErrorMessageElement('terms_contidions_must_be_accepted'), 'ng-hide')).toBe(false);
                    ptor.sleep(9000);
                });
                
                it('should display form errors when only term condiditions is checked', function() {
                    signup_step2_page.checkAcceptTermConditions();
                    ptor.sleep(1000);
                    signup_step2_page.clickSignUp().then(function() { ptor.sleep(2000); }).then(function() {
                        expect(signup_step2_page.errorMessagesCount()).toBe(2);
                        //I still in this page after click sign up
                        expect(signup_step2_page.isCurrentPage()).toBe(true);
                        expect(helper.hasClass(signup_step2_page.getErrorMessageElement('missing_required_fields'), 'ng-hide')).toBe(false);
 
                        var select_fixture = fixtureGenerator.select_user_fixture({email_address: "new.user@foo.bar"});
                        loadFixture.executeQuery(select_fixture, conString, function(result) {
                            expect(result.rowCount).toBe(0);
                        });

                    });
                });

                it('should display captha error when is bad entered', function() {
                    signup_step2_page.fillInName("John Doe");
                    //signup_step2_page.fillInSurname("Doe");
                    signup_step2_page.fillInAddress("Mesa y López 16");
                    signup_step2_page.fillInCity("Las Palmas de Gran Canaria");
                    signup_step2_page.fillInPostal("35012");
                    signup_step2_page.selectCountry();
                    signup_step2_page.fillInCaptcha(signup_step2_page.getCaptchaInvalidResult());
                    signup_step2_page.checkAcceptTermConditions();
                    ptor.sleep(1000);
                    signup_step2_page.clickSignUp().then(function() { ptor.sleep(2000); }).then(function() {
                        expect(signup_step2_page.errorMessagesCount()).toBe(1);
                        //I still in this page after click sign up
                        expect(signup_step2_page.isCurrentPage()).toBe(true);
                        expect(helper.hasClass(signup_step2_page.getErrorMessageElement('captcha_error'), 'ng-hide')).toBe(false);
 
                        var select_fixture = fixtureGenerator.select_user_fixture({email_address: "new.user@foo.bar"});
                        loadFixture.executeQuery(select_fixture, conString, function(result) {
                            expect(result.rowCount).toBe(0);
                        });

                    });
                });
            });

            describe('second step page correct form', function() {
            
                beforeEach(function() {
                    signup_successful_page = new SignUpSuccessful();
                    ptor.sleep(2000);
                });

                afterEach(function () {
                    expect(queue.length).toEqual(0); //1 email should be sent
                });

                it('should register user and send email', function() {

                    queue.push( { sender: 'market.observatory@edosoftfactory.com',
                        receivers: { 'new.user@foo.bar': true },
                        subject: 'Activation Email user account (Market Observatory)'
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
                                expect(window.$("a").attr('href')).toMatch('marketobservatory.com\\/#\\/activate\\/');
                                expect(window.$("span").text()).toMatch('John Doe');
                            }
                        );
                    };

                    signup_step2_page.fillInName("John Doe");
                    //signup_step2_page.fillInSurname("Doe");
                    signup_step2_page.fillInAddress("Mesa y López 16");
                    signup_step2_page.fillInCity("Las Palmas de Gran Canaria");
                    signup_step2_page.fillInPostal("35012");
                    signup_step2_page.selectCountry();
                    signup_step2_page.fillInCaptcha(signup_step2_page.getCaptchaResult());
                    signup_step2_page.checkAcceptTermConditions();
                    ptor.sleep(6000);
                    
                    var ms = require('smtp-tester').init(2025,{"disableDNSValidation":true});
                    ms.bind(handler);
                    ptor.sleep(2000);

                    signup_step2_page.clickSignUp().then(function() { ptor.sleep(40000); }).then(function(data) {
                        ptor.sleep(40000);
                        expect(signup_successful_page.isCurrentPage()).toBe(true);

                        var select_fixture = fixtureGenerator.select_user_fixture({email_address: "new.user@foo.bar"});
                        loadFixture.executeQuery(select_fixture, conString, function(result) {
                            expect(result.rowCount).toBe(1);
                            expect(result.rows[0].name).toBe('John Doe');
                            expect(result.rows[0].email_address).toBe('new.user@foo.bar');
                        });
                    }).then(function() {    
                        var select_fixture = fixtureGenerator.select_email_log_fixture({destiny_address: "new.user@foo.bar"});
                        loadFixture.executeQuery(select_fixture, conString, function(result) {
                            expect(result.rowCount).toBe(1);
                        });
                        return 0;

                    }).then(function() { ptor.sleep(2000); }).then(function() {    
                        var select_fixture = fixtureGenerator.select_free_subscription_fixture();
                        loadFixture.executeQuery(select_fixture, conString, function(result) {
                            expect(result.rowCount).toBe(2);
                            expect(result.rows[0].free_pack_code).toBe('11');
                        });

                    });
                    

                });

            });
            
        }); 


});
