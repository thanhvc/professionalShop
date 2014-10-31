/**
 * Created by robgon on 26/09/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js')
var sha512 = require('sha512')
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var MySubscriptions = require('../../../test-helpers/page-objects/mySubscriptions.po.js');
var Cart = require('../../../test-helpers/page-objects/cart.po.js');


describe('the My Subscriptions page', function () {
        var page;
        var conString = browser.params.sqlCon;
        var cart = new Cart();
        beforeEach(function () {
            var fixtures = [
                {
                    type: 'insert',
                    table: 'users',
                    values: {
                        id: 1,
                        name: 'John',
                        surname: 'Snow',
                        creation_date: '10-06-2014',
                        address: 'The wall',
                        city: 'North',
                        zip_code: 'Fr3zz3',
                        email_address: 'john.snow@thewall.north',
                        sha_password: "\\x" + sha512("phantom").toString('hex'),
                        status: 1
                    }
                },
                {
                    type: 'insert',
                    table: 'region',
                    values: {
                        code: 'CAN',
                        name: 'Canada',
                        area_code: 0
                    }
                },
                {
                    type: 'insert',
                    table: 'pack',
                    values: {
                        code: 'CAN-S-1',
                        region_code: 'CAN',
                        name: 'Canada Simple 1',
                        product_type: 0,
                        publication_date: '2014-07-04',
                        scope_text: 'Simple Pack 1 text',
                        pattern_type: 0,
                        subname: ' '
                    }
                },
                {
                    type: 'insert',
                    table: 'published_packs',
                    values: {
                        pack_code: 'CAN-S-1',
                        pack_month: 201411, //date of the month of the pack ALWAYS actual month
                        publication_date: '2014-09-15',
                        num_patterns: 50,
                        letter_from: 'aaa',
                        letter_until: 'zzz'
                    }
                }
            ];
            loadFixture.executeQueries(fixtures, conString);
            // loadFixture.loadMultipleFi xture(fixture1, fixture2, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            home.showLoginBox();
            home.login('john.snow@thewall.north','phantom');
        });

        afterEach(function() {
            var fixtures = [
                {
                    type: 'remove',
                    table: 'users',
                    condition: {
                        id: 1
                    }
                },
                {
                    type: 'remove',
                    table: 'published_packs',
                    condition: {
                        pack_code: 'CAN-S-1'
                    }
                },
                {
                    type: 'remove',
                    table: 'pack',
                    condition: {
                        code: 'CAN-S-1'
                    }
                },
                {
                    type: 'remove',
                    table: 'region',
                    condition: {
                        code: 'CAN'
                    }
                }


            ];
            loadFixture.executeQueries(fixtures, conString);
        });

        it(' should available the first element', function () {

            ptor.sleep(2000);
            page = new MySubscriptions();
           // page.open();
            ptor.sleep(4000);
            canadaPurchased = page.getPurchased(0);
            expect(canadaPurchased.getAttribute("disabled")).toBe(null); //is not purchased
            //page.selectMonth(1);
            ptor.sleep(1000);
            //check the 3 options for Canada
            page.selectDuration(0,2);
            ptor.sleep(1000);
            namePackSubs = page.getNamePack(0);
            namePackCart = cart.getSimpleName(0);

            namePackSubs = element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index")
                .row(0)).all(by.tagName('td')).get(0).element(by.tagName('span'))
            expect(namePackCart.getText()).toEqual(namePackSubs.getText());
            namePackSubs.getText().then(function(text) {
                console.log("pack in sub:"+text);
            });

            //selectedCart = cart.getSimpleDuration(0);

            /*
            * Select options of duration in subscription, and check that are synchronized in cart
            * */
            page.selectDuration(0,2);
            ptor.sleep(1000);
            selectorSub = cart.getSelector(0);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("Anual");
            page.selectDuration(0,1);
            ptor.sleep(1000);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("Trimestral");
            page.selectDuration(0,0);
            ptor.sleep(1000);
            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("Mensual");
            /*
            * now viceversa, change in cart and synchro in sub
            * */

            cart.selectSimpleDuration(0,2);
            ptor.sleep(1000);
            selectorSub = page.getSelector(0);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("2");
            cart.selectSimpleDuration(0,1);
            ptor.sleep(1000);

            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("1");
            cart.selectSimpleDuration(0,0);
            ptor.sleep(1000);
            expect(selectorSub.$('option:checked').getAttribute("value")).toEqual("0");
        });


    }
);