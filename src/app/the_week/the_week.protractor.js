
/**
 * Created by David Verdú on 18/11/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/the_week-fixture-generator.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var PageLayout = require('../../../test-helpers/page-objects/page_layout.po.js');
var TheWeek = require('../../../test-helpers/page-objects/the_week.po.js');
var Helper = require('../../../test-helpers/helper.js');
var DateServerConfigMod = require('../../../test-helpers/date-server-config.js');

//set date on server
var vagrant_id = browser.params.serverVagrantId;
var dsc = new DateServerConfigMod.DateServerConfig(vagrant_id);
dsc.setServerDate("2014-11-05 11:30:00");
ptor.sleep(9000);

describe('The week for non logged in users', function () {
        var home;
        var page_layout;
        var the_week_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.the_week_fixture();
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
            var fixtures = fixtureGenerator.remove_the_week_fixture();
            loadFixture.executeQueries(fixtures, conString);
            ptor.sleep(2000);
        });

        it('The Week navigation tab should not appear unless user is logged in', function() {
            expect(page_layout.the_weekNavLink().isDisplayed()).toBe(false);
        });

        it('The Week page should not be accessible for non logged in users', function() {
            the_week_page = new TheWeek(true);
            ptor.sleep(2000);
            expect(the_week_page.isCurrentPage()).toBe(false);
            expect(home.isCurrentPage()).toBe(true);
        });
});

describe('The week for logged in users', function () {
        var home;
        var page_layout;
        var the_week_page;
        var helper = new Helper();
        var conString = browser.params.sqlCon;

        beforeEach(function () {
            var fixtures = fixtureGenerator.the_week_fixture();
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
            var fixtures = fixtureGenerator.remove_the_week_fixture();
            loadFixture.executeQueries(fixtures, conString);
            ptor.sleep(2000);
        });
 
        xdescribe('navigation tab',function() {
            it('The Week navigation tab should appear if user is logged in', function() {
                expect(page_layout.the_weekNavLink().isDisplayed()).toBe(true);
            });
    
            it('The Week navigation tab should link to the_week', function() {
                page_layout.the_weekNavLink().click();
                ptor.sleep(4000);
                the_week_page = new TheWeek(false);
                expect(the_week_page.isCurrentPage()).toBe(true);
            });
        });
        
        describe('Inside The Week page', function() {
            beforeEach(function() {
                the_week_page = new TheWeek(true);
                ptor.sleep(4000);
            });
            
            xit('should contain three tabs', function() { expect(the_week_page.navTabs().count()).toBe(3); });

            xdescribe("Common", function() {
                it('should have the correct week number and date in header',function() {
                    expect(the_week_page.header().getText()).toContain("Año 2014");
                    expect(the_week_page.header().getText()).toContain("1 Diciembre / 5 Diciembre");
                    expect(the_week_page.header().getText()).toContain("Semana 49");
                    ptor.sleep(9000);
                });
            }); 

            describe("Bolsa tab", function() {
                describe("America Indices",function() {
                    describe("Canada region",function() {
                        xit("should have correct title", function() {
                            expect(the_week_page.getRegionTitle(0,0).getText()).toBe("CANADÁ");
                            ptor.sleep(9000);
                        });
                        it("should have correct asset name asset 3", function() {
                            expect(the_week_page.getRegionAssetTitle(0,0,0).getText()).toBe("LONG NAME ASSET 3");
                            expect(helper.hasClass(the_week_page.getRegionAssetColumn(0,0,0,1),'week-negative-percent')).toBe(true);
                            expect(helper.hasClass(the_week_page.getRegionAssetColumn(0,0,0,2),'bullish-year')).toBe(true);
                            expect(helper.hasClass(the_week_page.getRegionAssetColumn(0,0,0,4),'positive-percent')).toBe(true);
                            expect(helper.hasClass(the_week_page.getRegionAssetColumn(0,0,0,12),'week-negative-percent')).toBe(true);
                            ptor.sleep(9000);
                        });
                        xit("should have correct graph", function() {
                            the_week_page.getRegionAssetGraph(0,0,0).click();
                            ptor.sleep(3000);
                            expect(the_week_page.getGraphicPanel().isDisplayed()).toBe(true);
                            expect(the_week_page.getGraphicImage().isDisplayed()).toBe(true);
                            expect(the_week_page.getGraphicImage().getAttribute('src')).toContain("chart3");
                        });
                        xit("should have correct asset name asset 4", function() {
                            expect(the_week_page.getRegionAssetTitle(0,0,2).getText()).toBe("LONG NAME ASSET 4");
                        });
                        xit("should have correct graph", function() {
                            the_week_page.getRegionAssetGraph(0,0,2).click();
                            ptor.sleep(3000);
                            expect(the_week_page.getGraphicPanel().isDisplayed()).toBe(true);
                            expect(the_week_page.getGraphicImage().isDisplayed()).toBe(true);
                            expect(the_week_page.getGraphicImage().getAttribute('src')).toContain("chart4");
                        });
                    });
                    xdescribe("EEUU region",function() {
                        it("should have correct title", function() {
                            expect(the_week_page.getRegionTitle(0,1).getText()).toBe("ESTADOS UNIDOS");
                            ptor.sleep(9000);
                        });
                    });
                });

                xdescribe("Asia - Pacígico Indices",function() {
                    describe("China region",function() {
                        it("should have correct title", function() {
                            expect(the_week_page.getRegionTitle(1,0).getText()).toBe("CHINA");
                            ptor.sleep(9000);
                        });
                        it("should have correct asset name asset 5", function() {
                            expect(the_week_page.getRegionAssetTitle(1,0,0).getText()).toBe("LONG NAME ASSET 5");
                        });
                        it("should have correct asset name asset 6", function() {
                            expect(the_week_page.getRegionAssetTitle(1,0,2).getText()).toBe("LONG NAME ASSET 6");
                        });
                    });
                });


            }); 

            describe("Comodities tab", function() {

            }); 

            describe("S&P 500 tab", function() {

            }); 
        });

});
    
