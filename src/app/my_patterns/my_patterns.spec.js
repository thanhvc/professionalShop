/**
 * Created by robgon on 10/06/14.
 */
describe('The Patterns view ', function () {
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('ui.router'));
    beforeEach(module('ui.bootstrap'));

    beforeEach(inject(function ($templateCache, $compile, $rootScope, $controller, $state, $httpBackend) {
        //create an empty scope
        scope = $rootScope.$new();
        //declare the controller and inject our empty scope
        $controller('PatternsCtrl', {$scope: scope});
        state = $state;
        compile = $compile;
        template = $templateCache;
        httpMock = $httpBackend;
        httpMock.when('GET', 'http://api.mo.devel.edosoftfactory.com/islogged').respond(200);
        httpMock.when('GET', 'http://api.mo.devel.edosoftfactory.com/patterns?indexType=0&page=1&productType=0').respond(200,
            {
                "Id": "20000",
                "name": "EMERA ",
                "name_tooltip": "CANADIAN NATIONAL (NASDAQ)",
                "type": "buy",
                "Sector": "Industrial",
                "Industry": "",
                "Merc": "TSX",
                "Merc_tooltip": "Toronto Stock Exchange",
                "Year": "13",
                "Year_Perd": "2",
                "Enter": "01/may/14",
                "Exit": "01/may/14",
                "Rent_acum": "85",
                "Rent_average": "5.7",
                "Rent_Diary": "0.06",
                "Days": "100",
                "Vol": "13",
                "Fav": false,
                "Est": "Sin Comenzar"
            },
            {
                "Id": "30000",
                "name": "SPAN AMERICAN ",
                "name_tooltip": "CANADIAN NATIONAL (NASDAQ)",
                "type": "buy",
                "Sector": "Industrial",
                "Industry": "",
                "Merc": "TSX",
                "Merc_tooltip": "Toronto Stock Exchange",
                "Year": "13",
                "Year_Perd": "2",
                "Enter": "01/may/14",
                "Exit": "01/may/14",
                "Rent_acum": "85",
                "Rent_average": "5.7",
                "Rent_Diary": "0.06",
                "Days": "100",
                "Vol": "13",
                "Fav": false,
                "Est": "Finalizado"
            }
        );
        httpMock.when('GET', 'http://api.mo.devel.edosoftfactory.com/actualdate').respond(200);
    }));


    it(' in the initialization ', function () {
        state.go('my-patterns');
        scope.$apply();
        expect(scope.filterOptions.filters).toBeDefined();
        expect(scope.filterOptions.selectors.regions).toBeDefined();
        expect(scope.pagingOptions.currentPage).toEqual(1);
    });

    it('checking the filters ', function () {
        expect(scope.filterOptions.filters).toBeDefined();
        scope.filterOptions.filters.selectedAverage = "1";
        scope.filterOptions.filters.selectedRent = "1";
        scope.filterOptions.filters.selectedRentDiary = "1";
        scope.filterOptions.filters.selectedVolatility = "2";
        scope.filterOptions.filters.selectedDuration = "1";
        scope.checkFilters();
        //check that all filters are clean becase the inputs are not filled
        expect(scope.filterOptions.filters.selectedAverage).toEqual("");
        expect(scope.filterOptions.filters.selectedRent).toEqual("");
        expect(scope.filterOptions.filters.selectedRentDiary).toEqual("");
        expect(scope.filterOptions.filters.selectedVolatility).toEqual("");
        expect(scope.filterOptions.filters.selectedDuration).toEqual("");

        //now check the inputs
        scope.filterOptions.filters.rentAverageInput = "2";
        scope.filterOptions.filters.rentInput = "2";
        scope.filterOptions.filters.rentDiaryInput = "2";
        scope.filterOptions.filters.volatilityInput = "2";
        scope.filterOptions.filters.durationInput = "2";
        scope.checkFilters();
        expect(scope.filterOptions.filters.rentAverageInput).toEqual("");
        expect(scope.filterOptions.filters.rentInput).toEqual("");
        expect(scope.filterOptions.filters.rentDiaryInput).toEqual("");
        expect(scope.filterOptions.filters.volatilityInput).toEqual("");
        expect(scope.filterOptions.filters.durationInput).toEqual("");

        //now the right case
        scope.filterOptions.filters.selectedAverage = "1";
        scope.filterOptions.filters.rentAverageInput = "10";
        scope.filterOptions.filters.rentInput = "20";
        scope.filterOptions.filters.selectedRent = "1";
        scope.filterOptions.filters.rentDiaryInput = "30";
        scope.filterOptions.filters.selectedRentDiary = "1";
        scope.filterOptions.filters.volatilityInput = "40";
        scope.filterOptions.filters.selectedVolatility = "1";
        scope.filterOptions.filters.durationInput = "50";
        scope.filterOptions.filters.selectedDuration = "1";
        scope.checkFilters();

        expect(scope.filterOptions.filters.rentAverageInput).toEqual("10");
        expect(scope.filterOptions.filters.rentInput).toEqual("20");
        expect(scope.filterOptions.filters.rentDiaryInput).toEqual("30");
        expect(scope.filterOptions.filters.volatilityInput).toEqual("40");
        expect(scope.filterOptions.filters.durationInput).toEqual("50");

        expect(scope.filterOptions.filters.selectedAverage).toEqual("1");
        expect(scope.filterOptions.filters.selectedRent).toEqual("1");
        expect(scope.filterOptions.filters.selectedRentDiary).toEqual("1");
        expect(scope.filterOptions.filters.selectedVolatility).toEqual("1");
        expect(scope.filterOptions.filters.selectedDuration).toEqual("1");
    });

    /**when launches saveUrl params gives error:
     * PhantomJS 1.9.7 (Mac OS X) ERROR
     Some of your tests did a full page reload! */

    it('checking that the params are saved in the url', function () {
        //set some filters
        scope.filterOptions.filters.filterName = "testName";
        scope.filterOptions.filters.selectedRegion = "1";
        scope.filterOptions.filters.selectedMarket = "2";
        scope.filterOptions.filters.selectedSector = "3";
        scope.filterOptions.filters.selectedIndustry = "4";
        scope.filterOptions.filters.selectedOperation = "1";
        scope.filterOptions.filters.selectedRent = "2";
        scope.filterOptions.filters.rentInput = "10";
        scope.filterOptions.filters.selectedAverage = "2";
        scope.filterOptions.filters.rentAverageInput = "20";
        scope.filterOptions.filters.rentDiaryInput = "30";
        scope.filterOptions.filters.selectedVolatility = "2";
        scope.filterOptions.filters.volatilityInput = "40";
        scope.filterOptions.filters.selectedDuration = "2";
        scope.filterOptions.filters.durationInput = "50";
        scope.filterOptions.filters.month = {month: 1,
            year: 2014,
            value: "1_2014"};
        scope.filterOptions.filters.favourite = true;
        scope.filterOptions.filters.active_tab = 2;
        //now save in the urlParams
        scope.saveUrlParams();
        //restart the filters to check that are clean
        scope.restartFilter();
        expect(scope.filterOptions.filters.filterName).toEqual("");
        expect(scope.filterOptions.filters.selectedRegion).toEqual("");
        expect(scope.filterOptions.filters.selectedMarket).toEqual("");
        expect(scope.filterOptions.filters.selectedSector).toEqual("");
        expect(scope.filterOptions.filters.selectedIndustry).toEqual("");
        expect(scope.filterOptions.filters.selectedOperation).toEqual("");
        expect(scope.filterOptions.filters.selectedRent).toEqual("");
        expect(scope.filterOptions.filters.rentInput).toEqual("");
        expect(scope.filterOptions.filters.selectedAverage).toEqual("");
        expect(scope.filterOptions.filters.rentAverageInput).toEqual("");
        expect(scope.filterOptions.filters.rentDiaryInput).toEqual("");
        expect(scope.filterOptions.filters.selectedVolatility).toEqual("");
        expect(scope.filterOptions.filters.volatilityInput).toEqual("");
        expect(scope.filterOptions.filters.selectedDuration).toEqual("");
        expect(scope.filterOptions.filters.durationInput).toEqual("");
        expect(scope.filterOptions.filters.favourite).toEqual(false);
        //change the month to reload it later
        scope.filterOptions.filters.month = "2_2013";
        //reload the params
        scope.loadUrlParams();
        expect(scope.filterOptions.filters.filterName).toEqual("testName");
        expect(scope.filterOptions.filters.selectedRegion).toEqual("1");
        expect(scope.filterOptions.filters.selectedMarket).toEqual("2");
        expect(scope.filterOptions.filters.selectedSector).toEqual("3");
        expect(scope.filterOptions.filters.selectedIndustry).toEqual("4");
        expect(scope.filterOptions.filters.selectedOperation).toEqual("1");
        expect(scope.filterOptions.filters.selectedRent).toEqual("2");
        expect(scope.filterOptions.filters.rentInput).toEqual("10");
        expect(scope.filterOptions.filters.selectedAverage).toEqual("2");
        expect(scope.filterOptions.filters.rentAverageInput).toEqual("20");
        expect(scope.filterOptions.filters.rentDiaryInput).toEqual("30");
        expect(scope.filterOptions.filters.selectedVolatility).toEqual("2");
        expect(scope.filterOptions.filters.volatilityInput).toEqual("40");
        expect(scope.filterOptions.filters.selectedDuration).toEqual("2");
        expect(scope.filterOptions.filters.durationInput).toEqual("50");
        expect(scope.filterOptions.filters.favourite).toEqual(true);
        expect(scope.filterOptions.filters.month.value).toEqual("1_2014");
        //special cases of region, markets..
        scope.filterOptions.filters.selectedRegion = "2";
        scope.filterOptions.filters.selectedMarket = "3";
        scope.filterOptions.filters.selectedSector = "4";
        scope.saveUrlParams();

        scope.filterOptions.filters.selectedMarket = "";
        scope.filterOptions.filters.selectedSector = "";
        scope.loadUrlParams();
        expect(scope.filterOptions.filters.selectedMarket).toEqual("3");
        expect(scope.filterOptions.filters.selectedSector).toEqual("4");
        scope.filterOptions.filters.selectedSector = "5";
        scope.saveUrlParams();
        scope.filterOptions.filters.selectedSector = "";
        scope.loadUrlParams();
        expect(scope.filterOptions.filters.selectedSector).toEqual("5");

    });

    it('checking month operations ', inject(function (MonthSelectorService) {
        var date = MonthSelectorService.restartDate();
        var actual_date = new Date();
        expect(actual_date.getFullYear()).toEqual(date.year);
        expect(actual_date.getMonth() + 1).toEqual(date.month);
        expect(date.value).toEqual((actual_date.getMonth() + 1) + "_" + actual_date.getFullYear());
        //checks the month movements
        var test_date = new Date(2013, 0, 1);
        var result_date = MonthSelectorService.setDate(test_date);
        expect(result_date.value).toEqual("1_2013");
        expect(result_date.month).toEqual(1);
        expect(result_date.year).toEqual(2013);
        result_date = MonthSelectorService.addMonths(2, result_date);
        expect(result_date.value).toEqual("3_2013");
        expect(result_date.month).toEqual(3);
        expect(result_date.year).toEqual(2013);
        result_date = MonthSelectorService.addMonths(-3, result_date);
        expect(result_date.value).toEqual("12_2012");
        expect(result_date.month).toEqual(12);
        expect(result_date.year).toEqual(2012);
        var listMonths = MonthSelectorService.getListMonths();
        expect(listMonths.length).toEqual(12);
        //now in the controller (from actualDate)
        result_date = MonthSelectorService.restartDate();
        scope.previousMonth();
        var changed_date = new Date(actual_date.getFullYear(), actual_date.getMonth() - 1, 1);
        expect(scope.filterOptions.filters.month.month).toEqual(changed_date.getMonth() + 1);
        expect(scope.filterOptions.filters.month.year).toEqual(changed_date.getFullYear());
        scope.nextMonth();
        expect(scope.filterOptions.filters.month.month).toEqual(actual_date.getMonth() + 1);
        expect(scope.filterOptions.filters.month.year).toEqual(actual_date.getFullYear());
        scope.filterOptions.filters.selectMonth = {value: "1_2014", id: "1"};
        scope.goToMonth();
        expect(scope.filterOptions.filters.month.month).toEqual(1);
        expect(scope.filterOptions.filters.month.year).toEqual(2014);
        scope.filterOptions.filters.month = MonthSelectorService.restartDate();
        scope.nextMonth();//last month to move
        expect(scope.canMove(1)).toEqual(false);
        scope.previousMonth();
        expect(scope.canMove(1)).toEqual(true);
        scope.filterOptions.filters.month = MonthSelectorService.addMonths(-10, scope.filterOptions.filters.month);
        expect(scope.canMove(-1)).toEqual(false);


    }));

    it('checking tabs', function () {
        scope.changeTab(1);
        expect(scope.getTemplateTable()).toEqual("my_patterns/tables/pairs_table.tpl.html");
        expect(scope.getTemplateFilter()).toEqual("my_patterns/filters/pairs_filters.tpl.html");
        scope.changeTab(2);
        scope.filterOptions.filters.index_type = 0;//index
        expect(scope.getTemplateTable()).toEqual("my_patterns/tables/index_table.tpl.html");
        expect(scope.getTemplateFilter()).toEqual("my_patterns/filters/index_filters.tpl.html");
        scope.filterOptions.filters.index_type = 1;//pair index
        expect(scope.getTemplateTable()).toEqual("my_patterns/tables/pairs_index_table.tpl.html");
        expect(scope.getTemplateFilter()).toEqual("my_patterns/filters/index_filters.tpl.html");
        scope.changeTab(3);
        expect(scope.getTemplateTable()).toEqual("my_patterns/tables/futures_table.tpl.html");
        expect(scope.getTemplateFilter()).toEqual("my_patterns/filters/futures_filters.tpl.html");
        scope.changeTab(0);
        expect(scope.getTemplateTable()).toEqual("my_patterns/tables/stocks_table.tpl.html");
        expect(scope.getTemplateFilter()).toEqual("my_patterns/filters/stocks_filters.tpl.html");
    });


});