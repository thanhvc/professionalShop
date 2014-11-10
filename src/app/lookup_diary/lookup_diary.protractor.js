/**
 * Created by Aitor on 23/09/14.
 */
/*
base_url = 'http://mo.devel.edosoftfactory.com/';
url_suffix = '#/lookup-diary';
var ptor = protractor.getInstance();
var LookupDiary = function () {


    this.open = function () {
        browser.get(base_url);
        browser.ignoreSynchronization = true;
        but = element(by.css(".no-logged-box"));
        but.click();
        element(by.model('fields.email')).sendKeys('aitor.carrera@edosoft.es');
        element(by.model('fields.password')).sendKeys('factory216c');
        element.all(by.css('.mo-button')).get(0).click();
        ptor.sleep(4000);
        browser.setLocation('/lookup-diary');
        ptor.sleep(4000)
    }

    this.close = function () {
        but = element(by.css(".logged-box"));
        but.click();
    }
};

LookupDiary.prototype = Object.create({}, {
    selectedMonth: { get: function () {
        return element(by.binding('filterOptions.filters.month.monthString')).getAttribute('value');
    }},
    stocksTableFirstRow: {get: function(){
        return element.all(by.repeater("data in myData"))
    }},
    clickOnAlarm: {value: function(row_idx){
        element(by.repeater('data in myData').row(row_idx)).element(by.css('.alarm-column-width')).click();
    }},
    addAlarm:{value: function(threshold){
        element(by.model('data.price')).clear().sendKeys(threshold);
        buttons = element.all(by.css('.mo-button.float-left'));
        expect(buttons.count()).toEqual(1);
        buttons.get(0).click()
    }},
    removeAlarm:{value: function(){
        buttons = element.all(by.css('.mo-button.float-right'));
        expect(buttons.count()).toEqual(2);
        buttons.get(1).click()
    }},
    getAlarmValueByRow : {value: function(row_idx){
        return element(by.repeater('data in myData').row(row_idx)).element(by.binding('data.priceAlert')).getText();
    }}


});

describe('The Daily Lookup', function () {
        var page;
        beforeEach(function () {
            page = new LookupDiary();
            page.open();

        });

        it(' should be able to set a price alert in Stocks', function () {
            value = 12345;
            page.clickOnAlarm(0);
            page.addAlarm(value);
            ptor.sleep(4000);
            text = page.getAlarmValueByRow(0);
            expect(text).toEqual("Mayor que "+value);
            page.clickOnAlarm(0);
            page.removeAlarm(0);
            ptor.sleep(4000);
            text = page.getAlarmValueByRow(0);
            expect(text).toEqual("");
            page.close();
        });


    }
);*/

/**
 * Created by laia on 10/06/14.
 */


