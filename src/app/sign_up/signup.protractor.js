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
var Helper = require('../../../test-helpers/helper.js');

describe('the Sign Up page', function () {
        var signup_page;
        var signup_step2_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.signup_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            //home.showLoginBox();
            //home.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //home.logout(); //TODO
            ptor.sleep(1000);
            var fixtures = fixtureGenerator.remove_signup_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        xdescribe('test link to signup page logged out', function() {
            beforeEach(function() {
                ptor.sleep(2000);
                signup_page = new SignUp(false);
                ptor.sleep(2000);
            });

            it('signup page link must be present', function() {
                expect(home.signupLink().isPresent()).toBe(true);
                expect(home.logoutLink().isPresent()).toBe(false);
                expect(home.myAccountLink().isPresent()).toBe(false);
            });

            it('should go to signup page if I click on signup link', function() {
                expect(home.signupLink().isPresent()).toBe(true);
                home.signupLink().click();
                ptor.sleep(2000);
                expect(signup_page.isCurrentPage()).toBe(true);
            });
        });

        xdescribe('test signup link and page when logged in', function() {
            beforeEach(function() {
                ptor.sleep(2000);
                home.showLoginBox();
                home.login('registered.user@foo.bar', 'phantom');
                ptor.sleep(5000);
            });
        
            afterEach(function () {
                home.logout();
                ptor.sleep(1000);
            });

            it('signup page link must not be present', function() {
                expect(home.signupLink().isPresent()).toBe(false);
                expect(home.logoutLink().isPresent()).toBe(true);
                expect(home.myAccountLink().isPresent()).toBe(true);
            });

            it('should exit from signup page if I enter that url when I am logged in', function() {
                signup_page = new SignUp(true);
                ptor.sleep(3000);
                expect(signup_page.isCurrentPage()).toBe(false);
            });
        });

        xdescribe('validations on first step page', function() {
            
            beforeEach(function() {
                ptor.sleep(2000);
                signup_page = new SignUp();
                ptor.sleep(2000);
            });

            xit('should show error message when click on continue with no field filled in', function () {

                signup_page.clickContinue();
                ptor.sleep(1000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                //TODO need to be fixed in the application code
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('missing_required_fields'), 'ng-hide')).toBe(false);
            });

            xit('should show error message when click on continue with incorrect email', function () {
                signup_page.fillInEmail("incorrect_email");
                signup_page.fillInEmailConfirmation("incorrect_email");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(1000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('email_invalid'), 'ng-hide')).toBe(false);
                //expect(helper.hasClass(signup_page.getErrorMessageElement('missing_required_fields'), 'ng-hide')).toBe(false);
            });

            xit('should show error message when click on continue with mismatch email', function () {
                signup_page.fillInEmail("new.email@foo.bar");
                signup_page.fillInEmailConfirmation("mismatch.email@foo.bar");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(1000);
                
                //I still in this page after click continue
                expect(signup_page.isCurrentPage()).toBe(true);

                //the error message should be shown
                expect(signup_page.errorMessagesCount()).toBe(1);
                expect(helper.hasClass(signup_page.getErrorMessageElement('email_mismatch'), 'ng-hide')).toBe(false);
            });

            xit('should show error message when click on continue with password too short', function () {
                signup_page.fillInEmail("new.email@foo.bar");
                signup_page.fillInEmailConfirmation("new.email@foo.bar");
                signup_page.fillInPassword("short");
                signup_page.fillInPasswordConfirmation("short");
               
                signup_page.clickContinue();
                ptor.sleep(3000);
                
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
                ptor.sleep(2000);
                signup_page.fillInEmail("new.user@foo.bar");
                signup_page.fillInEmailConfirmation("new.user@foo.bar");
                signup_page.fillInPassword("MySecretPassword");
                signup_page.fillInPasswordConfirmation("MySecretPassword");
               
                signup_page.clickContinue();
                ptor.sleep(3000);
                signup_step2_page = new SignUpStep2();
            });

            xit('should be on second step page', function() {
                //I still in this page after click continue
                expect(signup_step2_page.isCurrentPage()).toBe(true);
            });

            describe('second step page validations', function() {
                xit('should display form errors when no field filled in', function() {
                    signup_step2_page.clickSignUp();
                    ptor.sleep(2000);
                    expect(signup_step2_page.errorMessagesCount()).toBe(2);
                });
                
                it('should display form errors when only term condiditions is checked', function() {
                    signup_step2_page.checkAcceptTermConditions();
                    ptor.sleep(1000);
                    signup_step2_page.clickSignUp();
                    ptor.sleep(1000);
                    expect(signup_step2_page.errorMessagesCount()).toBe(1);
                });
            });

            
        }); 


});
