/**
 * Created by David Verdú on 6/11/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var SignUp = require('../../../test-helpers/page-objects/signup.po.js');
var Helper = require('../../../test-helpers/helper.js');

describe('the Sign Up page', function () {
        var page;
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

        it(' should show error message when no field is filled in', function () {

            ptor.sleep(2000);
            page = new SignUp();
            ptor.sleep(2000);
            page.clickContinue();
            ptor.sleep(2000);

/*
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

*/
        });

});
