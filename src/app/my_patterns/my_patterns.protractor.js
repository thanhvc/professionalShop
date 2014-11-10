/**
 * Created by laia on 10/06/14.
 */


var loadFixture = require('../../../test-helpers/load-fixture.js');
var sha512 = require('sha512');
var ptor = protractor.getInstance();
var Home = require('../../../test-helpers/page-objects/home.po.js');
var Helper = require('../../../test-helpers/helper.js');
var fixtureGenerator = require('../../../test-helpers/fixtures/fixture-generator.js');
var MyPatterns = require('../../../test-helpers/page-objects/mypatterns.po.js');
describe('The My Patterns page ', function () {

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
        myPatterns.selectDropdownbyNum(elementSelect,2);//less than
        elementInput.sendKeys(value1);
        myPatterns.getSearchButton(tab).click();
        expect(myPatterns.getNumberFoundPatterns(tab).getText()).toEqual("0");//there is no patterns with accum < value1
        //with greater than value1 are 4 patterns
        myPatterns.selectDropdownbyNum(elementSelect,1);//greater than  value1
        myPatterns.getSearchButton(tab).click();
        expect(myPatterns.getNumberFoundPatterns(tab).getText()).toEqual("4");//there is no patterns with accum < value1
        myPatterns.selectDropdownbyNum(elementSelect,2);//less than
        elementInput.clear();
        elementInput.sendKeys(value2);
        myPatterns.getSearchButton(tab).click();
        expect(myPatterns.getNumberFoundPatterns(tab).getText()).toEqual("1");//there 1 patterns with filter < value2
        if (isPair) {
            expect(myPatterns.getPairName(tab,0,0).getText()).toEqual(name1);
        } else {
            expect(myPatterns.getSimpleName(tab,0).getText()).toEqual(name1);
        }

        //greater than value2 -> 3 patterns
        myPatterns.selectDropdownbyNum(elementSelect,1);//greater than
        myPatterns.getSearchButton(tab).click();
        expect(myPatterns.getNumberFoundPatterns(tab).getText()).toEqual("3");//there 1 patterns with filter < value2
        if (isPair) {
            expect(myPatterns.getPairName(tab,0,0).getText()).toEqual(name2);
            expect(myPatterns.getPairName(tab,1,0).getText()).toEqual(name3);
            expect(myPatterns.getPairName(tab,2,0).getText()).toEqual(name4);
            //now check wrong value

        } else {
            expect(myPatterns.getSimpleName(tab,0).getText()).toEqual(name2);
            expect(myPatterns.getSimpleName(tab,1).getText()).toEqual(name3);
            expect(myPatterns.getSimpleName(tab,2).getText()).toEqual(name4);
            //now check wrong value

        }
        elementInput.clear();
        elementInput.sendKeys("asd");
        myPatterns.selectDropdownbyNum(elementSelect,2);//less than
        expect(helper.hasClass(elementInput,"ng-invalid")).toBe(true);
        myPatterns.getSearchButton(tab).click(); //search with wrong value, clears the input
        expect(elementInput.getText()).toEqual("");
        //reset the status of the filter to initial state
        myPatterns.selectDropdownbyNum(elementSelect,0);
        elementInput.clear();
        myPatterns.getSearchButton(tab).click();
    }




    var home;
    var myPatterns;
    var helper;
    var conString = browser.params.sqlCon;
    /*'postgres://super:moserverpass@localhost:25432/moserver'*/
    beforeEach(function () {
        helper = new Helper();
        var fixtures = fixtureGenerator.fixture_myPatterns();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());
        // loadFixture.loadMultipleFixture(fixture1, fixture2, conString);
        browser.ignoreSynchronization = true;


        home = new Home();
        myPatterns = new MyPatterns();
    });
    afterEach(function () {
        var fixtures = fixtureGenerator.remove_fixtures_subscriptions();
        loadFixture.executeQueries(fixtures, conString);
        ptor.sleep(helper.oneSec());

    });
    xit('should be load patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        browser.get('/');
        ptor.sleep(helper.oneSec());
        myPatterns.goToMyPatterns();
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(0).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("4");
        myPatterns.goToTab(1);
        ptor.sleep(helper.oneSec());
        //pairs
       myPatterns.getPairName(1,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1");
        });
        myPatterns.getPairName(1,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(1).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("4");
        //index
         myPatterns.goToTab(2);
        ptor.sleep(helper.oneSec());
        //pairs
        myPatterns.getSimpleName(2,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 1");
        });
        myPatterns.getSimpleName(2,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Index 2");
        });
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("4");
        myPatterns.selectIndexType(1); // to pairs
        ptor.sleep(helper.oneSec());
        myPatterns.getPairName(2,0,0).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1");
        });
        myPatterns.getPairName(2,0,1).getText().then(function(data) {
            expect(data).toEqual("Long name Asset Pair Index 1 2");
        });
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(2).getText()).toEqual("4");
        expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("4");
        myPatterns.goToTab(3);
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        ptor.sleep(helper.oneSec());
        expect(myPatterns.getNumberTotalPatterns(3).getText()).toEqual("2");
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("2");

    });

    xit('should be load filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        myPatterns.getNameFilter(0).sendKeys("Long name Asset 1").then(
            function(data) {
                myPatterns.getSearchButton(0).click();

                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        myPatterns.getNameFilter(0).clear().then(
            function(data) {
                myPatterns.getSearchButton(0).click();
                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //region selector
        //select Canada 1st option
        myPatterns.selectRegion(0,1);
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("2");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        expect(myPatterns.getSimpleName(0,1).getText()).toEqual("Long name Asset 2");
        //USA
        myPatterns.selectRegion(0,2);
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("2");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 3");
        expect(myPatterns.getSimpleName(0,1).getText()).toEqual("Long name Asset 4");
        //now we are going to check the exchanges, first selecting a exchange with a unselected region,

        myPatterns.selectRegion(0,0); //unselect Region
        myPatterns.selectExchange(0,1);//select market-canada 1
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        myPatterns.selectExchange(0,2);//select market-canada 2
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 2");
        //check that the Canada Region is selected (as a reaction for select a canada-exchange)
        expect(myPatterns.getRegionFilter(0).$('option:checked').getText()).toContain('Canada');
        //now unselect region, to select exchanges for USA
        myPatterns.selectRegion(0,0); //unselect Region
        myPatterns.selectExchange(0,3);//select market-usa 1
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 3");
        myPatterns.selectExchange(0,2);//select market-usa 2 -> the exchanges list is refreshed, and now have only 2 options
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 4");
        //check that the Canada Region is selected (as a reaction for select a canada-exchange)
        expect(myPatterns.getRegionFilter(0).$('option:checked').getText()).toContain('Estados Unidos');
        //Check sector/industries filters
        //first, unselect all
        myPatterns.selectRegion(0,0); //unselect Region
        //sector and insdustries must be disabled
        expect(myPatterns.getSectorFilter(0).getAttribute("disabled")).toEqual("true");
        expect(myPatterns.getIndustryFilter(0).getAttribute("disabled")).toEqual("true");
        //select Canada and check the options of sectors/industries
        myPatterns.selectRegion(0,1); //select Region Canada
        expect(myPatterns.getSectorFilter(0).getAttribute("disabled")).not.toEqual("true");
        expect(myPatterns.getIndustryFilter(0).getAttribute("disabled")).not.toEqual("true");
        myPatterns.selectSector(0,1);//select sector1
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        myPatterns.selectIndustry(0,1);//select industry
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        myPatterns.selectIndustry(0,2);//select industry
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("0");
        myPatterns.selectSector(0,2);//select sector1
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        //select other exchange
        myPatterns.selectExchange(0,2);
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1"); //check that are loaded 2 patterns
        //now select a Industry to check if its sector is selected
        myPatterns.selectIndustry(0,1); //select Industry2
        expect(myPatterns.getSectorFilter(0).$('option:checked').getText()).toContain("Sector2"); //sector 2 is selected by industry2
        expect(myPatterns.getNumberFoundPatterns(0).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 2"); //the sector 2 and industry2 load the asset2
        //Select operation types
        myPatterns.selectRegion(0,0);
        myPatterns.selectOperation(0,1); //select Buy option
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 2");
        expect(myPatterns.getSimpleName(0,1).getText()).toEqual("Long name Asset 4");
        myPatterns.selectOperation(0,2); //select Buy option
        expect(myPatterns.getSimpleName(0,0).getText()).toEqual("Long name Asset 1");
        expect(myPatterns.getSimpleName(0,1).getText()).toEqual("Long name Asset 3");
    });

    xit('should be load the volat,rent,duration... filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getAccumulatedFilter(0),myPatterns.getAccumulatedInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getAverageFilter(0),myPatterns.getAverageInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDurationFilter(0),myPatterns.getDurationInput(0),0,"6","9","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getVolatFilter(0),myPatterns.getVolatInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDiaryFilter(0),myPatterns.getDiaryInput(0),0,"5","6","Long name Asset 1","Long name Asset 2","Long name Asset 3","Long name Asset 4",false);

    });
    /*
    PAIRS FILTERS
     */
    xit('should be load and use the filters for pairs',function() {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        /*TEST FOR PAIRS FILTERS*/
        //search by name
        myPatterns.goToTab(1);
        ptor.sleep(helper.oneSec());
        myPatterns.getNameFilter(1).sendKeys("Long name Asset Pair 1").then(
            function(data) {
                myPatterns.getSearchButton(1).click();

                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("1");
                expect(myPatterns.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
                expect(myPatterns.getPairName(1,0,1).getText()).toEqual("Long name Asset Pair 1 2");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        myPatterns.getNameFilter(1).clear().then(
            function(data) {
                myPatterns.getSearchButton(1).click();
                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //region selector
        //select Canada 1st option
        myPatterns.selectRegion(1,1);
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("2");
        expect(myPatterns.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        expect(myPatterns.getPairName(1,1,0).getText()).toEqual("Long name Asset Pair 2 1");
        //USA
        myPatterns.selectRegion(1,2);
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("2");
        expect(myPatterns.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 3 1");
        expect(myPatterns.getPairName(1,1,0).getText()).toEqual("Long name Asset Pair 4 1");
        //now we are going to check the exchanges, first selecting a exchange with a unselected region,

        myPatterns.selectRegion(1,0);
        //sector and insdustries must be disabled
        expect(myPatterns.getSectorFilter(1).getAttribute("disabled")).toEqual("true");
        expect(myPatterns.getIndustryFilter(1).getAttribute("disabled")).toEqual("true");
        //select Canada and check the options of sectors/industries
        myPatterns.selectRegion(1,1); //select Region Canada
        expect(myPatterns.getSectorFilter(1).getAttribute("disabled")).not.toEqual("true");
        expect(myPatterns.getIndustryFilter(1).getAttribute("disabled")).not.toEqual("true");
        myPatterns.selectSector(1,1);//select sector1
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(myPatterns.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        myPatterns.selectIndustry(1,1);//select industry
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(myPatterns.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 1 1");
        myPatterns.selectIndustry(1,2);//select industry
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("0");
        myPatterns.selectSector(1,2);//select sector1
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("1");
        //select other exchange
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("1"); //check that are loaded 2 patterns
        //now select a Industry to check if its sector is selected
        myPatterns.selectIndustry(1,1); //select Industry2
        expect(myPatterns.getSectorFilter(1).$('option:checked').getText()).toContain("Sector2"); //sector 2 is selected by industry2
        expect(myPatterns.getNumberFoundPatterns(1).getText()).toEqual("1");
        expect(myPatterns.getPairName(1,0,0).getText()).toEqual("Long name Asset Pair 2 1"); //the sector 2 and industry2 load the asset2
    });

    xit(' the numeric filters should work with pair patterns',function(){
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.fiveSec());

        myPatterns.goToTab(1);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(myPatterns.getAccumulatedFilter(1),myPatterns.getAccumulatedInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getAverageFilter(1),myPatterns.getAverageInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDurationFilter(1),myPatterns.getDurationInput(1),1,"6","9",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getVolatFilter(1),myPatterns.getVolatInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDiaryFilter(1),myPatterns.getDiaryInput(1),1,"5","6",
            "Long name Asset Pair 1 1","Long name Asset Pair 2 1","Long name Asset Pair 3 1","Long name Asset Pair 4 1",true);

    });

    xit('should be load filters and use it for filter the actual simple index patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        myPatterns.goToTab(2);
        ptor.sleep(helper.oneSec())
        myPatterns.getNameFilter(2).sendKeys("Long name Asset Index 1").then(
            function(data) {
                myPatterns.getSearchButton(2).click();

                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        myPatterns.getNameFilter(2).clear().then(
            function(data) {
                myPatterns.getSearchButton(2).click();
                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("4");

            }
        );
        expect(myPatterns.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 1");
        expect(myPatterns.getSimpleName(2,3).getText()).toEqual("Long name Asset Index 4");

        ptor.sleep(helper.oneSec()); //Select operation types
        myPatterns.selectOperation(2,1); //select Alcista option
        expect(myPatterns.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 2");
        expect(myPatterns.getSimpleName(2,1).getText()).toEqual("Long name Asset Index 4");
        myPatterns.selectOperation(2,2); //select Bajista option
        expect(myPatterns.getSimpleName(2,0).getText()).toEqual("Long name Asset Index 1");
        expect(myPatterns.getSimpleName(2,1).getText()).toEqual("Long name Asset Index 3");
    });

    xit('should be load the volat,rent,duration... filters and use it for filter the actual simple index patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.fiveSec());
        myPatterns.goToTab(2);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(myPatterns.getAccumulatedFilter(2),myPatterns.getAccumulatedInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getAverageFilter(2),myPatterns.getAverageInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDurationFilter(2),myPatterns.getDurationInput(2),2,"6","9",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getVolatFilter(2),myPatterns.getVolatInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDiaryFilter(2),myPatterns.getDiaryInput(2),2,"5","6",
            "Long name Asset Index 1","Long name Asset Index 2","Long name Asset Index 3","Long name Asset Index 4",false);

    });

    /*
     PAIRS INDEX FILTERS
     */
    xit('should be load and use the filters for index pairs',function() {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        /*TEST FOR PAIRS FILTERS*/
        //search by name
        myPatterns.goToTab(2);
        ptor.sleep(helper.oneSec());
        myPatterns.selectIndexType(1);
        ptor.sleep(helper.oneSec());
        myPatterns.getNameFilter(2).sendKeys("Long name Asset Pair Index 1").then(
            function(data) {
                myPatterns.getSearchButton(2).click();

                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("1");
                expect(myPatterns.getPairName(2,0,0).getText()).toEqual("Long name Asset Pair Index 1 1");
                expect(myPatterns.getPairName(2,0,1).getText()).toEqual("Long name Asset Pair Index 1 2");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        myPatterns.getNameFilter(2).clear().then(
            function(data) {
                myPatterns.getSearchButton(2).click();
                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(2).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());  //only there is one filter in the upper form, name and pattern type..

    });

    xit(' the numeric filters should work with pair index patterns',function(){
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.fiveSec());

        myPatterns.goToTab(2);
        ptor.sleep(helper.oneSec())
        myPatterns.selectIndexType(1);
        ptor.sleep(helper.oneSec());
        checkNumericFilter(myPatterns.getAccumulatedFilter(2),myPatterns.getAccumulatedInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getAverageFilter(2),myPatterns.getAverageInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDurationFilter(2),myPatterns.getDurationInput(2),2,"6","9",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getVolatFilter(2),myPatterns.getVolatInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDiaryFilter(2),myPatterns.getDiaryInput(2),2,"5","6",
            "Long name Asset Pair Index 1 1","Long name Asset Pair Index 2 1","Long name Asset Pair Index 3 1","Long name Asset Pair Index 4 1",true);

    });

    it('should be load filters and use it for filter the actual future patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.oneSec());
        myPatterns.goToTab(3);
        ptor.sleep(helper.oneSec())
        /*TEST FOR SIMPLE FILTERS*/
        //search by name
        myPatterns.getNameFilter(3).sendKeys("Long name Asset Future 1").then(
            function(data) {
                myPatterns.getSearchButton(3).click();

                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("1");
            }
        );

        ptor.sleep(helper.oneSec());

        //clear the name filter
        myPatterns.getNameFilter(3).clear().then(
            function(data) {
                myPatterns.getSearchButton(3).click();
                ptor.sleep(helper.oneSec());
                expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("4");

            }
        );

        ptor.sleep(helper.oneSec());
        //echange selector

        myPatterns.selectExchange(3,1);
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        myPatterns.selectExchange(3,2);
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 2");
        myPatterns.selectExchange(3,3);
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 3");
        myPatterns.selectExchange(3,4);
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("1");
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 4");
        myPatterns.selectExchange(3,0);
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("4");
        //select Canada 1st option
        myPatterns.selectRegion(3,1);
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("2");
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        expect(myPatterns.getSimpleName(3,1).getText()).toEqual("Long name Asset Future 2");
        //USA
        myPatterns.selectRegion(3,2);
        expect(myPatterns.getNumberFoundPatterns(3).getText()).toEqual("2");
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 3");
        expect(myPatterns.getSimpleName(3,1).getText()).toEqual("Long name Asset Future 4");

        myPatterns.selectOperation(3,1); //select Buy option
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 2");
        expect(myPatterns.getSimpleName(3,1).getText()).toEqual("Long name Asset Future 4");
        myPatterns.selectOperation(3,2); //select Buy option
        expect(myPatterns.getSimpleName(3,0).getText()).toEqual("Long name Asset Future 1");
        expect(myPatterns.getSimpleName(3,1).getText()).toEqual("Long name Asset Future 3");
    });

    it('should be load the volat,rent,duration... filters and use it for filter the actual simple patterns', function () {
        home.showLoginBox();
        home.login('john.snow@thewall.north', 'phantom');
        ptor.sleep(helper.fiveSec());
        myPatterns.goToTab(3);
        ptor.sleep(helper.oneSec())
        checkNumericFilter(myPatterns.getAccumulatedFilter(3),myPatterns.getAccumulatedInput(3),3,"5","6"
            ,"Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getAverageFilter(3),myPatterns.getAverageInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);

        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDurationFilter(3),myPatterns.getDurationInput(3),3,"6","9",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getVolatFilter(3),myPatterns.getVolatInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);
        ptor.sleep(helper.fiveSec());
        checkNumericFilter(myPatterns.getDiaryFilter(3),myPatterns.getDiaryInput(3),3,"5","6",
            "Long name Asset Future 1","Long name Asset Future 2","Long name Asset Future 3","Long name Asset Future 4",false);

    });

});
