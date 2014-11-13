describe('The portfolio controller', function () {

    beforeEach(angular.mock.module("ngMo.portfolio"));
    beforeEach(angular.mock.module("ngMo.home"));
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;
        var $window,$location,isLogged,patternsService,UserApplyFilters;
        var $state,ctrl,$modal, port;

        var pattern = {patternType: "STOCK", id:1};
        var patterns = {patterns :[pattern,pattern]};
        var preLoad = 'durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&productType=0&region=&year=2014';
        var addPortfolio = '/portfoliopatterns?add_delete=0&durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22%7D&portfolioList=1&productType=0&region=&year=2014';
        //var addList = '/portfoliopatterns?add_delete=0&durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22,%22id%22:1%7D&portfolioList=1&productType=0&region=&year=2014';
        var addList = '/portfoliopatterns?add_delete=0&durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22,%22id%22:1%7D&productType=0&region=&year=2014';
        var addPortfolioId = '/portfoliopatterns?add_delete=0&durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22,%22id%22:1%7D&productType=0&region=&year=2014';
        var deletePortfolio = '/portfoliopatterns?add_delete=1&durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&patternId=%7B%22patternType%22:%22STOCK%22%7D&portfolioList=1&productType=0&region=&year=2014';
        //var deleteList = '/portfoliopatterns?add_delete=1&durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&patternId=1&portfolioList=1&productType=0&region=&year=2014';
        var deleteList = '/portfoliopatterns?add_delete=1&durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&patternId=1&productType=0&region=&year=2014';
        var patternFilters = '/patternfilters?indexType=0&market=&month=11&productType=0&region=&view=&year=2014';
        var portfolioPatternsList = '/portfoliopatterns?durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&portfolioList=1&productType=0&region=&year=2014';
        //var portfolioPatterns = '/portfoliopatterns?durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&portfolioList=1&productType=0&region=&year=2014';
        var portfolioPatterns = '/portfoliopatterns?durationInterval=&favourites=&indexType=0&market=&month=11&name=&operation=&page=1&productType=0&region=&year=2014';
        var favourite = '/favoritepattern?patternId=1';

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
            $controller('PortfolioCtrl',  {'$rootScope': $rootScope,'$scope': $scope,'$modal':$modal, '$http': _$httpBackend_, 'TabsService': TabsService, 'ActualDateService' : ActualDateService , 'MonthSelectorService': MonthSelectorService, 'IsLogged': IsLogged, 'PatternsService': PatternsService, 'UserApplyFilters': UserApplyFilters});
            _$httpBackend_.when('GET','i18n/common/es.json').respond(200);
            $http.when('GET', $rootScope.urlService + '/actualdate').respond(200,{data: new Date()});
            $http.when('GET', $rootScope.urlService + '/islogged').respond(200);
            $http.when('GET', $rootScope.urlService + patternFilters).respond(200,{data: new Date()});
            $http.when('GET', $rootScope.urlService + portfolioPatterns).respond(200, patterns);
            $http.when('GET', $rootScope.urlService + portfolioPatternsList).respond(200, patterns);
            $http.when('GET', $rootScope.urlService + addPortfolio).respond(200, patterns);
            $http.when('GET', $rootScope.urlService + addList).respond(200, patterns);
            $http.when('GET', $rootScope.urlService + addPortfolioId).respond(200, patterns);
            $http.when('GET', $rootScope.urlService + deletePortfolio).respond(200, patterns);
            $http.when('GET', $rootScope.urlService + deleteList).respond(200, patterns);
            $http.when('GET', $rootScope.urlService + favourite).respond(200, patterns);
        }));


        it("should start the page", inject(function () {
            $scope.startLoading();
            expect($scope.loading).toBe(true);
        }));

        it("should start moving", inject(function () {
            $scope.startMoving();
            expect($scope.moving).toBe(true);
        }));

        it("should end moving", inject(function () {
            $scope.endMoving();
            expect($scope.moving).toBe(false);
        }));

        it("should limit alert", inject(function () {
            $scope.limitAlert();
            expect($scope.limitAlert).toBeDefined();
        }));

        it("should set page to a given one", inject(function () {
            $scope.setPage(1);
            expect($scope.pagingOptions.currentPage).toBe(1);
        }));

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


        it('should load page', function() {
            $http.expectGET($scope.urlService + '/actualdate');
            $http.expectGET($scope.urlService + '/islogged');
            //$http.expectGET($scope.urlService + patternFilters);
            //$http.expectGET($scope.urlService + portfolioPatterns);
            $scope.loadPage(true);
            $http.flush();
            expect($scope.loadPage).toBeDefined();
        });

        it('should add a pattern to portfolio', function() {
            $scope.portfolioList = [pattern];
            //$http.expectGET($scope.urlService + addList);
            $scope.portfolioList.length = 1;
            $scope.$apply();
            $scope.addToPortfolioList(pattern);
            $http.flush();
            expect($scope.addToPortfolioList).toBeDefined();
        });

        it('should delete a pattern from portfolio', function() {
            $scope.moving = false;
            $scope.portfolioList = [pattern];
            //$http.expectGET($scope.urlService + deleteList);
            $scope.$apply();
            $scope.deleteFromPortfolioList(1);
            expect($scope.deleteFromPortfolioList).toBeDefined();
            $http.flush();
        });

        it('should let the user set a pattern as favourite from list', function() {
            //$scope.portfolioList = $scope.getportfolioList();
            /* $http.expectGET($scope.urlService + addList);
             $http.expectGET($scope.urlService + favourite);*/
            $scope.portfolioList = [pattern];
            $scope.$digest();
            $scope.toggleFavoriteFromList(1);
            //$http.flush();
            expect($scope.toggleFavoriteFromList).toBeDefined();
        });

        it('should let the user set a pattern as favourite', function() {
            //$http.expectGET($scope.urlService + favourite);
            //$scope.portfolioList = [pattern, pattern, pattern, pattern, pattern, pattern];
            //$http.expectGET($scope.urlService + portfolioPatterns);
            $scope.toggleFavorite(1);
            //$http.flush();
            expect($scope.toggleFavorite).toBeDefined();

        });

        it('should execute the calculation of portfolio', function() {
            $scope.portfolioList = [pattern];
            //$http.expectGET($scope.urlService + portfolioPatternsList);
            $http.expectGET($scope.urlService + portfolioPatterns);
            //$http.expectGET($scope.urlService + portfolioPatternsList);
            $scope.$apply();
            $scope.drawdown(true);
            $http.flush();
            expect($scope.drawdown).toBeDefined();
        });

        it('should be able to clear portfolio', function() {

            $scope.clearPortfolioList();
            expect($scope.clearPortfolioList.length).toBe(0);

            $scope.changeTab(1);
            $scope.clearPortfolioList();
            expect($scope.clearPortfolioList.length).toBe(0);

            $scope.changeTab(2);
            $scope.clearPortfolioList();
            expect($scope.clearPortfolioList.length).toBe(0);

            $scope.changeTab(3);
            $scope.clearPortfolioList();
            expect($scope.clearPortfolioList.length).toBe(0);
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

        it('should save url params', function(){
            $scope.filterOptions.filters = {'durationInterval': 2,'alarm': true, 'index_type':1,'selectedAverage': 'average', 'selectedRentDiary': 'diary', 'volatilityInput': 12, 'selectedVolatility': 'volatility', 'selectedDuration': 'duration','rentDiaryInput': 12, 'month': new Date().getMonth(), 'rentInput':12,selectedRent: 'rent',selectedOperation: 'operation',selectedIndustry: 'industry', selectedSector: 'sector', selectedMarket: 'market', selectedRegion:' region', rentAverageInput: 12, 'favourite': 1, 'filterName': 'name', 'durationInput': 12};
            $scope.saveUrlParams();
            expect($scope.saveUrlParams).toBeDefined();
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


describe('The portfolio Service', function () {

    beforeEach(angular.mock.module("ngMo.portfolio"));
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
        var portfolio = ['portfolio1', 'portfolio2'];
        var pattern = {patternType: "STOCK", id:1};
        beforeEach(inject(function (PortfolioService, _$rootScope_, _$compile_, _$httpBackend_, _$window_) {

            service = PortfolioService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;
            $window = _$window_;

        }));

        it('should load data asynchronously', function() {

            var portfolioList = [pattern, pattern, pattern, pattern, pattern, pattern];
            service.getPagedDataAsync(10,1,filters,1,'operation', portfolioList, 'callback');
            expect(service.getPagedDataAsync).toBeDefined();
        });

        it('should get portfolio  data', function() {
            var res = service.getPortfolioData(portfolio,filters);
            expect(res).toBeDefined();
        });
    });
});

