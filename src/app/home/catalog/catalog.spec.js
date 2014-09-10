describe('The Selected Pack service', function () {
    beforeEach(angular.mock.module("ngMo.catalog"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock;
        var service;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (SelectedPackService,_$rootScope_, _$state_, $stateParams,$httpBackend) {

            httpMock = $httpBackend;
            $state = _$state_;
            service = SelectedPackService;
            httpMock.when('GET', _$rootScope_.urlService + '/actualdate').respond(200);
            httpMock.when('GET', _$rootScope_.urlService + "/prices").respond({
                "data": {
                    "prices": [29, 82, 313]
                }});
            $scope = _$rootScope_.$new();

        }));

        it('should create params from filters', function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            var month = {'month': 'agosto', 'year': 2014};
            var filters = {'month': month};
            var patterns = service.createParamsFromFilter(filters);
            expect(patterns).toNotBe(undefined);
        });


        it('should obtaing patterns form pack', function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            var month = {'month': 'agosto', 'year': 2014};
            var filters = {'month': month, 'index_type': 1};
            var patterns = service.obtainPatternsPack(1,filters);
            expect(patterns).toNotBe(undefined);

            filters = {'month': ":month"};
            patterns = service.obtainPatternsPack(1,filters);
            expect(patterns).toNotBe(undefined);
        });

        it('should get the correct selectors', function(){
            delete $window.sessionStorage.cart;
            $scope.$apply();
            var month = {'month': 'agosto', 'year': 2014};
            var filters = {'month': month, 'index_type': 1};

            var selectors = ['industries'];
            service.getSelectors(filters,selectors, 'callback');
            expect(service.getSelectors).toNotBe(undefined);

            //index_type = undefined
            filters = {'month': 'agosto'};
            service.getSelectors(filters,selectors, 'callback');
            expect(service.getSelectors).toNotBe(undefined);
        });
    });
});


describe('The catalog controller', function() {

    var $scope, ctrl, state, $http, myPatternsData, vector, stateParams,expiration,tabsService,ActualDateService,initializedData;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.home"));
    beforeEach(angular.mock.module("ngMo.catalog"));

    beforeEach(inject(function ($controller, $rootScope, $state, $stateParams, _$httpBackend_,TabsService,ActualDateService,SelectedPackService) { //, $state, $stateParams, $location, TabsService, PatternsService, MonthSelectorService, IsLogged, myPatternsData, SelectedMonthService, ExpirationYearFromPatternName) {
        ctrl = $controller;
        $scope = $rootScope.$new();
        state = $state;
        tabsService = TabsService;
        initializedData = { 'pack': { 'productType': 'INDICE','patternType': "SIMPLE"}, 'pagingOptions' : {pageSize: 10,
            currentPage: 1
        }};
        stateParams = $stateParams;
        $http = _$httpBackend_;


        $http.when('GET', $rootScope.urlService + '/actualdate').respond(200);
        $http.when('GET', $rootScope.urlService + '/patternspack?durationInterval=&industry=&name=&page=1&sector=&volatilityInterval=').respond(200);
        $http.when('GET', $rootScope.urlService + '/patternfilters?indexType=0&industry=&productType=0&sector=&view=').respond(200);

        $controller('CatalogCtrl', {'$scope': $rootScope, 'state': $state ,  'initializedData': initializedData});

    }));

    it('should generate the search url', function(){
        $http.expectGET($scope.urlService+'/actualdate');
        $http.expectGET($scope.urlService + '/patternspack?durationInterval=&industry=&name=&page=1&sector=&volatilityInterval=');
        $http.expectGET($scope.urlService + '/patternfilters?indexType=0&industry=&productType=0&sector=&view=');
        $scope.$apply();
        $scope.generateSearchUrl('Google','undefined');
        $scope.generateSearchUrl('Yahoo', "undefined");
        $scope.generateSearchUrl('Bloomberg', undefined);

        expect($scope.generateSearchUrl).toNotBe(undefined);
    });

    it('should initialize data ', function(){
        $scope.selectedPack = $scope.initialData.pack;
        expect($scope.selectedPack).toNotBe(undefined);
    });

    it('should search properly', function(){
        $scope.search();
        expect($scope.pagingOptions.currentPage).toBe(1);
    });

    it('should set the current page to a given one', function(){
        $scope.setPage(1);
        expect($scope.pagingOptions.currentPage).toBe(1);
    });
    it('should select a sector', function(){
        $scope.selectSector();
        expect($scope.selectSector).toNotBe(undefined);
    });

    it('should select an industry', function(){
        $scope.selectIndustry();
        expect($scope.applyFilters).toNotBe(undefined);
    });

    it('should save url params', function(){

        $scope.filterOptions.filters = {'filterName': 'name', selectedSector: 'sector', 'selectedIndustry': 'industry', 'durationInput': 12, 'volatilityInput': 'input'};
        $scope.saveUrlParams();
        expect($scope.saveUrlParams).toNotBe(undefined);
    });

    it('should restart filter whether a tab is active or not ', function(){

        $scope.restartFilter();
        tabsService.changeActiveTab(1);
        $scope.restartFilter();
        tabsService.changeActiveTab(2);
        $scope.restartFilter();
        tabsService.changeActiveTab(3);
        $scope.restartFilter();
        expect($scope.saveUrlParams).toNotBe(undefined);
    });

    it('should refresh selectors', function(){
        $scope.refreshSelectors([]);
        expect($scope.refreshSelectors).toNotBe(undefined);
    });


    it('should get the content of url', function(){
        $scope.getContentUrl([]);
        expect($scope.getContentUrl).toNotBe(undefined);
    });

});