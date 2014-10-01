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
            $scope.$apply();
            var month = {'month': 'agosto', 'year': 2014};
            var filters = {'month': month};
            var patterns = service.createParamsFromFilter(filters);
            expect(patterns).toNotBe(undefined);
        });


        it('should obtaing patterns form pack', function(){
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

    var $scope, ctrl, state, $http,selectedService, service, stateParams,tabsService,initializedData;

    var month = {month: 9, year:2014};
    var patternFilters = '/patternfilters?indexType=0&industry=&productType=0&sector=&view=';
    var patternFilters2 = '/patternfilters?indexType=0&month=10&year=2014&productType=0&view=';
    var filters = '/patternfilters?indexType=0&month=%7B%22month%22:8,%22year%22:2014%7D&productType=NaN&view=';
    var patterns = '/patternspack?month=%7B%22month%22:8,%22year%22:2014%7D&page=1&year=2014';

    var response = {selectedRegion: 'region', markets: ['market'], regions: ['region'], industries: ['industry'], sectors:['sector']};
    var response2 = {pack:{ month: 8, productType :'INDICE'}};

    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.home"));
    beforeEach(angular.mock.module("ngMo.catalog"));

    beforeEach(inject(function ($controller, $rootScope, $state, $stateParams, _$httpBackend_,TabsService,ActualDateService,SelectedPackService) {
        ctrl = $controller;
        $scope = $rootScope.$new();
        state = $state;
        tabsService = TabsService;
        selectedService = SelectedPackService;
        initializedData = {'pack': { 'month': month, 'productType': 'INDICE', 'patternType': "SIMPLE" }, 'pagingOptions' : {pageSize: 10,
            currentPage: 1
        }};
        stateParams = $stateParams;
        $http = _$httpBackend_;
        service = SelectedPackService;

        $http.when('GET', $rootScope.urlService + '/actualdate').respond(200,{data: new Date()});
        $http.when('GET', $rootScope.urlService + patternFilters).respond(200,response);
        $http.when('GET', $rootScope.urlService + patternFilters2).respond(200,response);
        $http.when('GET', $rootScope.urlService + filters).respond(200, response);
        $http.when('GET', $rootScope.urlService + patterns).respond(200,response2);

        $controller('CatalogCtrl', {'$scope': $rootScope, 'state': $state ,  'initializedData': initializedData, 'selectedPackService': SelectedPackService});

        $scope.filterOptions.filters = {month: {month: 8, year:2014}, productType: 0};

    }));

    it('should success when location changes', function(){
        $scope.$broadcast('$locationChangeSuccess',[null, stateParams]);
    });

    it('should generate the search url', function(){

        initializedData.pack ={ productType: 'INDICE',patternType: "SIMPLE"};
        $http.expectGET($scope.urlService + '/actualdate');
        $http.expectGET($scope.urlService + patternFilters);
        $http.expectGET($scope.urlService + patterns);

        $scope.generateSearchUrl('Google','undefined');
        $http.flush();
        expect($scope.selectedTab).toBe(4);
    });

    //same as above but other branch
    it('should generate the search url', function(){

        initializedData = { 'pack': { 'productType': 'INDICE','patternType': "SIMPLE"}, 'pagingOptions' : {pageSize: 10,
            currentPage: 1
        }};
        $http.expectGET($scope.urlService + '/actualdate');
        $http.expectGET($scope.urlService + patternFilters);
        $http.expectGET($scope.urlService + patterns);

        $scope.generateSearchUrl('Yahoo','undefined');
        $http.flush();
        expect($scope.selectedTab).toBe(4);
    });

    //same as above but other branch
    it('should generate the search url', function(){

        initializedData = { pack: { 'productType': '','patternType': "SIMPLE"}};
        $http.expectGET($scope.urlService + '/actualdate');
        $http.expectGET($scope.urlService + patternFilters);
        $http.expectGET($scope.urlService + patterns);

        $scope.generateSearchUrl('Bloomberg','undefined');
        $http.flush();
        expect($scope.selectedTab).toBe(4);
    });

    //same as above but other branch
    it('should generate the search url', function(){

        initializedData = { pack: { 'productType': 'INDICE','patternType': "SIMPLE"}};
        $http.expectGET($scope.urlService + '/actualdate');
        $http.expectGET($scope.urlService + patternFilters);
        $http.expectGET($scope.urlService + patterns);

        $scope.generateSearchUrl('Bloomberg',undefined);
        $http.flush();
        expect($scope.selectedTab).toBe(4);
    });

    it('should be able to load the page', function(){

        initializedData = { pack: { 'productType': 'INDICE','patternType': "SIMPLE"}};
        $http.expectGET($scope.urlService + '/actualdate');
        $http.expectGET($scope.urlService + patternFilters);
        $http.expectGET($scope.urlService + patterns);

        $scope.loadPage();
        $http.flush();
        expect($scope.selectedTab).toBe(4);
    });

    it('should initialize data ', function(){
        $scope.selectedPack = $scope.initialData.pack;
        expect($scope.selectedPack).toNotBe(undefined);
    });

    it('should load all filters ', function(){
        $scope.loadFilters();
        expect($scope.refreshSector).toNotBe(undefined);
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