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
            var fixtures = fixtureGenerator.my_subscription_fixture();/*[
                {
                    type: 'insert',
                    table: 'country',
                    values: {
                        code: 'ES',
                        name: 'Spain'
                    }
                },
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
                        status: 1,
                        country_code: 'ES'
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
                },{
                    type: 'insert',
                    table: 'pack',
                    values: {
                        code: 'CAN-S-2',
                        region_code: 'CAN',
                        name: 'Canada Simple II',
                        product_type: 0,
                        publication_date: '2014-07-04',
                        scope_text: 'Simple Pack 2 text',
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
                },{
                    type: 'insert',
                    table: 'published_packs',
                    values: {
                        pack_code: 'CAN-S-2',
                        pack_month: 201411, //date of the month of the pack ALWAYS actual month
                        publication_date: '2014-09-15',
                        num_patterns: 50,
                        letter_from: 'aaa',
                        letter_until: 'zzz'
                    }
                }, {
                    type: 'insert',
                    table: 'subscription',
                    values: {
                        subscription_disc: 1,
                        id: 1,
                        pack_code: 'CAN-S-2',
                        user_id: 1,
                        subscription_date: '2014-09-05',
                        start_date: '2014-09-01',
                        subscription_duration: 2,
                        end_date: '2015-09-01',
                        status: 0
                    }
                },{
                    type: 'insert',
                    table: 'currency',
                    values: {
                        code: 'CU1',
                        symbol:'CU1',
                        name:'Currency1'
                    }
                },{
                    type: 'insert',
                    table: 'exchange',
                    values: {
                        symbol: 'EX1',
                        name: 'exchange1',
                        currency_code: 'CU1',
                        region_code:'CAN',
                        sector_group: 'SectGroup1'
                    }
                },
                {
                    type: 'insert',
                    table: 'asset',
                    values: {
                        asset_disc: 1,
                        symbol: 'ASSET1',
                        short_name: 'Asset 1',
                        long_name: 'Long name Asset 1',
                        last_quote: 27.7,
                        last_quote_date: '2014-10-30',
                        price_chart_url: 'www.urlPriceChart.com',
                        volatility: 19.20,
                        exchange_symbol: 'EX1',
                        sector: 'Sector1',
                        industry: 'Industry1',
                        expiration_year: null,
                        expiration_month: null,
                        volatility_chart_url: 'www.urlVolatChart.com'
                    }
                }, {
                    type: 'insert',
                    table: 'pattern',
                    values: {
                        pattern_disc: 1,
                        id: 1,
                        pack_code: 'CAN-S-1',
                        pattern_type: 0,
                        win: 14,
                        loss: 1,
                        asset_symbol: 'ASSET1',
                        entry_date: '2014-11-11',
                        exit_date:'2014-05-03',
                        accumulated_return:212.33,
                        average_return:14.16,
                        daily_return:0.08,
                        entry_value:null,
                        effective_entry_date:null,
                        exit_value:null,
                        effective_exit_date:null,
                        pattern_close_chart_url: 'www.chartUrl1.com',
                        pattern_six_years_chart_url:'www.sixYearsChartUrl',
                        week_trend_chart_url:'www.chartWeekUrl',
                        month_trend_chart_url:'monthTrendUrl',
                        duration:173,
                        best_gain:null,
                        best_gain_date: null,
                        worst_loss:null,
                        worst_loss_date:null,
                        last_performance:null,
                        bearish_asset_symbol:null,
                        bearish_average_return:null,
                        bullish_average_return:null,
                        bearish_entry_value:null,
                        bearish_exit_value:null,
                        daily_pair_return: null,
                        pair_volatility:null,
                        last_performance_date: null,
                        drawdown: -27.31,
                        winning_years_mean_rent: 220.41,
                        losing_years_mean_rent:-8.08,
                        product_type:0,
                        bullish_average_win:null,
                        bullish_average_loss:null,
                        bearish_average_win:null,
                        bearish_average_loss:null
                    }
                }
            ];*/
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
            var fixtures = fixtureGenerator.remove_fixtures_subscriptions();/*[
                {
                    type: 'remove',
                    table: 'email_log'
                },
                {
                    type: 'remove',
                    table: 'bill'
                },
                {
                    type: 'remove',
                    table: 'payment_item'
                },
                {
                    type: 'remove',
                    table: 'payment'
                },
                {
                    type: 'remove',
                    table: 'subscription'
                },
                {
                    type: 'remove',
                    table: 'users'
                },
                {
                    type: 'remove',
                    table: 'published_packs'
                },
                {
                    type: 'remove',
                    table: 'pattern'
                },
                {
                    type: 'remove',
                    table: 'asset'
                },
                {
                    type:'remove',
                    table: 'exchange'
                },
                {
                    type:'remove',
                    table: 'currency'
                },
                {
                    type: 'remove',
                    table: 'pack'
                },
                {
                    type: 'remove',
                    table: 'region'
                },
                {
                    type: 'remove',
                    table: 'country'
                }




            ];*/
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
            page.selectDuration(0,2);
            ptor.sleep(1000);
            namePackSubs = page.getNamePack(0);
            namePackCart = cart.getSimpleName(0);

            namePackSubs = element(by.repeater("pack in mySubscriptionsTablePack.americaContent track by $index")
                .row(0)).all(by.tagName('td')).get(0).element(by.tagName('span'));
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

        expect(helper.hasClass(payment.getTermsErrorMessage(),'ng-hide')).toBe(true); //the error message is hidden
        payment.getPayButton().click();
        ptor.sleep(1000);
        expect(helper.hasClass(payment.getTermsErrorMessage(),'ng-hide')).toBe(false);
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
        ptor.getCurrentUrl().then(function(data) {
            console.log("url is " + data);
            expect(data.indexOf("paypal.com")).toBeGreaterThan(-1);
        });

        //we are in the paypal page, use the test user to pay
        paypal.doPayment("test12@testedo.com","testing123",ptor);//navigate in the paypal page to do the payment
        console.log("end payment");
        var myPatterns = new MyPatterns();
        var nameAsset = myPatterns.getName(0);
        expect(nameAsset.getText()).toEqual("Long name Asset 1");
        nameAsset.getText().then(function(data) {
            console.log("found pattern 1 of the purchased pack:" + data);
        });

    });





    }
);