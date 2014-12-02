describe('The Lookup diary controller', function () {

    describe('template', function () {
        var $scope, ctrl, state, $http, $compile,$location, stateParams,expiration,tabsService,actualDateService,diaryData;

        var patternsFilter = '/patternfilters?indexType=0&industry=&market=&month=12&productType=0&region=&sector=&view=&year=2014';
        var patternsFilterToken = '/patternfilters?indexType=0&industry=&market=&month=12&productType=0&region=&sector=&token=undefined&view=&year=2014';
        var lookup = '/lookupdiarypatterns?accumulatedInput=&accumulatedReturn=&alarm=&averageInput=&averageReturn=&dailyInput=&dailyReturn=&duration=&durationInput=&favourites=&indexType=0&industry=&market=&month=12&name=&operation=&page=1&productType=0&region=&sector=&volatility=&volatilityInput=&year=2014';
        var lookup2 = '/patternfilters?indexType=0&industry=&market=&month=12&productType=0&region=&sector=&token=1&view=&year=2014';
        var lookupToken = '/lookupdiarypatterns?accumulatedInput=&accumulatedReturn=&alarm=&averageInput=&averageReturn=&dailyInput=&dailyReturn=&duration=&durationInput=&favourites=&indexType=0&industry=&market=&month=12&name=&operation=&page=1&productType=0&region=&sector=&token=1&volatility=&volatilityInput=&year=2014';
        beforeEach(angular.mock.module("ngMo"));
        beforeEach(angular.mock.module("ngMo.home"));
        beforeEach(angular.mock.module("ngMo.lookup_diary"));

        beforeEach(inject(function ($controller, $rootScope, _$location_,_$compile_,$state, $stateParams,_$httpBackend_,TabsService,ActualDateService,SelectedPackService) { //, $state, $stateParams, $location, TabsService, PatternsService, MonthSelectorService, IsLogged, myPatternsData, SelectedMonthService, ExpirationYearFromPatternName) {
            ctrl = $controller;
            $scope = $rootScope.$new();
            state = $state;
            $compile = _$compile_;
            tabsService = TabsService;
            $location = _$location_;
            actualDateService = ActualDateService;
            diaryData = { 'pack': { 'productType': 'INDICE','patternType': "SIMPLE"}, 'pagingOptions' : {pageSize: 10,
                currentPage: 1
            }};
            stateParams = $stateParams;
            $http = _$httpBackend_;
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);
            $http.when('GET', $rootScope.urlService + '/actualdate').respond(200);
            $http.when('GET', $rootScope.urlService + '/islogged').respond(200);
            $http.when('GET', $rootScope.urlService + patternsFilter).respond(200);
            $http.when('GET', $rootScope.urlService + patternsFilterToken).respond(200);
            $http.when('GET', $rootScope.urlService + lookup).respond(200);
            $http.when('GET', $rootScope.urlService + lookup2).respond(200);
            $http.when('GET', $rootScope.urlService + lookupToken).respond(200);
            $controller('LookupDiaryCtrl', {'$scope': $rootScope, 'state': $state ,  'diaryData': diaryData});
        }));

        it("should respond to key events", function(){
            var keyEvent = {'which': 13};
            $scope.submitName(keyEvent);
            expect($scope.search).toNotBe(undefined);
        });

        it("should set the current page to a given on", function(){
            $scope.setPage(1);
            expect($scope.pagingOptions.currentPage).toBe(1);
        });

        it("should success when opening", function(){
            $scope.open(1, 'Name', 'bearishAssetName', 1, '45$', 'GREATER_THAN');
            $scope.open(1, 'Name', 'bearishAssetName', 1, '45$', 'LESS_THAN');
            expect($scope.open).toNotBe(undefined);
        });

        it("should be able to open notes", function(){
            //$scope.open(1, 'Name', 'bearishAssetName', 1, '45$', 'GREATER_THAN');
            $scope.openNotes('Name', 'bearishAssetName');
            expect($scope.openNotes).toNotBe(undefined);
        });

        it("should restart filter", function(){

            $scope.filterOptions.selectors = {'months': ['Enero', 'Febrero']};
            $scope.filterOptions.filters = {'month': 'agosto', rentAverageInput: 12, 'favourite': '', 'filterName': '', 'durationInput': ''};
            $scope.restartFilter();

            tabsService.changeActiveTab(1);
            $scope.restartFilter();
            tabsService.changeActiveTab(2);
            $scope.restartFilter();
            tabsService.changeActiveTab(3);
            $scope.restartFilter();
            expect($scope.restartFilter).toNotBe(undefined);
        });

        it("should get the correct template table", function(){

            var res = $scope.getTemplateTable();
            tabsService.changeActiveTab(2);
            res = $scope.getTemplateTable();
            expect(res).toNotBe(undefined);
        });

        it("should get the correct template filter", function(){

            var res = $scope.getTemplateFilter();
            tabsService.changeActiveTab(2);
            res = $scope.getTemplateFilter();
            expect(res).toNotBe(undefined);
        });

        it("should change the current tab to a given one", function(){
            $scope.changeTab(1);
            expect(tabsService.getActiveTab()).toBe(1);
        });

        it('should check if filter is active', function() {
            $scope.filterOptions.filters = {'month': 'agosto', 'durationInput': 2 };
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto','favourite': 1, 'filterName': 'filter', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto','favourite': '', 'filterName': 'filter', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto', rentAverageInput: 12, 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto', rentDiaryInput: 12, rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto', rentInput: 12, rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toNotBe(undefined);

            $scope.filterOptions.filters = {'month': 'agosto', selectedAverage: 12, rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto', selectedDuration: 2, selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto', selectedIndustry: 'industry' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto', selectedMarket: 'market' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto',selectedOperation: 'operation', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto',selectedRegion: 'region' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto',selectedRent: 12 ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto',selectedRentDiary: 12, selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto',selectedSector: 'sector', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto',selectedVolatility: 4 ,selectedSector: '', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'month': 'agosto',volatilityInput: 4, selectedVolatility: '' ,selectedSector: '', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'alarm': true,'month': 'agosto',volatilityInput: '', selectedVolatility: '' ,selectedSector: '', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(true);

            $scope.filterOptions.filters = {'alarm': false,'month': 'agosto',volatilityInput: '', selectedVolatility: '' ,selectedSector: '', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
            expect($scope.isFilterActive()).toBe(false);
        });

        it('should restore data', function() {
            $scope.filterOptions.filters = {'month': 'agosto', 'durationInput': 2 };
            $scope.restoreData();
            expect($scope.restoreData).toNotBe(undefined);
        });

        it('should load page', function() {
            $scope.loadPage();
            expect($scope.loadPage).toNotBe(undefined);
        });

        it('should have a refresh selectors functionality',function(){
            var data={regions:[{description: "China",
                id: "CHN"},{description: "Estados Unidos",
                id: "USA"}], markets:[{description: "American Stock Exchange",
                id: "AMEX"},{description: "BUDAPEST STOCK EXCHANGE",
                id: "BUD"}], industries:[],sectors:[], selectedRegion:'China', selectedMarket:'AMEX', selectedSector:'sector1'};
            $scope.callBackRefreshSelectors(data);
            expect($scope.callBackRefreshSelectors).toNotBe(undefined);
        });

        it('should have a search by filters functionality',function(){
            $scope.filterOptions.filters = {'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': 'Agosto', 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': '', 'filterName': 'name', 'durationInput': 12};
            $scope.checkFilters();
            expect($scope.checkFilters).toNotBe(undefined);
        });

        it('should refresh region correctly', function(){
            $scope.refreshRegion();
            $scope.changeTab(1);
            $scope.refreshRegion();
            $scope.changeTab(2);
            $scope.refreshRegion();
            $scope.changeTab(3);
            $scope.refreshRegion();
            expect($scope.refreshRegion).toNotBe(undefined);
        });

        it('should let the user select a region', function(){
            $scope.selectRegion();
            expect($scope.selectRegion).toNotBe(undefined);
        });

       it('should be able to open a graph', function(){
            $http.expectGET('i18n/common/es.json');
            $http.expectGET($scope.urlService+'/actualdate');
            $http.expectGET($scope.urlService + patternsFilter);
            $http.expectGET($scope.urlService + lookup);
            $http.expectGET($scope.urlService + lookup2);
            $http.expectGET($scope.urlService + patternsFilterToken);
            $http.expectGET($scope.urlService + lookupToken);

           var k = {'parentElement': "<td class='stocks-vol-value'></td>", 'offsetHeight': '30px', 'insertBefore' : function(){}, 'srcElement': "<td class='stocks-vol-value'></td>"};
           var i = {'parentElement': k, 'srcElement': "<td class='stocks-vol-value'></td>"};
           var j = {'parentElement': i, 'srcElement': "<td class='stocks-vol-value'></td>"};
           var parentElement = {'parentElement': j, 'srcElement': "<td class='stocks-vol-value'></td>"};
           var srcElement = { 'parentElement': parentElement};
           var e = {
                'srcElement': srcElement
           };
           var template = $compile("<td class='stocks-vol-value'><a ng-click='loadGraphic($event,data.asset.longName,data.patternType,null,false,data.asset.volatilityChartURL);$event.stopPropagation();' class='ng-binding'>68</a></td>")($scope);
           $scope.$apply();

           $scope.loadGraphic(e,'url','name');//Reak graph
           expect($scope.loadGraphic).toNotBe(undefined);
        });

        it('should be able to close the graph', function(){
            $scope.closeGraph();
            expect($scope.closeGraph).toNotBe(undefined);
        });

        it('should refresh market', function(){
            $scope.refreshMarket();
            expect($scope.refreshMarket).toNotBe(undefined);
        });

        it('should select market', function(){
            $scope.selectMarket();
            expect($scope.selectMarket).toNotBe(undefined);
        });

        it('should refresh sector', function(){
            $scope.refreshSector();
            expect($scope.refreshSector).toNotBe(undefined);
        });

        it('should select sector', function(){
            $scope.selectSector();
            expect($scope.selectSector).toNotBe(undefined);
        });

        it('should refresh Industry', function(){
            $scope.refreshIndustry();
            expect($scope.refreshIndustry).toNotBe(undefined);
        });

        it('should select Industry', function(){
            $scope.selectIndustry();
            expect($scope.selectIndustry).toNotBe(undefined);
        });


        it('should select IndexType', function(){
            $scope.selectIndexType();
            expect($scope.selectIndexType).toNotBe(undefined);
        });

        it('should get next month', function(){
            $scope.nextMonth();
            expect($scope.nextMonth).toNotBe(undefined);
        });

        it('should get previous month', function(){
            $scope.previousMonth();
            expect($scope.previousMonth).toNotBe(undefined);
        });

        it('should go to a given month', function(){
            $scope.goToMonth();
            expect($scope.goToMonth).toNotBe(undefined);
        });
        it('should move to a given direction', function(){
            $scope.canMove(1);
            expect($scope.canMove).toNotBe(undefined);
            $scope.canMove(0);
            expect($scope.canMove).toNotBe(undefined);
        });

        it('should check if a date is correct',function(){
            $scope.filterOptions.months = [{id: 0,
                name: "Octubre 2013",
                value: "10_2013"},{ id: 1,
                name: "Noviembre 2013",
                value: "11_2013"}];

            var date = '10_2013';
            var res = $scope.isCorrectDate(date);
            expect(res).toBe(true);
            date = '05_2014';
            res = $scope.isCorrectDate(date);
            expect(res).toBe(false);
        });


        it('should save url params', function(){
            $scope.filterOptions.filters = {'alarm': true, 'index_type':1,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': 'Agosto', 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
            $scope.saveUrlParams();
            expect($scope.saveUrlParams).toNotBe(undefined);
        });

        it('should load url params', function(){
            //correct date
            $location.search('month', '8_2014');
            $scope.filterOptions.filters = {'index_type':0,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': 'Agosto', 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
            $scope.loadUrlParams();
            tabsService.changeActiveTab(1);
            $scope.loadUrlParams();
            tabsService.changeActiveTab(2);
            $scope.loadUrlParams();
            tabsService.changeActiveTab(3);

            //incorrect date
            $location.search('month', 'august_2014');
            $scope.loadUrlParams();
            expect($scope.loadUrlParams).toNotBe(undefined);
        });

        it('should have expiration service working',function(){
            $scope.getYearFromPatternName('pattern', new Date());
            expect($scope.getYearFromPatternName).toNotBe(undefined);
        });

        it('should success when changing location', function(){

            $scope.$broadcast("locationChangeSuccess",[{},state]);
            //expect($scope.inWeekView).toNotBe(undefined);

        });

        it("should close graph if user click on page's body", function(){

            $scope.$broadcast("body-click",[{},state]);
            //expect($scope.inWeekView).toNotBe(undefined);

        });

    });
});

describe('The LookupDiary Service ', function () {

    beforeEach(angular.mock.module("ngMo.lookup_diary"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (LookupDiaryService, _$rootScope_, _$compile_, _$httpBackend_) {

            service = LookupDiaryService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;

        }));

        it('should load data asynchronously', function(){
            var filters = {'month': 'Agosto', 'year': '2014' };
            var res = service.getPagedDataAsync(1,filters);
            expect(res).toNotBe(undefined);
        });

        it('should set an alert', function(){
            var res = service.setAlert(1, '45$', 'GREATER_THAN');
            expect(res).toNotBe(undefined);
        });

        it('should delet a given alert', function(){
            var res = service.deleteAlert(1);
            expect(res).toNotBe(undefined);
        });

        it('should get selectors', function(){

            var filters = {'month': 'Agosto', 'year': '2014' };
            service.getSelectors(filters,'','','');
            expect(service.getSelectors).toNotBe(undefined);
        });
    });
});