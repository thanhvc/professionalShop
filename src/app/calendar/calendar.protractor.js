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

describe('Calendar for non logged in users', function () {
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

        it('Calendar navigation tab should appear if user is logged in', function() {
            expect(page_layout.calendarNavLink().isDisplayed()).toBe(true);
        });

        it('Calendar navigation tab should link to calendar', function() {
            page_layout.calendarNavLink().click();
            ptor.sleep(2000);
            calendar_page = new Calendar(false);
            expect(calendar_page.isCurrentPage()).toBe(true);
        });

        describe('Inside Calendar page', function() {
            beforeEach(function() {
                calendar_page = new Calendar(true);
                ptor.sleep(4000);
            });
            
            it('should contain four tabs', function() { expect(calendar_page.navTabs().count()).toBe(4); });

            describe('Stocks tab',function() {
                beforeEach(function() {
                    //ptor.sleep(3000);
                });
 
                describe('in november 2014', function() {
                    describe('ordered by entry date', function() {
                        it('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,9).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,10).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(0,29).isDisplayed()).toBe(false);

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
                           
                        describe('input date filter',function() {
                            it('should appear 2 patterns filtering by 5th day',function() {
                                calendar_page.fillInDayDateInputFilter('5');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 2");
                            });

                            it('should appear 1 pattern filtering by 6th day',function() {
                                calendar_page.fillInDayDateInputFilter('6');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                            });

                            it('should appear 0 patterns filtering by 12th day',function() {
                                calendar_page.fillInDayDateInputFilter('12');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(3000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                            });
                        });
                        
                        describe('filter by operation', function() {
                            it('should filter by Long (Comprar)', function() {
                                calendar_page.selectOperationFilter(1);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 3");
                            });

                            it('should filter by Short (Vender)', function() {
                                calendar_page.selectOperationFilter(2);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                            });
                        });

                        describe('filter by region',function() {
                            describe('Canada', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(1);
                                });
                            
                                it('should select Canada region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                    expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 2");
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeCanada1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeCanada2');
                                });
                                
                                it('should select exchangeCanada1 market patterns', function() {
                                    calendar_page.selectMarketFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                });

                                it('should select exchangeCanada2 market patterns', function() {
                                    calendar_page.selectMarketFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                                });
                            });
                       
                            describe('USA', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(2);
                                });
                            
                                it('should select USA region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeUSA1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeUSA2');
                                });
                                
                                it('should select exchangeUSA1 market patterns', function() {
                                    calendar_page.selectMarketFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                                });

                                it('should select exchangeUSA2 market patterns', function() {
                                    calendar_page.selectMarketFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                       
                        });
                    });

                    describe('ordered by exit date', function() {
                        beforeEach(function() {
                            calendar_page.selectOrderFilter("exit_date");
                            //ptor.sleep(3000);
                        });
 
                        it('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,9).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,10).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(0,29).isDisplayed()).toBe(false);

                            //second pattern
                            expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 4");
                            expect(helper.hasClass(calendar_page.getSimpleName(1),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,9).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,19).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(1,20).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBearishSlot(1,29).isDisplayed()).toBe(false);
                            
                            //third pattern
                            expect(calendar_page.getSimpleName(2).getText()).toEqual("Long name Asset 3");
                            expect(helper.hasClass(calendar_page.getSimpleName(2),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,3).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(2,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,17).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,28).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(2,29).isDisplayed()).toBe(false);
                            
                        });
                           
                        describe('input date filter',function() {
                            it('should appear 2 patterns filtering by 11th day',function() {
                                calendar_page.fillInDayDateInputFilter('11');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 4");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 3");
                            });

                            it('should appear 1 pattern filtering by 21th day',function() {
                                calendar_page.fillInDayDateInputFilter('21');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                            });

                            it('should appear 0 patterns filtering by 30th day',function() {
                                calendar_page.fillInDayDateInputFilter('30');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(3000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                            });
                        });
                        
                        describe('filter by operation', function() {
                            it('should filter by Long (Comprar)', function() {
                                calendar_page.selectOperationFilter(1);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 3");
                            });

                            it('should filter by Short (Vender)', function() {
                                calendar_page.selectOperationFilter(2);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 4");
                            });
                        });

                        describe('filter by region',function() {
                            describe('Canada', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(1);
                                });
                            
                                it('should select Canada region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeCanada1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeCanada2');
                                });
                                
                                it('should select exchangeCanada1 market patterns', function() {
                                    calendar_page.selectMarketFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                                });

                                it('should select exchangeCanada2 market patterns', function() {
                                    calendar_page.selectMarketFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                       
                            describe('USA', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(2);
                                });
                            
                                it('should select USA region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 4");
                                    expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 3");
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeUSA1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeUSA2');
                                });
                                
                                it('should select exchangeUSA1 market patterns', function() {
                                    calendar_page.selectMarketFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                                });

                                it('should select exchangeUSA2 market patterns', function() {
                                    calendar_page.selectMarketFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 4");
                                });
                            });
                       
                        });
                    });
                });

                describe('in december 2014', function() {
                    beforeEach(function() {
                        calendar_page.selectMonthFilter(1);
                    });

                    describe('ordered by entry date', function() {
                        it('should have 0 patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                        });
                    });

                    describe('ordered by exit date', function() {
                        beforeEach(function() {
                            calendar_page.selectOrderFilter("exit_date");
                            //ptor.sleep(3000);
                        });
 
                        it('should have 1 pattern',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(31); });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,2).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,3).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBearishSlot(0,30).isDisplayed()).toBe(false);
                            ptor.sleep(9000);
                        });

                        describe('input date filter',function() {
                            it('should appear 1 patterns filtering by 3th day',function() {
                                calendar_page.fillInDayDateInputFilter('3');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                            });

                            it('should appear 0 patterns filtering by 4th day',function() {
                                calendar_page.fillInDayDateInputFilter('4');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(3000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('filter by operation', function() {
                            it('should filter by Long (Comprar)', function() {
                                calendar_page.selectOperationFilter(1);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });

                            it('should filter by Short (Vender)', function() {
                                calendar_page.selectOperationFilter(2);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                            });
                        });

                        describe('filter by region',function() {
                            describe('Canada', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(1);
                                });
                            
                                it('should select Canada region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeCanada1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeCanada2');
                                });
                                
                                it('should select exchangeCanada1 market patterns', function() {
                                    calendar_page.selectMarketFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });

                                it('should select exchangeCanada2 market patterns', function() {
                                    calendar_page.selectMarketFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                                });
                            });
                       
                            describe('USA', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(2);
                                });
                            
                                it('should select USA region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(1).getText()).toBe('exchangeUSA1');
                                    expect(calendar_page.getMarketFilter().all(by.css("option")).get(2).getText()).toBe('exchangeUSA2');
                                });
                                
                            });
                       
                        });

                    });
                });
                           
            });

            describe('Pairs tab',function() {
                beforeEach(function() {
                    calendar_page.goToTab("pairs");
                    ptor.sleep(3500);
                });

                describe('in november 2014', function() {
                    describe('ordered by entry date', function() {
                        it('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });
                            //first pattern
                            expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 1 1");
                            expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 1 2");
                            expect(calendar_page.getPatternDayPairSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,8).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,14).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,15).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayPairSlot(0,29).isDisplayed()).toBe(false);

                            //second pattern
                            expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair 3 1");
                            expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair 3 2");
                            expect(calendar_page.getPatternDayPairSlot(1,3).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayPairSlot(1,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(1,19).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(1,29).isDisplayed()).toBe(true);
                            
                            //third pattern
                            expect(calendar_page.getPairName(2,0).getText()).toEqual("Long name Asset Pair 2 1");
                            expect(calendar_page.getPairName(2,1).getText()).toEqual("Long name Asset Pair 2 2");
                            expect(calendar_page.getPatternDayPairSlot(2,9).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayPairSlot(2,10).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(2,19).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(2,29).isDisplayed()).toBe(true);
                        });
                           
                        describe('input date filter',function() {
                            it('should appear 2 patterns filtering by 5th day',function() {
                                calendar_page.fillInDayDateInputFilter('5');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 3 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 3 2");
                                expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair 2 1");
                                expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair 2 2");
                            });

                            it('should appear 1 pattern filtering by 11th day',function() {
                                calendar_page.fillInDayDateInputFilter('11');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 2 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 2 2");
                            });

                            it('should appear 0 patterns filtering by 12th day',function() {
                                calendar_page.fillInDayDateInputFilter('12');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(3000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 3 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 3 2");
                            });
                        });
                        
                        describe('filter by region',function() {
                            describe('Canada', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(1);
                                });
                            
                                it('should select Canada region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 1 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 1 2");
                                    expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair 2 1");
                                    expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair 2 2");
                                });
                            });
                       
                            describe('USA', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(2);
                                });
                            
                                it('should select USA region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 3 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 3 2");
                                });
                            });
                       
                        });
                    });

                    describe('ordered by exit date', function() {
                        beforeEach(function() {
                            calendar_page.selectOrderFilter("exit_date");
                            //ptor.sleep(3000);
                        });
 
                        it('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });
                            
                            //first pattern
                            expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 4 1");
                            expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 4 2");
                            expect(calendar_page.getPatternDayPairSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,8).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,14).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,15).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayPairSlot(0,29).isDisplayed()).toBe(false);

                            //second pattern
                            expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair 1 1");
                            expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair 1 2");
                            expect(calendar_page.getPatternDayPairSlot(1,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(1,8).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(1,14).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(1,15).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayPairSlot(1,29).isDisplayed()).toBe(false);
                            
                            //third pattern
                            expect(calendar_page.getPairName(2,0).getText()).toEqual("Long name Asset Pair 3 1");
                            expect(calendar_page.getPairName(2,1).getText()).toEqual("Long name Asset Pair 3 2");
                            expect(calendar_page.getPatternDayPairSlot(2,3).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayPairSlot(2,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(2,19).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(2,29).isDisplayed()).toBe(true);
                        });
                           
                        describe('input date filter',function() {
                            it('should appear 3 patterns filtering by 15th day',function() {
                                calendar_page.fillInDayDateInputFilter('15');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 4 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 4 2");
                                expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair 1 1");
                                expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair 1 2");
                                expect(calendar_page.getPairName(2,0).getText()).toEqual("Long name Asset Pair 3 1");
                                expect(calendar_page.getPairName(2,1).getText()).toEqual("Long name Asset Pair 3 2");
                            });

                            it('should appear 1 pattern filtering by 16th day',function() {
                                calendar_page.fillInDayDateInputFilter('16');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 3 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 3 2");
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(3000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 3 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 3 2");
                            });
                        });
                        
                        describe('filter by region',function() {
                            describe('Canada', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(1);
                                });
                            
                                it('should select Canada region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 1 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 1 2");
                                });
                            });
                       
                            describe('USA', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(2);
                                });
                            
                                it('should select USA region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 4 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 4 2");
                                    expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair 3 1");
                                    expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair 3 2");
                                });
                            });
                       
                        });
                    });
                });

                describe('in december 2014', function() {
                    beforeEach(function() {
                        calendar_page.selectMonthFilter(1);
                    });

                    describe('ordered by entry date', function() {
                        it('should have 0 patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                        });
                    });

                    describe('ordered by exit date', function() {
                        beforeEach(function() {
                            calendar_page.selectOrderFilter("exit_date");
                            //ptor.sleep(3000);
                        });
 
                        it('should have 1 ordered pattern',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(31); });
                            
                            //first pattern
                            expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 2 1");
                            expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 2 2");
                            expect(calendar_page.getPatternDayPairSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,2).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayPairSlot(0,5).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayPairSlot(0,30).isDisplayed()).toBe(false);

                        });
                           
                        describe('input date filter',function() {
                            it('should appear 1 pattern filtering by 5th day',function() {
                                calendar_page.fillInDayDateInputFilter('5');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 2 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 2 2");
                            });

                            it('should appear 0 patterns filtering by 6th day',function() {
                                calendar_page.fillInDayDateInputFilter('6');
                                ptor.sleep(3000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(3000);  
                            });

                            it('should appear no favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('filter by region',function() {
                            describe('Canada', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(1);
                                });
                            
                                it('should select Canada region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 2 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 2 2");
                                });
                            });
                       
                            describe('USA', function() {
                                beforeEach(function() {
                                    calendar_page.selectRegionFilter(2);
                                });
                            
                                it('should select USA region patterns', function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                       
                        });
                    });
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
