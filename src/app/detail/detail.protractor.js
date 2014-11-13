/**
 * Created by robgon on 11/11/14.
 */

var loadFixture = require('../../../test-helpers/load-fixture.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/fixture-detail.js');
var Detail = require('../../../test-helpers/page-objects/detail.po.js');
describe('The Details page ', function () {

    var home;
    var detail;
    var helper;
    var conString = browser.params.sqlCon;
    beforeEach(function () {
        helper = new Helper();
        var fixtures = fixtureGenerator.fixture_detail();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());
        browser.ignoreSynchronization = true;
        home = new Home();
        detail = new Detail();
    });
    afterEach(function () {
        var fixtures = fixtureGenerator.remove_fixtures_detail();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());

    });
    //the user try to access an inexistent ID and is redirected to home
    xit('should not load patterns that doesnt exists', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(999);
        expect(ptor.getCurrentUrl()).not.toContain("/detail");

    });

    xit('should not load patterns that is not subscribed', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(3); //the pattern 3 exists in the DB but is from USA-S-3 and the user is not subscribed to that pattern
        expect(ptor.getCurrentUrl()).not.toContain("/detail");
    });


    xit('should load patterns that is subscribed', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(1); //the pattern 3 exists in the DB but is from USA-S-3 and the user is not subscribed to that pattern
        expect(ptor.getCurrentUrl()).toContain("/detail/1");
    });

    xit('should load all the basic data for Sell Pattern', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(1); //the pattern 3 exists in the DB but is from USA-S-3 and the user is not subscribed to that pattern
        expect(detail.getBuyType().getAttribute("class")).toContain("ng-hide");
        expect(detail.getSellType().getText()).toEqual("VENDER (A corto)"); //sell type is not hyde
        expect(detail.getSellType().getAttribute("class")).not.toContain("ng-hide");
        //dates
        expect(detail.getEntryDate().getText()).toEqual("11 Nov");
        expect(detail.getExitDate().getText()).toEqual("03 May");
        expect(detail.getCurrency().getText()).toEqual("CU1");
        expect(detail.getName().getText()).toEqual("LONG NAME ASSET 1 (EX1)");
        expect(detail.getSectorIndustry().getText()).toEqual("Sector1 / Industry1");
        //check the CSS for SELL PATTERN
        expect(detail.getHeader().all(by.tagName("tr"))
            .get(0).all(by.tagName("th")).get(1).getAttribute("class")).toContain("sell-color-dark-background");
    });

    xit('should load all the basic data for Buy Pattern', function () {
        /*
        * NOTE: this pattern has historical empty, is not necessary to check the header...
        * */
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(2); //the pattern 3 exists in the DB but is from USA-S-3 and the user is not subscribed to that pattern
        expect(detail.getBuyType().getAttribute("class")).not.toContain("ng-hide");
        expect(detail.getBuyType().getText()).toEqual("COMPRAR"); //sell type is not hyde
        expect(detail.getSellType().getAttribute("class")).toContain("ng-hide");
        //dates
        expect(detail.getEntryDate().getText()).toEqual("02 Nov");
        expect(detail.getExitDate().getText()).toEqual("04 Dic");
        expect(detail.getCurrency().getText()).toEqual("CU1");
        expect(detail.getName().getText()).toEqual("LONG NAME ASSET 2 (EX2)");
        expect(detail.getSectorIndustry().getText()).toEqual("Sector2 / Industry2");
        //check the CSS for SELL PATTERN
        expect(detail.getHeader().all(by.tagName("tr"))
            .get(0).all(by.tagName("th")).get(1).getAttribute("class")).toContain("buy-color");
    });

    xit('should load all the historical data for a Pattern', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(1); //the pattern 3 exists in the DB but is from USA-S-3 and the user is not subscribed to that pattern
        ptor.sleep(helper.oneSec());
        //check years
        expect(detail.getIdTd(0).getText()).toEqual("2013");
        expect(detail.getIdTd(1).getText()).toEqual("2012");
        expect(detail.getIdTd(2).getText()).toEqual("2011");
        expect(detail.getIdTd(3).getText()).toEqual("2010");
        //check the first 4 data
        expect(detail.getHistoricalEntryDate(0).getText()).toEqual("25/Sep/13");
        expect(detail.getHistoricalEntryDate(1).getText()).toEqual("25/Sep/12");
        expect(detail.getHistoricalEntryDate(2).getText()).toEqual("26/Sep/11");
        expect(detail.getHistoricalEntryDate(3).getText()).toEqual("27/Sep/10");
        //check values
        expect(detail.getHistoricalEntryValue(0).getText()).toEqual("44.25");
        expect(detail.getHistoricalEntryValue(1).getText()).toEqual("29.05");
        expect(detail.getHistoricalEntryValue(2).getText()).toEqual("30.35");
        expect(detail.getHistoricalEntryValue(3).getText()).toEqual("27.8");
        //exit value
        expect(detail.getHistoricalExitDate(0).getText()).toEqual("23/Abr/14");
        expect(detail.getHistoricalExitDate(1).getText()).toEqual("23/Abr/12");
        expect(detail.getHistoricalExitDate(2).getText()).toEqual("23/Abr/12");
        expect(detail.getHistoricalExitDate(3).getText()).toEqual("22/Abr/11");
        //exit value
        expect(detail.getHistoricalExitValue(0).getText()).toEqual("50.6");
        expect(detail.getHistoricalExitValue(1).getText()).toEqual("35.4");
        expect(detail.getHistoricalExitValue(2).getText()).toEqual("40.8");
        expect(detail.getHistoricalExitValue(3).getText()).toEqual("29.9");
        //rent value
        expect(detail.getHistoricalRent(0).getText()).toEqual("14.35");
        expect(detail.getHistoricalRent(1).getText()).toEqual("21.86");
        expect(detail.getHistoricalRent(2).getText()).toEqual("34.43");
        expect(detail.getHistoricalRent(3).getText()).toEqual("7.55");
        //best gain date
        expect(detail.getHistoricalBestGainDate(0).getText()).toEqual("10/Dic/13");
        expect(detail.getHistoricalBestGainDate(1).getAttribute("class")).toContain("ng-hide");//has a negative Gain, not rendered
        expect(detail.getHistoricalBestGainDate(2).getText()).toEqual("26/Mar/12");
        expect(detail.getHistoricalBestGainDate(3).getText()).toEqual("25/Feb/11");
        //best gain values
        expect(detail.getHistoricalBestGainValue(0).getText()).toEqual("19.55");
        expect(detail.getHistoricalBestGainValue(1).getAttribute("class")).toContain("ng-hide");//has a negative Gain, not rendered
        expect(detail.getHistoricalBestGainValue(2).getText()).toEqual("48.27");
        expect(detail.getHistoricalBestGainValue(3).getText()).toEqual("28.24");
        //worst loss dates
        expect(detail.getHistoricalWorstLossDate(0).getText()).toEqual("04/Oct/13");
        expect(detail.getHistoricalWorstLossDate(1).getText()).toEqual("29/Oct/11");
        expect(detail.getHistoricalWorstLossDate(2).getAttribute("class")).toContain("ng-hide"); //has positive loss, not rendered
        expect(detail.getHistoricalWorstLossDate(3).getText()).toEqual("15/Nov/10");
        //worst loss values
        expect(detail.getHistoricalWorstLossValue(0).getText()).toEqual("-2.6");
        expect(detail.getHistoricalWorstLossValue(1).getText()).toEqual("-15.66");
        expect(detail.getHistoricalWorstLossValue(2).getAttribute("class")).toContain("ng-hide"); //has positive loss, not rendered
        expect(detail.getHistoricalWorstLossValue(3).getText()).toEqual("-5.04");

        //check that has the 15 years of data, checking the info of the last row (1999)
        expect(detail.getIdTd(14).getText()).toEqual("1999");
        expect(detail.getHistoricalEntryDate(14).getText()).toEqual("29/Sep/99");
        expect(detail.getHistoricalEntryValue(14).getText()).toEqual("20.11");
        expect(detail.getHistoricalExitDate(14).getText()).toEqual("22/Abr/00");
        expect(detail.getHistoricalExitValue(14).getText()).toEqual("47.95");
        expect(detail.getHistoricalRent(14).getText()).toEqual("138.41");
        expect(detail.getHistoricalBestGainDate(14).getText()).toEqual("10/Abr/00");
        expect(detail.getHistoricalBestGainValue(14).getText()).toEqual("181.46");
        expect(detail.getHistoricalWorstLossDate(14).getText()).toEqual("22/Oct/99");
        expect(detail.getHistoricalWorstLossValue(14).getText()).toEqual("-3.97");

        //check that the graphs of each year is loaded (check 4 and the last)
        detail.getIdTd(0).click();
        expect(detail.getImageYear().getAttribute("src")).toContain("www.url_year_2013_chart.com");

        detail.getIdTd(1).click();
        expect(detail.getImageYear().getAttribute("src")).toContain("www.url_year_2012_chart.com");

        detail.getIdTd(2).click();
        expect(detail.getImageYear().getAttribute("src")).toContain("www.url_year_2011_chart.com");

        detail.getIdTd(3).click();
        expect(detail.getImageYear().getAttribute("src")).toContain("www.url_year_2010_chart.com");


    });

    xit('should load all the summary table', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(1); //the pattern 3 exists in the DB but is from USA-S-3 and the user is not subscribed to that pattern
        ptor.sleep(helper.oneSec());
        expect(detail.getWinningYears().getText()).toEqual("14");
        expect(detail.getLossYears().getText()).toEqual("1");
        expect(detail.getTotalYears().getText()).toEqual("15");
        expect(detail.getWinningAccumulated().getText()).toEqual("220.41");
        expect(detail.getLossAccumulated().getText()).toEqual("-8.08");
        expect(detail.getLossAccumulated().getAttribute("class")).toContain("negative-percent");
        expect(detail.getTotalAccumulated().getText()).toEqual("5.33");
        expect(detail.getWinningAverage().getText()).toEqual("15.74");
        expect(detail.getLossAverage().getText()).toEqual("-8.08");
        expect(detail.getLossAverage().getAttribute("class")).toContain("negative-percent");
        expect(detail.getTotalAverage().getText()).toEqual("5.16");
        expect(detail.getWinningDiary().getText()).toEqual("-");
        expect(detail.getLossDiary().getText()).toEqual("-");
        expect(detail.getTotalDiary().getText()).toEqual("5.08");
        expect(detail.getWinningDuration().getText()).toEqual("-");
        expect(detail.getLossDuration().getText()).toEqual("-");
        expect(detail.getTotalDuration().getText()).toEqual("173");

    });


    xit('should load all the same period table', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(1);
        ptor.sleep(helper.oneSec());
        expect(detail.getSamePeriodEntryDate().getText()).toEqual("11 Nov");
        expect(detail.getSamePeriodExitDate().getText()).toEqual("03 May");
        //must load 2 same period
        expect(detail.getSamePeriodName(0).getText()).toEqual("Long name Asset 2");
        expect(detail.getSamePeriodName(1).getText()).toEqual("Long name Asset 3");
        //check the second same period are negative
        expect(detail.getSamePeriodAccumulated(0).getText()).toEqual("88.91");
        expect(detail.getSamePeriodAccumulated(1).getText()).toEqual("-52.19");
        expect(detail.getSamePeriodAccumulated(1).getAttribute("class")).toContain("negative-percent");

        expect(detail.getSamePeriodAverage(0).getText()).toEqual("5.93");
        expect(detail.getSamePeriodAverage(1).getText()).toEqual("-3.48");
        expect(detail.getSamePeriodAverage(1).getAttribute("class")).toContain("negative-percent");

        expect(detail.getSamePeriodUpYears(0).getText()).toEqual("11");
        expect(detail.getSamePeriodUpYears(1).getText()).toEqual("6");

        expect(detail.getSamePeriodDownYears(0).getText()).toEqual("4");
        expect(detail.getSamePeriodDownYears(1).getText()).toEqual("6");
    });

    it('should load all graphs', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        detail.goToDetail(1);
        ptor.sleep(helper.oneSec());
        //check all graphs url are same from DB
        expect(detail.getGraphHeader(0).all(by.tagName("div")).get(0).element(by.tagName("span")).getText()).toEqual("LONG NAME ASSET 1 (EX1)");
        expect(detail.getGraph(0).getAttribute("src")).toContain("www.chartUrl1.com");

        expect(detail.getGraphHeader(1).all(by.tagName("div")).get(0).element(by.tagName("span")).getText()).toEqual("LONG NAME ASSET 1 (EX1)");
        expect(detail.getGraph(1).getAttribute("src")).toContain("www.sixYearsChartUrl");

        expect(detail.getGraphHeader(2).all(by.tagName("div")).get(0).element(by.tagName("span")).getText()).toEqual("LONG NAME ASSET 1 (EX1)");
        expect(detail.getGraph(2).getAttribute("src")).toContain("www.chartWeekUrl");

        expect(detail.getGraphHeader(3).all(by.tagName("div")).get(0).element(by.tagName("span")).getText()).toEqual("LONG NAME ASSET 1 (EX1)");
        expect(detail.getGraph(3).getAttribute("src")).toContain("monthTrendUrl");


    });




});
