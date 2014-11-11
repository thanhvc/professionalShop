/**
 * Created by robgon on 10/11/14.
 */


var loadFixture = require('../../../test-helpers/load-fixture.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var fixtureHistorics = require('../../../test-helpers/fixtures/fixture-historics.js');
var Historics = require('../../../test-helpers/page-objects/historics.po.js');
describe('The Historics page ', function () {

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
        historics.selectDropdownbyNum(elementSelect,2);//less than
        elementInput.sendKeys(value1);
        historics.getSearchButton(tab).click();
        expect(historics.getNumberFoundPatterns(tab).getText()).toEqual("0");//there is no patterns with accum < value1
        //with greater than value1 are 4 patterns
        historics.selectDropdownbyNum(elementSelect,1);//greater than  value1
        historics.getSearchButton(tab).click();
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberFoundPatterns(tab).getText()).toEqual("4");//there is no patterns with accum < value1
        historics.selectDropdownbyNum(elementSelect,2);//less than
        elementInput.clear();
        elementInput.sendKeys(value2);
        historics.getSearchButton(tab).click();
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberFoundPatterns(tab).getText()).toEqual("1");//there 1 patterns with filter < value2
        if (isPair) {
            expect(historics.getPairName(tab,0,0).getText()).toEqual(name1);
        } else {
            expect(historics.getSimpleName(tab,0).getText()).toEqual(name1);
        }

        //greater than value2 -> 3 patterns
        historics.selectDropdownbyNum(elementSelect,1);//greater than
        historics.getSearchButton(tab).click();
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberFoundPatterns(tab).getText()).toEqual("3");//there 1 patterns with filter < value2
        if (isPair) {
            expect(historics.getPairName(tab,0,0).getText()).toEqual(name2);
            expect(historics.getPairName(tab,1,0).getText()).toEqual(name3);
            expect(historics.getPairName(tab,2,0).getText()).toEqual(name4);
            //now check wrong value

        } else {
            expect(historics.getSimpleName(tab,0).getText()).toEqual(name2);
            expect(historics.getSimpleName(tab,1).getText()).toEqual(name3);
            expect(historics.getSimpleName(tab,2).getText()).toEqual(name4);
            //now check wrong value

        }
        elementInput.clear();
        elementInput.sendKeys("asd");
        historics.selectDropdownbyNum(elementSelect,2);//less than
        expect(helper.hasClass(elementInput,"ng-invalid")).toBe(true);
        historics.getSearchButton(tab).click(); //search with wrong value, clears the input
        ptor.sleep(helper.oneSec());
        expect(elementInput.getText()).toEqual("");
        //reset the status of the filter to initial state
        historics.selectDropdownbyNum(elementSelect,0);
        elementInput.clear();
        historics.getSearchButton(tab).click();
    }




    var home;
    var historics;
    var helper;
    var conString = browser.params.sqlCon;
    beforeEach(function () {
        helper = new Helper();
        var fixtures = fixtureHistorics.fixture_historics();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());
        // loadFixture.loadMultipleFixture(fixture1, fixture2, conString);
        browser.ignoreSynchronization = true;


        home = new Home();
        historics = new Historics();
    });
    afterEach(function () {
        var fixtures = fixtureHistorics.remove_fixtures_subscriptions();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());

    });
    it('should be load patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberTotalPatterns(0).getText()).toEqual("4");
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("4");
        historics.goToTab(1);
        ptor.sleep(helper.oneSec());
        //pairs
        historics.getPairName(1,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 1");
        });
        historics.getPairName(1,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberTotalPatterns(1).getText()).toEqual("4");
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("4");
        //index
        historics.goToTab(2);
        ptor.sleep(helper.oneSec());
        //pairs
        historics.getSimpleName(2,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 1");
        });
        historics.getSimpleName(2,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 2");
        });
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(historics.getNumberFoundPatterns(2).getText()).toEqual("4");
        historics.selectIndexType(1); // to pairs
        ptor.sleep(helper.oneSec());
        historics.getPairName(2,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 1");
        });
        historics.getPairName(2,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(historics.getNumberFoundPatterns(2).getText()).toEqual("4");
        historics.goToTab(3);
        ptor.sleep(helper.oneSec());
        expect(historics.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        ptor.sleep(helper.oneSec());
        expect(historics.getNumberTotalPatterns(3).getText()).toEqual("4");
        expect(historics.getNumberFoundPatterns(3).getText()).toEqual("4");

    });

    it('should be load filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        historics.getNameFilter(0).sendKeys("Long name Asset 1").then(
            function(data) {
                historics.getSearchButton(0).click();

                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        historics.getNameFilter(0).clear().then(
            function(data) {
                historics.getSearchButton(0).click();
                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(0).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //region selector
        //select Canada 1st option
        historics.selectRegion(0,1);
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("2");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        expect(historics.getSimpleName(0,1).getText()).toEqual("Long name Asset 2");
        //USA
        historics.selectRegion(0,2);
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("2");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 3");
        expect(historics.getSimpleName(0,1).getText()).toEqual("Long name Asset 4");
        //now we are going to check the exchanges, first selecting a exchange with a unselected region,

        historics.selectRegion(0,0); //unselect Region
        historics.selectExchange(0,1);//select market-canada 1
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        historics.selectExchange(0,2);//select market-canada 2
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 2");
        //check that the Canada Region is selected (as a reaction for select a canada-exchange)
        expect(historics.getRegionFilter(0).$('option:checked').getText()).toContain('Canada');
        //now unselect region, to select exchanges for USA
        historics.selectRegion(0,0); //unselect Region
        historics.selectExchange(0,3);//select market-usa 1
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 3");
        historics.selectExchange(0,2);//select market-usa 2 -> the exchanges list is refreshed, and now have only 2 options
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 4");
        //check that the Canada Region is selected (as a reaction for select a canada-exchange)
        expect(historics.getRegionFilter(0).$('option:checked').getText()).toContain('Estados Unidos');
        //Check sector/industries filters
        //first, unselect all
        historics.selectRegion(0,0); //unselect Region
        //sector and insdustries must be disabled
        expect(historics.getSectorFilter(0).getAttribute("disabled")).toEqual("true");
        expect(historics.getIndustryFilter(0).getAttribute("disabled")).toEqual("true");
        //select Canada and check the options of sectors/industries
        historics.selectRegion(0,1); //select Region Canada
        expect(historics.getSectorFilter(0).getAttribute("disabled")).not.toEqual("true");
        expect(historics.getIndustryFilter(0).getAttribute("disabled")).not.toEqual("true");
        historics.selectSector(0,1);//select sector1
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        historics.selectIndustry(0,1);//select industry
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        historics.selectIndustry(0,2);//select industry
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("0");
        historics.selectSector(0,2);//select sector1
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        //select other exchange
        historics.selectExchange(0,2);
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1"); //check that are loaded 2 patterns
        //now select a Industry to check if its sector is selected
        historics.selectIndustry(0,1); //select Industry2
        expect(historics.getSectorFilter(0).$('option:checked').getText()).toContain("Sector2"); //sector 2 is selected by industry2
        expect(historics.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 2"); //the sector 2 and industry2 load the asset2
        //Select operation types
        historics.selectRegion(0,0);
        historics.selectOperation(0,1); //select Buy option
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 2");
        expect(historics.getSimpleName(0,1).getText()).toEqual("Long name Asset 4");
        historics.selectOperation(0,2); //select Buy option
        expect(historics.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        expect(historics.getSimpleName(0,1).getText()).toEqual("Long name Asset 3");
    });

    it('should be load the volat,rent,duration... filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        checkNumericFilter(historics.getLastRentFilter(0),historics.getLastRentInput(0),0,"5","6",
            "Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getBestGainFilter(0),historics.getBestGainInput(0),0,"5","6",
            "Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getDurationFilter(0),historics.getDurationInput(0),0,"6","9",
            "Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getWorstLossFilter(0),historics.getWorstLossInput(0),0,"5","6",
            "Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);

    });
    /*
     PAIRS FILTERS
     */
    it('should be load and use the filters for pairs',function() {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.oneSec());
        expect(ptor.getCurrentUrl()).toContain('/historic');
        /*TEST FOR PAIRS FILTERS*/
        //search by name
        historics.goToTab(1);
        ptor.sleep(helper.oneSec());
        historics.getNameFilter(1).sendKeys("Long name Asset Pair 1").then(
            function(data) {
                historics.getSearchButton(1).click();

                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(1).getText()).toEqual("1");
                expect(historics.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
                expect(historics.getPairName(1,0,1).getText()).toEqual("Long name Asset Pair 1 2");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        historics.getNameFilter(1).clear().then(
            function(data) {
                historics.getSearchButton(1).click();
                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(1).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //region selector
        //select Canada 1st option
        historics.selectRegion(1,1);
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("2");
        expect(historics.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        expect(historics.getPairName(1,1,0).getText()).toEqual("Long name Asset Pair 2 1");
        //USA
        historics.selectRegion(1,2);
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("2");
        expect(historics.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 3 1");
        expect(historics.getPairName(1,1,0).getText()).toEqual("Long name Asset Pair 4 1");
        //now we are going to check the exchanges, first selecting a exchange with a unselected region,

        historics.selectRegion(1,0);
        //sector and insdustries must be disabled
        expect(historics.getSectorFilter(1).getAttribute("disabled")).toEqual("true");
        expect(historics.getIndustryFilter(1).getAttribute("disabled")).toEqual("true");
        //select Canada and check the options of sectors/industries
        historics.selectRegion(1,1); //select Region Canada
        expect(historics.getSectorFilter(1).getAttribute("disabled")).not.toEqual("true");
        expect(historics.getIndustryFilter(1).getAttribute("disabled")).not.toEqual("true");
        historics.selectSector(1,1);//select sector1
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(historics.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        historics.selectIndustry(1,1);//select industry
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(historics.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        historics.selectIndustry(1,2);//select industry
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("0");
        historics.selectSector(1,2);//select sector1
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("1");
        //select other exchange
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("1"); //check that are loaded 2 patterns
        //now select a Industry to check if its sector is selected
        historics.selectIndustry(1,1); //select Industry2
        expect(historics.getSectorFilter(1).$('option:checked').getText()).toContain("Sector2"); //sector 2 is selected by industry2
        expect(historics.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(historics.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 2 1"); //the sector 2 and industry2 load the asset2
    });

    it(' the numeric filters should work with pair patterns',function(){
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        historics.goToTab(1);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(historics.getLastRentFilter(1),historics.getLastRentInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getBestGainFilter(1),historics.getBestGainInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getDurationFilter(1),historics.getDurationInput(1),1,"6","9",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getWorstLossFilter(1),historics.getWorstLossInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);

    });

    it('should be load filters and use it for filter the actual simple index patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        historics.goToTab(2);
        ptor.sleep(helper.oneSec())
        historics.getNameFilter(2).sendKeys("Long name Asset Index 1").then(
            function(data) {
                historics.getSearchButton(2).click();

                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(2).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        historics.getNameFilter(2).clear().then(
            function(data) {
                historics.getSearchButton(2).click();
                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(2).getText()).toEqual("4");

            }
        );
        expect(historics.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 1");
        expect(historics.getSimpleName(2,3).getText()).toEqual("Long name Asset Index 4");

        ptor.sleep(helper.oneSec()); //Select operation types
        historics.selectOperation(2,1); //select Alcista option
        expect(historics.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 2");
        expect(historics.getSimpleName(2,1).getText()).toEqual("Long name Asset Index 4");
        historics.selectOperation(2,2); //select Bajista option
        expect(historics.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 1");
        expect(historics.getSimpleName(2,1).getText()).toEqual("Long name Asset Index 3");
    });

    it('should be load the volat,rent,duration... filters and use it for filter the actual simple index patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        historics.goToTab(2);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(historics.getLastRentFilter(2),historics.getLastRentInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getBestGainFilter(2),historics.getBestGainInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getDurationFilter(2),historics.getDurationInput(2),2,"6","9",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getWorstLossFilter(2),historics.getWorstLossInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);

    });

    /*
     PAIRS INDEX FILTERS
     */
    it('should be load and use the filters for index pairs',function() {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        /*TEST FOR PAIRS FILTERS*/
        //search by name
        historics.goToTab(2);
        ptor.sleep(helper.oneSec());
        historics.selectIndexType(1);
        ptor.sleep(helper.oneSec());
        historics.getNameFilter(2).sendKeys("Long name Asset Pair Index 1").then(
            function(data) {
                historics.getSearchButton(2).click();

                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(2).getText()).toEqual("1");
                expect(historics.getPairName(2,0,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                expect(historics.getPairName(2,0,1).getText()).toEqual("Long name Asset Pair Index 1 2");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        historics.getNameFilter(2).clear().then(
            function(data) {
                historics.getSearchButton(2).click();
                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(2).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());  //only there is one filter in the upper form, name and pattern type..

    });

    it(' the numeric filters should work with pair index patterns',function(){
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');

        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.fiveSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        historics.goToTab(2);
        ptor.sleep(helper.oneSec())
        historics.selectIndexType(1);
        ptor.sleep(helper.oneSec());
        checkNumericFilter(historics.getLastRentFilter(2),historics.getLastRentInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getBestGainFilter(2),historics.getBestGainInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getDurationFilter(2),historics.getDurationInput(2),2,"6","9",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getWorstLossFilter(2),historics.getWorstLossInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);

    });
    /*FUTURES*/
    it('should be load filters and use it for filter the actual future patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        historics.goToTab(3);
        ptor.sleep(helper.oneSec())
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        historics.getNameFilter(3).sendKeys("Long name Asset Future 1").then(
            function(data) {
                historics.getSearchButton(3).click();

                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(3).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        historics.getNameFilter(3).clear().then(
            function(data) {
                historics.getSearchButton(3).click();
                ptor.sleep(helper.oneSec());
                expect(historics.getNumberFoundPatterns(3).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //echange selector
        historics.selectOperation(3,1);
        expect(historics.getNumberFoundPatterns(3).getText()).toEqual("2");
        expect(historics.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 2");
        expect(historics.getSimpleName(3,1).getText()).toEqual("Long name Asset Future 4");
        historics.selectOperation(3,2);
        expect(historics.getNumberFoundPatterns(3).getText()).toEqual("2");
        expect(historics.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        expect(historics.getSimpleName(3,1).getText()).toEqual("Long name Asset Future 3");
        historics.selectOperation(3,0);
        expect(historics.getNumberFoundPatterns(3).getText()).toEqual("4");

    });

    it('should be load the volat,rent,duration... filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        historics.goToHistorics();
        ptor.sleep(helper.oneSec());

        expect(ptor.getCurrentUrl()).toContain('/historic');
        historics.goToTab(3);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(historics.getLastRentFilter(3),historics.getLastRentInput(3),3,"5","6"
            ,"Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getBestGainFilter(3),historics.getBestGainInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(historics.getDurationFilter(3),historics.getDurationInput(3),3,"6","9",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());

        checkNumericFilter(historics.getWorstLossFilter(3),historics.getWorstLossInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);

    });

});
