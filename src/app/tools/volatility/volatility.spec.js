describe('Volatility controller', function()  {
    var $scope, ctrl, $http, $state, myPatternsData, $compile, service, $location;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.volatility"));

    var patternFilters = '/patternfilters?indexType=0&industry=&market=&month=10&productType=0&region=&sector=&token=1&view=&year=2014';
    var patterns = '/patterns?accumulatedInput=&accumulatedReturn=&averageInput=&averageReturn=&dailyInput=&dailyReturn=&duration=&durationInput=&favourites=&indexType=0&industry=&market=&month=10&name=&operation=&page=1&productType=0&region=&sector=&token=1&volatility=&volatilityInput=&year=2014';

    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$state_, _$compile_,_$location_, TabsService)  {

        service = TabsService;
        $location = _$location_;
        _$httpBackend_.when('GET', $rootScope.urlService + '/actualdate').respond(200,{data: new Date()});
        _$httpBackend_.when('GET', $rootScope.urlService + '/islogged').respond(200);
        _$httpBackend_.when('GET', $rootScope.urlService + patternFilters).respond(200);
        _$httpBackend_.when('GET', $rootScope.urlService + patterns).respond(200);
        ctrl = $controller;
        $compile = _$compile_;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = _$state_;
        $state = {data :  {  pageTitle : 'title'}};
        myPatternsData = { data: 'data'
        };



        $controller('VolatilityCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope, 'myPatternsData': myPatternsData });

    }));


    it('should be able to open a graph', function(){

        $http.expectGET($scope.urlService + '/actualdate');
        $http.expectGET($scope.urlService + '/islogged');
        $http.expectGET($scope.urlService + patternFilters);
        $http.expectGET($scope.urlService + patterns);

        var k = {'parentElement': "<td class='stocks-vol-value'></td>", 'offsetHeight': '30px', 'insertBefore' : function(){}, 'srcElement': "<td class='stocks-vol-value'></td>"};
        var i = {'parentElement': k, 'srcElement': "<td class='stocks-vol-value'></td>"};
        var j = {'parentElement': i, 'srcElement': "<td class='stocks-vol-value'></td>"};
        var parentElement = {'parentElement': j, 'srcElement': "<td class='stocks-vol-value'></td>"};
        var srcElement = { 'parentElement': parentElement};
        var e = {
            'srcElement': srcElement, 'target': srcElement
        };
        $scope.loadGraphic(e,'name1', 'type', 'name2',true,'url');//Real graph
        expect($scope.loadGraphic).toNotBe(undefined);

        //go by another branch
        $scope.graph = null;
        $scope.loadGraphic(e,'name1', "BULLISH", 'name2',false,'url');//Real graph
        expect($scope.graph).toNotBe(undefined);

        //go by another branch
        $scope.graph = null;
        $scope.loadGraphic(e,'name1', "type", 'name2',false,null);//Real graph
        expect($scope.graph).toNotBe(undefined);
    });
    it('should be able to close the graph', function(){

        $scope.graph = document.createElement('div');
        $scope.closeGraph();
        expect($scope.closeGraph).toNotBe(undefined);

    });

    it("should set the current page to a given on", function(){
        $scope.setPage(1);
        expect($scope.pagingOptions.currentPage).toBe(1);
    });

    it("should let the user select a favourite pack", function(){
        $scope.toggleFavorite(1);
        expect($scope.toggleFavorite).toBeDefined();
    });


    it("should restart filter", function(){

        $scope.filterOptions.selectors = {'months': ['Enero', 'Febrero']};
        $scope.filterOptions.filters = {'month': 'agosto', rentAverageInput: 12, 'favourite': '', 'filterName': '', 'durationInput': ''};
        $scope.restartFilter();

        service.changeActiveTab(1);
        $scope.restartFilter();
        service.changeActiveTab(2);
        $scope.restartFilter();
        service.changeActiveTab(3);
        $scope.restartFilter();
        expect($scope.restartFilter).toNotBe(undefined);
    });

    it("should get the correct template table", function(){

        var res = $scope.getTemplateTable();
        service.changeActiveTab(2);
        res = $scope.getTemplateTable();
        expect(res).toNotBe(undefined);
    });

    it("should get the correct template filter", function(){

        var res = $scope.getTemplateFilter();
        service.changeActiveTab(2);
        res = $scope.getTemplateFilter();
        expect(res).toNotBe(undefined);
    });

    it("should change the current tab to a given one", function(){
        $scope.changeTab(1);
        expect(service.getActiveTab()).toBe(1);
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

    it('should be able to do search', function() {
        $scope.search();
        expect($scope.search).toNotBe(undefined);
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
        service.changeActiveTab(1);
        $scope.loadUrlParams();
        service.changeActiveTab(2);
        $scope.loadUrlParams();
        service.changeActiveTab(3);
        $scope.loadUrlParams();


        //incorrect date
        $location.search('month', 'august_2014');
        $scope.loadUrlParams();
        expect($scope.loadUrlParams).toNotBe(undefined);

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

describe('The tabs Service', function () {

    beforeEach(angular.mock.module("ngMo.volatility"));
    beforeEach(module('templates-app'));

    describe('template', function () {

        var service;
        var $scope;
        var $compile;
        var $http;
        var $window;
        var filters = {'index_type': 0,'month': 'Agosto', 'year': '2014' , 'selectedOperation' :{'id': 1} ,'selectedRent': {'id': 1}, 'selectedAverage': {'id':1}, 'selectedRentDiary' :{'id':1}, 'selectedVolatility' :{'id':1}, 'selectedDuration' :{'id':1}};
        var selectors = {'month': 'Agosto', 'year': '2014'};


        beforeEach(inject(function (VolatilityService, _$rootScope_, _$compile_, _$httpBackend_, _$window_) {

            service = VolatilityService;
            $scope = _$rootScope_;
            $compile = _$compile_;
            $http = _$httpBackend_;
            $window = _$window_;

        }));

        it('should load data asynchronously', function() {
            var res = service.getPagedDataAsync(1,filters);
            expect(res).toNotBe(undefined);
        });

        it('should be able to get selectors', function(){
            service.getSelectors(filters, selectors, 'callback', 'volatility');

            //get selectors when index_type is undefined
            filters = {'index_type': undefined,'month': 'Agosto', 'year': '2014' , 'selectedOperation' :{'id': 1} ,'selectedRent': {'id': 1}, 'selectedAverage': {'id':1}, 'selectedRentDiary' :{'id':1}, 'selectedVolatility' :{'id':1}, 'selectedDuration' :{'id':1}};
            service.getSelectors(filters, selectors, 'callback', 'volatility');
        });
    });
});