var loadFixture = require('../../../test-helpers/load-fixture.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var fixtureLookupDiary = require('../../../test-helpers/fixtures/fixture-lookupDiary.js');
var LookupDiary = require('../../../test-helpers/page-objects/lookupDiary.po.js');
describe('The Lookup Diary page ', function () {

    /*function to help the filters check, the accumulated, average, diary... are filters with a similar functionality
     * just use this function to check each filter,
     * NOTE: the values of the pattterns for this inputs (pattern1,pattern2,pattern3,pattern4)
     * are 5.xx,10.xx,15.xx,20.xx in all fields, so we can check each filter with same values
     *
     * value1, value2 are values for filter: 0 pattern must be <value1,
     *                                      1 pattern must be <value2
     *                                      3 patterns must be > value2
     *                                      4 patterns must be >value1
     * */


    function checkNumericFilter(elementSelect,elementInput,tab,value1,value2,name1,name2,name3,name4,isPair) {
        lookupDiary.selectDropdownbyNum(elementSelect,2);//less than
        elementInput.sendKeys(value1);
        lookupDiary.getSearchButton(tab).click();
        expect(lookupDiary.getNumberFoundPatterns(tab).getText()).toEqual("0");//there is no patterns with accum < value1
        //with greater than value1 are 4 patterns
        lookupDiary.selectDropdownbyNum(elementSelect,1);//greater than  value1
        lookupDiary.getSearchButton(tab).click();
        expect(lookupDiary.getNumberFoundPatterns(tab).getText()).toEqual("4");//there is no patterns with accum < value1
        lookupDiary.selectDropdownbyNum(elementSelect,2);//less than
        elementInput.clear();
        elementInput.sendKeys(value2);
        lookupDiary.getSearchButton(tab).click();
        expect(lookupDiary.getNumberFoundPatterns(tab).getText()).toEqual("1");//there 1 patterns with filter < value2
        if (isPair) {
            expect(lookupDiary.getPairName(tab,0,0).getText()).toEqual(name1);
        } else {
            expect(lookupDiary.getSimpleName(tab,0).getText()).toEqual(name1);
        }

        //greater than value2 -> 3 patterns
        lookupDiary.selectDropdownbyNum(elementSelect,1);//greater than
        lookupDiary.getSearchButton(tab).click();
        expect(lookupDiary.getNumberFoundPatterns(tab).getText()).toEqual("3");//there 1 patterns with filter < value2
        if (isPair) {
            expect(lookupDiary.getPairName(tab,0,0).getText()).toEqual(name2);
            expect(lookupDiary.getPairName(tab,1,0).getText()).toEqual(name3);
            expect(lookupDiary.getPairName(tab,2,0).getText()).toEqual(name4);
            //now check wrong value

        } else {
            expect(lookupDiary.getSimpleName(tab,0).getText()).toEqual(name2);
            expect(lookupDiary.getSimpleName(tab,1).getText()).toEqual(name3);
            expect(lookupDiary.getSimpleName(tab,2).getText()).toEqual(name4);
            //now check wrong value

        }
        elementInput.clear();
        elementInput.sendKeys("asd");
        lookupDiary.selectDropdownbyNum(elementSelect,2);//less than
        expect(helper.hasClass(elementInput,"ng-invalid")).toBe(true);
        lookupDiary.getSearchButton(tab).click(); //search with wrong value, clears the input
        expect(elementInput.getText()).toEqual("");
        //reset the status of the filter to initial state
        lookupDiary.selectDropdownbyNum(elementSelect,0);
        elementInput.clear();
        lookupDiary.getSearchButton(tab).click();
    }




    var home;
    var lookupDiary;
    var helper;
    var conString = browser.params.sqlCon;
    /*'postgres://super:moserverpass@localhost:25432/moserver'*/
    beforeEach(function () {
        helper = new Helper();
        var fixtures = fixtureLookupDiary.fixture_lookupDiary();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());
        // loadFixture.loadMultipleFixture(fixture1, fixture2, conString);
        browser.ignoreSynchronization = true;


        home = new Home();
        lookupDiary = new LookupDiary();
    });
    afterEach(function () {
        var fixtures = fixtureLookupDiary.remove_fixtures_subscriptions();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());

    });
    xit('should be load patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(0).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("4");
        lookupDiary.goToTab(1);
        ptor.sleep(helper.oneSec());
        //pairs
        lookupDiary.getPairName(1,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 1");
        });
        lookupDiary.getPairName(1,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(1).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("4");
        //index
        lookupDiary.goToTab(2);
        ptor.sleep(helper.oneSec());
        //pairs
        lookupDiary.getSimpleName(2,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 1");
        });
        lookupDiary.getSimpleName(2,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 2");
        });
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("4");
        lookupDiary.selectIndexType(1); // to pairs
        ptor.sleep(helper.oneSec());
        lookupDiary.getPairName(2,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 1");
        });
        lookupDiary.getPairName(2,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("4");
        lookupDiary.goToTab(3);
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        ptor.sleep(helper.oneSec());
        expect(lookupDiary.getNumberTotalPatterns(3).getText()).toEqual("4");
        expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("4");

    });

    xit('should be load filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        lookupDiary.getNameFilter(0).sendKeys("Long name Asset 1").then(
            function(data) {
                lookupDiary.getSearchButton(0).click();

                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        lookupDiary.getNameFilter(0).clear().then(
            function(data) {
                lookupDiary.getSearchButton(0).click();
                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //region selector
        //select Canada 1st option
        lookupDiary.selectRegion(0,1);
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("2");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        expect(lookupDiary.getSimpleName(0,1).getText()).toEqual("Long name Asset 2");
        //USA
        lookupDiary.selectRegion(0,2);
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("2");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 3");
        expect(lookupDiary.getSimpleName(0,1).getText()).toEqual("Long name Asset 4");
        //now we are going to check the exchanges, first selecting a exchange with a unselected region,

        lookupDiary.selectRegion(0,0); //unselect Region
        lookupDiary.selectExchange(0,1);//select market-canada 1
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        lookupDiary.selectExchange(0,2);//select market-canada 2
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 2");
        //check that the Canada Region is selected (as a reaction for select a canada-exchange)
        expect(lookupDiary.getRegionFilter(0).$('option:checked').getText()).toContain('Canada');
        //now unselect region, to select exchanges for USA
        lookupDiary.selectRegion(0,0); //unselect Region
        lookupDiary.selectExchange(0,3);//select market-usa 1
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 3");
        lookupDiary.selectExchange(0,2);//select market-usa 2 -> the exchanges list is refreshed, and now have only 2 options
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 4");
        //check that the Canada Region is selected (as a reaction for select a canada-exchange)
        expect(lookupDiary.getRegionFilter(0).$('option:checked').getText()).toContain('Estados Unidos');
        //Check sector/industries filters
        //first, unselect all
        lookupDiary.selectRegion(0,0); //unselect Region
        //sector and insdustries must be disabled
        expect(lookupDiary.getSectorFilter(0).getAttribute("disabled")).toEqual("true");
        expect(lookupDiary.getIndustryFilter(0).getAttribute("disabled")).toEqual("true");
        //select Canada and check the options of sectors/industries
        lookupDiary.selectRegion(0,1); //select Region Canada
        expect(lookupDiary.getSectorFilter(0).getAttribute("disabled")).not.toEqual("true");
        expect(lookupDiary.getIndustryFilter(0).getAttribute("disabled")).not.toEqual("true");
        lookupDiary.selectSector(0,1);//select sector1
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        lookupDiary.selectIndustry(0,1);//select industry
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        lookupDiary.selectIndustry(0,2);//select industry
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("0");
        lookupDiary.selectSector(0,2);//select sector1
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        //select other exchange
        lookupDiary.selectExchange(0,2);
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1"); //check that are loaded 2 patterns
        //now select a Industry to check if its sector is selected
        lookupDiary.selectIndustry(0,1); //select Industry2
        expect(lookupDiary.getSectorFilter(0).$('option:checked').getText()).toContain("Sector2"); //sector 2 is selected by industry2
        expect(lookupDiary.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 2"); //the sector 2 and industry2 load the asset2
        //Select operation types
        lookupDiary.selectRegion(0,0);
        lookupDiary.selectOperation(0,1); //select Buy option
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 2");
        expect(lookupDiary.getSimpleName(0,1).getText()).toEqual("Long name Asset 4");
        lookupDiary.selectOperation(0,2); //select Buy option
        expect(lookupDiary.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        expect(lookupDiary.getSimpleName(0,1).getText()).toEqual("Long name Asset 3");
    });

    xit('should be load the volat,rent,duration... filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        checkNumericFilter(lookupDiary.getAccumulatedFilter(0),lookupDiary.getAccumulatedInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getAverageFilter(0),lookupDiary.getAverageInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDurationFilter(0),lookupDiary.getDurationInput(0),0,"6","9","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getVolatFilter(0),lookupDiary.getVolatInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDiaryFilter(0),lookupDiary.getDiaryInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);

    });
    /*
     PAIRS FILTERS
     */
    xit('should be load and use the filters for pairs',function() {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());
        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        /*TEST FOR PAIRS FILTERS*/
        //search by name
        lookupDiary.goToTab(1);
        ptor.sleep(helper.oneSec());
        lookupDiary.getNameFilter(1).sendKeys("Long name Asset Pair 1").then(
            function(data) {
                lookupDiary.getSearchButton(1).click();

                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("1");
                expect(lookupDiary.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
                expect(lookupDiary.getPairName(1,0,1).getText()).toEqual("Long name Asset Pair 1 2");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        lookupDiary.getNameFilter(1).clear().then(
            function(data) {
                lookupDiary.getSearchButton(1).click();
                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //region selector
        //select Canada 1st option
        lookupDiary.selectRegion(1,1);
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("2");
        expect(lookupDiary.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        expect(lookupDiary.getPairName(1,1,0).getText()).toEqual("Long name Asset Pair 2 1");
        //USA
        lookupDiary.selectRegion(1,2);
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("2");
        expect(lookupDiary.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 3 1");
        expect(lookupDiary.getPairName(1,1,0).getText()).toEqual("Long name Asset Pair 4 1");
        //now we are going to check the exchanges, first selecting a exchange with a unselected region,

        lookupDiary.selectRegion(1,0);
        //sector and insdustries must be disabled
        expect(lookupDiary.getSectorFilter(1).getAttribute("disabled")).toEqual("true");
        expect(lookupDiary.getIndustryFilter(1).getAttribute("disabled")).toEqual("true");
        //select Canada and check the options of sectors/industries
        lookupDiary.selectRegion(1,1); //select Region Canada
        expect(lookupDiary.getSectorFilter(1).getAttribute("disabled")).not.toEqual("true");
        expect(lookupDiary.getIndustryFilter(1).getAttribute("disabled")).not.toEqual("true");
        lookupDiary.selectSector(1,1);//select sector1
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(lookupDiary.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        lookupDiary.selectIndustry(1,1);//select industry
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(lookupDiary.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        lookupDiary.selectIndustry(1,2);//select industry
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("0");
        lookupDiary.selectSector(1,2);//select sector1
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("1");
        //select other exchange
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("1"); //check that are loaded 2 patterns
        //now select a Industry to check if its sector is selected
        lookupDiary.selectIndustry(1,1); //select Industry2
        expect(lookupDiary.getSectorFilter(1).$('option:checked').getText()).toContain("Sector2"); //sector 2 is selected by industry2
        expect(lookupDiary.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(lookupDiary.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 2 1"); //the sector 2 and industry2 load the asset2
    });

    xit(' the numeric filters should work with pair patterns',function(){
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        lookupDiary.goToTab(1);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(lookupDiary.getAccumulatedFilter(1),lookupDiary.getAccumulatedInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getAverageFilter(1),lookupDiary.getAverageInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDurationFilter(1),lookupDiary.getDurationInput(1),1,"6","9",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getVolatFilter(1),lookupDiary.getVolatInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDiaryFilter(1),lookupDiary.getDiaryInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);

    });

    xit('should be load filters and use it for filter the actual simple index patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        lookupDiary.goToTab(2);
        ptor.sleep(helper.oneSec())
        lookupDiary.getNameFilter(2).sendKeys("Long name Asset Index 1").then(
            function(data) {
                lookupDiary.getSearchButton(2).click();

                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        lookupDiary.getNameFilter(2).clear().then(
            function(data) {
                lookupDiary.getSearchButton(2).click();
                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("4");

            }
        );
        expect(lookupDiary.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 1");
        expect(lookupDiary.getSimpleName(2,3).getText()).toEqual("Long name Asset Index 4");

        ptor.sleep(helper.oneSec()); //Select operation types
        lookupDiary.selectOperation(2,1); //select Alcista option
        expect(lookupDiary.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 2");
        expect(lookupDiary.getSimpleName(2,1).getText()).toEqual("Long name Asset Index 4");
        lookupDiary.selectOperation(2,2); //select Bajista option
        expect(lookupDiary.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 1");
        expect(lookupDiary.getSimpleName(2,1).getText()).toEqual("Long name Asset Index 3");
    });

    xit('should be load the volat,rent,duration... filters and use it for filter the actual simple index patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        lookupDiary.goToTab(2);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(lookupDiary.getAccumulatedFilter(2),lookupDiary.getAccumulatedInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getAverageFilter(2),lookupDiary.getAverageInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDurationFilter(2),lookupDiary.getDurationInput(2),2,"6","9",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getVolatFilter(2),lookupDiary.getVolatInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDiaryFilter(2),lookupDiary.getDiaryInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);

    });

    /*
     PAIRS INDEX FILTERS
     */
    xit('should be load and use the filters for index pairs',function() {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        /*TEST FOR PAIRS FILTERS*/
        //search by name
        lookupDiary.goToTab(2);
        ptor.sleep(helper.oneSec());
        lookupDiary.selectIndexType(1);
        ptor.sleep(helper.oneSec());
        lookupDiary.getNameFilter(2).sendKeys("Long name Asset Pair Index 1").then(
            function(data) {
                lookupDiary.getSearchButton(2).click();

                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("1");
                expect(lookupDiary.getPairName(2,0,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                expect(lookupDiary.getPairName(2,0,1).getText()).toEqual("Long name Asset Pair Index 1 2");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        lookupDiary.getNameFilter(2).clear().then(
            function(data) {
                lookupDiary.getSearchButton(2).click();
                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(2).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());  //only there is one filter in the upper form, name and pattern type..

    });

    xit(' the numeric filters should work with pair index patterns',function(){
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');

        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        lookupDiary.goToTab(2);
        ptor.sleep(helper.oneSec())
        lookupDiary.selectIndexType(1);
        ptor.sleep(helper.oneSec());
        checkNumericFilter(lookupDiary.getAccumulatedFilter(2),lookupDiary.getAccumulatedInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getAverageFilter(2),lookupDiary.getAverageInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDurationFilter(2),lookupDiary.getDurationInput(2),2,"6","9",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getVolatFilter(2),lookupDiary.getVolatInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDiaryFilter(2),lookupDiary.getDiaryInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);

    });
/*FUTURES*/
    xit('should be load filters and use it for filter the actual future patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        lookupDiary.goToTab(3);
        ptor.sleep(helper.oneSec())
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        lookupDiary.getNameFilter(3).sendKeys("Long name Asset Future 1").then(
            function(data) {
                lookupDiary.getSearchButton(3).click();

                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        lookupDiary.getNameFilter(3).clear().then(
            function(data) {
                lookupDiary.getSearchButton(3).click();
                ptor.sleep(helper.oneSec());
                expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //echange selector

        lookupDiary.selectExchange(3,1);
        expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        lookupDiary.selectExchange(3,2);
        expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 2");
        lookupDiary.selectExchange(3,3);
        expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 3");
        lookupDiary.selectExchange(3,4);
        expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(lookupDiary.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 4");
        lookupDiary.selectExchange(3,0);
        expect(lookupDiary.getNumberFoundPatterns(3).getText()).toEqual("4");
        expect(lookupDiary.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        expect(lookupDiary.getSimpleName(3,1).getText()).toEqual("Long name Asset Future 2");
        expect(lookupDiary.getSimpleName(3,2).getText()).toEqual("Long name Asset Future 3");
        expect(lookupDiary.getSimpleName(3,3).getText()).toEqual("Long name Asset Future 4");

    });

    xit('should be load the volat,rent,duration... filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        lookupDiary.goToLookupDiary();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/lookup-diary');
        lookupDiary.goToTab(3);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(lookupDiary.getAccumulatedFilter(3),lookupDiary.getAccumulatedInput(3),3,"5","6"
            ,"Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getAverageFilter(3),lookupDiary.getAverageInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDurationFilter(3),lookupDiary.getDurationInput(3),3,"6","9",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getVolatFilter(3),lookupDiary.getVolatInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(lookupDiary.getDiaryFilter(3),lookupDiary.getDiaryInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);

    });

});
