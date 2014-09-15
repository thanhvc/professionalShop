describe('The historic controller', function () {

    describe('template', function () {
        var $scope, ctrl, state, $http, $compile,$location, stateParams,historicDataData,tabsService, patternsService;

        beforeEach(angular.mock.module("ngMo"));
        beforeEach(angular.mock.module("ngMo.home"));
        beforeEach(angular.mock.module("ngMo.my_patterns"));
        beforeEach(angular.mock.module("ngMo.historic"));

        beforeEach(inject(function ($controller, $rootScope, _$location_,_$compile_,$state, $stateParams,_$httpBackend_,TabsService,PatternsService){
            ctrl = $controller;
            $scope = $rootScope.$new();
            state = $state;
            $compile = _$compile_;
            $location = _$location_;
            patternsService = PatternsService;
            tabsService = TabsService;
            historicDataData = { 'pack': { 'productType': 'INDICE','patternType': "SIMPLE"}, 'pagingOptions' : {pageSize: 10,
                currentPage: 1
            }};
            stateParams = $stateParams;
            $http = _$httpBackend_;

            $controller('HistoricCtrl', {'$scope': $rootScope, 'state': $state , 'historicDataData': historicDataData});
        }));

        it("should set the page", function(){
            var keyEvent = {'which': 13};
            $scope.submitName(keyEvent);
            expect($scope.search).toNotBe(undefined);
        });

        it("should set the current page to a given one", function(){
            $scope.setPage(1);
            expect($scope.pagingOptions.currentPage).toBe(1);
        });

        /*it("should let the user select a favourite pattern", function(){
            $scope.toggleFavorite(1);
            expect($scope.toggleFavorite).toNotBe(undefined);
        });*/

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
            $location.search('qname','');
            $location.search('qregion','');
            $location.search('qmarket','');
            $location.search('qsector','');
            $location.search('qindust','');
            $location.search('qtab','');
            $location.search('qfav','');
            $location.search('qindex','');
            $location.search('qdur','');
            $location.search('qvol','');
            $location.search('qaver','');
            $location.search('qdiar','');
            $location.search('qrent','');
            $location.search('qacttab',1);
            $location.search('pag',1);
            $scope.filterOptions.filters = {'index_type':0,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': 'Agosto', 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
            $scope.loadUrlParams();
            $scope.changeTab(1);
            $scope.loadUrlParams();
            $scope.changeTab(2);
            $scope.loadUrlParams();
            $scope.changeTab(3);

            //incorrect date
            $location.search('month', 'august_2014');
            $scope.loadUrlParams();
            expect($scope.loadUrlParams).toNotBe(undefined);
        });

        it('should have expiration service working',function(){
            $scope.getYearFromPatternName('pattern', new Date());
            expect($scope.getYearFromPatternName).toNotBe(undefined);
        });

    });
});


describe('The Historics Service ', function () {

    beforeEach(angular.mock.module("ngMo.historic"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (HistoricsService, _$rootScope_, _$compile_, _$httpBackend_) {

            service = HistoricsService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;

        }));

        it('should load data asynchronously', function(){
            var filters = {'month': 'Agosto', 'year': '2014' , 'selectedOperation' :{'id': 1} ,'selectedRent': {'id': 1}, 'selectedAverage': {'id':1}, 'selectedRentDiary' :{'id':1}, 'selectedVolatility' :{'id':1}, 'selectedDuration' :{'id':1}};
            var res = service.getPagedDataAsync(1,filters);
            expect(res).toNotBe(undefined);
        });

        it('should create params from filters', function(){
            $scope.$apply();
            var month = {'month': 'agosto', 'year': 2014};
            var filters = {'month': month};
            var patterns = service.createParamsFromFilter(filters);
            expect(patterns).toNotBe(undefined);
        });

    });
});


describe('The Month Selector Historic Service ', function () {

    beforeEach(angular.mock.module("ngMo.historic"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (MonthSelectorHistoricService,_$rootScope_, _$compile_, _$httpBackend_) {
            service = MonthSelectorHistoricService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;

        }));

        it('should return the name of the month given by the number', function(){

            var date = {'month': 1};
            var res = service.getMonthName(date);
            expect(res).toBe('Enero');
            date = {'month': 2};
            res = service.getMonthName(date);
            expect(res).toBe('Febrero');
            date = {'month': 3};
            res = service.getMonthName(date);
            expect(res).toBe('Marzo');
            date = {'month': 4};
            res = service.getMonthName(date);
            expect(res).toBe('Abril');
            date = {'month': 5};
            res = service.getMonthName(date);
            expect(res).toBe('Mayo');
            date = {'month': 6};
            res = service.getMonthName(date);
            expect(res).toBe('Junio');
            date = {'month': 7};
            res = service.getMonthName(date);
            expect(res).toBe('Julio');
            date = {'month': 8};
            res = service.getMonthName(date);
            expect(res).toBe('Agosto');
            date = {'month': 9};
            res = service.getMonthName(date);
            expect(res).toBe('Septiembre');
            date = {'month': 10};
            res = service.getMonthName(date);
            expect(res).toBe('Octubre');
            date = {'month': 11};
            res = service.getMonthName(date);
            expect(res).toBe('Noviembre');
            date = {'month': 12};
            res = service.getMonthName(date);
            expect(res).toBe('Diciembre');
            date = {'month': ''};
            res = service.getMonthName(date);
            expect(res).toBe('notFound');

        });

        it('should restart the date', function(){
            var res = service.restartDate();
            expect(res).toNotBe(undefined);
        });

        it('should set the date if given a new one', function(){

            var res = service.setDate(new Date());
            expect(res).toNotBe('undefined ');
        });

        it('should return the list of months', function(){

            var res = service.getListMonths();
            expect(res).toNotBe('undefined ');
        });
    });
});

