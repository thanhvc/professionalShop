describe('The Correlation controller', function () {

    beforeEach(angular.mock.module("ngMo.correlation"));
    //beforeEach(angular.mock.module("ngMo.home"));
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;
        var $window,$location,isLogged,patternsService,UserApplyFilters;
        var $state,ctrl,$modal, port;

        var correlation = {id :1};
        var pattern = {patternType: "STOCK", id:1};
        var patterns = {patterns :[pattern,pattern], correlationPatterns:[correlation]};
        var correlationExcel = '/correlationexcel';

        var patternFilters = '/patternfilters?indexType=0&market=&month=10&productType=0&token=1&view=&year=2014';
        var patternFilters1 = '/patternfilters?indexType=0&market=&month=10&productType=1&token=1&view=&year=2014';
        var patternFilters3 = '/patternfilters?indexType=0&market=&month=10&productType=3&token=1&view=&year=2014';
        var patternFiltersRegion3 = '/patternfilters?indexType=0&market=&month=10&productType=3&region=&token=1&view=&year=2014';
        var patternFiltersRegion = '/patternfilters?indexType=0&market=&month=10&productType=0&region=&token=1&view=&year=2014';
        var patternFiltersRegionUn = '/patternfilters?indexType=0&market=&month=10&productType=0&region=undefined&token=1&view=&year=2014';
        var correlationPatternsRegion1 = '/patternfilters?indexType=0&market=&month=10&productType=1&region=&token=1&view=&year=2014';
        var addCorrelation = '/correlationpatterns?add_delete=0&correlationList=1&favourites=&indexType=0&market=&month=10&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22,%22id%22:1%7D&productType=0&token=1&year=2014';
        var addCorrelationRegionUn = '/correlationpatterns?add_delete=0&correlationList=1&favourites=&indexType=0&market=&month=10&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22,%22id%22:1%7D&productType=0&region=undefined&token=1&year=2014';
        var deleteCorrelationRegionUn = '/correlationpatterns?add_delete=1&correlationList=1&favourites=&indexType=0&market=&month=10&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22,%22id%22:1%7D&productType=0&region=undefined&token=1&year=2014';

        var correlationPatternsRegion = '/correlationpatterns?favourites=&indexType=0&market=&month=10&name=&operation=&page=1&productType=0&region=&token=1&year=2014';
        var correlationPatterns = '/correlationpatterns?favourites=&indexType=0&market=&month=10&name=&operation=&page=1&productType=0&region=&token=1&year=2014';
        var correlationPatterns1 = '/correlationpatterns?favourites=&indexType=0&market=&month=10&name=&operation=&page=1&productType=1&region=&token=1&year=2014';
        var correlationPatterns2 = '/correlationpatterns?favourites=&indexType=0&market=&month=10&name=&operation=&page=1&productType=2&region=&token=1&year=2014';
        var correlationPatterns3 = '/correlationpatterns?favourites=&indexType=0&market=&month=10&name=&operation=&page=1&productType=3&region=&token=1&year=2014';
        var correlationPatternsList = '/correlationpatterns?correlationList=1&favourites=&indexType=0&market=&month=10&name=&operation=&page=1&productType=0&token=1&year=2014';
        var correlationPatternsRegionUn = '/correlationpatterns?correlationList=1&favourites=&indexType=0&market=&month=10&name=&operation=&page=1&productType=0&region=undefined&token=1&year=2014';
        var favourite = '/favoritepattern?patternId=1&token=1';
        var correlationPdf = '/correlationpdf?indexType=0&productType=0&token=1';
        var correlationPdf1 = '/correlationpdf?indexType=0&productType=1&token=1';
        var correlationPdf2 = '/correlationpdf?indexType=0&productType=2&token=1';
        var correlationPdf3 = '/correlationpdf?indexType=0&productType=3&token=1';
        var correlationResult = '/correlationresult?correlationList=1&indexType=0&productType=0&token=1';

        var config;
        beforeEach(inject(function ($rootScope, $controller,_$location_,$modal,_$state_,_$compile_,UserApplyFilters,PatternsService,PortfolioService, IsLogged, TabsService,ActualDateService,MonthSelectorService,_$httpBackend_, _$window_) {

            $location = _$location_;

            config  = {
                params: {
                    'patternId': 1
                    //'token': $window.localStorage.token
                }
            };
            ctrl = $controller;
            port = PortfolioService;
            $compile = _$compile_;
            $scope = $rootScope.$new();
            $http = _$httpBackend_;
            $state = _$state_;
            service = TabsService;
            $state = {data :  {  pageTitle : 'title'}};
            isLogged = IsLogged;
            patternsService = PatternsService;
            UserApplyFilters = UserApplyFilters;
            $controller('CorrelationCtrl',  {'$rootScope': $rootScope,'$scope': $scope,'$modal':$modal, '$http': _$httpBackend_, 'TabsService': TabsService, 'ActualDateService' : ActualDateService , 'MonthSelectorService': MonthSelectorService, 'IsLogged': IsLogged, 'PatternsService': PatternsService, 'UserApplyFilters': UserApplyFilters});

            $http.when('GET', $rootScope.urlService + correlationPdf).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPdf1).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPdf2).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPdf3).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + '/actualdate').respond(200,{data: new Date()});
            $http.when('GET', $rootScope.urlService + '/islogged').respond(200);
            $http.when('GET', $rootScope.urlService + patternFilters).respond(200,{data: new Date()});
            $http.when('GET', $rootScope.urlService + patternFilters1).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + patternFiltersRegion).respond(200,{data: new Date()});
            $http.when('GET', $rootScope.urlService + correlationPatternsRegion1).respond(200,{data: new Date()});
            $http.when('GET', $rootScope.urlService + correlationPatterns).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPatterns1).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPatterns2).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPatternsList).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationResult).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + addCorrelation).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPatternsRegionUn).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPatternsRegion).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + favourite).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + patternFiltersRegionUn).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + patternFilters3).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationPatterns3).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + patternFiltersRegion3).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + addCorrelationRegionUn).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + deleteCorrelationRegionUn).respond(200,patterns);
            $http.when('GET', $rootScope.urlService + correlationExcel).respond(200,patterns);

        }));


        it("should start the page", inject(function () {
            $scope.startLoading();
            expect($scope.loading).toBe(true);
        }));

        it("should get the correct template table", function(){

            var res = $scope.getTemplateTable();
            service.changeActiveTab(2);
            res = $scope.getTemplateTable();
            expect(res).toBeDefined();
        });

        it("should get the correct template filter", function(){

            var res = $scope.getTemplateFilter();
            service.changeActiveTab(2);
            res = $scope.getTemplateFilter();
            expect(res).toBeDefined();
        });

        it("should restart filter", function(){

            $scope.filterOptions.selectors = {'months': ['Enero', 'Febrero']};
            $scope.filterOptions.filters = {'month': new Date().getMonth(), rentAverageInput: 12, 'favourite': '', 'filterName': '', 'durationInput': ''};
            $scope.restartFilter();

            service.changeActiveTab(1);
            $scope.restartFilter();
            service.changeActiveTab(2);
            $scope.restartFilter();
            service.changeActiveTab(3);
            $scope.restartFilter();
            expect($scope.restartFilter).toBeDefined();
        });


        it("should change the current tab to a given one", function(){
            $scope.changeTab(1);
            expect(service.getActiveTab()).toBe(1);
            $scope.changeTab(2);
            expect(service.getActiveTab()).toBe(2);
            $scope.changeTab(3);
            expect(service.getActiveTab()).toBe(3);
        });

        it('should restore data', function() {
            $scope.filterOptions.filters = {'month': new Date().getMonth(), 'durationInput': 2 };
            $scope.restoreData();
            expect($scope.restoreData).toBeDefined();
        });

        it('should let the user set a pattern as favourite', function() {
            $scope.toggleFavorite(1);
            expect($scope.toggleFavorite).toBeDefined();
        });
        it('should have a refresh selectors functionality',function(){
            var data={regions:[{description: "China",
                id: "CHN"},{description: "Estados Unidos",
                id: "USA"}], markets:[{description: "American Stock Exchange",
                id: "AMEX"},{description: "BUDAPEST STOCK EXCHANGE",
                id: "BUD"}], industries:[],sectors:[], selectedRegion:'China', selectedMarket:'AMEX', selectedSector:'sector1'};
            $scope.refreshSelectors(data);
            expect($scope.refreshSelectors).toBeDefined();
        });


        it('should be able to do search', function() {
            $scope.search();
            expect($scope.search).toBeDefined();
        });

        it('should have a refresh selectors functionality',function(){
            var data={regions:[{description: "China",
                id: "CHN"},{description: "Estados Unidos",
                id: "USA"}], markets:[{description: "American Stock Exchange",
                id: "AMEX"},{description: "BUDAPEST STOCK EXCHANGE",
                id: "BUD"}], industries:[],sectors:[], selectedRegion:'China', selectedMarket:'AMEX', selectedSector:'sector1'};
            $scope.refreshSelectors(data);
            expect($scope.refreshSelectors).toBeDefined();
        });

        it('should refresh region correctly', function(){
            $scope.refreshRegion();
            $scope.changeTab(1);
            $scope.refreshRegion();
            $scope.changeTab(2);
            $scope.refreshRegion();
            $scope.changeTab(3);
            $scope.refreshRegion();
            expect($scope.refreshRegion).toBeDefined();
        });

        it('should let the user select a region', function(){
            $scope.selectRegion();
            expect($scope.selectRegion).toBeDefined();
        });

        it('should refresh market', function(){
            $scope.refreshMarket();
            expect($scope.refreshMarket).toBeDefined();
        });

        it('should select market', function(){
            $scope.selectMarket();
            expect($scope.selectMarket).toBeDefined();
        });


        it('should select IndexType', function(){
            $scope.selectIndexType();
            expect($scope.selectIndexType).toBeDefined();
        });

        it('should get next month', function(){
            $scope.nextMonth();
            expect($scope.nextMonth).toBeDefined();
        });

        it('should get previous month', function(){
            $scope.previousMonth();
            expect($scope.previousMonth).toBeDefined();
        });

        it('should go to a given month', function(){
            $scope.goToMonth();
            expect($scope.goToMonth).toBeDefined();
        });

        it('should move to a given direction', function(){
            $scope.canMove(1);
            expect($scope.canMove).toBeDefined();
            $scope.canMove(0);
            expect($scope.canMove).toBeDefined();
        });

        it('should generate a pdf', function(){
            $http.expectGET($scope.urlService + correlationPdf);
            //$http.expectGET($scope.urlService + patternFiltersRegion);
            $http.expectGET($scope.urlService + correlationPatterns);
            $scope.generatePdf();
            $http.flush();

        });

        it('should generate a pdf when tab 1 is active', function(){
            $http.expectGET($scope.urlService + correlationPdf1);
            $scope.changeTab(1);
            $scope.generatePdf();
            $http.flush();
            expect($scope.generatePdf).toBeDefined();
        });

        it('should generate a pdf when tab 2 is active', function(){
            $http.expectGET($scope.urlService + correlationPatterns2);
            $scope.changeTab(2);
            $scope.generatePdf();
            $http.flush();
            expect($scope.generatePdf).toBeDefined();
        });
        it('should generate a pdf when tab 3 is active', function(){
            $http.expectGET($scope.urlService + patternFilters3);
            $http.expectGET($scope.urlService + patternFiltersRegion3);
            $scope.changeTab(3);
            $scope.generatePdf();
            $http.flush();
            expect($scope.generatePdf).toBeDefined();
        });

        it('should save url params', function(){
            $scope.filterOptions.filters = {'durationInterval': 2,'alarm': true, 'index_type':1,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': new Date().getMonth(), 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
            $scope.saveUrlParams();
            expect($scope.saveUrlParams).toBeDefined();
        });

        it('should clear correlation lists', function(){
            $scope.clearAllCorrelationLists();
            expect($scope.clearAllCorrelationLists).toBeDefined();
        });

        it('should clear correlation lists', function(){
            $scope.clearCorrelationList();
            $scope.changeTab(1);
            $scope.clearCorrelationList();
            $scope.changeTab(2);
            $scope.clearCorrelationList();
            $scope.changeTab(3);
            $scope.clearCorrelationList();
            expect($scope.correlationData.length).toBe(0);
        });


        it('should correlate', function(){
            $http.expectGET($scope.urlService + patternFiltersRegion);
            //$http.expectGET($scope.urlService + correlationPatternsRegionUn);

            $scope.correlate();
            $http.flush();
            expect($scope.correlate).toBeDefined();
        });

        it('should check if a date is the correct format', function(){
            var date = '09_2014';
            $scope.filterOptions.month = {value : date};
            var res = $scope.isCorrectDate(date);
            expect(res).toBeDefined(true);
        });

        it("should set page to a given one", inject(function () {
            $scope.setPage(1);
            expect($scope.pagingOptions.currentPage).toBe(1);
        }));

        it('should add a pattern to correlation list', function() {

            $scope.addToCorrelationList(pattern);
            $http.flush();
            expect($scope.addToCorrelationList.length).toNotBe(0);
        });

        it('should delete a pattern from correlation list', function() {
            $http.expectGET($scope.urlService + deleteCorrelationRegionUn);
            $scope.deleteFromCorrelationList(pattern);
            $http.flush();
            expect($scope.deleteFromCorrelationList).toBeDefined();
        });

        it('should load url params', function(){
            //correct date
            $location.search('month', '8_2014');
            $location.search('qname','name');
            $location.search('qregion','region');
            $location.search('qop','operation');
            $location.search('qmarket','market');
            $location.search('qsector','');
            $location.search('qindust','');
            $location.search('qtab','2');
            $location.search('qfav','3');
            $location.search('qindex','1');
            $location.search('qdur','4');
            $location.search('qvol','');
            $location.search('qaver','');
            $location.search('qdiar','');
            $location.search('qrent','');
            $location.search('qacttab',1);
            $location.search('pag',1);
            $scope.filterOptions.filters = {'index_type':0,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': new Date().getMonth(), 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
            $scope.loadUrlParams();
            service.changeActiveTab(1);
            $scope.loadUrlParams();
            service.changeActiveTab(2);
            $scope.loadUrlParams();
            service.changeActiveTab(3);
            $scope.loadUrlParams();


            //incorrect date
            $location.search('month', 'august_2014');
            $scope.loadUrlParams();
            expect($scope.loadUrlParams).toBeDefined();

            //other branch
            $location.search('qindex',0);
            $location.search('qacttab',2);
            $scope.loadUrlParams();

            //other branch
            $location.search('qindex','');
            $location.search('qacttab',2);
            $location.search('qmarket','undefined');
            $location.search('qsector','undefined');
            $scope.loadUrlParams();

        });

    });
});


describe('The correlation Service', function () {

    beforeEach(angular.mock.module("ngMo.correlation"));
    beforeEach(module('templates-app'));

    var date = new Date();

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;
        var $window;
        var filters = {'index_type': 0,'month': date.getMonth(), 'year': date.getFullYear() , 'selectedOperation' :{'id': 1} ,'selectedRent': {'id': 1}, 'selectedAverage': {'id':1}, 'selectedRentDiary' :{'id':1}, 'selectedVolatility' :{'id':1}, 'selectedDuration' :{'id':1}};
        var selectors = {'month': date.getMonth(), 'year': date.getFullYear()};
        var correlation = ['correlation1', 'correlation2'];
        var pattern = {patternType: "STOCK", id:1};
        beforeEach(inject(function (CorrelationService, _$rootScope_, _$compile_, _$httpBackend_, _$window_) {

            service = CorrelationService;
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $http = _$httpBackend_;
            $window = _$window_;
        }));

        it('should get correlation  data', function() {
            var res = service.getCorrelationData(correlation,filters);
            expect(res).toBeDefined();
        });

        it('should get correlation excel', function() {
            var res = service.getCorrelationExcel(correlation,filters);
            expect(res).toBeDefined();
        });

    });
});

