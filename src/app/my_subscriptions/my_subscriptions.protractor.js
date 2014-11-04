/**
 * Created by robgon on 26/09/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var MySubscriptions = require('../../../test-helpers/page-objects/mySubscriptions.po.js');
var Cart = require('../../../test-helpers/page-objects/cart.po.js');
var Helper = require('../../../test-helpers/helper.js');
var PaymentPage = require('../../../test-helpers/page-objects/payment.po.js');
var Paypal = require('../../../test-helpers/page-objects/paypal.po.js');
var MyPatterns = require('../../../test-helpers/page-objects/mypatterns.po.js');


describe('the My Subscriptions page', function () {
        var page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;
        var cart = new Cart();
        beforeEach(function () {
            var fixtures = fixtureGenerator.my_subscription_fixture();
            loadFixture.executeQueries(fixtures, conString);
            // loadFixture.loadMultipleFi xture(fixture1, fixture2, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            home.showLoginBox();
            home.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {

            home.logout();
            ptor.sleep(1000);
            var fixtures = fixtureGenerator.remove_fixtures_subscriptions();
            loadFixture.executeQueries(fixtures, conString);
        });

        it(' should available to select durations and get synch the cart with the page', function () {

            ptor.sleep(2000);
            page = new MySubscriptions();
            // page.open();
            ptor.sleep(2000);
            canadaPurchased = page.getPurchased(0);
            expect(canadaPurchased.getAttribute("disabled")).toBe(null); //is not purchased
            //page.selectMonth(1);
            ptor.sleep(1000);
            //check the 3 options for Canada
            page.selectDuration(0, 2);
            ptor.sleep(1000);
            namePackSubs = page.getNamePack(0);
            namePackCart = cart.getSimpleName(0);

            namePackSubs = element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index")
                .row(0)).all(by.tagName('td')).get(0).element(by.tagName('span'));
            expect(namePackCart.getText()).toEqual(namePackSubs.getText());
            namePackSubs.getText().then(function (text) {
                console.log("pack in sub:" + text);
            });

            //selectedCart = cart.getSimpleDuration(0);

            /*
             * Select options of duration in subscription, and check that are synchronized in cart
             * */
            page.selectDuration(0, 2);
            ptor.sleep(1000);
            selectorSub = cart.getSelector(0);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("Anual");
            page.selectDuration(0, 1);
            ptor.sleep(1000);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("Trimestral");
            page.selectDuration(0, 0);
            ptor.sleep(1000);
            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("Mensual");
            /*
             * now viceversa, change in cart and synchro in sub
             * */

            cart.selectSimpleDuration(0, 2);
            ptor.sleep(1000);
            selectorSub = page.getSelector(0);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("2");
            cart.selectSimpleDuration(0, 1);
            ptor.sleep(1000);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("1");
            cart.selectSimpleDuration(0, 0);
            ptor.sleep(1000);
            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("0");


        });

        it(' should available to purchase a pack', function () {
            var payment = new PaymentPage();
            var paypal = new Paypal();
            ptor.sleep(2000);
            page = new MySubscriptions();
            // page.open();
            ptor.sleep(4000);
            canadaPurchased = page.getPurchased(0);
            expect(canadaPurchased.getAttribute("disabled")).toBe(null); //is not purchased
            //page.selectMonth(1);
            ptor.sleep(1000);
            //check the 3 options for Canada
            page.selectDuration(0, 2);
            ptor.sleep(1000);
            /*try a basic purchase*/
            cart.getPurchaseButton().click();
            ptor.sleep(2000);
            //now we are in the pre-payment page (summary) - try pay with paypal
            //check if i can pay without accept terms and conditions

            expect(helper.hasClass(payment.getTermsErrorMessage(), 'ng-hide')).toBe(true); //the error message is hidden
            payment.getPayButton().click();
            ptor.sleep(1000);
            expect(helper.hasClass(payment.getTermsErrorMessage(), 'ng-hide')).toBe(false);
            //after click to purchase, the error message is shown
            ptor.sleep(1000);
            // expect(helper.hasClass(payment.getTemsCheckBox(),"ng-pristine ng-invalid ng-invalid-required")).toBe(true);
            expect(payment.getTemsCheckBox().getAttribute('class')).toBe('ng-pristine ng-invalid ng-invalid-required');
            payment.getTemsCheckBox().click(); //accept terms and conditions
            ptor.sleep(500);
            //now check that the loading message (trasnfering to paypal) is hidden, and after click the button is shown
            //expect(helper.hasClass(payment.getLoadingMessage(),"doing-payment ng-hide")).toBe(true);
            expect(payment.getLoadingMessage().getAttribute('class')).toBe('doing-payment ng-hide');
            ptor.sleep(500);
            payment.getPayButton().click();
            ptor.sleep(500);
            // expect(helper.hasClass(payment.getLoadingMessage(),"doing-payment ng-hide")).toBe(false);
            expect(payment.getLoadingMessage().getAttribute('class')).toBe('doing-payment');
            ptor.sleep(10000);
            ptor.getCurrentUrl().then(function (data) {
                console.log("url is " + data);
                expect(data.indexOf("paypal.com")).toBeGreaterThan(-1);
            });

            //we are in the paypal page, use the test user to pay
            paypal.doPayment("test12@testedo.com", "testing123", ptor);//navigate in the paypal page to do the payment
            console.log("end payment");
            var myPatterns = new MyPatterns();
            var nameAsset = myPatterns.getName(0,0);
            expect(nameAsset.getText()).toEqual("Long name Asset 1");
            nameAsset.getText().then(function (data) {
                console.log("found pattern 1 of the purchased pack:" + data);
            });

        });
    }
);