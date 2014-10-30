/**
 * Created by robgon on 26/09/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js')
var sha512 = require('sha512')
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var MySubscriptions = require('../../../test-helpers/page-objects/mySubscriptions.po.js');



describe('the My Subscriptions page', function () {
        var page;
        var conString = browser.params.sqlCon;
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
                        name: 'Canada'
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
                        pack_month: 201409,
                        publication_date: '2014-09-15',
                        num_patterns: 50,
                        letter_from: 'aaa',
                        letter_until: 'zzz'
                    }
                }
            ];
            loadFixture.executeQueries(fixtures, conString);
            // loadFixture.loadMultipleFixture(fixture1, fixture2, conString);
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
                    table: 'pack',
                    condition: {
                        code: 'PACK1'
                    }
                },
                {
                    type: 'remove',
                    table: 'region',
                    condition: {
                        code: 'REGION2'
                    }
                },
                {
                    type: 'remove',
                    table: 'published_packs',
                    condition: {
                        pack_code: 'CAN-S-1'
                    }
                }

            ];
            loadFixture.executeQueries(fixtures, conString);
        });

        it(' should be purchased the first element', function () {

            ptor.sleep(2000);
            page = new MySubscriptions();
           // page.open();
            ptor.sleep(4000);
            canadaPurchased = page.getPurchased(0);
            expect(canadaPurchased).toEqual("true");
            //browser.debugger();
            canadaSelector =  page.getSelector(0);
            expect(canadaSelector.getAttribute("disabled")).toEqual("true");
            page.selectMonth(1);
            ptor.sleep(5000);
            /*canadaPurchased = page.getPurchased(0);
            expect(canadaPurchased).toEqual("true");
            canadaSelector =  page.getSelector(0);
            expect(canadaSelector.getAttribute("disabled")).toEqual("true");*/

        });


    }
);