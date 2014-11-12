/**
 * Created by David Verdú on 11/11/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/calendar-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var PageLayout = require('../../../test-helpers/page-objects/page_layout.po.js');
var Calendar = require('../../../test-helpers/page-objects/calendar.po.js');
var Helper = require('../../../test-helpers/helper.js');

xdescribe('Calendar for non logged in users', function () {
        var home;
        var page_layout;
        var calendar_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            page_layout = new PageLayout();
            //page_layout.showLoginBox();
            //page_layout.login('john.snow@thewall.north', 'phantom');
        });

        afterEach(function () {
            //page_layout.logout(); 
            ptor.sleep(1000);
            var fixtures = fixtureGenerator.remove_calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        it('Calendar navigation tab should not appear unless user is logged in', function() {
            expect(page_layout.calendarNavLink().isDisplayed()).toBe(false);
        });

        it('Calendar page should not be accessible for non logged in users', function() {
            calendar_page = new Calendar(true);
            ptor.sleep(2000);
            expect(calendar_page.isCurrentPage()).toBe(false);
            expect(home.isCurrentPage()).toBe(true);
        });
});

describe('Calendar for logged in users', function () {
        var home;
        var page_layout;
        var calendar_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
            browser.ignoreSynchronization = true;
            home = new Home();
            page_layout = new PageLayout();
            page_layout.showLoginBox();
            page_layout.login('john.snow@thewall.north', 'phantom');
            ptor.sleep(3000);
        });

        afterEach(function () {
            page_layout.logout(); 
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });

        xit('Calendar navigation tab should appear if user is logged in', function() {
            expect(page_layout.calendarNavLink().isDisplayed()).toBe(true);
        });

        xit('Calendar navigation tab should link to calendar', function() {
            page_layout.calendarNavLink().click();
            ptor.sleep(2000);
            calendar_page = new Calendar(false);
            expect(calendar_page.isCurrentPage()).toBe(true);
        });

        describe('Inside Calendar page', function() {
            beforeEach(function() {
                calendar_page = new Calendar(true);
                ptor.sleep(3000);
            });
            
            xit('should contain four tabs', function() {
                expect(calendar_page.navTabs().count()).toBe(4);
            });

            describe('Stocks tab',function() {
                beforeEach(function() {
                    ptor.sleep(3000);
                });
 
                describe('in november 2014', function() {
                    describe('ordered by entry date', function() {
                        xit('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) {
                                expect(rows.length).toBe(3);
                            });
                            calendar_page.getPatternDaySlots(0).then(function(slots) {
                                expect(slots.length).toBe(30);
                            });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,9).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,10).isDisplayed()).toBe(false);

                            //second pattern
                            expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 3");
                            expect(helper.hasClass(calendar_page.getSimpleName(1),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,3).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(1,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,17).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,28).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,29).isDisplayed()).toBe(false);
                            
                            //third pattern
                            expect(calendar_page.getSimpleName(2).getText()).toEqual("Long name Asset 2");
                            expect(helper.hasClass(calendar_page.getSimpleName(2),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,9).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBearishSlot(2,10).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,22).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,29).isDisplayed()).toBe(true);
                        });
                           
                        xit('should be true',function() {
                            ptor.sleep(9000);
                            expect(true).toBe(true);
                        });
                        
                        describe('filter by region',function() {
                            xdescribe('Canada', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(1);
                                });
                            
                                it('should select Canada region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) {
                                        expect(rows.length).toBe(2);
                                    });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                    expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 2");
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeCanada1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeCanada2');
                                });
                                
                                it('should select exchangeCanada1 market patterns', function() {
                                    calendar_page.selectMarketFilter(1);
                                    calendar_page.getPatterns().then(function(rows) {
                                        expect(rows.length).toBe(1);
                                    });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                });

                                it('should select exchangeCanada2 market patterns', function() {
                                    calendar_page.selectMarketFilter(2);
                                    calendar_page.getPatterns().then(function(rows) {
                                        expect(rows.length).toBe(1);
                                    });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                                });
                            });
                       
                            describe('USA', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(2);
                                });
                            
                                it('should select USA region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) {
                                        expect(rows.length).toBe(1);
                                    });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeUSA1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeUSA2');
                                });
                                
                                it('should select exchangeUSA1 market patterns', function() {
                                    calendar_page.selectMarketFilter(1);
                                    calendar_page.getPatterns().then(function(rows) {
                                        expect(rows.length).toBe(1);
                                    });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                                });

                                it('should select exchangeUSA2 market patterns', function() {
                                    calendar_page.selectMarketFilter(2);
                                    calendar_page.getPatterns().then(function(rows) {
                                        expect(rows.length).toBe(0);
                                    });
                                });
                            });
                       
                        });
                    });

                    xdescribe('ordered by exit date', function() {
                        beforeEach(function() {
                            calendar_page.selectOrderFilter("exit_date");
                            //ptor.sleep(3000);
                        });
 
                        it('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) {
                                expect(rows.length).toBe(3);
                            });
                            calendar_page.getPatternDaySlots(0).then(function(slots) {
                                expect(slots.length).toBe(30);
                            });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,9).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,10).isDisplayed()).toBe(false);

                            //second pattern
                            expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 4");
                            expect(helper.hasClass(calendar_page.getSimpleName(1),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,9).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,19).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,20).isDisplayed()).toBe(false);
                            
                            //third pattern
                            expect(calendar_page.getSimpleName(2).getText()).toEqual("Long name Asset 3");
                            expect(helper.hasClass(calendar_page.getSimpleName(2),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,3).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(2,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,17).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,28).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,29).isDisplayed()).toBe(false);
                            
                        });
                           
                        xit('should be true',function() {
                            ptor.sleep(9000);
                            expect(true).toBe(true);
                        });
                    });
                });
            });

            xdescribe('Pairs tab',function() {
                beforeEach(function() {
                    calendar_page.goToTab("pairs");
                    ptor.sleep(3000);
                });

                it('should be true',function() {
                    expect(true).toBe(true);
                });
            });

            xdescribe('Indices tab',function() {
                beforeEach(function() {
                    calendar_page.goToTab("indices");
                    ptor.sleep(3000);
                });

                it('should be true',function() {
                    expect(true).toBe(true);
                });
            });

            xdescribe('Futures tab',function() {
                beforeEach(function() {
                    calendar_page.goToTab("futures");
                    ptor.sleep(3000);
                });

                it('should be true',function() {
                    expect(true).toBe(true);
                });
            });

        });
});
