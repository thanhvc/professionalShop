describe('The week controller', function()  {
    var $scope, ctrl, $http, $state, $compile, actualDateService, $location;
    beforeEach(angular.mock.module("ngMo"));
    beforeEach(angular.mock.module("ngMo.the_week"));
    beforeEach(angular.mock.module("ngMo.home"));

    var patternFilters = '/patternfilters?indexType=0&industry=&market=&month=9&productType=0&region=&sector=&view=&year=2014';
    var numData = '/weekData/2014?authToken=1';
    var weekData = '/weekData/2014';

    var region = {assets: ['asset1', 'asset2']};
    var stock = {'regions':[region, region]};
    var commodities = {'regions':[region, region]};
    beforeEach(inject(function ($controller, $rootScope, _$http_, _$httpBackend_, _$compile_,_$location_,ActualDateService)  {

        $location = _$location_;
        actualDateService = ActualDateService;
        _$httpBackend_.when('GET', $rootScope.urlService + patternFilters).respond(200);
        _$httpBackend_.when('GET', $rootScope.urlService + '/weekData').respond(200);
        _$httpBackend_.when('GET', $rootScope.urlService + weekData).respond(200,{"STOCKS": [stock, stock], 'COMMODITIES': [stock,stock], 'SP500' : [stock,stock]});
        _$httpBackend_.when('GET',$rootScope.urlService + '/actualdate').respond(200,{"data": new Date()});
        _$httpBackend_.when('GET',$rootScope.urlService + '/numweek').respond(200,{"data": new Date()});
        _$httpBackend_.when('GET',$rootScope.urlService + numData).respond({"STOCKS": [stock, stock], 'COMMODITIES': [stock,stock], 'SP500' : [stock,stock]});


        ctrl = $controller;
        $compile = _$compile_;
        $scope = $rootScope.$new();
        $http = _$httpBackend_;
        $state = {data :  {  pageTitle : 'title'}};
        $controller('TheWeekCtrl',  {'$rootScope': $rootScope, '$http': _$http_, '$scope': $scope});

    }));

    it('should success when changing start state', function() {
        $http.expectGET($scope.urlService + patternFilters);
        $scope.$broadcast('$stateChangeStart');
    });


    it('should be able to load data properly', function() {
        $scope.loadData();
        expect($scope.loading).toBe(true);
    });

    it('should return the monday date of the current week', function() {

        $http.expectGET($scope.urlService + '/actualdate');
        $http.expectGET($scope.urlService + '/numweek');
        $http.expectGET($scope.urlService + weekData);
        $scope.obtainDateMondaythisWeek();
        $http.flush();
        expect($scope.obtainDateMondaythisWeek).toBeDefined();

    });

});

describe('The selected graphic panel directive', function () {

    beforeEach(angular.mock.module("ngMo"));
    describe('template', function () {
        var $compile;
        var $scope;
        var $state;
        var httpMock;

        beforeEach(module('templates-app'));

        beforeEach(inject(function (_$compile_, _$rootScope_, _$state_, $httpBackend) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $state = _$state_;
            httpMock = $httpBackend;
            var template = $compile("<div selected-graphic-panel></div>")($scope);
            $scope.$apply();
        }));

        it('should show the graphic selected by the user', inject(function () {

            var e = {
                'srcElement': 'srcElement', 'clientX': 20
            };
            var currentTarget = { 'clientHeight': 20};
            $scope.showSelectedGraphic(e,'graphicName', 'graphicUrl');
            expect( $scope.selectedGraphic).toBeDefined();
            //another branch
            e = {
                'srcElement': undefined, 'clientX': 20, 'clientY': 20, 'currentTarget' : currentTarget
            };
            $scope.showSelectedGraphic(e,'graphicName', 'graphicUrl');
            expect( $scope.selectedGraphic).toBeDefined();
        }));

        it('should hide the graphic selected by the user', function(){
            $scope.hideSelectedGraphic();
            expect($scope.openGraph).toBeDefined();
        });

    });
});