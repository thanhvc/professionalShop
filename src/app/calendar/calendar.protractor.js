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
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDate("2014-11-17 11:30:00");
ptor.sleep(9000);

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
            ptor.sleep(2000);
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
            ptor.sleep(4000);
        });

        afterEach(function () {
            page_layout.logout(); 
            ptor.sleep(2000);
            var fixtures = fixtureGenerator.remove_calendar_fixture();
            loadFixture.executeQueries(fixtures, conString);
        });
 
        describe('navigation tab',function() {
            it('Calendar navigation tab should appear if user is logged in', function() {
                expect(page_layout.calendarNavLink().isDisplayed()).toBe(true);
            });
    
            it('Calendar navigation tab should link to calendar', function() {
                page_layout.calendarNavLink().click();
                ptor.sleep(2000);
                calendar_page = new Calendar(false);
                expect(calendar_page.isCurrentPage()).toBe(true);
            });
        });
        
        describe('Inside Calendar page', function() {
            beforeEach(function() {
                calendar_page = new Calendar(true);
                ptor.sleep(4000);
            });
            
            it('should contain four tabs', function() { expect(calendar_page.navTabs().count()).toBe(4); });

            describe('Stocks tab',function() {
                beforeEach(function() {
                    //ptor.sleep(4000);
                });

                //it('should have the correct month filter options', function() {
                    //TODO test filters. For example, in November 17th, month filter should have november 2014 and december 2014 choices
                //});
 
                describe('in november 2014', function() {
                    describe('ordered by exit date', function() {
                        //beforeEach(function() {
                        //    calendar_page.selectOrderFilter("exit_date");
                        //    //ptor.sleep(4000);
                        //});
                        
                        it('should have input date filter set by default day 15 and 2 ordered patterns as well', function() {
                            expect(calendar_page.getInDayDateInputFilter.value).toEqual("15");
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                            //calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });

                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 4");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,9).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,19).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,20).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBearishSlot(0,29).isDisplayed()).toBe(false);
                            
                            //second pattern
                            expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 3");
                            expect(helper.hasClass(calendar_page.getSimpleName(1),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,3).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(1,4).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,17).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,28).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,29).isDisplayed()).toBe(false);
                        });

                        xit('should have 3 ordered patterns if I unset day filter',function() {
                            calendar_page.fillInDayDateInputFilter('');
                            ptor.sleep(4000);

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
                           
                        xdescribe('input date filter',function() {
                            it('should appear 2 patterns filtering by 11th day',function() {
                                calendar_page.fillInDayDateInputFilter('11');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 4");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 3");
                            });

                            it('should appear 1 pattern filtering by 21th day',function() {
                                calendar_page.fillInDayDateInputFilter('21');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                            });

                            it('should appear 0 patterns filtering by 30th day',function() {
                                calendar_page.fillInDayDateInputFilter('30');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        xdescribe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.fillInDayDateInputFilter('');
                                ptor.sleep(4000);
                            });

                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 1");
                            });
                        });
                        
                        xdescribe('filter by operation', function() {
                            beforeEach(function() {
                                calendar_page.fillInDayDateInputFilter('');
                                ptor.sleep(4000);
                            });

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

                        xdescribe('filter by region',function() {
                            beforeEach(function() {
                                calendar_page.fillInDayDateInputFilter('');
                                ptor.sleep(4000);
                            });

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

                    xdescribe('ordered by entry date', function() {
                        beforeEach(function() {
                            calendar_page.selectOrderFilter("entry_date");
                            ptor.sleep(4000);
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
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 3");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset 2");
                            });

                            it('should appear 1 pattern filtering by 6th day',function() {
                                calendar_page.fillInDayDateInputFilter('6');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                            });

                            it('should appear 0 patterns filtering by 12th day',function() {
                                calendar_page.fillInDayDateInputFilter('12');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
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

                });

                xdescribe('in december 2014', function() {
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
                            //ptor.sleep(4000);
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
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset 2");
                            });

                            it('should appear 0 patterns filtering by 4th day',function() {
                                calendar_page.fillInDayDateInputFilter('4');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
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

            xdescribe('Pairs tab',function() {
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
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 3 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 3 2");
                                expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair 2 1");
                                expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair 2 2");
                            });

                            it('should appear 1 pattern filtering by 11th day',function() {
                                calendar_page.fillInDayDateInputFilter('11');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 2 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 2 2");
                            });

                            it('should appear 0 patterns filtering by 12th day',function() {
                                calendar_page.fillInDayDateInputFilter('12');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
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
                            //ptor.sleep(4000);
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
                                ptor.sleep(4000);
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
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 3 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 3 2");
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
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
                            //ptor.sleep(4000);
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
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair 2 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair 2 2");
                            });

                            it('should appear 0 patterns filtering by 6th day',function() {
                                calendar_page.fillInDayDateInputFilter('6');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
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
                    ptor.sleep(4000);
                });

                describe('index patterns', function() {
                    describe('in november 2014', function() {
                        describe('ordered by entry date',function() {

                            it('should have 3 ordered patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                                calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });

                                //first pattern
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 2");
                                expect(helper.hasClass(calendar_page.getSimpleName(0),'buy-color')).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,7).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,14).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,15).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBullishSlot(0,29).isDisplayed()).toBe(false);

                                //second pattern
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Index 1");
                                expect(helper.hasClass(calendar_page.getSimpleName(1),'sell-color')).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(1,0).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBearishSlot(1,9).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBearishSlot(1,10).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(1,20).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(1,29).isDisplayed()).toBe(true);

                                //third pattern
                                expect(calendar_page.getSimpleName(2).getText()).toEqual("Long name Asset Index 4");
                                expect(helper.hasClass(calendar_page.getSimpleName(2),'buy-color')).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(2,0).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBullishSlot(2,13).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBullishSlot(2,14).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(2,20).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(2,29).isDisplayed()).toBe(true);
                            });


                            describe('input date filter',function() {
                                it('should appear 2 patterns filtering by 11th day',function() {
                                    calendar_page.fillInDayDateInputFilter('11');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 1");
                                    expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Index 4");
                                });
    
                                it('should appear 1 pattern filtering by 15th day',function() {
                                    calendar_page.fillInDayDateInputFilter('15');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Index 4");
                                });
    
                                it('should appear 0 patterns filtering by 16th day',function() {
                                    calendar_page.fillInDayDateInputFilter('16');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                            
                            describe('favorite',function() {
                                beforeEach(function() {
                                    calendar_page.getFavouriteFilter().click();
                                    ptor.sleep(4000);  
                                });
    
                                it('should appear my favorite pattern',function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 1");
                                });
                            });
                        
                            describe('filter by operation', function() {
                                it('should filter by Long (Comprar)', function() {
                                    calendar_page.selectOperationFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 2");
                                    expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Index 4");
                                });
    
                                it('should filter by Short (Vender)', function() {
                                    calendar_page.selectOperationFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 1");
                                });
                            });

                        }); 

                        describe('ordered by exit date', function() {
                            beforeEach(function() {
                                calendar_page.selectOrderFilter("exit_date");
                                //ptor.sleep(4000);
                            });
     
                            it('should have 2 ordered patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });

                                //first pattern
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 2");
                                expect(helper.hasClass(calendar_page.getSimpleName(0),'buy-color')).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,7).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,14).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(0,15).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBullishSlot(0,29).isDisplayed()).toBe(false);

                                //second pattern
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Index 3");
                                expect(helper.hasClass(calendar_page.getSimpleName(1),'sell-color')).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(1,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(1,10).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(1,19).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(1,20).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBearishSlot(1,29).isDisplayed()).toBe(false);
                            });

                            describe('input date filter',function() {
                                it('should appear 1 pattern filtering by 16th day',function() {
                                    calendar_page.fillInDayDateInputFilter('16');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Index 3");
                                });
    
                                it('should appear 0 patterns filtering by 21th day',function() {
                                    calendar_page.fillInDayDateInputFilter('21');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                            
                            describe('favorite',function() {
                                beforeEach(function() {
                                    calendar_page.getFavouriteFilter().click();
                                    ptor.sleep(4000);  
                                });
    
                                it('should appear my favorite pattern',function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                        
                            describe('filter by operation', function() {
                                it('should filter by Long (Comprar)', function() {
                                    calendar_page.selectOperationFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 2");
                                });
    
                                it('should filter by Short (Vender)', function() {
                                    calendar_page.selectOperationFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 3");
                                });
                            });

                        });

                    });
                    
                    describe('in december 2014', function() {
                        beforeEach(function() {
                            calendar_page.selectMonthFilter(1);
                        });

                        describe('ordered by entry date',function() {

                            it('should have 0 patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });

                        }); 

                        describe('ordered by exit date', function() {
                            beforeEach(function() {
                                calendar_page.selectOrderFilter("exit_date");
                                //ptor.sleep(4000);
                            });
     
                            it('should have 2 ordered patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(31); });

                                //first pattern
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 1");
                                expect(helper.hasClass(calendar_page.getSimpleName(0),'sell-color')).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(0,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(0,2).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(0,4).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBearishSlot(0,6).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBearishSlot(0,30).isDisplayed()).toBe(false);

                                //second pattern
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Index 4");
                                expect(helper.hasClass(calendar_page.getSimpleName(1),'buy-color')).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(1,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(1,2).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(1,4).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayBullishSlot(1,6).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayBullishSlot(1,30).isDisplayed()).toBe(false);
                            });

                            describe('input date filter',function() {
    
                                it('should appear 0 patterns filtering by 6th day',function() {
                                    calendar_page.fillInDayDateInputFilter('21');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                            
                            describe('favorite',function() {
                                beforeEach(function() {
                                    calendar_page.getFavouriteFilter().click();
                                    ptor.sleep(4000);  
                                });
    
                                it('should appear my favorite pattern',function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 1");
                                });
                            });
                        
                            describe('filter by operation', function() {
                                it('should filter by Long (Comprar)', function() {
                                    calendar_page.selectOperationFilter(1);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 4");
                                });
    
                                it('should filter by Short (Vender)', function() {
                                    calendar_page.selectOperationFilter(2);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Index 1");
                                });
                            });

                        });

                    });
                });

                describe('pair patterns', function() {
                    beforeEach(function() {
                        calendar_page.selectIndexTypeFilter('pairs');
                    });

                    describe('in november 2014', function() {
                        describe('ordered by entry date',function() {

                            it('should have 3 ordered patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                                calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });

                                //first pattern
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 2 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 2 2");
                                expect(calendar_page.getPatternDayPairSlot(0,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(0,10).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(0,19).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(0,20).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayPairSlot(0,29).isDisplayed()).toBe(false);

                                //second pattern
                                expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                                expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair Index 1 2");
                                expect(calendar_page.getPatternDayPairSlot(1,9).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayPairSlot(1,10).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(1,19).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(1,29).isDisplayed()).toBe(true);

                                //third pattern
                                expect(calendar_page.getPairName(2,0).getText()).toEqual("Long name Asset Pair Index 3 1");
                                expect(calendar_page.getPairName(2,1).getText()).toEqual("Long name Asset Pair Index 3 2");
                                expect(calendar_page.getPatternDayPairSlot(2,18).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayPairSlot(2,19).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(2,25).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(2,29).isDisplayed()).toBe(true);

                            });


                            describe('input date filter',function() {
                                it('should appear 2 patterns filtering by 11th day',function() {
                                    calendar_page.fillInDayDateInputFilter('11');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 1 2");
                                    expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair Index 3 1");
                                    expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair Index 3 2");
                                });
    
                                it('should appear 1 pattern filtering by 20th day',function() {
                                    calendar_page.fillInDayDateInputFilter('20');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 3 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 3 2");
                                });
    
                                it('should appear 0 patterns filtering by 21th day',function() {
                                    calendar_page.fillInDayDateInputFilter('21');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                            
                            describe('favorite',function() {
                                beforeEach(function() {
                                    calendar_page.getFavouriteFilter().click();
                                    ptor.sleep(4000);  
                                });
    
                                it('should appear my favorite pattern',function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 1 2");
                                });
                            });

                        }); 

                        describe('ordered by exit date', function() {
                            beforeEach(function() {
                                calendar_page.selectOrderFilter("exit_date");
                                //ptor.sleep(4000);
                            });
     
                            it('should have 2 ordered patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });

                                //first pattern
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 4 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 4 2");
                                expect(calendar_page.getPatternDayPairSlot(0,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(0,8).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(0,14).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(0,15).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayPairSlot(0,29).isDisplayed()).toBe(false);

                                //second pattern
                                expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair Index 2 1");
                                expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair Index 2 2");
                                expect(calendar_page.getPatternDayPairSlot(1,0).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(1,12).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(1,19).isDisplayed()).toBe(true);
                                expect(calendar_page.getPatternDayPairSlot(1,20).isDisplayed()).toBe(false);
                                expect(calendar_page.getPatternDayPairSlot(1,29).isDisplayed()).toBe(false);
                            });

                            describe('input date filter',function() {
                                it('should appear 1 pattern filtering by 16th day',function() {
                                    calendar_page.fillInDayDateInputFilter('16');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 2 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 2 2");
                                });
    
                                it('should appear 0 patterns filtering by 21th day',function() {
                                    calendar_page.fillInDayDateInputFilter('21');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                            
                            describe('favorite',function() {
                                beforeEach(function() {
                                    calendar_page.getFavouriteFilter().click();
                                    ptor.sleep(4000);  
                                });
    
                                it('should appear my favorite pattern',function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                        
                        });

                    });
                    
                    describe('in december 2014', function() {
                        beforeEach(function() {
                            calendar_page.selectMonthFilter(1);
                        });

                        describe('ordered by entry date',function() {

                            it('should have 0 patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });

                        }); 

                        describe('ordered by exit date', function() {
                            beforeEach(function() {
                                calendar_page.selectOrderFilter("exit_date");
                                //ptor.sleep(4000);
                            });
     
                            it('should have 2 ordered patterns',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(31); });

                                //first pattern
                                expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                                expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 1 2");

                                //second pattern
                                expect(calendar_page.getPairName(1,0).getText()).toEqual("Long name Asset Pair Index 3 1");
                                expect(calendar_page.getPairName(1,1).getText()).toEqual("Long name Asset Pair Index 3 2");
                            });

                            describe('input date filter',function() {
    
                                it('should appear 0 patterns filtering by 4th day',function() {
                                    calendar_page.fillInDayDateInputFilter('4');
                                    ptor.sleep(4000);
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                                });
                            });
                            
                            describe('favorite',function() {
                                beforeEach(function() {
                                    calendar_page.getFavouriteFilter().click();
                                    ptor.sleep(4000);  
                                });
    
                                it('should appear my favorite pattern',function() {
                                    calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                    expect(calendar_page.getPairName(0,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                                    expect(calendar_page.getPairName(0,1).getText()).toEqual("Long name Asset Pair Index 1 2");
                                });
                            });

                        });

                    });
                });

            });

            xdescribe('Futures tab',function() {
                beforeEach(function() {
                    calendar_page.goToTab("futures");
                    ptor.sleep(4000);
                });

                describe('in november 2014', function() {
                    describe('ordered by entry date', function() {
                        it('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 4");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,14).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,29).isDisplayed()).toBe(true);

                            //second pattern
                            expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Future 1");
                            expect(helper.hasClass(calendar_page.getSimpleName(1),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,0).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(1,1).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,17).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,28).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,29).isDisplayed()).toBe(false);
                            
                            //third pattern
                            expect(calendar_page.getSimpleName(2).getText()).toEqual("Long name Asset Future 2");
                            expect(helper.hasClass(calendar_page.getSimpleName(2),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,9).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBearishSlot(2,10).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,22).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,29).isDisplayed()).toBe(true);
                        });
                           
                        describe('input date filter',function() {
                            it('should appear 2 patterns filtering by 2th day',function() {
                                calendar_page.fillInDayDateInputFilter('2');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 1");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Future 2");
                            });

                            it('should appear 1 pattern filtering by 11th day',function() {
                                calendar_page.fillInDayDateInputFilter('11');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 2");
                            });

                            it('should appear 0 patterns filtering by 12th day',function() {
                                calendar_page.fillInDayDateInputFilter('12');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 1");
                            });
                        });
                        
                        describe('filter by operation', function() {
                            it('should filter by Long (Comprar)', function() {
                                calendar_page.selectOperationFilter(1);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 1");
                            });

                            it('should filter by Short (Vender)', function() {
                                calendar_page.selectOperationFilter(2);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 4");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Future 2");
                            });
                        });

                    });

                    describe('ordered by exit date', function() {
                        beforeEach(function() {
                            calendar_page.selectOrderFilter("exit_date");
                            //ptor.sleep(4000);
                        });
 
                        it('should have 3 ordered patterns',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(3); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(30); });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 3");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,10).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,15).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(0,16).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(0,29).isDisplayed()).toBe(false);

                            //second pattern
                            expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Future 1");
                            expect(helper.hasClass(calendar_page.getSimpleName(1),'buy-color')).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,0).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBullishSlot(1,1).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,17).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,28).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBullishSlot(1,29).isDisplayed()).toBe(false);
                            
                            //third pattern
                            expect(calendar_page.getSimpleName(2).getText()).toEqual("Long name Asset Future 4");
                            expect(helper.hasClass(calendar_page.getSimpleName(2),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,15).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(2,29).isDisplayed()).toBe(true);
                        });
                           
                        describe('input date filter',function() {
                            it('should appear 2 patterns filtering by 17th day',function() {
                                calendar_page.fillInDayDateInputFilter('17');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 1");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Future 4");
                            });

                            it('should appear 1 pattern filtering by 30th day',function() {
                                calendar_page.fillInDayDateInputFilter('30');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 4");
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
                            });

                            it('should appear my favorite pattern',function() {
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 1");
                            });
                        });
                        
                        describe('filter by operation', function() {
                            it('should filter by Long (Comprar)', function() {
                                calendar_page.selectOperationFilter(1);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(2); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 3");
                                expect(calendar_page.getSimpleName(1).getText()).toEqual("Long name Asset Future 1");
                            });

                            it('should filter by Short (Vender)', function() {
                                calendar_page.selectOperationFilter(2);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 4");
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
                            //ptor.sleep(4000);
                        });
 
                        it('should have 1 pattern',function() {
                            calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                            calendar_page.getPatternDaySlots(0).then(function(slots) { expect(slots.length).toBe(31); });
                            //first pattern
                            expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 2");
                            expect(helper.hasClass(calendar_page.getSimpleName(0),'sell-color')).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,0).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,2).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,5).isDisplayed()).toBe(true);
                            expect(calendar_page.getPatternDayBearishSlot(0,6).isDisplayed()).toBe(false);
                            expect(calendar_page.getPatternDayBearishSlot(0,30).isDisplayed()).toBe(false);
                        });

                        describe('input date filter',function() {
                            it('should appear 1 patterns filtering by 6th day',function() {
                                calendar_page.fillInDayDateInputFilter('6');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(1); });
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 2");
                            });

                            it('should appear 0 patterns filtering by 7th day',function() {
                                calendar_page.fillInDayDateInputFilter('7');
                                ptor.sleep(4000);
                                calendar_page.getPatterns().then(function(rows) { expect(rows.length).toBe(0); });
                            });
                        });
                        
                        describe('favorite',function() {
                            beforeEach(function() {
                                calendar_page.getFavouriteFilter().click();
                                ptor.sleep(4000);  
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
                                expect(calendar_page.getSimpleName(0).getText()).toEqual("Long name Asset Future 2");
                            });
                        });

                    });
                });
            });

        });
});
