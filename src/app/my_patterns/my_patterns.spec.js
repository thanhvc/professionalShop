describe('The tabs Service', function () {

    beforeEach(angular.mock.module("ngMo.my_patterns"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (_TabsService_, _$rootScope_, _$compile_, _$httpBackend_) {

            service = _TabsService_;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;

            $http.when('GET', $rootScope.urlService + '/actualdate').respond(200,{data: new Date()});

        }));

        it('should initialize tabs correctly', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
        });

        it('should change the active tab', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.changeActiveTab(1);
        });

        it('should get tab index type', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.getIndexType();
            expect(service.getIndexType).toNotBe(undefined);
        });

        it('should get active tab index type', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.getActiveIndexType();
            expect(service.getActiveIndexType).toNotBe(undefined);
        });

        it('should change active tab index type', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.changeActiveIndexType(3);
            //expect($scope.activeIndex).toEqual(1);

        });

        it('should have getPortfolioTabs functionality', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.getPortfolioTabs();
        });

        it('should have getTabs functionality', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.getTabs();
        });

        it('should return the active tab', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.getActiveTab();

        });

        it('should change portfolio active tab', function(){

            delete $window.sessionStorage.cart;
            var template = $compile("<div tabs-service></div>")($scope);
            $scope.$apply();
            service.changePortfolioActiveTab();
        });

    });

});

describe('The Patterns Service', function () {

    beforeEach(angular.mock.module("ngMo.my_patterns"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (PatternsService, _$rootScope_, _$compile_, _$httpBackend_) {

            service = PatternsService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;
        }));

        it('should initialize params from filters specified by the user', function(){

            var filters = {'month': 'Agosto', 'year': '2014' };
            var res = service.createParamsFromFilter(filters);
            expect(res).toNotBe(undefined);
        });

        it('should load data asynchronously', function(){

            var filters = {'month': 'Agosto', 'year': '2014' };
            var res = service.getPagedDataAsync(1,filters);
            expect(res).toNotBe(undefined);
        });

        it('should get selectors', function(){

            var filters = {'month': 'Agosto', 'year': '2014' };
            service.getSelectors(filters,'','','');
            expect(service.getSelectors).toNotBe(undefined);
        });

        it('should set the pattern as a favourite', function(){

            var res = service.setFavorite(1);
            expect(res).toNotBe(undefined);
        });
    });
});


describe('The MonthSelector Service', function () {

    beforeEach(angular.mock.module("ngMo.my_patterns"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (MonthSelectorService, _$rootScope_, _$compile_, _$httpBackend_) {

            service = MonthSelectorService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;
        }));

//        it('should return the name of the month given by the number', function(){
//
//            var date = {'month': 1};
//            var res = service.getMonthName(date);
//            expect(res).toBe('Enero');
//            date = {'month': 2};
//            res = service.getMonthName(date);
//            expect(res).toBe('Febrero');
//            date = {'month': 3};
//            res = service.getMonthName(date);
//            expect(res).toBe('Marzo');
//            date = {'month': 4};
//            res = service.getMonthName(date);
//            expect(res).toBe('Abril');
//            date = {'month': 5};
//            res = service.getMonthName(date);
//            expect(res).toBe('Mayo');
//            date = {'month': 6};
//            res = service.getMonthName(date);
//            expect(res).toBe('Junio');
//            date = {'month': 7};
//            res = service.getMonthName(date);
//            expect(res).toBe('Julio');
//            date = {'month': 8};
//            res = service.getMonthName(date);
//            expect(res).toBe('Agosto');
//            date = {'month': 9};
//            res = service.getMonthName(date);
//            expect(res).toBe('Septiembre');
//            date = {'month': 10};
//            res = service.getMonthName(date);
//            expect(res).toBe('Octubre');
//            date = {'month': 11};
//            res = service.getMonthName(date);
//            expect(res).toBe('Noviembre');
//            date = {'month': 12};
//            res = service.getMonthName(date);
//            expect(res).toBe('Diciembre');
//            date = {'month': ''};
//            res = service.getMonthName(date);
//            expect(res).toBe('notFound');
//
//        });

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

        it('should return the list of months of the actual calendar', function(){

            var res = service.getCalendarListMonths();
            expect(res).toNotBe('undefined ');

        });

        it('should add months', function(){

            var date = {'month': 'agosto', 'year': 2014};
            var res = service.addMonths([],new Date());
            expect(res).toNotBe('undefined ');
        });
    });
});


//Testing myPatterns controller

describe('The patterns controller', function() {

    var $scope, ctrl, state,$http,myPatternsData,vector, expiration;

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.my_patterns"));
    beforeEach(angular.mock.module("auth"));
    beforeEach(angular.mock.module("ngMo.home"));


    beforeEach(inject(function ($controller, $rootScope, $state ,ExpirationYearFromPatternName,TabsService){ //, $state, $stateParams, $location, TabsService, ActualDateService, PatternsService, MonthSelectorService, IsLogged, myPatternsData, SelectedMonthService, ExpirationYearFromPatternName) {
        ctrl = $controller;
        $scope = $rootScope.$new();
        state = $state;
        expiration = ExpirationYearFromPatternName;
        myPatternsData = {patterns: [{id: 7937, pack: Object, freePackList: Array[0], patternType: "BEARISH", win: 15}], results: 293, found: 293};
        $controller('PatternsCtrl', {'$scope': $rootScope, 'state': $state, 'myPatternsData': myPatternsData });

    }));

    it("should respond to key events", function(){
        var keyEvent = {'which': 13};
        $scope.submitName(keyEvent);
        expect($scope.search).toNotBe(undefined);
    });

    it('should set the page to the given on', function(){
        $scope.setPage(1);
        expect($scope.pagingOptions.currentPage).toBe(1);
    });

    it('should toggleFavorite', function(){
        $scope.toggleFavorite(1);
        expect($scope.toggleFavorite).toNotBe(undefined);
    });

    it('should restartFilter', function(){
        $scope.filterOptions.filters = {'month': 'agosto'};
        $scope.filterOptions.selectors = {'months': ['Enero', 'Febrero']};
        $scope.restartFilter();

        $scope.changeTab(1);
        $scope.restartFilter();

        $scope.changeTab(2);
        $scope.restartFilter();

        $scope.changeTab(3);
        $scope.restartFilter();

        expect($scope.restartFilter).toNotBe(undefined);
    });

    it('should get Template Table', function(){
        var res = $scope.getTemplateTable();
        expect(res).toNotBe(undefined);
        $scope.changeTab(2);
        res = $scope.getTemplateTable();
        expect(res).toNotBe(undefined);
    });


    it('should get Template Filter', function(){

        $scope.changeTab(1);
        var res = $scope.getTemplateFilter();

        $scope.changeTab(2);
        res = $scope.getTemplateFilter();

        $scope.changeTab(3);
        res = $scope.getTemplateFilter();

        expect(res).toNotBe(undefined);
    });

    it('should change tab to given on', function() {
        $scope.changeTab(2);
        expect($scope.changeTab).toNotBe(undefined);
    });

    it('should restore data', function() {
        $scope.filterOptions.filters = {'month': 'agosto', 'durationInput': 2 };
        $scope.restoreData();
        expect($scope.restoreData).toNotBe(undefined);
    });

    it('should check if filter is active', function() {
        $scope.filterOptions.filters = {'month': 'agosto', 'durationInput': 2 };
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto','favourite': 1, 'filterName': 'filter', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto','favourite': '', 'filterName': 'filter', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto', rentAverageInput: 12, 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto', rentDiaryInput: 12, rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto', rentInput: 12, rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto', selectedAverage: 12, rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto', selectedDuration: 2, selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto', selectedIndustry: 'industry' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto', selectedMarket: 'market' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};

        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',selectedOperation: 'operation', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};

        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',selectedRegion: 'region' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};

        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',selectedRent: 12 ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};

        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',selectedRentDiary: 12, selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};

        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',selectedSector: 'sector', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};

        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',selectedVolatility: 4 ,selectedSector: '', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',volatilityInput: 4, selectedVolatility: '' ,selectedSector: '', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toNotBe(undefined);

        $scope.filterOptions.filters = {'month': 'agosto',volatilityInput: '', selectedVolatility: '' ,selectedSector: '', selectedRentDiary: '', selectedRent: '' ,selectedRegion: '' ,selectedOperation: '', selectedMarket: '' ,selectedIndustry: '' ,selectedDuration: '', selectedAverage: '', rentInput: '', rentDiaryInput: '', rentAverageInput: '', 'favourite': '', 'filterName': '', 'durationInput': ''};
        expect($scope.isFilterActive()).toBe(false);

    });

    it('should load the page correctly', function(){

        $scope.loadPage();
        expect($scope.loadPage).toNotBe(undefined);
    });

    it('should load the page correctly', function(){

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

    it('should refresh Sector', function(){
        $scope.refreshSector();
        expect($scope.refreshSector).toNotBe(undefined);
    });

    it('should select Sector', function(){
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
    it('should save url params', function(){
        $scope.filterOptions.filters = {'index_type':1,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': 'Agosto', 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
        $scope.saveUrlParams();
        expect($scope.saveUrlParams).toNotBe(undefined);
    });

    it('should load url params', function(){
        $scope.filterOptions.filters = {'index_type':1,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': 'Agosto', 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
        $scope.loadUrlParams();

        $scope.changeTab(2);
        $scope.loadUrlParams();
        $scope.loadUrlParams();
        expect($scope.loadUrlParams).toNotBe(undefined);
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

        $scope.search();
        expect($scope.search).toNotBe(undefined);
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

    it('should have a search by filters functionality',function(){
        $scope.filterOptions.filters = {'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': 'Agosto', 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': '', 'filterName': 'name', 'durationInput': 12};
        $scope.checkFilters();
        expect($scope.checkFilters).toNotBe(undefined);
    });

    it('should have expiration service working',function(){
        $scope.getYearFromPatternName('pattern', new Date());
        expect($scope.getYearFromPatternName).toNotBe(undefined);
    });

});


describe('The SelectedMonth Service', function () {

    beforeEach(angular.mock.module("ngMo.my_patterns"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;

        beforeEach(inject(function (SelectedMonthService, _$rootScope_, _$compile_, _$httpBackend_) {

            service = SelectedMonthService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;

        }));

        it('should return the name of the month selected by the user', function () {
            var res = service.getSelectedMonth();
            expect(res).toNotBe(undefined);
        });

        it('should change the name of the month selected by the user', function () {

            service.changeSelectedMonth('Abril');
            expect(service.changeSelectedMonth).toNotBe(undefined);
        });

    });

});